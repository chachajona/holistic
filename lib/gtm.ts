/**
 * Google Tag Manager Event Tracking Utilities
 *
 * This module provides type-safe wrappers for sending events to Google Tag Manager.
 * All functions include:
 * - Error handling to prevent tracking issues from breaking the app
 * - PII sanitization to protect user privacy
 * - Cookie consent checks to respect user preferences
 * - Proper GTM availability validation
 *
 * Use these functions in client components to track user interactions.
 *
 * @example
 * ```tsx
 * 'use client'
 * import { trackButtonClick, trackFormSubmit } from '@/lib/gtm'
 *
 * export function MyButton() {
 *   return (
 *     <button onClick={() => trackButtonClick('cta-button', 'hero-section')}>
 *       Click Me
 *     </button>
 *   )
 * }
 * ```
 */

import { sendGTMEvent } from "@next/third-parties/google";

import { isTrackingAllowed, logConsentCheck } from "./gtm-consent";
import {
    isSafeForTracking,
    sanitizeErrorMessage,
    sanitizeEventData,
} from "./gtm-sanitizer";

/**
 * Helper function to safely execute GTM tracking with error handling
 * Includes:
 * - Event data validation
 * - PII sanitization
 * - Cookie consent checks
 * - Proper GTM/dataLayer availability validation
 * - Development logging
 *
 * Prevents tracking failures from affecting user experience
 */
function safeTrackEvent(
    eventData: Record<string, string | number | boolean>,
    trackingType: "analytics" | "marketing" = "analytics",
): void {
    try {
        // ========== VALIDATION ==========

        // 1. Validate event data structure
        if (!eventData || typeof eventData !== "object") {
            if (process.env.NODE_ENV === "development") {
                console.warn(
                    "GTM: Invalid event data - not an object",
                    eventData,
                );
            }
            return;
        }

        // 2. Ensure event property exists and is a string
        if (!eventData.event || typeof eventData.event !== "string") {
            if (process.env.NODE_ENV === "development") {
                console.warn(
                    "GTM: Invalid event data - missing or invalid event property",
                    eventData,
                );
            }
            return;
        }

        // 3. Check if running on server (SSR)
        if (typeof window === "undefined") {
            return;
        }

        // ========== CONSENT CHECK ==========

        // 4. Verify user has given consent for this tracking type
        if (!isTrackingAllowed(trackingType)) {
            logConsentCheck(eventData.event as string, false, trackingType);
            return;
        }

        // ========== GTM AVAILABILITY ==========

        // 5. Check if GTM is properly initialized
        // Look for window.dataLayer first (more reliable than function check)
        if (typeof window.dataLayer === "undefined") {
            if (process.env.NODE_ENV === "development") {
                console.warn(
                    "GTM: dataLayer not initialized - GTM script may not have loaded",
                );
            }
            return;
        }

        // 6. Verify sendGTMEvent function is available
        if (typeof sendGTMEvent !== "function") {
            if (process.env.NODE_ENV === "development") {
                console.warn(
                    "GTM: sendGTMEvent function not available - Next.js Google integration may not be configured",
                );
            }
            return;
        }

        // ========== SANITIZATION ==========

        // 7. Sanitize event data to remove PII
        let sanitizedData = eventData;
        if (!isSafeForTracking(eventData)) {
            sanitizedData = sanitizeEventData(eventData) as Record<
                string,
                string | number | boolean
            >;
            if (process.env.NODE_ENV === "development") {
                console.debug("GTM: Event data sanitized to remove PII", {
                    original: eventData,
                    sanitized: sanitizedData,
                });
            }
        }

        // ========== SEND EVENT ==========

        // 8. Send to GTM
        sendGTMEvent(sanitizedData);

        // 9. Development logging
        if (process.env.NODE_ENV === "development") {
            logConsentCheck(sanitizedData.event as string, true, trackingType);
            console.debug("[GTM Event]", sanitizedData.event, sanitizedData);
        }
    } catch (error) {
        // ========== ERROR HANDLING ==========

        // Never throw - tracking failures must not break the app
        if (process.env.NODE_ENV === "development") {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            console.warn(
                "GTM tracking error:",
                errorMessage,
                "Event:",
                eventData,
            );
        }
    }
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string) {
    safeTrackEvent({
        event: "button_click",
        button_name: buttonName,
        location: location || "unknown",
    });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(
    formName: string,
    formType: "contact" | "newsletter" | "booking" | "other",
) {
    safeTrackEvent({
        event: "form_submit",
        form_name: formName,
        form_type: formType,
    });
}

/**
 * Track form submission errors
 */
export function trackFormError(
    formName: string,
    formType: "contact" | "newsletter" | "booking" | "other",
    errorMessage?: string,
) {
    safeTrackEvent({
        event: "form_error",
        form_name: formName,
        form_type: formType,
        // Sanitize error message to remove PII
        error_message: sanitizeErrorMessage(errorMessage || "unknown_error"),
    });
}

/**
 * Track page views (for custom tracking beyond default)
 */
export function trackPageView(pagePath: string, pageTitle: string) {
    safeTrackEvent({
        event: "page_view",
        page_path: pagePath,
        page_title: pageTitle,
    });
}

/**
 * Track treatment selections
 */
export function trackTreatmentView(treatmentName: string, treatmentId: string) {
    safeTrackEvent({
        event: "treatment_view",
        treatment_name: treatmentName,
        treatment_id: treatmentId,
    });
}

/**
 * Track service selections
 */
export function trackServiceView(serviceName: string, serviceId: string) {
    safeTrackEvent({
        event: "service_view",
        service_name: serviceName,
        service_id: serviceId,
    });
}

/**
 * Track booking attempts
 */
export function trackBookingStart(serviceType: string, serviceName?: string) {
    safeTrackEvent({
        event: "booking_start",
        service_type: serviceType,
        service_name: serviceName || "unknown",
    });
}

/**
 * Track successful booking submissions
 */
export function trackBookingSubmit(serviceType: string, serviceName?: string) {
    safeTrackEvent({
        event: "booking_submit",
        service_type: serviceType,
        service_name: serviceName || "unknown",
    });
}

/**
 * Track booking submission errors
 */
export function trackBookingError(
    serviceType: string,
    errorMessage?: string,
    serviceName?: string,
) {
    safeTrackEvent({
        event: "booking_error",
        service_type: serviceType,
        service_name: serviceName || "unknown",
        // Sanitize error message to remove PII
        error_message: sanitizeErrorMessage(errorMessage || "unknown_error"),
    });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, location?: string) {
    safeTrackEvent({
        event: "cta_click",
        cta_name: ctaName,
        location: location || "unknown",
    });
}

/**
 * Track custom events with flexible parameters
 */
export function trackCustomEvent(
    eventName: string,
    eventParams?: Record<string, string | number | boolean>,
) {
    safeTrackEvent({
        event: eventName,
        ...(eventParams || {}),
    });
}
