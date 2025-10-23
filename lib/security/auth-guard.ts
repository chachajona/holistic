import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function requireAuth(request: NextRequest) {
    const token = await getToken({
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized - Authentication required" },
            { status: 401 },
        );
    }

    return token;
}

export function logSecurityEvent(event: {
    type:
        | "auth_failure"
        | "rate_limit"
        | "sql_injection_attempt"
        | "csrf_blocked"
        | "unauthorized_access";
    severity: "low" | "medium" | "high" | "critical";
    user?: string;
    ip?: string;
    path?: string;
    details?: Record<string, any>;
}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        ...event,
    };

    if (event.severity === "critical" || event.severity === "high") {
        console.error("[SECURITY]", JSON.stringify(logEntry));
    } else {
        console.warn("[SECURITY]", JSON.stringify(logEntry));
    }
}
