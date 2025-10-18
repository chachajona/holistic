import { CustomIconName } from "@/assets/icons/custom";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@sanity/types";

import { ContactInfo, ServicesPageData, SocialMedia } from "@/types/sanity";

export interface Treatment {
    id: string;
    name: string;
    description: string;
    icon: string | { title?: string };
    href: string;
}

export interface ServiceDetails {
    outcome: string | PortableTextBlock[];
    protocol: string | PortableTextBlock[];
    evidence: string | PortableTextBlock[];
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
    imageSource: SanityImageSource | null;
    isPrimary: boolean;
    problemCategories?: ProblemCategory[];
    details: ServiceDetails;
    processedImage: {
        imageUrl: string;
        blurDataURL?: string;
        aspectRatio: number;
    };
}

export interface ServicesClientProps {
    pageData: ServicesPageData | null;
    services: Service[];
    contactInfo?: ContactInfo | null;
    socialMedia?: SocialMedia | null;
}
