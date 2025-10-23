import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { baseLanguage, isValidLocale } from "./lib/i18n/languages";
import { logSecurityEvent } from "./lib/security/auth-guard";
import { validateOrigin } from "./lib/security/csrf-protection";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // CSRF protection for state-changing methods
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
        if (!validateOrigin(request)) {
            const ip =
                request.headers.get("x-forwarded-for") ||
                request.headers.get("x-real-ip") ||
                "unknown";

            logSecurityEvent({
                type: "csrf_blocked",
                severity: "high",
                path: request.nextUrl.pathname,
                ip,
                details: {
                    origin: request.headers.get("origin"),
                    host: request.headers.get("host"),
                },
            });

            return NextResponse.json(
                { error: "Invalid request origin" },
                { status: 403 },
            );
        }
    }

    // Locale detection - applies to all routes
    let locale = request.cookies.get("NEXT_LOCALE")?.value || baseLanguage.id;

    // Fallback to Accept-Language header if cookie not set
    if (!isValidLocale(locale)) {
        const acceptLanguage = request.headers.get("accept-language");
        const browserLang = acceptLanguage?.split(",")[0]?.split("-")[0];
        locale =
            browserLang && isValidLocale(browserLang)
                ? browserLang
                : baseLanguage.id;
    }

    // Set locale in header for server components
    response.headers.set("x-locale", locale);

    // Dashboard API authentication - protect /api/dashboard/* routes
    if (request.nextUrl.pathname.startsWith("/api/dashboard")) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (!token) {
            logSecurityEvent({
                type: "unauthorized_access",
                severity: "critical",
                path: request.nextUrl.pathname,
                ip,
            });

            return NextResponse.json(
                { error: "Unauthorized - Authentication required" },
                { status: 401 },
            );
        }

        // Log authenticated dashboard API access for audit trail
        if (process.env.NODE_ENV === "production") {
            logSecurityEvent({
                type: "auth_failure",
                severity: "low",
                user: token.email as string,
                path: request.nextUrl.pathname,
                ip,
                details: {
                    method: request.method,
                },
            });
        }
    }

    // Dashboard UI authentication via NextAuth - only for /dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        const isAuthed = !!token;

        if (!isAuthed && request.nextUrl.pathname !== "/dashboard/login") {
            const loginUrl = new URL("/dashboard/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        if (isAuthed && request.nextUrl.pathname === "/dashboard/login") {
            const dashboardUrl = new URL("/dashboard", request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Match all routes except static files
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*|studio).*)",
        // Explicitly match API routes for CSRF and auth protection
        "/api/:path*",
    ],
};
