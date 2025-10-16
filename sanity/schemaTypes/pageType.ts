import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
    name: "page",
    type: "document",
    title: "Page",
    fields: [
        defineField({ name: "title", type: "string" }),
        defineField({
            name: "slug",
            type: "string",
            title: "Slug",
        }),
        defineField({
            name: "pageBuilder",
            type: "array",
            title: "Page builder",
            of: [
                defineArrayMember({
                    name: "header",
                    type: "header",
                }),
                defineArrayMember({
                    name: "hero",
                    type: "hero",
                }),
                defineArrayMember({
                    name: "form",
                    type: "form",
                }),
                defineArrayMember({
                    name: "cta",
                    type: "cta",
                }),
            ],
        }),
        defineField({
            name: "quickLinks",
            type: "array",
            title: "Quick Links Section",
            description:
                "Configure the quick navigation cards (typically shown on homepage)",
            of: [{ type: "quickLink" }],
            validation: Rule => Rule.max(6),
        }),
        defineField({
            name: "seo",
            type: "seo",
            title: "SEO",
        }),
    ],
});
