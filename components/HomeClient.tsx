"use client";

import { FormData } from "@/types/form";
import { WellnessCTA } from "@/components/CTA";

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
    return (
        <main className="bg-primary-background flex min-h-screen flex-col">
            <Banner />
            <Navbar />
            <HeroContainer
                formData={formData}
                heroBlurDataURL={heroBlurDataURL}
            />
            <QuickLinks />
            <Testimonial />
            <WellnessCTA blurDataURL={ctaBlurDataURL} />
            <Footer />
            <MessengerChat />
        </main>
    );
}
