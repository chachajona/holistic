import { FormData } from "@/types/form";

// Import the actual client container
import ActualHeroContainer from "./HeroContainer";

// Re-export HeroContainer as a named export
export { default as HeroContainer } from "./HeroContainer";

// Default export remains the simple server component
export default function Hero({ formData }: { formData: FormData }) {
    // Internally uses the client container
    return <ActualHeroContainer formData={formData} />;
}
