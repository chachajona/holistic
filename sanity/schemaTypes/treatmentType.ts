import { customIcons } from "@/assets/icons/custom";
import { defineType } from "sanity";

const customIconOptions = Object.keys(customIcons).map(name => ({
    title: name,
    value: name,
}));

export const treatmentType = defineType({
    name: "treatment",
    title: "Treatments",
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
            title: "Treatment Name",
            type: "string",
            validation: Rule => Rule.required(),
        },
        {
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            validation: Rule => Rule.required().max(200),
            description:
                "Brief description for cards and previews (max 200 characters)",
        },
        {
            name: "fullDescription",
            title: "Full Description",
            type: "text",
            validation: Rule => Rule.required(),
            description: "Detailed description for the treatment page",
        },
        {
            name: "icon",
            title: "Icon Name",
            type: "string",
            description:
                "Name of the icon to use (Lucide icon name or custom icon name)",
            options: {
                list: [
                    ...customIconOptions,
                    { title: "Activity", value: "Activity" },
                    { title: "Dumbbell", value: "Dumbbell" },
                ],
            },
        },
        {
            name: "image",
            title: "Treatment Image",
            type: "image",
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        },
        {
            name: "slug",
            title: "URL Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        },
        {
            name: "benefits",
            title: "Treatment Benefits",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "id",
                            title: "Benefit ID",
                            type: "slug",
                            options: {
                                source: "title",
                            },
                        },
                        {
                            name: "title",
                            title: "Benefit Title",
                            type: "string",
                        },
                        {
                            name: "description",
                            title: "Benefit Description",
                            type: "text",
                        },
                    ],
                },
            ],
        },
        {
            name: "protocols",
            title: "Treatment Protocols",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "id",
                            title: "Protocol ID",
                            type: "slug",
                            options: {
                                source: "title",
                            },
                        },
                        {
                            name: "step",
                            title: "Step Number",
                            type: "number",
                        },
                        {
                            name: "title",
                            title: "Protocol Title",
                            type: "string",
                        },
                        {
                            name: "description",
                            title: "Protocol Description",
                            type: "text",
                        },
                    ],
                },
            ],
            validation: Rule => Rule.required(),
        },
        {
            name: "duration",
            title: "Treatment Duration",
            type: "string",
            validation: Rule => Rule.required(),
            description: "e.g., '45 phút', '60 phút'",
        },
        {
            name: "price",
            title: "Treatment Price",
            type: "number",
            validation: Rule => Rule.required(),
        },
        {
            name: "isPopular",
            title: "Popular Treatment",
            type: "boolean",
            description: "Mark this treatment as popular",
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "shortDescription",
            media: "image",
        },
    },
});
