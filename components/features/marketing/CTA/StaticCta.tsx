import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface StaticCtaProps {
    heading: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText?: string;
    primaryButtonUrl: string;
    secondaryButtonUrl?: string;
    backgroundImage?: string;
    therapyImage?: string;
    blurDataURL?: string;
    theme?: "light" | "dark" | "blue";
    onImageLoaded?: () => void;
}

export function StaticCta({
    heading,
    description,
    primaryButtonText,
    primaryButtonUrl,
    backgroundImage,
    therapyImage,
    blurDataURL,
    theme = "light",
    onImageLoaded,
}: StaticCtaProps) {
    const themeStyles = {
        light: "bg-amber-50 text-amber-900",
        dark: "bg-amber-900 text-amber-50",
        blue: "bg-blue-900 text-white",
    };

    const useImageBackground = !!backgroundImage;
    const sectionClasses = cn(
        "relative overflow-hidden",
        useImageBackground ? "text-white" : themeStyles[theme],
    );

    const handleImageLoad = () => {
        onImageLoaded?.();
    };

    const therapyImagePath = therapyImage || "/Therapy.jpg";

    return (
        <section className={sectionClasses}>
            {/* Background image for all screen sizes */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 z-10 bg-black/30" />
                    <OptimizedImage
                        image={backgroundImage}
                        alt=""
                        fill
                        priority={true}
                        sizes="100vw"
                        className="object-cover"
                        blurDataURL={blurDataURL}
                    />
                </div>
            )}

            <div className="container relative z-20 mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-12">
                    {/* Left Column - Text */}
                    <div className="text-center md:col-span-6 md:text-left">
                        <h2
                            className="font-robotoSerif mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
                            role="heading"
                        >
                            {heading}
                        </h2>
                        <p className="font-robotoSlab mb-6 text-base opacity-90 sm:text-lg">
                            {description}
                        </p>

                        {/* Static button instead of magnetic spin button */}
                        <Link
                            href={primaryButtonUrl}
                            className="bg-brown-900 hover:bg-brown-950 focus:ring-brown-700 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 md:text-lg"
                        >
                            {primaryButtonText}
                            <ArrowRight
                                className="ml-2 size-5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                    {/* Right Column - Image */}
                    <div className="md:col-span-6">
                        <div className="relative h-64 w-full md:h-80 lg:h-96">
                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 h-full w-[90%] rounded-bl-[40px] rounded-tr-[40px] bg-[#7A3300]/20 md:-bottom-6 md:-right-6"></div>

                            {/* Main image */}
                            <div className="relative h-full w-[90%] overflow-hidden">
                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#7A3300]/40 to-transparent opacity-70"></div>

                                <OptimizedImage
                                    image={therapyImagePath}
                                    alt="Physical therapy session"
                                    fill
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="rounded-bl-[40px] rounded-tr-[40px] object-cover object-center transition-transform duration-700"
                                    onLoad={handleImageLoad}
                                />

                                {/* Decorative corner accent */}
                                <div className="absolute -right-1 -top-1 size-12 rounded-bl-lg border-b-2 border-l-2 border-white/70"></div>
                                <div className="absolute -bottom-1 -left-1 size-12 rounded-tr-lg border-r-2 border-t-2 border-white/70"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
