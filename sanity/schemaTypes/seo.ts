import { defineField, defineType } from "sanity";

export const seoType = defineType({
    name: "seo",
    type: "object",
    title: "SEO",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Meta Title",
            validation: Rule => Rule.max(60),
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Meta Description",
            rows: 3,
            validation: Rule => Rule.max(160),
        }),
        defineField({
            name: "ogImage",
            type: "image",
            title: "Open Graph Image",
            options: { hotspot: true },
        }),
        defineField({
            name: "canonicalUrl",
            type: "url",
            title: "Canonical URL",
            validation: Rule =>
                Rule.uri({
                    scheme: ["http", "https"],
                }),
        }),
        defineField({
            name: "noindex",
            type: "boolean",
            title: "Noindex",
            description: "Prevent search engines from indexing this page",
            initialValue: false,
        }),
        defineField({
            name: "nofollow",
            type: "boolean",
            title: "Nofollow",
            description:
                "Prevent search engines from following links on this page",
            initialValue: false,
        }),
        defineField({
            name: "twitterCard",
            type: "string",
            title: "Twitter Card",
            options: {
                list: [
                    { title: "Summary", value: "summary" },
                    {
                        title: "Summary Large Image",
                        value: "summary_large_image",
                    },
                ],
            },
            initialValue: "summary_large_image",
        }),
    ],
});
