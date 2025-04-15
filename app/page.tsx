import { getAllTreatments, getHomePage, getTreatmentBySlug } from "@/lib/api";
import { getBlurDataUrl } from "@/lib/server/image-processing";
import HomeClient from "@/components/features/home/HomeClient";

export default async function Home() {
    const [heroBlurDataURL, ctaBlurDataURL] = await Promise.all([
        getBlurDataUrl("/Hero.png"),
        getBlurDataUrl("/CTA.png", false),
    ]);

    // Fetch treatments from Sanity
    const treatmentData = await getAllTreatments();

    // Map treatments to the format expected by the SwiperCarousel
    const mappedTreatments = await Promise.all(
        treatmentData.map(async (treatment: any, index: number) => {
            try {
                const fullTreatment = await getTreatmentBySlug(treatment.slug);

                return {
                    id: String(index + 1),
                    title: fullTreatment.title,
                    description:
                        fullTreatment.shortDescription ||
                        "Không có mô tả cho phương pháp này",
                    image: fullTreatment.imageUrl || "/placeholder-image.jpg",
                    icon: fullTreatment.icon,
                    slug: fullTreatment.slug,
                    category: fullTreatment.icon || "Phương pháp",
                };
            } catch (error) {
                console.error(
                    `Error fetching details for treatment ${treatment.slug}:`,
                    error,
                );
                return null;
            }
        }),
    );

    const validTreatments = mappedTreatments.filter(Boolean);

    try {
        const pageData = await getHomePage();

        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
                ctaBlurDataURL={ctaBlurDataURL}
                treatments={validTreatments}
                formData={
                    pageData?.FormContact || {
                        label: "",
                        heading: "",
                        formType: "contact",
                        submitButtonText: "",
                    }
                }
            />
        );
    } catch (error) {
        console.error("Error in Home page:", error);
        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
                ctaBlurDataURL={ctaBlurDataURL}
                treatments={validTreatments}
                formData={{
                    label: "",
                    heading: "",
                    formType: "contact",
                    submitButtonText: "",
                }}
            />
        );
    }
}
