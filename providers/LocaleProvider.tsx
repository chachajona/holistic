"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import Cookies from "js-cookie";

import { baseLanguage, isValidLocale, Locale } from "@/lib/i18n/languages";
import { getTranslations } from "@/lib/i18n/utils";

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, fallback?: string) => string | string[];
}

const LocaleContext = createContext<LocaleContextType>({
    locale: baseLanguage.id,
    setLocale: () => {},
    t: (key: string) => key,
});

export const useLocale = () => useContext(LocaleContext);

export function LocaleProvider({
    children,
    initialLocale,
}: {
    children: ReactNode;
    initialLocale?: Locale;
}) {
    const [locale, setLocaleState] = useState<Locale>(
        initialLocale || baseLanguage.id,
    );
    const [translations, setTranslations] = useState(() =>
        getTranslations(locale),
    );

    useEffect(() => {
        const savedLocale = Cookies.get("NEXT_LOCALE");
        if (savedLocale && isValidLocale(savedLocale)) {
            setLocaleState(savedLocale);
            setTranslations(getTranslations(savedLocale));
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        setTranslations(getTranslations(newLocale));
        Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });
        // Reload to apply locale change across all components
        window.location.reload();
    };

    const t = (key: string, fallback?: string): string | string[] => {
        const keys = key.split(".");
        let value: unknown = translations;

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return fallback || key;
            }
        }

        // Return string or array of strings
        if (typeof value === "string") {
            return value;
        }
        if (Array.isArray(value) && value.every(item => typeof item === "string")) {
            return value as string[];
        }
        return fallback || key;
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocaleContext.Provider>
    );
}
