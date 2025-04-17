"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { FormData } from "@/types/form";
import { Button } from "@/components/ui/button";
import { CarouselApi } from "@/components/ui/carousel";
import Banner from "@/components/common/Banner";
import MessengerChat from "@/components/common/MessengerChat";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import SwiperCarousel from "@/components/common/SwiperCarousel";
import { StaticCTA } from "@/components/features/marketing/CTA";
// Use named import for the client container
import { HeroContainer } from "@/components/features/marketing/Hero";
import Testimonial from "@/components/features/testimonial/Testimonial";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import QuickLinks from "@/components/layout/QuickLinks";

interface TreatmentItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon?: string;
    slug?: string;
    category?: string;
}

interface HomeClientProps {
    heroBlurDataURL?: string;
    ctaBlurDataURL: string;
    formData: FormData;
    treatments?: TreatmentItem[];
}

export default function HomeClient({
    heroBlurDataURL,
    ctaBlurDataURL,
    formData,
    treatments = [],
}: HomeClientProps) {
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [ctaLoaded, setCtaLoaded] = useState(false);
    const [testimonialLoaded, setTestimonialLoaded] = useState(false);
    const [treatmentsLoaded, setTreatmentsLoaded] = useState(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    const handleHeroLoaded = () => setHeroLoaded(true);
    const handleTestimonialLoaded = () => setTestimonialLoaded(true);
    const handleCtaLoaded = () => setCtaLoaded(true);

    useEffect(() => {
        setTreatmentsLoaded(true);
    }, []);

    const isContentLoaded =
        heroLoaded && ctaLoaded && testimonialLoaded && treatmentsLoaded;

    // Handlers for carousel navigation
    const handlePrevSlide = () => {
        if (carouselApi) {
            carouselApi.scrollPrev();
        }
    };

    const handleNextSlide = () => {
        if (carouselApi) {
            carouselApi.scrollNext();
        }
    };

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <main className="bg-primary-background flex min-h-screen flex-col">
                <Banner />
                <Navbar />
                <HeroContainer
                    formData={formData}
                    heroBlurDataURL={heroBlurDataURL}
                    onImageLoaded={handleHeroLoaded}
                />
                <QuickLinks />
                <Testimonial onDataLoaded={handleTestimonialLoaded} />

                {/* Treatments Section */}
                {treatments.length > 0 && (
                    <section className="bg-primary-background container relative mx-auto min-h-[600px] py-8 md:px-16">
                        <div className="relative flex h-full flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between">
                            <div className="relative flex h-full lg:w-1/3">
                                <div className="flex size-full flex-col justify-between">
                                    <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block max-w-fit rounded-lg px-3 py-1 text-base font-light">
                                        Khám phá
                                    </span>
                                    <h2 className="text-primary-text font-robotoSerif mb-4 text-4xl font-bold">
                                        Phương pháp trị liệu
                                    </h2>
                                    <p className="font-robotoSlab mb-6 text-gray-600">
                                        Các phương pháp điều trị vật lý trị trị
                                        liệu của chúng tôi bao gồm một lọa các
                                        giải pháp để đáp ứng nhu cầu riêng của
                                        bạn.
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handlePrevSlide}
                                            aria-label="Previous slide"
                                            className="text-primary-text hover:text-brown-900 transition-colors duration-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m12 19-7-7 7-7" />
                                                <path d="M19 12H5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNextSlide}
                                            aria-label="Next slide"
                                            className="text-primary-text hover:text-brown-900 transition-colors duration-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute -bottom-16 right-0 lg:-bottom-52 lg:left-0">
                                    <Button
                                        variant={"link"}
                                        className="text-primary-text group flex w-full flex-row items-center px-0 py-3 text-base sm:w-auto"
                                    >
                                        <Link href="/treatments">
                                            Xem tất cả
                                        </Link>
                                        <ChevronRight className="animate-transform ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/3">
                                <SwiperCarousel
                                    items={treatments}
                                    setApi={setCarouselApi}
                                    arrows={false}
                                />
                            </div>
                        </div>
                    </section>
                )}

                <StaticCTA
                    blurDataURL={ctaBlurDataURL}
                    onImageLoaded={handleCtaLoaded}
                />
                <Footer />
                <MessengerChat />
            </main>
        </PageLoaderWrapper>
    );
}
