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
                    name: "form",
                    type: "form",
                }),
            ],
        }),
    ],
});
