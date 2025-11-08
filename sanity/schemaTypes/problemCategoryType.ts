import { customIcons } from "@/assets/icons/custom";
import { defineType } from "sanity";

const customIconOptions = Object.keys(customIcons).map(name => ({
    title: name,
    value: name,
}));

export const problemCategoryType = defineType({
    name: "problemCategory",
    title: "Problem Categories",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "localeString",
            description: "Name of the problem category (e.g., 'Back Pain')",
            validation: Rule => Rule.required(),
        },
        {
            name: "id",
            title: "ID",
            type: "slug",
            description: "Unique identifier for this problem category",
            options: {
                source: "title.vi",
                maxLength: 200,
                slugify: input =>
                    input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
            },
            validation: Rule => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "localeText",
            description: "Brief description of this problem category",
            options: {
                rows: 3,
            },
        },
        {
            name: "icon",
            title: "Icon",
            type: "string",
            description: "Icon to represent this problem category",
            options: {
                list: customIconOptions,
            },
        },
        {
            name: "keywords",
            title: "Keywords",
            type: "array",
            of: [{ type: "string" }],
            description:
                "Keywords that might indicate this problem in service descriptions",
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description:
                "Order in which to display this category (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "title.vi",
            subtitle: "description.vi",
            media: "icon",
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle,
                media: media,
            };
        },
    },
});
