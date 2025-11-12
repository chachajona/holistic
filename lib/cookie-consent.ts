/**
 * Cookie Consent Management Utilities
 *
 * GDPR/CCPA compliant cookie consent management system
 * Handles user consent preferences and integrates with GTM consent mode
 */

export type CookieCategory =
    | "necessary"
    | "analytics"
    | "marketing"
    | "functional";

export interface CookieConsent {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
    timestamp: number;
    version: string;
}

export interface CookieConsentSettings {
    showBanner: boolean;
    consent: CookieConsent;
    hasConsented: boolean;
}

const CONSENT_COOKIE_NAME = "holistic_cookie_consent";
const CONSENT_VERSION = "1.0";
const CONSENT_EXPIRY_DAYS = 365;

/**
 * Default consent preferences - only necessary cookies allowed
 */
const DEFAULT_CONSENT: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
};

/**
 * Get cookie consent from browser cookies
 */
export function getCookieConsent(): CookieConsentSettings {
    if (typeof window === "undefined") {
        return {
            showBanner: true,
            consent: DEFAULT_CONSENT,
            hasConsented: false,
        };
    }

    try {
        const cookieValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

        if (!cookieValue) {
            return {
                showBanner: true,
                consent: DEFAULT_CONSENT,
                hasConsented: false,
            };
        }

        const consent = JSON.parse(
            decodeURIComponent(cookieValue.split("=")[1]),
        ) as CookieConsent;

        // Check if consent version is current
        if (consent.version !== CONSENT_VERSION) {
            return {
                showBanner: true,
                consent: DEFAULT_CONSENT,
                hasConsented: false,
            };
        }

        return {
            showBanner: false,
            consent,
            hasConsented: true,
        };
    } catch (error) {
        console.warn("Error parsing cookie consent:", error);
        return {
            showBanner: true,
            consent: DEFAULT_CONSENT,
            hasConsented: false,
        };
    }
}

/**
 * Save cookie consent to browser cookies
 */
export function saveCookieConsent(consent: Partial<CookieConsent>): void {
    if (typeof window === "undefined") return;

    try {
        const fullConsent: CookieConsent = {
            ...DEFAULT_CONSENT,
            ...consent,
            timestamp: Date.now(),
            version: CONSENT_VERSION,
        };

        const expires = new Date();
        expires.setDate(expires.getDate() + CONSENT_EXPIRY_DAYS);

        const cookieValue = encodeURIComponent(JSON.stringify(fullConsent));
        document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure;`;

        // Update GTM consent mode
        updateGTMConsent(fullConsent);
    } catch (error) {
        console.warn("Error saving cookie consent:", error);
    }
}

/**
 * Update Google Tag Manager consent mode based on user preferences
 */
function updateGTMConsent(consent: CookieConsent): void {
    if (typeof window === "undefined" || !window.gtag) return;

    try {
        // Update consent mode
        window.gtag("consent", "update", {
            ad_storage: consent.marketing ? "granted" : "denied",
            analytics_storage: consent.analytics ? "granted" : "denied",
            functional_storage: consent.functional ? "granted" : "denied",
        });
    } catch (error) {
        console.warn("Error updating GTM consent:", error);
    }
}

/**
 * Initialize GTM consent mode with default values
 */
export function initializeGTMConsent(): void {
    if (typeof window === "undefined" || !window.gtag) return;

    try {
        const { hasConsented, consent } = getCookieConsent();

        // Set default consent mode
        window.gtag("consent", "default", {
            ad_storage:
                hasConsented && consent.marketing ? "granted" : "denied",
            analytics_storage:
                hasConsented && consent.analytics ? "granted" : "denied",
            functional_storage:
                hasConsented && consent.functional ? "granted" : "denied",
            security_storage: "granted", // Always allowed for security
        });
    } catch (error) {
        console.warn("Error initializing GTM consent:", error);
    }
}

/**
 * Check if specific cookie category is allowed
 */
export function isCookieAllowed(category: CookieCategory): boolean {
    const { consent, hasConsented } = getCookieConsent();

    if (!hasConsented) {
        return category === "necessary"; // Only necessary cookies before consent
    }

    return consent[category];
}

/**
 * Reset cookie consent (for testing or user request)
 */
export function resetCookieConsent(): void {
    if (typeof window === "undefined") return;

    try {
        document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
        console.warn("Error resetting cookie consent:", error);
    }
}

/**
 * Get cookie consent summary for display
 */
export function getConsentSummary(): string {
    const { consent } = getCookieConsent();
    const categories = [];

    if (consent.analytics) categories.push("Analytics");
    if (consent.marketing) categories.push("Marketing");
    if (consent.functional) categories.push("Functional");

    if (categories.length === 0) return "Only necessary cookies";
    return `Necessary + ${categories.join(", ")}`;
}
