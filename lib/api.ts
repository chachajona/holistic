import { client } from "@/sanity/lib/client";

export async function getTestimonials() {
    try {
        console.log("Fetching testimonials...");
        const result = await client.fetch(`*[_type == "testimonial"]{
    _id,
        icon {
            asset->{
                url
            }
        },
        rating,
        quote,
            author
        }`);
        console.log("Fetched testimonials:", result);
        return result;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

export async function getHeader(slug: string) {
    try {
        console.log("Fetching header...");
        const result = await client.fetch(
            `*[_type == "header" && slug.current == $slug][0]{
                _id,
                heading,
                slug,
                image {
                    asset->{
                        url
                    },
                    alt
                },
                subtitle
            }`,
            { slug },
        );
        console.log("Fetched header:", result);
        return result;
    } catch (error) {
        console.error("Error fetching header:", error);
        return null;
    }
}

export async function getFAQs() {
    try {
        console.log("Fetching FAQs...");
        const result = await client.fetch(`*[_type == "faq"] {
            _id,
            question,
            answer
        }`);
        console.log("Fetched FAQs:", result);
        return result;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
}
