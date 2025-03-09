import { getHomePage } from "@/lib/api";
import { getBlurDataUrl } from "@/lib/server/image-processing";

import HomeClient from "../components/HomeClient";

export default async function Home() {
    // Get blur data at the server level
    const heroBlurDataURL = await getBlurDataUrl("/Hero.png");

    try {
        const pageData = await getHomePage();

        return (
            <HomeClient
                heroBlurDataURL={heroBlurDataURL}
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
