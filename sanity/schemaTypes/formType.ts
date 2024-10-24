import { defineField, defineType } from "sanity";

export const formType = defineType({
    name: "form",
    type: "object",
    title: "Form",
    fields: [
        defineField({
            name: "label",
            type: "string",
            description: "A label for the form (e.g., 'Newsletter Signup')",
        }),
        defineField({
            name: "heading",
            type: "string",
            description: "The main heading for the form",
        }),
        defineField({
            name: "formType",
            type: "string",
            description: "Select form type",
            options: {
                list: ["newsletter", "register", "contact"],
            },
        }),
        defineField({
            name: "newsletterFields",
            type: "object",
            hidden: ({ parent }) => parent?.formType !== "newsletter",
            fields: [
                defineField({
                    name: "emailPlaceholder",
                    type: "string",
                    description: "Placeholder text for the email input",
                }),
            ],
        }),
        defineField({
            name: "registerFields",
            type: "object",
            hidden: ({ parent }) => parent?.formType !== "register",
            fields: [
                defineField({
                    name: "namePlaceholder",
                    type: "string",
                    description: "Placeholder text for the name input",
                }),
                defineField({
                    name: "emailPlaceholder",
                    type: "string",
                    description: "Placeholder text for the email input",
                }),
                defineField({
                    name: "passwordPlaceholder",
                    type: "string",
                    description: "Placeholder text for the password input",
                }),
            ],
        }),
        defineField({
            name: "contactFields",
            type: "object",
            hidden: ({ parent }) => parent?.formType !== "contact",
            fields: [
                defineField({
                    name: "namePlaceholder",
                    type: "string",
                    description: "Placeholder text for the name input",
                }),
                defineField({
                    name: "emailPlaceholder",
                    type: "string",
                    description: "Placeholder text for the email input",
                }),
                defineField({
                    name: "messagePlaceholder",
                    type: "string",
                    description: "Placeholder text for the message textarea",
                }),
                defineField({
                    name: "phonePlaceholder",
                    type: "string",
                    description: "Placeholder text for the phone input",
                }),
            ],
        }),
        defineField({
            name: "submitButtonText",
            type: "string",
            description: "Text for the submit button",
        }),
    ],
});
