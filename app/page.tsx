import { getHomePage } from "@/lib/api";
import { getBlurDataUrl } from "@/lib/server/image-processing";

import HomeClient from "../components/HomeClient";

export default async function Home() {
    const [heroBlurDataURL, ctaBlurDataURL] = await Promise.all([
        getBlurDataUrl("/Hero.png"),
        getBlurDataUrl("/CTA.png", false),
    ]);

    try {
        const pageData = await getHomePage();

        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
                ctaBlurDataURL={ctaBlurDataURL}
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
