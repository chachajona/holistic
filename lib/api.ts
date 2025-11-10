import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import type {
    AboutPageData,
    BookingPageData,
    FAQData,
    HomePageData,
    ServiceDetailed,
    ServicesPageData,
    SiteSettings,
    TestimonialData,
    TreatmentsPageData,
    TreatmentSummary,
} from "@/types/sanity";

import { localizedArray, localizedBlock, localizedField } from "./groq-helpers";
import { baseLanguage, type Locale } from "./i18n/languages";

export async function getHomePage(
    locale: Locale = baseLanguage.id,
): Promise<HomePageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'home'][0]{
            'Heading': title,
            slug,
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{_id,_ref,url,metadata{lqip}}}
            },
            'Hero': pageBuilder[][_type == "hero"][0]{
                _id,
                slug,
                image {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt,
                    hotspot,
                    crop
                }
            },
            'QuickLinks': quickLinks[]{
                _key,
                title,
                link,
                iconType,
                disableScroll,
                bgImage {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    hotspot,
                    crop
                }
            },
            'CTA': pageBuilder[][_type == "cta"][0]{
                _key,
                slug,
                "heading": ${localizedField("heading")},
                "description": ${localizedField("description")},
                "primaryButtonText": ${localizedField("primaryButtonText")},
                primaryButtonUrl,
                theme,
                therapyImage {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip,
                            dimensions {
                                width,
                                height,
                                aspectRatio
                            }
                        }
                    },
                    alt,
                    hotspot,
                    crop
                }
            }
        }`;
        const result = await client.fetch<HomePageData>(getPageQuery, {
            locale,
        });

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
        const getPageQuery = groq`*[_type == "page"][slug == 'about'][0]{
            'Heading': title,
            slug,
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{url,metadata{lqip}}}
            },
            'Header': pageBuilder[][_type == "header"][0]{
                _id,
                slug,
                heading,
                subheading,
                image {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt,
                    hotspot,
                    crop
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
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{url,metadata{lqip}}}
            },
            'Header': pageBuilder[][_type == "header"][0]{
                _id,
                slug,
                heading,
                subheading,
                image {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt,
                    hotspot,
                    crop
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
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{url,metadata{lqip}}}
            },
            'Header': pageBuilder[][_type == "header"][0]{
                _id,
                slug,
                heading,
                subheading,
                image {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt,
                    hotspot,
                    crop
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

export async function getBookingPage(
    locale: Locale = baseLanguage.id,
): Promise<BookingPageData | null> {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'booking'][0]{
            'Heading': title,
            slug,
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{url,metadata{lqip}}}
            },
            'Header': pageBuilder[][_type == "header"][0]{
                _id,
                slug,
                heading,
                subheading,
                image {
                    asset->{
                        _id,
                        _ref,
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt,
                    hotspot,
                    crop
                }
            },
            'FormContact': pageBuilder[][_type == "form" && formType == "contact"][0]{
                "label": ${localizedField("label")},
                "heading": ${localizedField("heading")},
                formType,
                contactFields{
                    namePlaceholder,
                    emailPlaceholder,
                    messagePlaceholder,
                    phonePlaceholder
                },
                "submitButtonText": ${localizedField("submitButtonText")}
            }
        }`;
        const result = await client.fetch<BookingPageData>(getPageQuery, {
            locale,
        });
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

export async function getTestimonials(
    locale: Locale = baseLanguage.id,
): Promise<TestimonialData[] | null> {
    try {
        const query = groq`*[_type == "testimonial"]{
            _id,
            icon {
                asset->{
                    _id,
                    _ref,
                    url,
                    metadata {
                        lqip
                    }
                },
                hotspot,
                crop
            },
            rating,
            "quote": ${localizedField("quote")},
            "author": ${localizedField("author")}
        }`;
        const result = await client.fetch<TestimonialData[]>(query, {
            locale,
        });
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

export async function getTreatmentBySlug(
    slug: string,
    locale: Locale = baseLanguage.id,
) {
    try {
        const query = groq`*[_type == "treatment" && slug.current == $slug][0]{
            _id,
            "id": id.current,
            "title": ${localizedField("title")},
            "slug": slug.current,
            "shortDescription": ${localizedField("shortDescription")},
            "fullDescription": ${localizedField("fullDescription")},
            icon,
            seo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{_id,_ref,url,metadata{lqip}}}
            },
            "image": image {
                asset->{
                    _id,
                    _ref,
                    url,
                    metadata {
                        lqip
                    }
                },
                alt,
                hotspot,
                crop
            },
            ${localizedArray("benefits", ["id", "title", "description"])},
            ${localizedArray("protocols", ["id", "step", "title", "description"])},
            duration,
            price,
            isPopular,
            booking[]{
                "title": ${localizedField("title")},
                price,
                duration,
                "description": ${localizedField("description")}
            },
            "content": ${localizedBlock("content")}
        }`;

        return await client.fetch(query, { slug, locale });
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

export async function getAllTreatments(
    locale: Locale = baseLanguage.id,
): Promise<TreatmentSummary[] | null> {
    try {
        const query = groq`*[_type == "treatment"] | order(title[_key == $locale][0].value asc) {
            _id,
            "title": ${localizedField("title")},
            slug,
            "shortDescription": ${localizedField("shortDescription")},
            image {
                asset->{
                    _id,
                    _ref,
                    url,
                    metadata {
                        lqip
                    }
                },
                alt,
                hotspot,
                crop
            },
            icon
        }`;

        const result = await client.fetch<TreatmentSummary[]>(query, {
            locale,
        });

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

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const query = groq`*[_type == "siteSettings"][0]{
            siteUrl,
            defaultSeo{
                title,
                description,
                canonicalUrl,
                noindex,
                nofollow,
                twitterCard,
                ogImage{asset->{_id,_ref,url,metadata{lqip}}}
            },
            contactInfo{
                phone,
                email,
                locations[]{
                    _key,
                    name,
                    address,
                    mapUrl,
                    isPrimary
                }
            },
            socialMedia{
                facebook,
                instagram
            }
        }`;
        const result = await client.fetch<SiteSettings>(query);
        return result ?? null;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return null;
    }
}

export async function getAllServicesDetailed(
    locale: Locale = baseLanguage.id,
): Promise<ServiceDetailed[]> {
    const query = groq`*[_type == "service"] {
      "id": id.current,
      "title": ${localizedField("title")},
      "description": ${localizedField("description")},
      icon,
      image,
      isPrimary,
      "problemCategories": problemCategories[]-> {
        "_id": _id,
        "title": ${localizedField("title")},
        icon,
        "description": ${localizedField("description")}
      },
      details {
        "outcome": ${localizedField("outcome")},
        "protocol": ${localizedField("protocol")},
        "evidence": ${localizedField("evidence")},
        "treatments": treatments[]-> {
          "id": _id,
          "name": ${localizedField("title")},
          "description": ${localizedField("shortDescription")},
          "icon": icon,
          "href": slug.current
        }
      }
    }`;

    try {
        console.log("Fetching services data from Sanity...");
        const result = await client.fetch(query, { locale });
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

export interface ServiceSummary {
    id: string;
    title: string;
    description: string;
}

export async function getServiceSummaries(
    locale: Locale = baseLanguage.id,
): Promise<ServiceSummary[]> {
    const query = groq`*[_type == "service"] | order(isPrimary desc, title asc) {
      "id": id.current,
      "title": ${localizedField("title")},
      "description": ${localizedField("description")}
    }`;

    try {
        const result = await client.fetch<ServiceSummary[]>(query, { locale });
        return result || [];
    } catch (error) {
        console.error("Error fetching service summaries:", error);
        return [];
    }
}
