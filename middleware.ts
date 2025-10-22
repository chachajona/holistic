import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Only apply middleware to /dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        // Check if user is authenticated via cookie
        const isAuthenticated = request.cookies.get("dashboard-auth");

        // If not authenticated and not on login page, redirect to login
        if (!isAuthenticated && !request.nextUrl.pathname.includes("/login")) {
            const loginUrl = new URL("/dashboard/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        // If authenticated and trying to access login page, redirect to dashboard
        if (
            isAuthenticated &&
            request.nextUrl.pathname.includes("/login")
        ) {
            const dashboardUrl = new URL("/dashboard", request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*",
};
