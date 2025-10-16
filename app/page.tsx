import type { HomePageData, TreatmentSummary } from "@/types/sanity";
import { getAllTreatments, getHomePage, getSiteSettings } from "@/lib/api";
import { getSanityImageUrl } from "@/lib/sanity-image";
import HomeClient from "@/components/features/home/HomeClient";

type ExpectedFormType = "contact" | "newsletter" | "register";

const defaultContactFields = {
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    messagePlaceholder: "Enter your message",
    phonePlaceholder: "Enter your phone number",
};

export const revalidate = 3600;

export default async function Home() {
    const treatmentData: TreatmentSummary[] | null = await getAllTreatments();
    const siteSettings = await getSiteSettings();

    const mappedTreatments = (treatmentData || []).map((treatment, index) => ({
        id: String(index + 1),
        title: treatment.title ?? "Untitled Treatment",
        description: treatment.shortDescription || "No description available",
        image: treatment.image
            ? getSanityImageUrl(treatment.image, { width: 600, quality: 85 }) ||
              "/placeholder-image.jpg"
            : "/placeholder-image.jpg",
        icon: treatment.icon?.title,
        slug: treatment.slug?.current ?? "",
        category: treatment.icon?.title ?? "General",
    }));

    const validTreatments = mappedTreatments;

    try {
        const pageData: HomePageData | null = await getHomePage();

        const formContactData = pageData?.FormContact;
        const heroData = pageData?.Hero;
        const quickLinksData = pageData?.QuickLinks || null;
        const ctaData = pageData?.CTA || null;

        const fetchedFormType = formContactData?.formType;
        const formType: ExpectedFormType =
            fetchedFormType === "contact" ||
            fetchedFormType === "newsletter" ||
            fetchedFormType === "register"
                ? fetchedFormType
                : "contact";

        const contactFields = formContactData?.contactFields
            ? {
                  namePlaceholder:
                      formContactData.contactFields.namePlaceholder ||
                      defaultContactFields.namePlaceholder,
                  emailPlaceholder:
                      formContactData.contactFields.emailPlaceholder ||
                      defaultContactFields.emailPlaceholder,
                  messagePlaceholder:
                      formContactData.contactFields.messagePlaceholder ||
                      defaultContactFields.messagePlaceholder,
                  phonePlaceholder:
                      formContactData.contactFields.phonePlaceholder ||
                      defaultContactFields.phonePlaceholder,
              }
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
                treatments={validTreatments}
                formData={formData}
                heroData={heroData}
                quickLinksData={quickLinksData}
                ctaData={ctaData}
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
        );
    } catch (error) {
        console.error("Error in Home page:", error);
        return (
            <HomeClient
                treatments={validTreatments}
                formData={{
                    label: "",
                    heading: "",
                    formType: "contact",
                    contactFields: defaultContactFields,
                    submitButtonText: "Submit",
                }}
                heroData={null}
                quickLinksData={null}
                ctaData={null}
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
        );
    }
}
