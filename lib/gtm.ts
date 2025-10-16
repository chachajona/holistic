/**
 * Google Tag Manager Event Tracking Utilities
 *
 * This module provides type-safe wrappers for sending events to Google Tag Manager.
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

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string) {
    sendGTMEvent({
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
    sendGTMEvent({
        event: "form_submit",
        form_name: formName,
        form_type: formType,
    });
}

/**
 * Track page views (for custom tracking beyond default)
 */
export function trackPageView(pagePath: string, pageTitle: string) {
    sendGTMEvent({
        event: "page_view",
        page_path: pagePath,
        page_title: pageTitle,
    });
}

/**
 * Track treatment selections
 */
export function trackTreatmentView(treatmentName: string, treatmentId: string) {
    sendGTMEvent({
        event: "treatment_view",
        treatment_name: treatmentName,
        treatment_id: treatmentId,
    });
}

/**
 * Track service selections
 */
export function trackServiceView(serviceName: string, serviceId: string) {
    sendGTMEvent({
        event: "service_view",
        service_name: serviceName,
        service_id: serviceId,
    });
}

/**
 * Track booking attempts
 */
export function trackBookingStart(
    serviceType: string,
    serviceName?: string,
) {
    sendGTMEvent({
        event: "booking_start",
        service_type: serviceType,
        service_name: serviceName || "unknown",
    });
}

/**
 * Track custom events with flexible parameters
 */
export function trackCustomEvent(
    eventName: string,
    eventParams?: Record<string, string | number | boolean>,
) {
    sendGTMEvent({
        event: eventName,
        ...eventParams,
    });
}
