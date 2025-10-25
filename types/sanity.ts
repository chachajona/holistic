// types/sanity.ts

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageCrop, ImageHotspot, PortableTextBlock } from "@sanity/types";

// Localized content type for Sanity
export type LocalizedString =
    | {
          vi?: string;
          en?: string;
      }
    | string
    | null;

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

// Interface for data fetched by the optimized getAllTreatments
export interface TreatmentSummary {
    _id: string;
    title: string | null;
    slug: { current: string } | null;
    shortDescription: string | null;
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
        alt?: string | null;
        hotspot?: ImageHotspot;
        crop?: ImageCrop;
    } | null;
    icon: { title?: string } | null;
}

// You can add other Sanity types here later
// e.g., Treatment, Testimonial, FAQ, etc.

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
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noindex?: boolean | null;
    nofollow?: boolean | null;
    twitterCard?: "summary" | "summary_large_image" | null;
    ogImage?: {
        asset?: {
            url?: string | null;
            metadata?: SeoImageAssetMeta | null;
        } | null;
    } | null;
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
