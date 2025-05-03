import type { HomePageData, TreatmentSummary } from "@/types/sanity";
import { getAllTreatments, getHomePage } from "@/lib/api";
import { getBlurDataUrl } from "@/lib/server/image-processing";
import HomeClient from "@/components/features/home/HomeClient";

// Define expected form types based on the error message
type ExpectedFormType = "contact" | "newsletter" | "register";

const defaultContactFields = {
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    messagePlaceholder: "Enter your message",
    phonePlaceholder: "Enter your phone number",
};

export const revalidate = 3600;

export default async function Home() {
    const [heroBlurDataURL, ctaBlurDataURL] = await Promise.all([
        getBlurDataUrl("/Hero.png"),
        getBlurDataUrl("/CTA.png", false),
    ]);

    const treatmentData: TreatmentSummary[] | null = await getAllTreatments();

    const mappedTreatments = (treatmentData || []).map((treatment, index) => ({
        id: String(index + 1),
        title: treatment.title ?? "Untitled Treatment",
        description: treatment.shortDescription || "No description available",
        image: treatment.imageUrl || "/placeholder-image.jpg",
        icon: treatment.icon ?? null,
        slug: treatment.slug?.current ?? "",
        category: treatment.icon
            ? (treatment.icon as any)?.title || "General"
            : "General",
    }));

    const validTreatments = mappedTreatments;

    try {
        const pageData: HomePageData | null = await getHomePage();

        const formContactData = pageData?.FormContact;

        const fetchedFormType = formContactData?.formType;
        const formType: ExpectedFormType =
            fetchedFormType === "contact" ||
            fetchedFormType === "newsletter" ||
            fetchedFormType === "register"
                ? fetchedFormType
                : "contact";

        // TODO: Verify Sanity data structure for contactFields and adjust interface/mapping if needed.
        const contactFields = formContactData?.contactFields
            ? (formContactData.contactFields as any)
            : defaultContactFields;

        const formData = {
            label: formContactData?.label ?? "",
            heading: formContactData?.heading ?? "",
            formType: formType,
            contactFields: contactFields,
            submitButtonText: formContactData?.submitButtonText ?? "Submit",
        };

        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
                ctaBlurDataURL={ctaBlurDataURL}
                treatments={validTreatments}
                formData={formData}
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
                    contactFields: defaultContactFields,
                    submitButtonText: "Submit",
                }}
            />
        );
    }
}
