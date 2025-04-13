import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { Service } from "@/types/services";
import { getCachedSanityImageData } from "@/lib/server/image-processing";
import { ServicesClient } from "@/components/features/services/ServicesClient";

export const dynamic = "force-dynamic";
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

export default async function ServicesPage() {
    const servicesData = await client.fetch(
        groq`
      *[_type == "service"] | order(isPrimary desc) {
        "id": id.current,
        title,
        description,
        icon,
        "image": image.asset->url,
        "imageSource": image,
        isPrimary,
        details {
          outcome,
          protocol,
          evidence,
          treatments[]-> {
            "id": id.current,
            "name": title,
            "description": shortDescription,
            icon,
            "href": "/treatments/" + slug.current
          }
        }
      }
    `,
    );

    if (!servicesData || servicesData.length === 0) {
        notFound();
    }

    // Process all images on the server side
    const batchSize = 3;
    const processedServices = [];

    for (let i = 0; i < servicesData.length; i += batchSize) {
        const batch = servicesData.slice(i, i + batchSize);
        const processedBatch = await Promise.all(
            batch.map(async (service: Service) => {
                try {
                    const { imageUrl, blurDataURL, aspectRatio } =
                        await getCachedSanityImageData(service.imageSource);

                    return {
                        ...service,
                        processedImage: {
                            imageUrl,
                            blurDataURL,
                            aspectRatio,
                        },
                    };
                } catch (error) {
                    console.error(
                        `Error processing image for service ${service.id}:`,
                        error,
                    );
                    return {
                        ...service,
                        processedImage: {
                            imageUrl: service.image,
                            blurDataURL: "",
                            aspectRatio: 16 / 9,
                        },
                    };
                }
            }),
        );
        processedServices.push(...processedBatch);
    }

    return <ServicesClient services={processedServices} />;
}
