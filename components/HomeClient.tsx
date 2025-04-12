"use client";

import { useState } from "react";

import { FormData } from "@/types/form";
import { StaticCTA } from "@/components/CTA";
import PageLoaderWrapper from "@/components/PageLoaderWrapper";

import Banner from "./Banner";
import Footer from "./Footer";
import HeroContainer from "./Hero/HeroContainer";
import MessengerChat from "./MessengerChat";
import Navbar from "./Navbar";
import QuickLinks from "./QuickLinks";
import Testimonial from "./Testimonimal";

interface HomeClientProps {
    heroBlurDataURL: string;
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
                <HeroContainer
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
