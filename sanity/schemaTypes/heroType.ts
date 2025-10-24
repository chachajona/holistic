import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
    name: "hero",
    type: "object",
    title: "Hero Section",
    fields: [
        defineField({
            name: "heading",
            type: "localeString",
            title: "Heading",
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
            name: "subheading",
            type: "localeString",
            title: "Subheading",
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Hero Image",
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
    icon: ImagesIcon,
    preview: {
        select: {
            heading: "heading",
            image: "image",
        },
        prepare({ heading, image }) {
            // Extract Vietnamese text from localeString for preview
            const title = heading?.vi || heading || "Untitled Hero";
            return {
                title,
                subtitle: "Hero Section",
                media: image || ImagesIcon,
            };
        },
    },
});
