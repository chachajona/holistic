import type { NextRequest } from "next/server";

export function validateOrigin(request: NextRequest): boolean {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host) {
        try {
            const originUrl = new URL(origin);
            const isValidOrigin = originUrl.host === host;

            if (!isValidOrigin) {
                console.warn(
                    `[CSRF] Invalid origin detected: ${origin} !== ${host}`,
                );
            }

            return isValidOrigin;
        } catch (error) {
            console.error("[CSRF] Failed to parse origin:", error);
            return false;
        }
    }

    const referer = request.headers.get("referer");
    if (referer && host) {
        try {
            const refererUrl = new URL(referer);
            return refererUrl.host === host;
        } catch {
            return false;
        }
    }

    return false;
}
