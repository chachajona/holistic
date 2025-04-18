import { notFound } from "next/navigation";

import type { ServiceDetailed } from "@/types/sanity";
// Remove old Service type import if no longer needed elsewhere
import { Service } from "@/types/services";
// Remove direct client/groq import
// import { client } from "@/sanity/lib/client";
// import { groq } from "next-sanity";

// Import the new function and type
import { getAllServicesDetailed } from "@/lib/api";
import { getCachedSanityImageData } from "@/lib/server/image-processing";
import { ServicesClient } from "@/components/features/services/ServicesClient";

// export const dynamic = "force-dynamic"; // Keep if needed, otherwise remove
export const revalidate = 3600; // Already set

export const metadata = {
    title: "Phương Pháp Điều Trị Chuyên Biệt - Holistic Rehab",
    description:
        "Khám phá các dịch vụ điều trị chuyên biệt để cải thiện sức khỏe và nâng cao chất lượng cuộc sống.",
    openGraph: {
        title: "Phương Pháp Điều Trị Chuyên Biệt - Holistic Rehab",
        description:
            "Khám phá các dịch vụ điều trị chuyên biệt để cải thiện sức khỏe và nâng cao chất lượng cuộc sống.",
        type: "website",
        locale: "vi_VN",
    },
};

// Define a type for the processed service, matching what ServicesClient expects
// This might be identical to the original Service type but adds processedImage
type ProcessedService = Service & {
    processedImage: {
        imageUrl: string;
        blurDataURL: string;
        aspectRatio: number;
    };
};

export default async function ServicesPage() {
    const servicesData: ServiceDetailed[] | null =
        await getAllServicesDetailed();
    const validServicesData = servicesData || [];

    if (validServicesData.length === 0) {
        notFound();
    }

    const batchSize = 3;
    // Explicitly type the array to hold objects matching the client's expectation
    const processedServices: ProcessedService[] = [];

    for (let i = 0; i < validServicesData.length; i += batchSize) {
        const batch = validServicesData.slice(i, i + batchSize);
        const processedBatchPromises = batch
            // Filter out services with null IDs before processing
            .filter(
                (service): service is ServiceDetailed & { id: string } =>
                    service.id !== null,
            )
            .map(async service => {
                let processedImage: ProcessedService["processedImage"];
                try {
                    const { imageUrl, blurDataURL, aspectRatio } =
                        await getCachedSanityImageData(service.imageSource);
                    processedImage = { imageUrl, blurDataURL, aspectRatio };
                } catch (error) {
                    console.error(
                        `Error processing image for service ${service.id}:`,
                        error,
                    );
                    processedImage = {
                        imageUrl: service.image ?? "/placeholder-image.jpg",
                        blurDataURL: "",
                        aspectRatio: 16 / 9,
                    };
                }
                // Map ServiceDetailed to ProcessedService, providing defaults
                return {
                    // Ensure all fields required by Service type are present and non-null
                    id: service.id, // Already filtered for non-null
                    title: service.title ?? "Untitled Service",
                    description: service.description ?? "", // Default to empty string or suitable default
                    icon: service.icon ?? null, // Provide appropriate default if null not allowed
                    image: service.image ?? "/placeholder-image.jpg",
                    imageSource: service.imageSource, // May not be needed by client?
                    isPrimary: service.isPrimary ?? false,
                    details: service.details
                        ? {
                              outcome: service.details.outcome ?? null,
                              protocol: service.details.protocol ?? null,
                              evidence: service.details.evidence ?? null,
                              treatments: (
                                  service.details.treatments || []
                              ).map(t => ({
                                  id: t?.id ?? "", // Ensure non-null id
                                  name: t?.name ?? "",
                                  description: t?.description ?? "",
                                  icon: t?.icon ?? null,
                                  href: t?.href ?? "#",
                              })),
                          }
                        : null, // Handle null details object
                    processedImage: processedImage,
                } as ProcessedService; // Assert the final structure conforms
            });

        const processedBatch = await Promise.all(processedBatchPromises);
        processedServices.push(...processedBatch);
    }

    return <ServicesClient services={processedServices} />;
}
