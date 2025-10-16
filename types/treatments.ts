import { CustomIconName } from "@/assets/icons/custom";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Seo } from "./sanity";

export interface TreatmentBenefit {
    id: string;
    title: string;
    description: string;
}

export interface TreatmentProtocol {
    id: string;
    step: number;
    title: string;
    description: string;
}

export interface TreatmentBooking {
    title: string;
    price: number;
    duration: string;
    description: string;
}

export interface Treatment {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string | CustomIconName;
    image: SanityImageSource;
    imageUrl?: string;
    slug: string;
    content?: string;
    benefits: TreatmentBenefit[];
    protocols: TreatmentProtocol[];
    duration: string;
    price: number;
    isPopular: boolean;
    booking?: TreatmentBooking[];
    seo?: Seo | null;
}
