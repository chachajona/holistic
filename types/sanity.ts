// types/sanity.ts

// Interface based on the GROQ query in getHomePage
export interface HomePageData {
    Heading: string | null;
    slug: { current: string } | null; // Assuming slug is an object with 'current'
    FormContact: {
        label: string | null;
        heading: string | null;
        formType: string | null; // Could be a literal type e.g., 'contact'
        contactFields: any[] | null; // Define more specific type if structure is known
        submitButtonText: string | null;
    } | null; // The whole FormContact object might be null
}

// Interface based on the GROQ query in getAboutPage
export interface AboutPageData {
    Heading: string | null;
    slug: { current: string } | null;
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
    _id: string; // Include Sanity document ID
    title: string | null;
    slug: { current: string } | null;
    shortDescription: string | null;
    imageUrl: string | null;
    icon: any | null; // Use a more specific type if known, e.g., { asset?: { url?: string } }
}

// You can add other Sanity types here later
// e.g., Treatment, Testimonial, FAQ, etc.

// --- Page Specific Data Interfaces ---

// Interface for Services & Treatments pages (structure seems identical)
export interface PageHeaderData {
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
}

export interface ServicesPageData {
    Heading: string | null;
    slug: { current: string } | null;
    Header: PageHeaderData | null;
}

export interface TreatmentsPageData {
    Heading: string | null;
    slug: { current: string } | null;
    Header: PageHeaderData | null;
}

// Interface for Booking page (combines Header and FormContact)
interface FormContactData {
    // Reusing structure from HomePageData
    label: string | null;
    heading: string | null;
    formType: string | null;
    contactFields: any[] | null; // Keep as any[] or refine based on actual structure
    submitButtonText: string | null;
}

export interface BookingPageData {
    Heading: string | null;
    slug: { current: string } | null;
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
    answer: any | null; // Assuming answer might be block content - use 'any' or a more specific block content type
}

// Interface for detailed Service data (used on Services page)
export interface ServiceDetailed {
    id: string | null;
    title: string | null;
    description: any | null; // Block content?
    icon: any | null;
    image: string | null; // Direct URL
    imageSource: any | null; // Asset reference for processing
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
        outcome: any | null; // Block content?
        protocol: any | null; // Block content?
        evidence: any | null; // Block content?
        treatments:
            | {
                  id: string | null;
                  name: string | null;
                  description: string | null;
                  icon: any | null;
                  href: string | null;
              }[]
            | null;
    } | null;
}
