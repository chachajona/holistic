import { FormData } from "@/types/form";

import HeroContainer from "./HeroContainer";

// Simpler server component that doesn't rely on blur data URL generation
export default function Hero({ formData }: { formData: FormData }) {
    // Pass to client container without the blur data URL
    // We'll handle placeholder images on the client side
    return <HeroContainer formData={formData} />;
}
