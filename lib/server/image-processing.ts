import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Check if we're on the server
const isServer = typeof window === "undefined";

const REMOTE_FETCH_TIMEOUT_MS = 5000;

type SharpModule = typeof import("sharp");
type SharpFunction = SharpModule extends { default: infer D } ? D : SharpModule;

let sharpModulePromise: Promise<SharpModule> | null = null;
let sharpModule: SharpFunction | null = null;

async function getSharp(): Promise<SharpFunction | null> {
    if (!isServer) {
        return null;
    }

    if (sharpModule) {
        return sharpModule;
    }

    if (!sharpModulePromise) {
        sharpModulePromise = import("sharp") as unknown as Promise<SharpModule>;
    }
    try {
        const importedModule = await sharpModulePromise;
        const moduleWithDefault = importedModule as SharpModule & {
            default?: SharpFunction;
        };
        const fallbackModule = moduleWithDefault as unknown as SharpFunction;
        const resolvedModule = moduleWithDefault.default ?? fallbackModule;

        if (typeof resolvedModule !== "function") {
            console.warn("Loaded sharp module is not callable");
            return null;
        }

        sharpModule = resolvedModule;
        return sharpModule;
    } catch (error) {
        console.warn("Failed to load sharp module:", error);
        return null;
    }
}

function isStaticImageData(
    image: unknown,
): image is { src: string; blurDataURL?: string } {
    return (
        typeof image === "object" &&
        image !== null &&
        "src" in (image as Record<string, unknown>)
    );
}

// Safe Base64 encoding that works in both environments
function safeBase64Encode(str: string): string {
    if (isServer) {
        return Buffer.from(str).toString("base64");
    } else {
        // Browser-compatible base64 encoding
        return btoa(str);
    }
}

// Simple SVG placeholder generator as a fallback
function createSVGPlaceholder(
    width = 80,
    height = 45,
    color = "#E2E8F0",
): string {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`;
    return `data:image/svg+xml;base64,${safeBase64Encode(svg)}`;
}

// Add this type guard function at the top of your file
function isSanityImageObject(
    image: SanityImageSource,
): image is { asset: { _ref: string } } {
    return (
        typeof image === "object" &&
        image !== null &&
        "asset" in image &&
        typeof image.asset === "object" &&
        image.asset !== null &&
        "_ref" in image.asset
    );
}

async function generateBlurFromBuffer(buffer: Buffer): Promise<string> {
    const sharpInstance = await getSharp();
    if (!sharpInstance) {
        return createSVGPlaceholder();
    }

    try {
        const { data, info } = await sharpInstance(buffer)
            .resize(10)
            .blur(5)
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true });

        return `data:image/${info.format};base64,${data.toString("base64")}`;
    } catch (error) {
        console.warn("Error processing image buffer for blur:", error);
        return createSVGPlaceholder();
    }
}

async function generateBlurFromRemote(url: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
        () => controller.abort(),
        REMOTE_FETCH_TIMEOUT_MS,
    );

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            cache: "force-cache",
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return createSVGPlaceholder();
        }

        const arrayBuffer = await response.arrayBuffer();
        return await generateBlurFromBuffer(Buffer.from(arrayBuffer));
    } catch (error) {
        clearTimeout(timeoutId);
        if ((error as Error).name === "AbortError") {
            console.warn(
                "Timeout fetching remote image for blur, using placeholder",
            );
        } else {
            console.warn("Error generating blur from remote image:", error);
        }
        return createSVGPlaceholder();
    }
}

async function generateBlurFromLocal(imagePath: string): Promise<string> {
    if (!isServer) {
        return createSVGPlaceholder();
    }

    try {
        const sanitizedPath = imagePath.split("?")[0].replace(/^\/+/, "");
        const normalizedPath = path
            .normalize(sanitizedPath)
            .replace(/^(\.\.(\/|\\|$))+/, "");
        const absolutePath = path.join(process.cwd(), "public", normalizedPath);
        const fileBuffer = await fs.readFile(absolutePath);
        return await generateBlurFromBuffer(fileBuffer);
    } catch (error) {
        console.warn("Error generating blur from local image:", error);
        return createSVGPlaceholder();
    }
}

/**
 * Universal blur data URL generator for any image source
 * Works with both local and remote images, with fallback mechanisms
 */
export async function getBlurDataUrl(
    image: string | SanityImageSource,
    isSanityImage = false,
): Promise<string> {
    // Return a simple placeholder if running on client
    if (!isServer) {
        return createSVGPlaceholder();
    }

    try {
        // Handle static imports with built-in blur
        if (isStaticImageData(image) && image.blurDataURL) {
            return image.blurDataURL;
        }

        if (!isSanityImage && typeof image !== "string") {
            console.warn(
                "Invalid non-Sanity image source provided to getBlurDataUrl",
            );
            return createSVGPlaceholder();
        }

        if (isSanityImage) {
            let sanityUrl: string | null = null;
            try {
                sanityUrl = urlFor(image as SanityImageSource)
                    .width(60)
                    .quality(20)
                    .url();
            } catch (error) {
                console.warn("Invalid Sanity image reference:", error);
                return createSVGPlaceholder();
            }

            if (!sanityUrl) {
                return createSVGPlaceholder();
            }

            return await generateBlurFromRemote(sanityUrl);
        }

        const imagePath = image as string;

        if (!imagePath) {
            return createSVGPlaceholder();
        }

        if (imagePath.startsWith("data:")) {
            return imagePath;
        }

        if (imagePath.startsWith("/")) {
            return await generateBlurFromLocal(imagePath);
        }

        if (/^https?:\/\//.test(imagePath)) {
            return await generateBlurFromRemote(imagePath);
        }

        return createSVGPlaceholder();
    } catch (error) {
        console.warn("Error generating blur:", error);
        return createSVGPlaceholder();
    }
}

/**
 * Specialized function for Sanity images
 * Returns both the optimized image URL and blur data URL
 */
export async function getSanityImageData(image: SanityImageSource) {
    if (!image) {
        return {
            imageUrl: "",
            blurDataURL: createSVGPlaceholder(),
            aspectRatio: 16 / 9,
        };
    }

    try {
        // 1. Get image URL safely - handle malformed references
        let imageUrl;
        let sanityUrl: string | null = null;
        try {
            imageUrl = urlFor(image).width(2000).quality(85).url();
            sanityUrl = imageUrl;
        } catch (error) {
            // Extract URL directly from string reference if possible
            if (typeof image === "string" && image.includes("cdn.sanity.io")) {
                imageUrl = image;
                sanityUrl = imageUrl;
            } else {
                console.warn("Invalid Sanity image reference:", error);
                return {
                    imageUrl: "",
                    blurDataURL: createSVGPlaceholder(),
                    aspectRatio: 16 / 9,
                };
            }
        }

        // 2. Fetch metadata and blur in parallel with reduced timeout (3s)
        const [imageData, blurDataURL] = await Promise.all([
            // Get dimensions if possible
            Promise.race([
                client.fetch(
                    `*[_id == $id][0]{"dimensions": asset->metadata.dimensions}`,
                    {
                        id: isSanityImageObject(image)
                            ? image.asset._ref
                            : image,
                    },
                ),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Timeout")), 3000),
                ),
            ]).catch(() => null),
            Promise.race([
                // Try to get LQIP from Sanity metadata first
                client
                    .fetch<{ asset?: { metadata?: { lqip?: string } } } | null>(
                        `*[_id == $id][0]{asset->{metadata{lqip}}}`,
                        {
                            id: isSanityImageObject(image)
                                ? image.asset._ref
                                : image,
                        },
                    )
                    .then(result => {
                        if (result?.asset?.metadata?.lqip) {
                            return result.asset.metadata.lqip;
                        }
                        return sanityUrl
                            ? generateBlurFromRemote(sanityUrl)
                            : createSVGPlaceholder();
                    })
                    .catch(() =>
                        sanityUrl
                            ? generateBlurFromRemote(sanityUrl)
                            : createSVGPlaceholder(),
                    ),
                new Promise<string>((_, reject) =>
                    setTimeout(() => reject(new Error("Timeout")), 8000),
                ),
            ]).catch(() => createSVGPlaceholder()),
        ]);

        return {
            imageUrl,
            blurDataURL,
            aspectRatio: imageData?.dimensions
                ? imageData.dimensions.width / imageData.dimensions.height
                : 16 / 9,
        };
    } catch (error) {
        console.error("Error processing Sanity image:", error);
        return {
            imageUrl: "",
            blurDataURL: createSVGPlaceholder(),
            aspectRatio: 16 / 9,
        };
    }
}

const imageCache = new Map();

export async function getCachedSanityImageData(image: SanityImageSource) {
    const cacheKey = isSanityImageObject(image)
        ? image.asset._ref
        : String(image);

    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey);
    }

    const data = await getSanityImageData(image);
    imageCache.set(cacheKey, data);

    return data;
}
