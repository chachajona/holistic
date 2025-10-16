import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const ctaType = defineType({
    name: "cta",
    type: "object",
    title: "Call to Action Section",
    fields: [
        defineField({
            name: "heading",
            type: "string",
            title: "Heading",
            description: "Main heading text for the CTA section",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: { source: "heading" },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Description",
            description: "Supporting text for the CTA",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "primaryButtonText",
            type: "string",
            title: "Primary Button Text",
            description: "Text displayed on the main CTA button",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "primaryButtonUrl",
            type: "string",
            title: "Primary Button URL",
            description: "Internal path the button links to (e.g., /booking, /services)",
            validation: Rule => Rule.required().custom(value => {
                if (!value) return true;
                const isValidPath = /^\/[a-z0-9\-\/]*$/i.test(value);
                return isValidPath ? true : "Must be a valid internal path starting with /";
            }),
        }),
        defineField({
            name: "theme",
            type: "string",
            title: "Theme Color",
            description: "Color theme for the CTA section",
            options: {
                list: [
                    { title: "Blue", value: "blue" },
                    { title: "Light", value: "light" },
                    { title: "Dark", value: "dark" },
                ],
                layout: "radio",
            },
            initialValue: "blue",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "therapyImage",
            type: "image",
            title: "Therapy Image",
            description: "Image displayed in the right column of the CTA section",
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
            title: "heading",
            subtitle: "description",
            image: "therapyImage",
        },
        prepare({ title, subtitle, image }) {
            return {
                title: title || "Untitled CTA",
                subtitle: subtitle || "Call to Action Section",
                media: image || BlockElementIcon,
            };
        },
    },
});
