import { customIcons } from "@/assets/icons/custom";
import { defineType } from "sanity";

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
            type: "string",
            validation: Rule => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
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
            name: "details",
            title: "Service Details",
            type: "object",
            fields: [
                {
                    name: "outcome",
                    title: "Expected Outcome",
                    type: "text",
                },
                {
                    name: "protocol",
                    title: "Treatment Protocol",
                    type: "text",
                },
                {
                    name: "evidence",
                    title: "Scientific Evidence",
                    type: "text",
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
    ],
});
