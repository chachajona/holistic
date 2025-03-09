"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SanityImageProps {
    image: SanityImageSource;
    imageUrl: string;
    alt: string;
    blurDataURL?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    aspectRatio?: number;
}

/**
 * Client component for displaying Sanity images with blur placeholders
 * using Next.js Image component
 */
export function SanityImage({
    imageUrl,
    alt,
    blurDataURL,
    width,
    height,
    fill = false,
    sizes = "100vw",
    priority = false,
    className = "",
    aspectRatio,
}: SanityImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Use AspectRatio component if aspectRatio is provided
    if (aspectRatio) {
        return (
            <AspectRatio
                ratio={aspectRatio}
                className={`overflow-hidden ${className}`}
            >
                <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    placeholder={blurDataURL ? "blur" : "empty"}
                    blurDataURL={blurDataURL}
                    className={`${isLoading ? "blur-2xs scale-105" : "scale-100 blur-0"} transition-all duration-500`}
                    onLoad={() => setIsLoading(false)}
                />
            </AspectRatio>
        );
    }

    // Regular image (with or without fill)
    return (
        <div
            className={`overflow-hidden ${fill ? "relative size-full" : ""} ${className}`}
        >
            <Image
                src={imageUrl}
                alt={alt}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                fill={fill}
                sizes={sizes}
                priority={priority}
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
                className={`${isLoading ? "blur-2xs scale-105" : "scale-100 blur-0"} transition-all duration-500`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
