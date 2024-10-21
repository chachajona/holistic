import { defineField, defineType } from "sanity";

export const faqType = defineType({
    name: "faq",
    title: "FAQ",
    type: "document",
    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "string",
            validation: rule => rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Answer",
            type: "text",
            validation: rule => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "question",
            subtitle: "answer",
        },
    },
});
