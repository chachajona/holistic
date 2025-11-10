import { baseLanguage, type Locale } from "./i18n/languages";

/**
 * Helper function to generate GROQ query fragment for localized fields
 * Now using object structure: {vi: "text", en: "text"}
 * @param fieldName - Name of the localized field
 * @returns GROQ query fragment with coalesce fallback
 */
export function localizedField(fieldName: string): string {
    return `select($locale == "vi" => ${fieldName}.vi, coalesce(${fieldName}.en, ${fieldName}.vi))`;
}

/**
 * Helper function to generate GROQ query for localized array of objects
 * Used for benefits, protocols, etc.
 * Now using object structure for nested fields
 */
export function localizedArray(
    fieldName: string,
    nestedFields: string[],
): string {
    const nestedQueries = nestedFields.map(field => {
        if (field === "id") {
            // Slug field with fallback
            return `"${field}": coalesce(id.current, _key, "")`;
        }
        if (field === "step") {
            // Step is a number, not a slug
            return `"${field}": step`;
        }
        return `"${field}": select($locale == "vi" => ${field}.vi, coalesce(${field}.en, ${field}.vi))`;
    });

    return `${fieldName}[] {
        ${nestedQueries.join(",\n        ")}
    }`;
}

/**
 * Helper function to generate GROQ query for localized block content
 * Uses custom array structure with language/content fields
 */
export function localizedBlock(fieldName: string): string {
    return `coalesce(
        ${fieldName}[language == $locale][0].content,
        ${fieldName}[language == "${baseLanguage.id}"][0].content,
        ""
    )`;
}

/**
 * Type-safe locale parameter for GROQ queries
 */
export type LocaleParam = {
    locale: Locale;
};
