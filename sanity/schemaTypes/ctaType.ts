import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const ctaType = defineType({
    name: "cta",
    type: "object",
    title: "Call to Action Section",
    fields: [
        defineField({
            name: "heading",
            type: "localeString",
            title: "Heading",
            description: "Main heading text for the CTA section",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: { source: "heading.vi" },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            type: "localeText",
            title: "Description",
            description: "Supporting text for the CTA",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "primaryButtonText",
            type: "localeString",
            title: "Primary Button Text",
            description: "Text displayed on the main CTA button",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "primaryButtonUrl",
            type: "string",
            title: "Primary Button URL",
            description: "Internal path the button links to (e.g., /booking, /services)",
            validation: Rule =>
                Rule.required().custom((value) => {
                    if (!value) return true;
                    // Allow internal paths starting with /
                    const isValidPath = /^\/[a-z0-9\-\/]*$/i.test(value);
                    return isValidPath
                        ? true
                        : "Must be a valid internal path starting with / (e.g., /booking, /services)";
                }),
        }),
        defineField({
            name: "therapyImage",
            type: "image",
            title: "Therapy Image",
            description:
                "Image displayed in the right column of the CTA section",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                }),
            ],
            validation: Rule => Rule.required(),
        }),
    ],
    icon: BlockElementIcon,
    preview: {
        select: {
            heading: "heading",
            description: "description",
            image: "therapyImage",
        },
        prepare({ heading, description, image }) {
            // Extract Vietnamese text from localeString for preview
            const title = heading?.vi || heading || "Untitled CTA";
            const subtitle = description?.vi || description || "Call to Action Section";
            return {
                title,
                subtitle,
                media: image || BlockElementIcon,
            };
        },
    },
});
