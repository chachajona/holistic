import React from "react";
import { headers } from "next/headers";

import type { TreatmentSummary } from "@/types/sanity";
import { getAllTreatments } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { getSanityImageUrl } from "@/lib/sanity-image";
import TreatmentsClient from "@/components/features/treatments/TreatmentsClient";

interface TreatmentCarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon?: string;
    slug?: string;
    category?: string;
}

export const revalidate = 3600;

export default async function TreatmentsPage() {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const treatmentData: TreatmentSummary[] | null =
        await getAllTreatments(validLocale);
    const validTreatmentData = treatmentData || [];

    console.log(
        "Treatment data:",
        treatmentData?.length,
        "items for locale:",
        validLocale,
    );

    const mappedTreatments: TreatmentCarouselItem[] = validTreatmentData
        .filter(treatment => treatment.slug?.current != null)
        .map((treatment, index) => ({
            id: treatment._id ?? String(index + 1),
            title: treatment.title ?? "Untitled Treatment",
            description:
                treatment.shortDescription || "No description available",
            image: treatment.image
                ? getSanityImageUrl(treatment.image, {
                      width: 600,
                      quality: 85,
                  }) || "/placeholder-image.jpg"
                : "/placeholder-image.jpg",
            icon: treatment.icon ?? undefined,
            slug: treatment.slug!.current,
            category: treatment.icon ?? "General",
        }));

    return <TreatmentsClient treatments={mappedTreatments} />;
}
