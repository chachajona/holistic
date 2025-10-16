import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phoneNumber, email } = body;

        // Server-side validation
        if (!phoneNumber || typeof phoneNumber !== "string") {
            return NextResponse.json(
                { error: "Phone number is required" },
                { status: 400 },
            );
        }

        // Phone number validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phoneNumber) || phoneNumber.trim().length < 8) {
            return NextResponse.json(
                { error: "Invalid phone number format" },
                { status: 400 },
            );
        }

        // Email validation (optional)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: "Invalid email address" },
                    { status: 400 },
                );
            }
        }

        const sanitizedPhoneNumber = phoneNumber.trim();
        const sanitizedEmail = email?.trim() || null;

        // Initialize Supabase client
        const supabase = await createClient();

        // Insert newsletter subscription into Supabase
        const { error } = await supabase.from("newsletter_subscribers").insert({
            phone_number: sanitizedPhoneNumber,
            email: sanitizedEmail,
        });

        if (error) {
            // Handle unique constraint violation (duplicate phone number)
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "This phone number is already subscribed" },
                    { status: 409 },
                );
            }

            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: "Failed to save subscription" },
                { status: 500 },
            );
        }

        // Log success
        console.log("Newsletter subscription saved:", {
            phone: sanitizedPhoneNumber,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                message: "Successfully subscribed to newsletter!",
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Newsletter subscription API error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to subscribe to newsletter. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
