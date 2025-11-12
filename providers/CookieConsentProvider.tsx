"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import {
    CookieConsent,
    CookieConsentSettings,
    getCookieConsent,
    initializeGTMConsent,
    isCookieAllowed,
    saveCookieConsent,
} from "@/lib/cookie-consent";

interface CookieConsentContextType {
    settings: CookieConsentSettings;
    acceptAll: () => void;
    acceptNecessary: () => void;
    updateConsent: (consent: Partial<CookieConsent>) => void;
    isAllowed: (
        category: "necessary" | "analytics" | "marketing" | "functional",
    ) => boolean;
    resetConsent: () => void;
}

const CookieConsentContext = createContext<
    CookieConsentContextType | undefined
>(undefined);

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error(
            "useCookieConsent must be used within a CookieConsentProvider",
        );
    }
    return context;
}

interface CookieConsentProviderProps {
    children: React.ReactNode;
}

export function CookieConsentProvider({
    children,
}: CookieConsentProviderProps) {
    const [settings, setSettings] = useState<CookieConsentSettings>(() => {
        // Initialize with server-side safe defaults
        if (typeof window === "undefined") {
            return {
                showBanner: true,
                consent: {
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    functional: false,
                    timestamp: Date.now(),
                    version: "1.0",
                },
                hasConsented: false,
            };
        }
        return getCookieConsent();
    });

    // Initialize GTM consent on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            initializeGTMConsent();
            // Update settings with actual cookie values
            setSettings(getCookieConsent());
        }
    }, []);

    const acceptAll = () => {
        const fullConsent: CookieConsent = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
            timestamp: Date.now(),
            version: "1.0",
        };

        saveCookieConsent(fullConsent);
        setSettings({
            showBanner: false,
            consent: fullConsent,
            hasConsented: true,
        });
    };

    const acceptNecessary = () => {
        const necessaryOnlyConsent: CookieConsent = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
            timestamp: Date.now(),
            version: "1.0",
        };

        saveCookieConsent(necessaryOnlyConsent);
        setSettings({
            showBanner: false,
            consent: necessaryOnlyConsent,
            hasConsented: true,
        });
    };

    const updateConsent = (consent: Partial<CookieConsent>) => {
        saveCookieConsent(consent);
        setSettings(prev => ({
            ...prev,
            consent: {
                ...prev.consent,
                ...consent,
                timestamp: Date.now(),
            },
        }));
    };

    const isAllowed = (
        category: "necessary" | "analytics" | "marketing" | "functional",
    ) => {
        return isCookieAllowed(category);
    };

    const resetConsent = () => {
        if (typeof window !== "undefined") {
            document.cookie =
                "holistic_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setSettings(getCookieConsent());
        }
    };

    const value: CookieConsentContextType = React.useMemo(
        () => ({
            settings,
            acceptAll,
            acceptNecessary,
            updateConsent,
            isAllowed,
            resetConsent,
        }),
        [
            settings,
            acceptAll,
            acceptNecessary,
            updateConsent,
            isAllowed,
            resetConsent,
        ],
    );

    return (
        <CookieConsentContext.Provider value={value}>
            {children}
        </CookieConsentContext.Provider>
    );
}
