import { baseLanguage, type Locale } from "./languages";

// Helper to get translations
export function getTranslations(locale: Locale) {
    try {
        return require(`./translations/${locale}.json`);
    } catch (error) {
        console.error(`Failed to load translations for ${locale}`, error);
        return require(`./translations/${baseLanguage.id}.json`);
    }
}

// Helper for nested translation keys
export function translate(
    translations: Record<string, unknown>,
    key: string,
    fallback?: string,
): string {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
            value = (value as Record<string, unknown>)[k];
        } else {
            return fallback || key;
        }
    }

    return typeof value === "string" ? value : fallback || key;
}

// Helper to extract localized string from Sanity localeString/localeText objects
export function getLocalizedString(
    localizedContent: Record<string, string> | string | null | undefined,
    locale: Locale,
): string | null {
    if (!localizedContent) return null;

    // If it's already a string (for backward compatibility with non-localized content)
    if (typeof localizedContent === "string") {
        return localizedContent;
    }

    // If it's a localized object, get the value for the current locale
    // Falls back to base language if locale not available
    return (
        localizedContent[locale] || localizedContent[baseLanguage.id] || null
    );
}

// Helper to ensure we get a string from translation values
export function getTranslationString(
    value: string | string[],
    fallback: string,
): string {
    return typeof value === "string" ? value : fallback;
}
