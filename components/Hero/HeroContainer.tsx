"use client";

import { Suspense } from "react";

import { FormData } from "@/types/form";

import HeroClient from "./hero-client";

interface HeroContainerProps {
    formData: FormData;
    heroBlurDataURL?: string; // Optional now
    onImageLoaded?: () => void; // Add callback prop
}

// Loading component
function HeroSkeleton() {
    return (
        <section className="relative max-h-screen min-h-[calc(100dvh-92px)] w-full animate-pulse overflow-y-auto bg-gray-200 py-16 md:min-h-[calc(100dvh-250px)] md:py-[85px]">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="container relative z-10"></div>
        </section>
    );
}

// Client-side container component with simplified props
export default function HeroContainer({
    formData,
    onImageLoaded,
}: HeroContainerProps) {
    return (
        <Suspense fallback={<HeroSkeleton />}>
            <HeroClient formData={formData} onImageLoaded={onImageLoaded} />
        </Suspense>
    );
}
