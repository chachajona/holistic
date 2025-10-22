import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Check password against environment variable
        const correctPassword = process.env.DASHBOARD_PASSWORD || "admin123";

        if (password !== correctPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 },
            );
        }

        // Create response with auth cookie
        const response = NextResponse.json(
            { message: "Authentication successful" },
            { status: 200 },
        );

        // Set secure HTTP-only cookie (expires in 24 hours)
        response.cookies.set("dashboard-auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (error) {
        console.error("Dashboard auth error:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 },
        );
    }
}

export async function DELETE() {
    // Logout endpoint - clear the auth cookie
    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 },
    );

    response.cookies.delete("dashboard-auth");

    return response;
}
