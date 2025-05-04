import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import type {
    AboutPageData,
    BookingPageData,
    FAQData,
    HomePageData,
    ServiceDetailed,
    ServicesPageData,
    TestimonialData,
    TreatmentsPageData,
    TreatmentSummary,
} from "@/types/sanity";

export async function getHomePage(): Promise<HomePageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'home'][0]{
            'Heading': title,
            slug,
            'FormContact': pageBuilder[][_type == "form" && formType == "contact"][0]{
                label,
                heading,
                formType,
                contactFields,
                submitButtonText
            }
        }`;
        const result = await client.fetch<HomePageData>(getPageQuery);

        if (!result) {
            console.error("Home page data is missing or invalid");
            return null;
        }

        return result;
    } catch (error) {
        console.error("Error fetching homepage:", error);
        return null;
    }
}

export async function getAboutPage(): Promise<AboutPageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug.current == 'about'][0]{
            'Heading': title,
            slug,
            'Header': pageBuilder[][_type == "header"][0]{
                _id,
                slug,
                heading,
                subheading,
                image {
                    asset->{
                        url
                    },
                    alt
                }
            }
        }`;
        const result = await client.fetch<AboutPageData>(getPageQuery);

        if (!result) {
            console.error("About page data is missing or invalid");
            return null;
        }
        return result;
    } catch (error) {
        console.error("Error fetching about page:", error);
        return null;
    }
}

export async function getServicesPage(): Promise<ServicesPageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'services'][0]{
            'Heading': title,
            slug,
            'Header': pageBuilder[][_type == "header"][0]{
                heading,
                subheading,
                image {
                    asset->{
                        url
                    },
                    alt
                }
            }
        }`;
        const result = await client.fetch<ServicesPageData>(getPageQuery);
        if (!result) {
            console.error("Services page data is missing or invalid");
            return null;
        }
        return result;
    } catch (error) {
        console.error("Error fetching services page:", error);
        return null;
    }
}

export async function getTreatmentsPage(): Promise<TreatmentsPageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'treatments'][0]{
            'Heading': title,
            slug,
            'Header': pageBuilder[][_type == "header"][0]{
                heading,
                subheading,
                image {
                    asset->{
                        url
                    },
                    alt
                }
            }
        }`;
        const result = await client.fetch<TreatmentsPageData>(getPageQuery);
        if (!result) {
            console.error("Treatments page data is missing or invalid");
            return null;
        }
        return result;
    } catch (error) {
        console.error("Error fetching treatments page:", error);
        return null;
    }
}

export async function getBookingPage(): Promise<BookingPageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'booking'][0]{
            'Heading': title,
            slug,
            'Header': pageBuilder[][_type == "header"][0]{
                heading,
                subheading,
                image {
                    asset->{
                        url
                    },
                    alt
                }
            },
            'FormContact': pageBuilder[][_type == "form" && formType == "contact"][0]{
                label,
                heading,
                formType,
                contactFields,
                submitButtonText
            }
        }`;
        const result = await client.fetch<BookingPageData>(getPageQuery);
        if (!result) {
            console.error("Booking page data is missing or invalid");
            return null;
        }
        return result;
    } catch (error) {
        console.error("Error fetching booking page:", error);
        return null;
    }
}

export async function getTestimonials(): Promise<TestimonialData[] | null> {
    try {
        const query = groq`*[_type == "testimonial"]{
            _id,
            icon {
                asset->{
                    url
                }
            },
            rating,
            quote,
            author
        }`;
        const result = await client.fetch<TestimonialData[]>(query);
        if (!result) {
            console.error("Error fetching testimonials: No result");
            return []; // Return empty array if none found
        }
        return result;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return null;
    }
}

export async function getFAQs(): Promise<FAQData[] | null> {
    try {
        const query = groq`*[_type == "faq"] {
            _id,
            question,
            answer
        }`;
        const result = await client.fetch<FAQData[]>(query);
        if (!result) {
            console.error("Error fetching FAQs: No result");
            return []; // Return empty array if none found
        }
        return result;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return null;
    }
}

export async function getTreatmentBySlug(slug: string) {
    try {
        const query = groq`*[_type == "treatment" && slug.current == $slug][0]{
            "id": id.current,
            title,
            "slug": slug.current,
            shortDescription,
            fullDescription,
            icon,
            "image": image,
            "imageUrl": image.asset->url,
            benefits[] {
                "id": id.current,
                title,
                description
            },
            protocols[] {
                "id": id.current,
                step,
                title,
                description
            },
            duration,
            price,
            isPopular,
            content
        }`;

        return await client.fetch(query, { slug });
    } catch (error) {
        console.error("Error fetching treatment:", error);
        return null;
    }
}

export async function getAllTreatmentSlugs() {
    try {
        const query = groq`*[_type == "treatment"]{
            "slug": slug.current
        }`;

        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching treatment slugs:", error);
        return [];
    }
}

export async function getAllTreatments(): Promise<TreatmentSummary[] | null> {
    try {
        const query = groq`*[_type == "treatment"] | order(title asc) {
            _id,
            title,
            slug,
            shortDescription,
            "imageUrl": image.asset->url,
            icon
        }`;

        const result = await client.fetch<TreatmentSummary[]>(query);

        if (!result) {
            console.error("Error fetching treatments: No result");
            return [];
        }

        return result;
    } catch (error) {
        console.error("Error fetching all treatments:", error);
        return null;
    }
}

export async function getAllServicesDetailed(): Promise<ServiceDetailed[]> {
    const query = `*[_type == "service"] {
      "id": id.current,
      title,
      description,
      icon,
      image,
      imageSource,
      isPrimary,
      "problemCategories": problemCategories[]-> {
        "_id": _id,
        title,
        icon,
        description
      },
      details {
        outcome,
        protocol,
        evidence,
        "treatments": treatments[]-> {
          "id": _id,
          "name": title,
          "description": shortDescription,
          "icon": icon,
          "href": slug.current
        }
      }
    }`;

    try {
        console.log("Fetching services data from Sanity...");
        const result = await client.fetch(query);
        console.log(`Retrieved ${result?.length || 0} services`);

        // Count treatments for diagnostic purposes
        if (result && result.length > 0) {
            let treatmentCount = 0;

            result.forEach((service: ServiceDetailed) => {
                treatmentCount += service.details?.treatments?.length || 0;
            });

            console.log(`Total treatments found: ${treatmentCount}`);
        }

        return result || [];
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}
