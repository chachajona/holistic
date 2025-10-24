import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({
            name: "icon",
            title: "Icon",
            type: "image",
            validation: rule => rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: rule => rule.required().min(1).max(5),
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "localeText",
            validation: rule => rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "localeString",
            validation: rule => rule.required(),
        }),
    ],
});
