import { notFound } from "next/navigation";

import type { ServiceDetailed } from "@/types/sanity";
import { Service } from "@/types/services";
import { getAllServicesDetailed } from "@/lib/api";
import { getCachedSanityImageData } from "@/lib/server/image-processing";
import { ServicesClient } from "@/components/features/services/ServicesClient";

export const revalidate = 3600;

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

                return {
                    id: service.id,
                    title: service.title ?? "Untitled Service",
                    description: service.description ?? "",
                    icon: service.icon ?? null,
                    image: service.image ?? "/placeholder-image.jpg",
                    imageSource: service.imageSource,
                    isPrimary: service.isPrimary ?? false,
                    problemCategories: service.problemCategories ?? [],
                    details: service.details
                        ? {
                              outcome: service.details.outcome ?? null,
                              protocol: service.details.protocol ?? null,
                              evidence: service.details.evidence ?? null,
                              treatments: (
                                  service.details.treatments || []
                              ).map(t => {
                                  // Log any treatments with missing data
                                  if (!t || !t.name || !t.description) {
                                      console.log(
                                          `WARNING: Treatment missing data:`,
                                          JSON.stringify(t, null, 2),
                                      );
                                  }
                                  return {
                                      id: t?.id ?? "",
                                      name: t?.name ?? "",
                                      description: t?.description ?? "",
                                      icon: t?.icon ?? null,
                                      href: t?.href ?? "#",
                                  };
                              }),
                          }
                        : null,
                    processedImage: processedImage,
                } as ProcessedService;
            });

        const processedBatch = await Promise.all(processedBatchPromises);
        processedServices.push(...processedBatch);
    }

    return <ServicesClient services={processedServices} />;
}
