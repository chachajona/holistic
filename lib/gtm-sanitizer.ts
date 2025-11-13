/**
 * GTM Event Data Sanitizer
 *
 * Removes Personally Identifiable Information (PII) from error messages
 * before sending to Google Tag Manager to comply with privacy regulations
 * (GDPR, CCPA, etc.)
 */

/**
 * PII patterns to detect and remove
 * Matches: emails, phone numbers, URLs, IP addresses, and common name patterns
 */
const PII_PATTERNS = {
    // Email addresses
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,

    // Phone numbers (multiple formats)
    phone: /(\+?1[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}/g,

    // Vietnamese phone numbers
    vietnamesePhone: /0[0-9]{9,10}/g,

    // URLs
    url: /https?:\/\/[^\s]+/gi,

    // IP addresses
    ipAddress:
        /\b(?:\d{1,3}\.){3}\d{1,3}\b|\b[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){7}\b/gi,

    // Credit card numbers (simple pattern)
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,

    // Social security numbers
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,

    // Postal codes
    postalCode: /\b\d{5}(?:-\d{4})?\b/g,

    // Names preceded by common prefixes (basic pattern)
    userName: /(?:name|user|customer|client):\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/gi,

    // Vietnamese names (common pattern: capital letters separated by space)
    vietnameseName:
        /([A-Z][a-zàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỵỹ]+\s)+[A-Z][a-zàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỵỹ]+/g,

    // Sensitive field names with values
    sensitiveFields:
        /(?:password|secret|token|api_key|apiKey|authorization):\s*[^\s,}]+/gi,
};

/**
 * Replacement patterns - what to replace PII with
 */
const REPLACEMENT = {
    email: "[EMAIL]",
    phone: "[PHONE]",
    vietnamesePhone: "[PHONE]",
    url: "[URL]",
    ipAddress: "[IP]",
    creditCard: "[CARD]",
    ssn: "[SSN]",
    postalCode: "[POSTAL]",
    userName: "name: [NAME]",
    vietnameseName: "[NAME]",
    sensitiveFields: (match: string) => {
        const [key] = match.split(":");
        return `${key}: [REDACTED]`;
    },
};

/**
 * Sanitizes error messages to remove PII
 * @param text - The error message or text to sanitize
 * @returns Sanitized text safe for GTM
 */
export function sanitizeErrorMessage(text: string | unknown): string {
    // Handle non-string inputs
    if (typeof text !== "string") {
        return "unknown_error";
    }

    // Empty or very short strings
    if (!text || text.length === 0) {
        return "unknown_error";
    }

    let sanitized = text;

    // Apply PII patterns in order
    Object.entries(PII_PATTERNS).forEach(([key, pattern]) => {
        const replacement = REPLACEMENT[key as keyof typeof REPLACEMENT];
        if (replacement) {
            if (typeof replacement === "function") {
                sanitized = sanitized.replace(pattern, replacement);
            } else {
                sanitized = sanitized.replace(pattern, replacement);
            }
        }
    });

    // Ensure result is not too long
    if (sanitized.length > 255) {
        sanitized = sanitized.substring(0, 252) + "...";
    }

    return sanitized;
}

/**
 * Sanitizes all error messages in an event data object
 * @param eventData - The event data object to sanitize
 * @returns Sanitized event data safe for GTM
 */
export function sanitizeEventData(
    eventData: Record<string, unknown>,
): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    Object.entries(eventData).forEach(([key, value]) => {
        // Always keep event name as-is
        if (key === "event") {
            sanitized[key] = value;
            return;
        }

        // Sanitize error-related fields
        if (
            key.includes("error") ||
            key.includes("message") ||
            key.includes("description")
        ) {
            sanitized[key] = sanitizeErrorMessage(value);
        } else if (typeof value === "string") {
            // Check if value looks like it could contain PII
            if (
                value.includes("@") ||
                value.includes("http") ||
                value.length > 100
            ) {
                sanitized[key] = sanitizeErrorMessage(value);
            } else {
                sanitized[key] = value;
            }
        } else {
            sanitized[key] = value;
        }
    });

    return sanitized;
}

/**
 * Detects if a string likely contains PII
 * @param text - Text to check
 * @returns true if PII is detected
 */
export function containsPII(text: string): boolean {
    if (!text || typeof text !== "string") {
        return false;
    }

    return Object.values(PII_PATTERNS).some(pattern => pattern.test(text));
}

/**
 * Validates that a value is safe for GTM tracking
 * @param value - Value to check
 * @returns true if value is safe, false if it contains PII
 */
export function isSafeForTracking(value: unknown): boolean {
    if (typeof value === "string") {
        return !containsPII(value);
    }
    if (typeof value === "object" && value !== null) {
        return !Object.values(value).some(
            v => typeof v === "string" && containsPII(v),
        );
    }
    return true;
}
