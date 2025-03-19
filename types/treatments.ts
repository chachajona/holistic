import { CustomIconName } from "@/assets/icons/custom";

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

export interface Treatment {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string | CustomIconName;
    image: string;
    slug: string;
    benefits: TreatmentBenefit[];
    protocols: TreatmentProtocol[];
    duration: string;
    price: number;
    isPopular: boolean;
}
