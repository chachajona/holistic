import { headers } from "next/headers";

import type { HomePageData } from "@/types/sanity";
import {
    getAllTreatments,
    getHomePage,
    getServiceSummaries,
    getSiteSettings,
} from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { getSanityImageUrl } from "@/lib/sanity-image";
import HomeClient from "@/components/features/home/HomeClient";

export const revalidate = 3600;

export default async function Home() {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const [treatmentData, siteSettings, services] = await Promise.all([
        getAllTreatments(validLocale),
        getSiteSettings(),
        getServiceSummaries(validLocale),
    ]);

    const mappedTreatments = (treatmentData || []).map((treatment, index) => ({
        id: String(index + 1),
        title: treatment.title ?? "Untitled Treatment",
        description: treatment.shortDescription || "No description available",
        image: treatment.image
            ? getSanityImageUrl(treatment.image, { width: 600, quality: 85 }) ||
              "/placeholder-image.jpg"
            : "/placeholder-image.jpg",
        icon: treatment.icon ?? undefined,
        slug: treatment.slug?.current ?? "",
        category: treatment.icon ?? "General",
    }));

    const validTreatments = mappedTreatments;

    try {
        const pageData: HomePageData | null = await getHomePage(validLocale);

        const heroData = pageData?.Hero;
        const quickLinksData = pageData?.QuickLinks || null;
        const ctaData = pageData?.CTA || null;

        return (
            <HomeClient
                treatments={validTreatments}
                heroData={heroData}
                quickLinksData={quickLinksData}
                ctaData={ctaData}
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
                services={services}
            />
        );
    } catch (error) {
        console.error("Error in Home page:", error);
        return (
            <HomeClient
                treatments={validTreatments}
                heroData={null}
                quickLinksData={null}
                ctaData={null}
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
                services={services}
            />
        );
    }
}
