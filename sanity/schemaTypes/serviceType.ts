import { customIcons } from "@/assets/icons/custom";
import { defineField, defineType } from "sanity";

const customIconOptions = Object.keys(customIcons).map(name => ({
    title: name,
    value: name,
}));

export const serviceType = defineType({
    name: "service",
    title: "Services",
    type: "document",
    fields: [
        {
            name: "id",
            title: "ID",
            type: "slug",
            options: {
                source: "title",
                maxLength: 200,
                slugify: input =>
                    input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
            },
            validation: Rule => Rule.required(),
        },
        {
            name: "title",
            title: "Title",
            type: "localeString",
            validation: Rule => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "localeText",
            validation: Rule => Rule.required(),
        },
        {
            name: "icon",
            title: "Icon Name",
            type: "string",
            description:
                "Name of the icon to use (Lucide icon name or custom icon name)",
            validation: Rule => Rule.required(),
            options: {
                list: [...customIconOptions],
            },
        },
        {
            name: "image",
            title: "Service Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "isPrimary",
            title: "Is Primary Service",
            type: "boolean",
            description: "Mark this service as the primary/most popular option",
        },
        {
            name: "problemCategories",
            title: "Problem Categories",
            description: "Which problem categories does this service address?",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "problemCategory" }],
                },
            ],
        },
        {
            name: "details",
            title: "Service Details",
            type: "object",
            fields: [
                {
                    name: "outcome",
                    title: "Expected Outcome",
                    type: "localeText",
                },
                {
                    name: "protocol",
                    title: "Treatment Protocol",
                    type: "localeText",
                },
                {
                    name: "evidence",
                    title: "Scientific Evidence",
                    type: "localeText",
                },
                {
                    name: "treatments",
                    title: "Available Treatments",
                    type: "array",
                    of: [
                        {
                            type: "reference",
                            to: [{ type: "treatment" }],
                        },
                    ],
                },
            ],
        },
        defineField({
            name: "seo",
            type: "seo",
            title: "SEO",
        }),
    ],
});
