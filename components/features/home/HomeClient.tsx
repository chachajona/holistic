"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import { ChevronRight } from "lucide-react";

import {
    ContactInfo,
    CTAData,
    HeroData,
    QuickLinkData,
    SocialMedia,
} from "@/types/sanity";
import { Button } from "@/components/ui/button";
import { CarouselApi } from "@/components/ui/carousel";
import Banner from "@/components/common/Banner";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import SwiperCarousel from "@/components/common/SwiperCarousel";
import { StaticCTA } from "@/components/features/marketing/CTA";
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
    treatments?: TreatmentItem[];
    heroData?: HeroData | null;
    quickLinksData?: QuickLinkData[] | null;
    ctaData?: CTAData | null;
    contactInfo?: ContactInfo | null;
    socialMedia?: SocialMedia | null;
}

export default function HomeClient({
    treatments = [],
    heroData = null,
    quickLinksData = null,
    ctaData = null,
    contactInfo = null,
    socialMedia = null,
}: HomeClientProps) {
    const { t } = useLocale();
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
                <Banner contactInfo={contactInfo} socialMedia={socialMedia} />
                <Navbar />
                <HeroContainer
                    onImageLoaded={handleHeroLoaded}
                    heroData={heroData}
                />
                <QuickLinks quickLinksData={quickLinksData} />
                <Testimonial onDataLoaded={handleTestimonialLoaded} />

                {/* Treatments Section */}
                {treatments.length > 0 && (
                    <section className="bg-primary-background container relative mx-auto min-h-[600px] py-8 md:px-16">
                        <div className="relative flex h-full flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between">
                            <div className="relative flex h-full lg:w-1/3">
                                <div className="flex size-full flex-col justify-between">
                                    <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block max-w-fit rounded-lg px-3 py-1 text-base font-light">
                                        {t("home.treatmentsSection.badge")}
                                    </span>
                                    <h2 className="text-primary-text font-robotoSerif mb-4 text-4xl font-bold">
                                        {t("home.treatmentsSection.title")}
                                    </h2>
                                    <p className="font-robotoSlab mb-6 text-gray-600">
                                        {t(
                                            "home.treatmentsSection.description",
                                        )}
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
                                            {t("common.viewAll")}
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

                <StaticCTA onImageLoaded={handleCtaLoaded} ctaData={ctaData} />
                <Footer contactInfo={contactInfo} socialMedia={socialMedia} />
            </main>
        </PageLoaderWrapper>
    );
}
