"use client";

import { useState } from "react";

import { FormData } from "@/types/form";
import { StaticCTA } from "@/components/features/marketing/CTA";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
// Use named import for the client container
import { HeroContainer } from "@/components/features/marketing/Hero";
import MessengerChat from "@/components/common/MessengerChat";
import Navbar from "@/components/layout/Navbar";
import QuickLinks from "@/components/layout/QuickLinks";
import Testimonial from "@/components/features/testimonial/Testimonial";

interface HomeClientProps {
    heroBlurDataURL?: string;
    ctaBlurDataURL: string;
    formData: FormData;
}

export default function HomeClient({
    heroBlurDataURL,
    ctaBlurDataURL,
    formData,
}: HomeClientProps) {
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [ctaLoaded, setCtaLoaded] = useState(false);
    const [testimonialLoaded, setTestimonialLoaded] = useState(false);

    const handleHeroLoaded = () => setHeroLoaded(true);
    const handleTestimonialLoaded = () => setTestimonialLoaded(true);
    const handleCtaLoaded = () => setCtaLoaded(true);

    const isContentLoaded = heroLoaded && ctaLoaded && testimonialLoaded;

    return (
        <PageLoaderWrapper
            isContentLoaded={isContentLoaded}
        >
            <main className="bg-primary-background flex min-h-screen flex-col">
                <Banner />
                <Navbar />
                <HeroContainer // Now correctly refers to the client container
                    formData={formData}
                    heroBlurDataURL={heroBlurDataURL}
                    onImageLoaded={handleHeroLoaded}
                />
                <QuickLinks />
                <Testimonial onDataLoaded={handleTestimonialLoaded} />
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
