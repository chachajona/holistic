import { defineField, defineType } from "sanity";

export const treatmentProtocol = defineType({
    name: "treatmentProtocol",
    title: "Treatment Protocol Step",
    type: "object",
    fields: [
        defineField({
            name: "id",
            title: "Protocol ID",
            type: "slug",
            options: {
                source: "title",
                disableArrayWarning: true,
            },
        }),
        defineField({
            name: "step",
            title: "Step Number",
            type: "number",
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: "title",
            title: "Protocol Title",
            type: "localeString",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Protocol Description",
            type: "localeText",
        }),
    ],
    preview: {
        select: {
            step: "step",
            title: "title.vi",
            subtitle: "title.en",
        },
        prepare({ step, title, subtitle }) {
            return {
                title: `Step ${step}: ${title || "Untitled"}`,
                subtitle: subtitle,
            };
        },
    },
});
