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

// Revalidate the page every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function Home() {
    const [heroBlurDataURL, ctaBlurDataURL] = await Promise.all([
        getBlurDataUrl("/Hero.png"),
        getBlurDataUrl("/CTA.png", false),
    ]);

    // Fetch treatments using the optimized function
    const treatmentData: TreatmentSummary[] | null = await getAllTreatments();

    // Map treatments directly from the fetched data
    const mappedTreatments = (treatmentData || []).map((treatment, index) => ({
        // Use index or treatment._id for unique key if needed downstream
        id: String(index + 1),
        title: treatment.title ?? "Untitled Treatment",
        description: treatment.shortDescription || "No description available",
        image: treatment.imageUrl || "/placeholder-image.jpg",
        icon: treatment.icon ?? null,
        slug: treatment.slug?.current ?? "",
        category: treatment.icon
            ? (treatment.icon as any)?.title || "General"
            : "General", // Example: Try to get title from icon, default
    }));

    // Filter out any potential nulls if mapping logic could produce them (optional)
    // const validTreatments = mappedTreatments.filter(Boolean);
    // If map always returns object, filtering is not strictly needed here
    const validTreatments = mappedTreatments;

    try {
        const pageData: HomePageData | null = await getHomePage();

        // Ensure formData passed to client has non-null defaults
        const formContactData = pageData?.FormContact;

        // Validate formType
        const fetchedFormType = formContactData?.formType;
        const formType: ExpectedFormType =
            fetchedFormType === "contact" ||
            fetchedFormType === "newsletter" ||
            fetchedFormType === "register"
                ? fetchedFormType
                : "contact"; // Default to 'contact' if invalid/null

        // Assume contactFields from Sanity needs transformation or HomeClient expects an object.
        // Providing the default object shape for now.
        // TODO: Verify Sanity data structure for contactFields and adjust interface/mapping if needed.
        const contactFields = formContactData?.contactFields
            ? (formContactData.contactFields as any) // Keep as 'any' for now, needs verification
            : defaultContactFields;

        const formData = {
            label: formContactData?.label ?? "",
            heading: formContactData?.heading ?? "",
            formType: formType, // Use the validated/defaulted formType
            contactFields: contactFields, // Use default object structure
            submitButtonText: formContactData?.submitButtonText ?? "Submit", // Added default text
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
        // Use consistent defaults matching expected types
        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
                ctaBlurDataURL={ctaBlurDataURL}
                treatments={validTreatments}
                formData={{
                    label: "",
                    heading: "",
                    formType: "contact", // Explicitly 'contact'
                    contactFields: defaultContactFields, // Use default object
                    submitButtonText: "Submit", // Added default text
                }}
            />
        );
    }
}
