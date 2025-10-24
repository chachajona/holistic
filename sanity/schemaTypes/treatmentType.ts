import { customIcons } from "@/assets/icons/custom";
import { defineField, defineType } from "sanity";

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
            type: "localeString",
            validation: Rule => Rule.required(),
        },
        {
            name: "shortDescription",
            title: "Short Description",
            type: "localeText",
            validation: Rule => Rule.required(),
            description:
                "Brief description for cards and previews (max 200 characters)",
        },
        {
            name: "fullDescription",
            title: "Full Description",
            type: "localeText",
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
                                disableArrayWarning: true,
                            },
                        },
                        {
                            name: "title",
                            title: "Benefit Title",
                            type: "localeString",
                        },
                        {
                            name: "description",
                            title: "Benefit Description",
                            type: "localeText",
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
                                disableArrayWarning: true,
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
                            type: "localeString",
                        },
                        {
                            name: "description",
                            title: "Protocol Description",
                            type: "localeText",
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
        {
            name: "content",
            title: "Detailed Content",
            type: "localeBlock",
            description: "Rich text content for the treatment page (optional)",
        },
        {
            name: "booking",
            title: "Booking Options",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Booking Title",
                            type: "localeString",
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: "price",
                            title: "Price",
                            type: "number",
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: "duration",
                            title: "Duration",
                            type: "string",
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: "description",
                            title: "Description",
                            type: "localeText",
                            validation: Rule => Rule.required(),
                        },
                    ],
                },
            ],
            description:
                "Different booking options for this treatment (optional)",
        },
        defineField({
            name: "seo",
            type: "seo",
            title: "SEO",
        }),
    ],
    preview: {
        select: {
            title: "title.vi",
            subtitle: "shortDescription.vi",
            media: "image",
        },
    },
});
