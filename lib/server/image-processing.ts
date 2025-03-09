// import 'server-only';

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
        let imgSrc;
        if (isSanityImage) {
            imgSrc = urlFor(image as SanityImageSource)
                .width(60)
                .url();
        } else {
            // For local images in the public directory
            if (typeof image === "string" && image.startsWith("/")) {
                // Handle absolute paths to public directory
                // In development, use localhost URL
                // In production, use relative path (Next.js will handle it)
                const baseUrl = process.env.VERCEL_URL
                    ? `https://${process.env.VERCEL_URL}`
                    : "http://localhost:3000";

                imgSrc = `${baseUrl}${image}`;
            } else {
                imgSrc = image;
            }
        }

        // Fetch the image
        const response = await fetch(imgSrc as string);
        if (!response.ok) {
            console.error(
                `Failed to fetch image: ${imgSrc}, status: ${response.status}`,
            );
            return createSVGPlaceholder();
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        try {
            // Try using sharp for better quality (server-only)
            if (!sharp) {
                throw new Error("Sharp module not available");
            }

            const { data, info } = await sharp(buffer)
                .resize(10)
                .blur(5)
                .ensureAlpha()
                .toBuffer({ resolveWithObject: true });

            return `data:image/${info.format};base64,${data.toString("base64")}`;
        } catch (sharpError) {
            console.warn(
                "Sharp processing failed, using SVG fallback:",
                sharpError,
            );
            return createSVGPlaceholder();
        }
    } catch (error) {
        console.error("Error generating blur data URL:", error);
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
        };
    }

    try {
        const imageUrl = urlFor(image).url();

        // If on client, just return the URL with a placeholder
        if (!isServer) {
            return {
                imageUrl,
                blurDataURL: createSVGPlaceholder(),
            };
        }

        // On server, try to generate proper blur
        const blurDataURL = await getBlurDataUrl(image, true);

        return { imageUrl, blurDataURL };
    } catch (error) {
        console.error("Error processing Sanity image:", error);
        // Fallback with a default placeholder
        return {
            imageUrl: image ? urlFor(image).url() : "",
            blurDataURL: createSVGPlaceholder(),
        };
    }
}

export function assertServerEnvironment(): boolean {
    return isServer;
}
