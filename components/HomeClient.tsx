"use client";

import { FormData } from "@/types/form";

import Banner from "./Banner";
import Footer from "./Footer";
import HeroContainer from "./Hero/HeroContainer";
import MessengerChat from "./MessengerChat";
import Navbar from "./Navbar";
import QuickLinks from "./QuickLinks";
import Testimonial from "./Testimonimal";

interface HomeClientProps {
    heroBlurDataURL: string;
    formData: FormData;
}

export default function HomeClient({
    heroBlurDataURL,
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
            <Footer />
            <MessengerChat />
        </main>
    );
}
