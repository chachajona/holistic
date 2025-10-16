import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, message } = body;

        // Basic server-side validation
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Phone number validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.trim().length < 8) {
            return NextResponse.json(
                { error: "Invalid phone number format" },
                { status: 400 },
            );
        }

        // Initialize Supabase client
        const supabase = await createClient();

        // Insert contact into Supabase
        const { error } = await supabase.from("contacts").insert({
            name: name.trim(),
            phone: phone.trim(),
            message: message.trim(),
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: "Failed to save contact information" },
                { status: 500 },
            );
        }

        // Log success
        console.log("Contact form submission saved:", {
            name: name.trim(),
            phone: phone.trim(),
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
