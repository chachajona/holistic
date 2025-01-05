import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        try {
            const { phoneNumber } = req.body;

            const doc = {
                _type: "contactSubmission",
                phoneNumber,
                submittedAt: new Date().toISOString(),
            };

            await client.create(doc);

            res.status(200).json({ message: "Form submitted successfully" });
        } catch (error) {
            console.error("Error submitting form:", error);
            res.status(500).json({ message: "Error submitting form" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export async function getHomePage() {
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
        const result = await client.fetch(getPageQuery, {
            revalidate: new Date().getSeconds(),
        });

        if (!result || !result.FormContact) {
            console.error("Home page data or FormContact is missing");
            return { FormContact: {} };
        }

        return result;
    } catch (error) {
        console.error("Error fetching homepage:", error);
        return { FormContact: {} };
    }
}

export async function getAboutPage() {
    try {
        const getPageQuery = groq`*[_type == "page"][slug == 'about'][0]{
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
        const result = await client.fetch(getPageQuery, {
            revalidate: new Date().getSeconds(),
        });
        return result;
    } catch (error) {
        console.error("Error fetching about page:", error);
        return null;
    }
}

export async function getServicesPage() {
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

        const result = await client.fetch(getPageQuery, {
            revalidate: new Date().getSeconds(),
        });
        return result;
    } catch (error) {
        console.error("Error fetching services page:", error);
        return null;
    }
}

export async function getTreatmentsPage() {
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
        const result = await client.fetch(getPageQuery, {
            revalidate: new Date().getSeconds(),
        });
        return result;
    } catch (error) {
        console.error("Error fetching treatments page:", error);
        return null;
    }
}

export async function getBookingPage() {
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

        const result = await client.fetch(getPageQuery, {
            revalidate: new Date().getSeconds(),
        });
        return result;
    } catch (error) {
        console.error("Error fetching booking page:", error);
        return null;
    }
}

export async function getTestimonials() {
    try {
        console.log("Fetching testimonials...");
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
        const result = await client.fetch(query);
        console.log("Fetched testimonials:", result);
        return result;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

export async function getFAQs() {
    try {
        console.log("Fetching FAQs...");
        const query = groq`*[_type == "faq"] {
            _id,
            question,
            answer
        }`;
        const result = await client.fetch(query);
        console.log("Fetched FAQs:", result);
        return result;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
}
