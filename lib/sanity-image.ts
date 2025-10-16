import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImageOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
}

/**
 * Get optimized Sanity image URL with proper parameters
 */
export function getSanityImageUrl(
    source: SanityImageSource,
    options?: SanityImageOptions,
): string {
    const { width, height, quality = 85, format = "webp" } = options || {};

    if (!source) {
        console.warn("No image source provided to getSanityImageUrl");
        return "";
    }

    try {
        let builder = urlFor(source).quality(quality).format(format);

        if (width) builder = builder.width(width);
        if (height) builder = builder.height(height);

        return builder.url();
    } catch (error) {
        console.error("Error generating Sanity image URL:", error);
        return "";
    }
}

/**
 * Get blur data URL from Sanity LQIP metadata
 */
export function getSanityBlurUrl(image: SanityImageSource): string | null {
    if (
        typeof image === "object" &&
        image !== null &&
        "asset" in image &&
        typeof image.asset === "object" &&
        image.asset !== null &&
        "metadata" in image.asset &&
        typeof image.asset.metadata === "object" &&
        image.asset.metadata !== null &&
        "lqip" in image.asset.metadata &&
        typeof image.asset.metadata.lqip === "string"
    ) {
        return image.asset.metadata.lqip;
    }

    return null;
}
