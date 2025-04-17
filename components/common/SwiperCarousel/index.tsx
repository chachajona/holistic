"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselItemData = {
    title: string;
    description: string;
    image: string;
    id?: string;
    href?: string;
    icon?: string;
    slug?: string;
    category?: string;
};

interface SwiperCarouselProps {
    items: CarouselItemData[];
    setApi?: (api: CarouselApi) => void;
    arrows?: boolean;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
    items,
    setApi,
    arrows = true,
}) => {
    const [api, setApiInternal] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);
    const autoplayPlugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true }),
    );
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Handle carousel slide changes
    useEffect(() => {
        if (!api) {
            return;
        }

        if (setApi) {
            setApi(api);
        }

        const handleSelect = () => {
            const currentIndex = api.selectedScrollSnap();
            setActiveIndex(currentIndex);
        };

        // Initial setup - set active index when carousel is first loaded
        const initialIndex = api.selectedScrollSnap();
        setActiveIndex(initialIndex);

        // Listen for slide changes
        api.on("select", handleSelect);

        // Also listen for scroll to ensure more responsive updates
        api.on("scroll", () => {
            handleSelect();
        });

        return () => {
            api.off("select", handleSelect);
            api.off("scroll", () => {});
        };
    }, [api, setApi]);

    useEffect(() => {
        if (api) {
            autoplayPlugin.current.play();
        }
    }, [api]);

    return (
        <div className="relative w-full py-8">
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                    dragFree: false,
                    containScroll: "trimSnaps",
                }}
                className="w-full"
                setApi={setApiInternal}
                plugins={[autoplayPlugin.current]}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {items.map((item, index) => (
                        <CarouselItem
                            key={item.id || item.title}
                            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-2/5"
                        >
                            <div
                                ref={el => {
                                    cardsRef.current[index] = el;
                                }}
                                className={`group block transition-all duration-700 ${
                                    activeIndex === index
                                        ? "z-20 scale-100 opacity-100"
                                        : "z-10 scale-95 opacity-80"
                                }`}
                                onClick={() => {
                                    if (api) api.scrollTo(index);
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${item.title} details`}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        if (api) api.scrollTo(index);
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="card-shadow relative aspect-[4/3] h-[300px] w-full overflow-hidden rounded-3xl transition-all duration-700 ease-in-out hover:shadow-[0_20px_60px_-15px_rgba(255,210,130,0.3)] md:h-[400px] lg:h-[450px]">
                                    {/* Decorative blur effect */}
                                    <div
                                        className="absolute -inset-1 z-0 rounded-3xl bg-gradient-to-br from-amber-100/20 via-amber-300/10 to-amber-600/10 opacity-0 blur transition-all duration-700 group-hover:opacity-100"
                                        aria-hidden="true"
                                    ></div>

                                    {/* Therapy light glow effect */}
                                    <motion.div
                                        className="absolute -bottom-10 left-1/2 h-20 w-4/5 -translate-x-1/2 rounded-full bg-amber-200/20 blur-2xl"
                                        whileHover={{
                                            backgroundColor:
                                                "rgba(253, 230, 138, 0.4)",
                                            filter: "blur(24px)",
                                        }}
                                        transition={{ duration: 0.7 }}
                                    ></motion.div>

                                    <div className="bg-brown-50/50 group-hover:bg-brown-50/70 card-content relative size-full overflow-hidden rounded-3xl p-2 backdrop-blur-sm transition-all duration-700 ease-in-out">
                                        <div className="parallax-bg relative size-full overflow-hidden rounded-2xl shadow-inner">
                                            {/* Display the treatment icon if available - Moved to top-left */}
                                            {item.icon && (
                                                <div className="absolute left-4 top-4 z-20 flex">
                                                    <div className="text-white transition-transform duration-300 ease-in-out group-hover:scale-110">
                                                        {isCustomIcon(
                                                            item.icon,
                                                        ) ? (
                                                            React.createElement(
                                                                customIcons[
                                                                    item.icon
                                                                ],
                                                                {
                                                                    className:
                                                                        "size-10 drop-shadow-md",
                                                                },
                                                            )
                                                        ) : (
                                                            <span className="text-xl">
                                                                {item.icon}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
                                                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                                                style={{
                                                    transform: `scale(${activeIndex === index ? 1.05 : 1})`,
                                                    transitionProperty:
                                                        "transform",
                                                    transitionDuration: "0.7s",
                                                    transitionTimingFunction:
                                                        "ease-in-out",
                                                }}
                                                priority={index < 3}
                                            />
                                            {/* Gradient overlay for text contrast */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                                                aria-hidden="true"
                                            ></div>

                                            <div className="absolute bottom-0 left-0 w-full p-6">
                                                {/* Add a wrapper div with transform animation for both title and description */}
                                                <div
                                                    className={`transition-transform duration-500 ease-out${
                                                        activeIndex === index
                                                            ? "-translate-y-3"
                                                            : "translate-y-0"
                                                    }`}
                                                >
                                                    {/* Clickable treatment title with underline animation and hover arrow */}
                                                    <Link
                                                        href={
                                                            item.slug
                                                                ? `/treatments/${item.slug}`
                                                                : item.href ||
                                                                  "#"
                                                        }
                                                        className="group relative inline-flex items-center"
                                                    >
                                                        <h3 className="font-robotoSerif mr-1.5 text-2xl font-medium text-white">
                                                            {item.title}
                                                            <span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
                                                        </h3>
                                                        <ArrowUpRight
                                                            className="size-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>

                                                    <div
                                                        className={`font-robotoSlab mt-2 overflow-hidden text-base text-white/60 transition-all duration-500 ease-out ${
                                                            activeIndex ===
                                                            index
                                                                ? "max-h-24 translate-y-0 opacity-100 delay-200"
                                                                : "max-h-0 translate-y-5 opacity-0"
                                                        }`}
                                                    >
                                                        {item.description
                                                            .length > 100
                                                            ? `${item.description.substring(0, 97)}...`
                                                            : item.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons - Moved to top-left */}
                {arrows && (
                    <div className="absolute -top-8 right-16 z-30 flex space-x-2">
                        <CarouselPrevious
                            className="font-roboto text-brown-600 hover:text-brown-800 size-10 rounded-full border-none bg-transparent hover:bg-transparent md:size-12"
                            aria-label="Previous slide"
                        />
                        <CarouselNext
                            className="font-roboto text-brown-600 hover:text-brown-800 size-10 rounded-full border-none bg-transparent hover:bg-transparent"
                            aria-label="Next slide"
                        />
                    </div>
                )}
            </Carousel>

            {/* Pagination Dots */}
            <div
                className="font-roboto mt-4 flex justify-center gap-1"
                role="tablist"
                aria-label="Carousel Pagination"
            >
                {items.map((_, index) => (
                    <button
                        key={index}
                        role="tab"
                        aria-selected={activeIndex === index}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`bg-primary-text/30 hover:bg-primary-text/50 focus:ring-primary-text/50 h-1.5 w-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            activeIndex === index ? "bg-brown-700 w-6" : ""
                        }`}
                        onClick={() => {
                            if (api) api.scrollTo(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SwiperCarousel;
