import { defineType } from "sanity";
import { languages, baseLanguage } from "@/lib/i18n/languages";

// Localized string field - object-based approach (recommended for 2-3 languages)
// See: https://www.sanity.io/docs/studio/localization
export const localeString = defineType({
    name: "localeString",
    title: "Localized String",
    type: "object",
    // Fieldset groups non-default languages into a collapsible section
    fieldsets: [
        {
            title: "Translations",
            name: "translations",
            options: { collapsible: true, collapsed: false },
        },
    ],
    fields: languages.map(lang => ({
        name: lang.id,
        type: "string",
        title: lang.title,
        // Default language stands out, others grouped in fieldset
        fieldset: lang.id === baseLanguage.id ? undefined : "translations",
    })),
}) as any;

// Localized text field (multiline) - object-based approach
export const localeText = defineType({
    name: "localeText",
    title: "Localized Text",
    type: "object",
    fieldsets: [
        {
            title: "Translations",
            name: "translations",
            options: { collapsible: true, collapsed: false },
        },
    ],
    fields: languages.map(lang => ({
        name: lang.id,
        type: "text",
        title: lang.title,
        fieldset: lang.id === baseLanguage.id ? undefined : "translations",
    })),
}) as any;

// Localized block content (rich text)
// Manual implementation since the plugin doesn't support block content well
export const localeBlock = defineType({
    name: "localeBlock",
    title: "Localized Block Content",
    type: "array",
    of: [
        {
            type: "object",
            fields: [
                {
                    name: "language",
                    type: "string",
                    title: "Language",
                    options: {
                        list: [
                            { title: "Tiếng Việt", value: "vi" },
                            { title: "English", value: "en" },
                        ],
                    },
                },
                {
                    name: "content",
                    type: "array",
                    title: "Content",
                    of: [{ type: "block" }],
                },
            ],
            preview: {
                select: {
                    language: "language",
                },
                prepare({ language }) {
                    return {
                        title: language === "vi" ? "Tiếng Việt" : "English",
                    };
                },
            },
        },
    ],
}) as any;
