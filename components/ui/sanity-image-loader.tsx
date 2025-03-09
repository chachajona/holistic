import { Suspense } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { getSanityImageData } from "@/lib/server/image-processing";

import { SanityImage } from "./sanity-image";

interface SanityImageLoaderProps {
    image: SanityImageSource;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    aspectRatio?: number;
}

// Simple loading skeleton
const ImageSkeleton = ({
    className = "",
    aspectRatio,
}: {
    className?: string;
    aspectRatio?: number;
}) => {
    const style = aspectRatio
        ? {
              aspectRatio: `${aspectRatio}`,
              position: "relative" as const,
          }
        : {};

    return (
        <div
            className={`animate-pulse bg-gray-200 ${className}`}
            style={style}
        />
    );
};

// Server component that processes the image
async function SanityImageWithData({
    image,
    alt,
    width,
    height,
    fill = false,
    sizes = "",
    priority = false,
    className = "",
    aspectRatio,
}: SanityImageLoaderProps) {
    // Get image data with blur placeholder
    const { imageUrl, blurDataURL } = await getSanityImageData(image);

    // Pass processed data to client component
    return (
        <SanityImage
            image={image}
            imageUrl={imageUrl}
            alt={alt}
            blurDataURL={blurDataURL}
            width={width}
            height={height}
            fill={fill}
            sizes={sizes}
            priority={priority}
            className={className}
            aspectRatio={aspectRatio}
        />
    );
}

// Main export with Suspense boundary
export function SanityImageLoader(props: SanityImageLoaderProps) {
    return (
        <Suspense
            fallback={
                <ImageSkeleton
                    className={props.className}
                    aspectRatio={props.aspectRatio}
                />
            }
        >
            <SanityImageWithData {...props} />
        </Suspense>
    );
}
