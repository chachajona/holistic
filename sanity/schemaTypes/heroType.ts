import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
    name: "hero",
    type: "object",
    title: "Hero Section",
    fields: [
        defineField({
            name: "heading",
            type: "string",
            title: "Heading",
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: { source: "heading" },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "subheading",
            type: "string",
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
            title: "heading",
            image: "image",
        },
        prepare({ title, image }) {
            return {
                title: title || "Untitled Hero",
                subtitle: "Hero Section",
                media: image || ImagesIcon,
            };
        },
    },
});
