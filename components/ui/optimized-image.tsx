"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface OptimizedImageProps {
    // Support both string URLs and imported image modules
    image: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    blurDataURL?: string; // Optional, not required
}

export function OptimizedImage({
    image,
    alt,
    width,
    height,
    fill = false,
    sizes = "100vw",
    priority = false,
    className = "",
    blurDataURL,
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Check if image is a static import (has blur built-in)
    const isStaticImport = typeof image === "object";

    // Create a simple loading blur effect without relying on server-generated blur
    const defaultBlur =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI0NSIgdmlld0JveD0iMCAwIDgwIDQ1Ij48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iNDUiIGZpbGw9IiNFMkU4RjAiLz48L3N2Zz4=";

    return (
        <div className={`overflow-hidden ${fill ? "relative size-full" : ""}`}>
            <Image
                src={image}
                alt={alt}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                fill={fill}
                sizes={sizes}
                priority={priority}
                placeholder={isStaticImport || blurDataURL ? "blur" : "empty"}
                blurDataURL={
                    isStaticImport ? undefined : blurDataURL || defaultBlur
                }
                className={`${isLoading ? "blur-2xs scale-105" : "scale-100 blur-0"} transition-all duration-500 ${className}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
