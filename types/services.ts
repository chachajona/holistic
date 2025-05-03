import { CustomIconName } from "@/assets/icons/custom";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Treatment {
    id: string;
    name: string;
    description: string;
    icon: string;
    href: string;
}

export interface ServiceDetails {
    outcome: string;
    protocol: string;
    evidence: string;
    treatments: Treatment[];
}

export interface ProblemCategory {
    _id: string;
    title: string;
    icon?: string;
    description?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string | CustomIconName;
    image: string;
    imageSource: SanityImageSource;
    isPrimary: boolean;
    problemCategories?: ProblemCategory[];
    details: ServiceDetails;
    processedImage: {
        imageUrl: string;
        blurDataURL: string;
        aspectRatio: number;
    };
}

export interface ServicesClientProps {
    services: Service[];
}
