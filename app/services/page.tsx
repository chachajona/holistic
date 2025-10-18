import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import type { ServiceDetailed, ServicesPageData } from "@/types/sanity";
import type { Service } from "@/types/services";
import {
    getAllServicesDetailed,
    getServicesPage,
    getSiteSettings,
} from "@/lib/api";
import {
    getBlurDataUrl,
    getSanityImageData,
} from "@/lib/server/image-processing";
import { ServicesClient } from "@/components/features/services/ServicesClient";

export const revalidate = 3600;

export default async function ServicesPage(): Promise<JSX.Element> {
    try {
        const [pageData, servicesData, siteSettings]: [
            ServicesPageData | null,
            ServiceDetailed[],
            any,
        ] = await Promise.all([
            getServicesPage(),
            getAllServicesDetailed(),
            getSiteSettings(),
        ]);

        // Get blur data URLs for service images and map to proper Service type
        const servicesWithBlur = await Promise.all(
            servicesData.map(async (service): Promise<Service> => {
                const fallbackImageUrl = "/placeholder-service.jpg";

                const sanityImageSource =
                    (service.image as SanityImageSource) ?? null;

                const processedImageData = sanityImageSource
                    ? await getSanityImageData(sanityImageSource)
                    : {
                          imageUrl: fallbackImageUrl,
                          blurDataURL: await getBlurDataUrl(
                              fallbackImageUrl,
                              false,
                          ).catch(() => undefined),
                          aspectRatio: 16 / 9,
                      };

                const resolvedImageUrl =
                    processedImageData.imageUrl &&
                    processedImageData.imageUrl.trim().length > 0
                        ? processedImageData.imageUrl
                        : fallbackImageUrl;

                return {
                    id: service.id || "unknown",
                    title: service.title || "Untitled Service",
                    description: service.description
                        ? typeof service.description === "string"
                            ? service.description
                            : "Service description available"
                        : "Service description not available",
                    icon:
                        typeof service.icon === "string"
                            ? service.icon
                            : service.icon?.title || "default-icon",
                    image: resolvedImageUrl,
                    imageSource: sanityImageSource,
                    isPrimary: service.isPrimary || false,
                    problemCategories: service.problemCategories || [],
                    details: {
                        outcome: service.details?.outcome || "",
                        protocol: service.details?.protocol || "",
                        evidence: service.details?.evidence || "",
                        treatments: (service.details?.treatments || []).map(
                            treatment => ({
                                id: treatment.id || "unknown-treatment",
                                name: treatment.name || "Untitled Treatment",
                                description:
                                    treatment.description ||
                                    "Treatment description not available",
                                icon:
                                    typeof treatment.icon === "string"
                                        ? treatment.icon
                                        : treatment.icon?.title ||
                                          "default-icon",
                                href: treatment.href || "#",
                            }),
                        ),
                    },
                    processedImage: {
                        imageUrl: resolvedImageUrl,
                        blurDataURL: processedImageData.blurDataURL,
                        aspectRatio: processedImageData.aspectRatio ?? 16 / 9,
                    },
                };
            }),
        );

        return (
            <ServicesClient
                pageData={pageData}
                services={servicesWithBlur}
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
        );
    } catch (error) {
        console.error("Error in Services page:", error);
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold">
                        Unable to load services
                    </h1>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }
}
