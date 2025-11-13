/**
 * GTM Consent Management
 *
 * Ensures tracking only occurs when user has provided consent
 * Compatible with CookieConsentProvider
 */

/**
 * Cookie consent preference keys
 */
export interface ConsentPreferences {
    // Essential cookies (always required)
    essential: boolean;

    // Analytics cookies (for GTM tracking)
    analytics: boolean;

    // Marketing cookies
    marketing: boolean;
}

/**
 * Gets current consent preferences from localStorage
 * Falls back to default (no analytics) if not set
 * @returns Current consent preferences
 */
export function getConsentPreferences(): ConsentPreferences {
    try {
        if (typeof window === "undefined") {
            return {
                essential: true,
                analytics: false,
                marketing: false,
            };
        }

        // Check for consent cookie/localStorage
        const consentData = localStorage.getItem("cookie-consent");
        if (consentData) {
            try {
                const parsed = JSON.parse(consentData);
                return {
                    essential: parsed.essential ?? true,
                    analytics: parsed.analytics ?? false,
                    marketing: parsed.marketing ?? false,
                };
            } catch {
                // Invalid JSON, return defaults
                return {
                    essential: true,
                    analytics: false,
                    marketing: false,
                };
            }
        }

        // Check GTM availability via dataLayer (more reliable than gtag function)
        if (window.dataLayer) {
            // GTM is loaded but we default to no analytics until explicitly consented
            return {
                essential: true,
                analytics: false,
                marketing: false,
            };
        }

        return {
            essential: true,
            analytics: false,
            marketing: false,
        };
    } catch (error) {
        // In case of any error, default to no tracking
        if (process.env.NODE_ENV === "development") {
            console.warn("Failed to get consent preferences:", error);
        }
        return {
            essential: true,
            analytics: false,
            marketing: false,
        };
    }
}

/**
 * Checks if user has consented to analytics tracking
 * @returns true if analytics consent given, false otherwise
 */
export function hasAnalyticsConsent(): boolean {
    const preferences = getConsentPreferences();
    return preferences.analytics === true;
}

/**
 * Checks if user has consented to marketing tracking
 * @returns true if marketing consent given, false otherwise
 */
export function hasMarketingConsent(): boolean {
    const preferences = getConsentPreferences();
    return preferences.marketing === true;
}

/**
 * Checks if all essential consents are met for a tracking event
 * @param eventType - Type of event to track (e.g., 'analytics', 'marketing')
 * @returns true if tracking is allowed, false otherwise
 */
export function isTrackingAllowed(
    eventType: "analytics" | "marketing" | "essential" = "analytics",
): boolean {
    // Essential events always allowed (but should be minimal)
    if (eventType === "essential") {
        return true;
    }

    const preferences = getConsentPreferences();

    switch (eventType) {
        case "analytics":
            return preferences.analytics === true;
        case "marketing":
            return preferences.marketing === true;
        default:
            return false;
    }
}

/**
 * Logs consent check in development mode
 * @param eventName - Name of event being tracked
 * @param allowed - Whether tracking is allowed
 * @param eventType - Type of tracking
 */
export function logConsentCheck(
    eventName: string,
    allowed: boolean,
    eventType: string,
): void {
    if (process.env.NODE_ENV === "development") {
        console.debug(
            `[GTM Consent] Event "${eventName}" (${eventType}): ${allowed ? "✓ Allowed" : "✗ Blocked"}`,
        );
    }
}
