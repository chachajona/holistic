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
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "benefits", title: "Benefits" },
        { name: "protocol", title: "Protocol" },
        { name: "booking", title: "Booking Options" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
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
            group: "content",
        }),
        defineField({
            name: "title",
            title: "Treatment Name",
            type: "localeString",
            validation: Rule => Rule.required(),
            group: "content",
        }),
        defineField({
            name: "slug",
            title: "URL Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
            group: "content",
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "localeText",
            validation: Rule => Rule.required(),
            description:
                "Brief description for cards and previews (max 200 characters)",
            group: "content",
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "localeText",
            validation: Rule => Rule.required(),
            description: "Detailed description for the treatment page",
            group: "content",
        }),
        defineField({
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
            group: "content",
        }),
        defineField({
            name: "image",
            title: "Treatment Image",
            type: "image",
            options: { hotspot: true },
            validation: Rule => Rule.required(),
            group: "content",
        }),
        defineField({
            name: "benefits",
            title: "Treatment Benefits",
            type: "array",
            of: [{ type: "treatmentBenefit" }],
            group: "benefits",
        }),
        defineField({
            name: "protocols",
            title: "Treatment Protocols",
            type: "array",
            of: [{ type: "treatmentProtocol" }],
            validation: Rule => Rule.required(),
            group: "protocol",
        }),
        defineField({
            name: "duration",
            title: "Treatment Duration",
            type: "string",
            validation: Rule => Rule.required(),
            description: "e.g., '45 phút', '60 phút'",
            group: "booking",
        }),
        defineField({
            name: "price",
            title: "Treatment Price",
            type: "number",
            validation: Rule => Rule.required().min(0),
            group: "booking",
        }),
        defineField({
            name: "isPopular",
            title: "Popular Treatment",
            type: "boolean",
            description: "Mark this treatment as popular",
            initialValue: false,
            group: "booking",
        }),
        defineField({
            name: "booking",
            title: "Booking Options",
            type: "array",
            of: [{ type: "treatmentBooking" }],
            description:
                "Different booking options for this treatment (optional)",
            group: "booking",
        }),
        defineField({
            name: "content",
            title: "Detailed Content",
            type: "localeBlock",
            description: "Rich text content for the treatment page (optional)",
            group: "content",
        }),
        defineField({
            name: "seo",
            type: "seo",
            title: "SEO",
            group: "seo",
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
