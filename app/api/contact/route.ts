import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, phone, agreed } = body;

        // Basic server-side validation
        if (!name || !email || !message || !agreed) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 },
            );
        }

        // Log the submission for now (will implement email/database later)
        console.log("Contact form submission:", {
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || "Not provided",
            message: message.trim(),
            timestamp: new Date().toISOString(),
        });

        // Return success response
        return NextResponse.json(
            {
                message:
                    "Form submitted successfully! We'll get back to you soon.",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Contact form API error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to submit form. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
