// import 'server-only';

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Check if we're on the server
const isServer = typeof window === "undefined";

// Only import sharp on the server
let sharp: any;
if (isServer) {
    import("sharp").then(module => {
        sharp = module.default;
    });
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
        if (typeof image === "object" && "src" in image && image.blurDataURL) {
            return image.blurDataURL;
        }

        // Generate URL based on image type
        let imgSrc: string;
        if (isSanityImage) {
            try {
                imgSrc = urlFor(image as SanityImageSource)
                    .width(60)
                    .quality(20)
                    .url();
            } catch (error) {
                console.warn("Invalid Sanity image reference:", error);
                return createSVGPlaceholder();
            }
        } else {
            imgSrc =
                typeof image === "string" && image.startsWith("/")
                    ? `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}${image}`
                    : String(image);
        }

        // Early return for invalid URLs
        if (!imgSrc) {
            return createSVGPlaceholder();
        }

        const response = await fetch(imgSrc);
        if (!response.ok) {
            return createSVGPlaceholder();
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        if (!sharp) {
            return createSVGPlaceholder();
        }

        const { data, info } = await sharp(buffer)
            .resize(10)
            .blur(5)
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true });

        return `data:image/${info.format};base64,${data.toString("base64")}`;
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
        try {
            imageUrl = urlFor(image).url();
        } catch (error) {
            // Extract URL directly from string reference if possible
            if (typeof image === "string" && image.includes("cdn.sanity.io")) {
                imageUrl = image;
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
                new Promise((_, reject) => setTimeout(() => reject(), 3000)),
            ]).catch(() => null),

            // Always use SVG placeholder for stability - no more Sharp timeouts
            Promise.resolve(createSVGPlaceholder()),
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

export function assertServerEnvironment(): boolean {
    return isServer;
}
