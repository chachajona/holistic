/**
 * GTM Configuration Validator
 *
 * Validates that GTM is properly configured before attempting to use it
 */

/**
 * GTM ID format: GTM-XXXXXXX
 * Must be alphanumeric with hyphens
 */
const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

/**
 * Validates GTM ID format
 * @param gtmId - The GTM ID to validate (e.g., "GTM-ABC1234")
 * @returns true if valid GTM ID format, false otherwise
 */
export function isValidGTMId(gtmId: unknown): boolean {
    if (!gtmId || typeof gtmId !== "string") {
        return false;
    }

    // Check format: GTM-XXXXXXX
    if (!GTM_ID_PATTERN.test(gtmId)) {
        return false;
    }

    // Check reasonable length (should be GTM-xxxxx, 5-10 chars after GTM-)
    const idPart = gtmId.substring(4); // Remove "GTM-"
    if (idPart.length < 5 || idPart.length > 10) {
        return false;
    }

    return true;
}

/**
 * Validates GTM configuration
 * @returns Object with validation result and error message if invalid
 */
export function validateGTMConfiguration(): {
    isValid: boolean;
    error?: string;
} {
    try {
        // Check if running on server
        if (typeof window === "undefined") {
            return { isValid: false, error: "Running on server" };
        }

        // Check if GTM ID is provided
        const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
        if (!gtmId) {
            return {
                isValid: false,
                error: "NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID not configured",
            };
        }

        // Validate GTM ID format
        if (!isValidGTMId(gtmId)) {
            return {
                isValid: false,
                error: `Invalid GTM ID format: "${gtmId}". Expected format: GTM-XXXXXXX`,
            };
        }

        // Check if dataLayer exists (GTM script loaded)
        if (typeof window.dataLayer === "undefined") {
            return {
                isValid: false,
                error: "GTM script not loaded - dataLayer not found",
            };
        }

        // Check if gtag function exists
        if (typeof window.gtag === "undefined") {
            return {
                isValid: false,
                error: "GTM script not loaded - gtag function not found",
            };
        }

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: `GTM validation failed: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

/**
 * Logs GTM configuration status in development mode
 */
export function logGTMStatus(): void {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const validation = validateGTMConfiguration();
    if (validation.isValid) {
        console.info("✓ GTM is properly configured");
    } else {
        console.warn("✗ GTM Configuration Issue:", validation.error);
    }
}
