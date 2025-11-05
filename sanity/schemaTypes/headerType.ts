import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const headerType = defineType({
    name: "header",
    type: "object",
    title: "Header",
    fields: [
        defineField({
            name: "heading",
            type: "localeString",
            title: "Heading",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: { source: "heading.vi" },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "subheading",
            type: "localeText",
            title: "Subheading",
        }),
        defineField({
            name: "image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                }),
            ],
        }),
        defineField({
            name: "page",
            type: "reference",
            to: [{ type: "page" }],
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
            // Extract the Vietnamese heading from localeString object
            const title =
                typeof heading === "object" && heading?.vi
                    ? heading.vi
                    : typeof heading === "string"
                      ? heading
                      : "Untitled";

            return {
                title,
                subtitle: "Header",
                media: image || ImagesIcon,
            };
        },
    },
});
