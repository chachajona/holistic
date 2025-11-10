"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import { ChevronRight } from "lucide-react";

import { getTranslations, translate } from "@/lib/i18n/utils";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import SwiperCarousel from "@/components/common/SwiperCarousel";

interface TreatmentCarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon?: string;
    slug?: string;
    category?: string;
}

interface TreatmentsClientProps {
    treatments: TreatmentCarouselItem[];
}

export default function TreatmentsClient({
    treatments,
}: TreatmentsClientProps) {
    const { locale } = useLocale();
    const translations = getTranslations(locale);

    // Add validation
    if (!translations) {
        console.error("No translations loaded for locale:", locale);
        return <div>Loading translations...</div>;
    }

    const badge = translate(translations, "treatmentsPage.badge", "Discover");
    const title = translate(
        translations,
        "treatmentsPage.title",
        "Treatment Methods",
    );
    const description = translate(
        translations,
        "treatmentsPage.description",
        "Our physical therapy treatment methods include a range of solutions to meet your individual needs.",
    );
    const bookAppointment = translate(
        translations,
        "treatmentsPage.bookAppointment",
        "Book Appointment",
    );

    return (
        <PageLoaderWrapper isContentLoaded={true}>
            <div className="bg-primary-background relative w-full px-4 py-16 sm:px-8 lg:px-16">
                <div className="mb-8 flex flex-col lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
                    <div className="w-full max-w-full lg:w-1/2 lg:max-w-2xl">
                        <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                            {badge}
                        </span>
                        <h2 className="text-primary-text font-robotoSerif mb-6 text-5xl font-bold">
                            {title}
                        </h2>
                    </div>

                    <div className="mt-6 flex size-full flex-col items-start justify-start gap-2 md:flex-row md:items-center lg:mt-0 lg:w-1/2 lg:justify-between">
                        <p className="text-primary-text/70 font-robotoSlab mr-4 max-w-md text-justify text-base md:text-lg">
                            {description}
                        </p>
                        <Link href="/booking">
                            <Button
                                variant={"link"}
                                className="text-primary-text group flex w-full flex-row items-center px-0 py-3 text-base sm:w-auto md:px-8"
                            >
                                {bookAppointment}
                                <ChevronRight className="animate-shake ml-2 size-4 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {treatments.length > 0 && (
                    <div className="relative py-8">
                        <SwiperCarousel items={treatments} />
                    </div>
                )}
            </div>
        </PageLoaderWrapper>
    );
}
