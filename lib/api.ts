import { client } from "@/sanity/lib/client";

export async function getTestimonials() {
    return client.fetch(`*[_type == "testimonial"]{
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
}

export async function getHeader(pageSlug: string) {
    return client.fetch(
        `*[_type == "header" && page->slug.current == $pageSlug][0]{
        _id,
        heading,
        backgroundImage {
            asset->{url}
        },
        subtitle,
        page->{
            slug,
            title
        }
    }`,
        { pageSlug },
    );
}

export async function getFAQs() {
    return client.fetch(`*[_type == "faq"] {
        _id,
        question,
        answer
    }`);
}
