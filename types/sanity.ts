// types/sanity.ts

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageCrop, ImageHotspot, PortableTextBlock } from "@sanity/types";

// Localized content types for Sanity
export type LocalizedString = {
    vi?: string;
    en?: string;
} | null;

export type LocalizedText = {
    vi?: string;
    en?: string;
} | null;

export interface HeroData {
    _id: string;
    slug: { current: string } | null;
    heading?: LocalizedString;
    subheading?: LocalizedString;
    image: {
        asset: {
            _id: string;
            _ref: string;
            url: string | null;
            metadata?: {
                lqip?: string;
                dimensions?: {
                    width: number;
                    height: number;
                    aspectRatio: number;
                };
            };
        } | null;
        alt: string | null;
        hotspot?: ImageHotspot;
        crop?: ImageCrop;
    } | null;
}

export interface QuickLinkData {
    _key: string;
    title: LocalizedString;
    link: string | null;
    iconType: "service" | "treatment" | "team" | null;
    disableScroll: boolean | null;
    bgImage: {
        asset: {
            _id: string;
            _ref: string;
            url: string | null;
            metadata?: {
                lqip?: string;
                dimensions?: {
                    width: number;
                    height: number;
                    aspectRatio: number;
                };
            };
        } | null;
        hotspot?: ImageHotspot;
        crop?: ImageCrop;
    } | null;
}

export interface CTAData {
    _key: string;
    slug: { current: string } | null;
    heading: LocalizedString;
    description: LocalizedString;
    primaryButtonText: LocalizedString;
    primaryButtonUrl: string | null; // Internal path like /booking, /services
    theme: "blue" | "light" | "dark" | null;
    therapyImage: {
        asset: {
            _id: string;
            _ref: string;
            url: string | null;
            metadata?: {
                lqip?: string;
                dimensions?: {
                    width: number;
                    height: number;
                    aspectRatio: number;
                };
            };
        } | null;
        alt: string | null;
        hotspot?: ImageHotspot;
        crop?: ImageCrop;
    } | null;
}

export interface HomePageData {
    Heading: string | null;
    slug: { current: string } | null;
    Hero: HeroData | null;
    QuickLinks: QuickLinkData[] | null;
    CTA: CTAData | null;
    seo?: Seo | null;
}

// Interface based on the GROQ query in getAboutPage
export interface AboutPageData {
    Heading: string | null;
    slug: { current: string } | null;
    seo?: Seo | null;
    Header: {
        _id: string;
        slug: { current: string } | null;
        heading: string | null;
        subheading: string | null;
        image: {
            asset: {
                url: string | null;
            } | null;
            alt: string | null;
        } | null;
    } | null;
}

// --- Image Type (Reusable) ---
export interface SanityImage {
    _type?: string;
    asset?: {
        _ref: string;
        _type: string;
    } | null;
    alt?: string | null;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
}

// --- Treatment Benefit Type ---
export interface TreatmentBenefit {
    _key: string;
    id?: {
        _type: string;
        current: string;
    };
    title: LocalizedString;
    description: LocalizedText;
}

// --- Treatment Protocol Type ---
export interface TreatmentProtocol {
    _key: string;
    id?: {
        _type: string;
        current: string;
    };
    step: number;
    title: LocalizedString;
    description?: LocalizedText;
}

// --- Treatment Booking Option Type ---
export interface TreatmentBooking {
    _key?: string;
    title: LocalizedString;
    price: number;
    duration: string;
    description: LocalizedText;
}

// Interface for data fetched by the optimized getAllTreatments (summary view)
// Uses localized strings that are coalesced to single string values via GROQ
export interface TreatmentSummary {
    _id: string;
    title: string; // Coalesced via localizedField() GROQ helper
    slug: { current: string } | null;
    shortDescription: string; // Coalesced via localizedField() GROQ helper
    image: SanityImage | null;
    icon: string | null;
}

// Full Treatment interface (complete document with all fields)
export interface Treatment extends TreatmentSummary {
    fullDescription: LocalizedText;
    benefits?: TreatmentBenefit[];
    protocols: TreatmentProtocol[];
    duration: string;
    price: number;
    isPopular?: boolean;
    booking?: TreatmentBooking[] | null;
    content?: PortableTextBlock[];
    seo?: Seo | null;
}

// --- Page Specific Data Interfaces ---

// Interface for Services & Treatments pages (structure seems identical)
export interface PageHeaderData {
    _id: string;
    slug: { current: string } | null;
    heading: Record<string, string> | string | null;
    subheading: Record<string, string> | string | null;
    image: {
        asset: {
            url: string | null;
        } | null;
        alt: string | null;
    } | null;
}

export interface ServicesPageData {
    Heading: string | null;
    slug: { current: string } | null;
    seo?: Seo | null;
    Header: PageHeaderData | null;
}

export interface TreatmentsPageData {
    Heading: string | null;
    slug: { current: string } | null;
    seo?: Seo | null;
    Header: PageHeaderData | null;
}

// Interface for Booking page (combines Header and FormContact)
interface FormContactData {
    // Reusing structure from HomePageData
    label: string | null;
    heading: string | null;
    formType: string | null;
    contactFields: {
        namePlaceholder: string | null;
        emailPlaceholder: string | null;
        messagePlaceholder: string | null;
        phonePlaceholder: string | null;
    } | null;
    submitButtonText: string | null;
}

export interface BookingPageData {
    Heading: string | null;
    slug: { current: string } | null;
    seo?: Seo | null;
    Header: PageHeaderData | null;
    FormContact: FormContactData | null;
}

// --- Content Type Interfaces ---

// Interface for Testimonial data
export interface TestimonialData {
    _id: string;
    icon: {
        asset: {
            url: string | null;
        } | null;
    } | null;
    rating: number | null;
    quote: string | null;
    author: string | null;
}

// Interface for FAQ data
export interface FAQData {
    _id: string;
    question: string | null;
    answer: PortableTextBlock[] | null;
}

// Interface for detailed Service data (used on Services page)
export interface ServiceDetailed {
    id: string | null;
    title: string | null;
    description: PortableTextBlock[] | null;
    icon: { title?: string } | null;
    // Canonical raw Sanity image source; derive URLs at usage sites
    image: SanityImageSource | null;
    isPrimary: boolean | null;
    problemCategories?:
        | {
              _id: string;
              title: string;
              icon?: string;
              description?: string;
          }[]
        | null;
    details: {
        outcome: PortableTextBlock[] | null;
        protocol: PortableTextBlock[] | null;
        evidence: PortableTextBlock[] | null;
        treatments:
            | {
                  id: string | null;
                  name: string | null;
                  description: string | null;
                  icon: { title?: string } | null;
                  href: string | null;
              }[]
            | null;
    } | null;
}

// --- SEO Types ---
export interface SeoImageAssetMeta {
    lqip?: string;
}

export interface Seo {
    _type?: string;
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noindex?: boolean | null;
    nofollow?: boolean | null;
    twitterCard?: "summary" | "summary_large_image" | null;
    ogImage?: SanityImage | null;
}

// --- Site Settings Types ---
export interface LocationData {
    _key?: string;
    name: string | null;
    address: string | null;
    mapUrl: string | null;
    isPrimary: boolean | null;
}

export interface ContactInfo {
    phone: string | null;
    email: string | null;
    locations: LocationData[] | null;
}

export interface SocialMedia {
    facebook: string | null;
    instagram: string | null;
}

export interface SiteSettings {
    siteUrl: string | null;
    defaultSeo?: Seo | null;
    contactInfo: ContactInfo | null;
    socialMedia: SocialMedia | null;
}
