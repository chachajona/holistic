"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { ImageCrop, ImageHotspot } from "@sanity/types";
import { Star } from "lucide-react";

import { getSanityImageUrl } from "@/lib/sanity-image";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Define props interface for Testimonial component
interface TestimonialComponentProps {
    onDataLoaded?: () => void; // Add the callback prop
}

interface TestimonialData {
    _id: string;
    icon: {
        asset: {
            _id: string;
            _ref: string;
            url: string;
            metadata?: {
                lqip?: string;
                dimensions?: {
                    width: number;
                    height: number;
                    aspectRatio: number;
                };
            };
        };
        hotspot?: ImageHotspot;
        crop?: ImageCrop;
    };
    rating: number;
    quote: string;
    author: string;
}

const TestimonialCard: React.FC<TestimonialData> = ({
    icon,
    rating,
    quote,
    author,
}) => {
    const optimizedIconUrl = icon
        ? getSanityImageUrl(icon, {
              width: 56,
              height: 56,
              quality: 85,
              format: "webp",
          }) || icon.asset?.url
        : "/default-avatar.png";

    return (
        <div className="bg-primary-background flex flex-col items-start space-y-4 rounded-lg p-6 shadow-sm">
            <OptimizedImage
                image={optimizedIconUrl}
                alt={author || "Testimonial icon"}
                width={56}
                height={56}
                className="rounded-lg object-cover"
            />
            <div className="mb-4 flex">
                {[...Array(rating)].map((_, i) => (
                    <Star
                        key={i}
                        className="text-brown-500 size-5 fill-current"
                    />
                ))}
            </div>
            <blockquote className="font-robotoSerif min-h-0 text-lg font-bold leading-snug lg:min-h-[230px]">
                &quot;{quote}&quot;
            </blockquote>
            <div className="grid gap-1 text-sm">
                <div className="font-robotoSlab">{author}</div>
            </div>
        </div>
    );
};

export default function Testimonial({
    onDataLoaded,
}: TestimonialComponentProps): JSX.Element {
    const { t, locale } = useLocale();
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/testimonials", {
                    headers: {
                        "x-locale": locale,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }

                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error("Testimonial: Error caught during fetch:", error);
            } finally {
                setIsLoading(false);
                onDataLoaded?.();
            }
        };

        if (mounted) {
            fetchTestimonials();
        }
    }, [mounted, onDataLoaded, locale]);

    if (!mounted) {
        return (
            <section className="bg-brown-50 text-primary-text w-full py-12 md:px-16 md:py-24 lg:py-32">
                <div className="flex min-h-[300px] items-center justify-center">
                    <div className="border-brown-200 border-t-brown-500 size-16 animate-spin rounded-full border-4"></div>
                </div>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className="bg-brown-50 text-primary-text w-full py-12 md:px-16 md:py-24 lg:py-32">
                <div className="flex min-h-[300px] items-center justify-center">
                    <div className="border-brown-200 border-t-brown-500 size-16 animate-spin rounded-full border-4"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-brown-50 text-primary-text w-full py-12 md:px-16 md:py-24 lg:py-32">
            <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="font-robotoSerif text-3xl font-bold capitalize tracking-tighter sm:text-5xl">
                        {t("testimonials.title")}
                    </h2>
                    <p className="font-robotoSlab text-primary-text max-w-[900px] text-left md:text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t("testimonials.subtitle")}
                    </p>
                </div>
            </div>
            <div className="container grid grid-cols-1 gap-6 px-4 md:gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial: TestimonialData) => (
                    <TestimonialCard key={testimonial._id} {...testimonial} />
                ))}
            </div>
        </section>
    );
}
