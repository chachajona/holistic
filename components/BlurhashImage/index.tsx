"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function BlurhashImage({
    imageUrl,
    blurHash,
    blurHashHeight,
    blurHashWidth,
}: {
    imageUrl?: string | null;
    blurHash?: string | null;
    blurHashWidth?: number | null;
    blurHashHeight?: number | null;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setDimensions] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;

                setDimensions(containerWidth);
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    if (!imageUrl || !blurHash || !blurHashHeight || !blurHashWidth) {
        return null;
    }

    return (
        <AspectRatio ratio={16 / 9} className="w-full" ref={containerRef}>
            {isLoading ? (
                <Blurhash
                    hash={blurHash}
                    height={blurHashHeight}
                    width={width}
                />
            ) : null}
            <Image
                src={imageUrl}
                alt="Loaded Image"
                style={{ display: isLoading ? "none" : "block" }}
                className="h-auto w-full rounded-t-xl"
                onLoad={() => setIsLoading(false)}
            />
        </AspectRatio>
    );
}
