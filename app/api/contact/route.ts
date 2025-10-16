import { NextResponse } from "next/server";

import { contactDb } from "@/lib/db";
import { sendContactEmail } from "@/lib/email";

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

        // Save submission to database
        const savedSubmission = contactDb.saveSubmission({
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || undefined,
            message: message.trim(),
            agreed: agreed,
        });

        console.log("Contact form submission saved to database:", {
            id: savedSubmission.id,
            name: name.trim(),
            email: email.trim(),
        });

        // Send emails
        const emailResult = await sendContactEmail({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            phone: phone?.trim() || undefined,
        });

        console.log("Contact form submission successful:", {
            name: name.trim(),
            email: email.trim(),
            emailResult,
            dbId: savedSubmission.id,
        });

        // Return success response
        return NextResponse.json(
            {
                message:
                    "Form submitted successfully! We'll get back to you soon.",
                emailId: emailResult.adminId,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Contact form API error:", error);

        // Provide more specific error messages if possible
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to submit form. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// Optional: Add a GET handler or other methods if needed
// export async function GET(request: Request) { ... }
