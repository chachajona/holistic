import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const headerType = defineType({
    name: "header",
    type: "document",
    title: "Header",
    fields: [
        defineField({
            name: "heading",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "string",
        }),
        defineField({
            name: "subtitle",
            type: "string",
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
    icon: DocumentTextIcon,
    preview: {
        select: {
            title: "heading",
            image: "image",
        },
        prepare({ title, image }) {
            return {
                title: title || "Untitled",
                subtitle: "Hero",
                media: image || DocumentTextIcon,
            };
        },
    },
});
