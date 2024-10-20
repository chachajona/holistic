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
