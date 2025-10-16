import { NextResponse } from "next/server";

import { newsletterDb, type NewsletterSubscriber } from "@/lib/db";

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
        const sanitizedEmail = email?.trim();

        // Check if subscriber already exists
        const existingSubscriber =
            newsletterDb.getSubscriberByPhone(sanitizedPhoneNumber);

        let subscriber: NewsletterSubscriber;
        if (existingSubscriber) {
            // Update existing subscriber
            subscriber = newsletterDb.addSubscriber(
                sanitizedPhoneNumber,
                sanitizedEmail,
            );
            console.log("Newsletter subscription updated:", {
                phone: sanitizedPhoneNumber,
                email: sanitizedEmail,
                action:
                    existingSubscriber.email !== sanitizedEmail
                        ? "email updated"
                        : "already existed",
            });

            return NextResponse.json(
                {
                    message: "Newsletter subscription updated successfully!",
                    subscriberId: subscriber.id,
                    isNew: false,
                },
                { status: 200 },
            );
        } else {
            // Add new subscriber
            subscriber = newsletterDb.addSubscriber(
                sanitizedPhoneNumber,
                sanitizedEmail,
            );
            console.log("New newsletter subscription:", {
                phone: sanitizedPhoneNumber,
                email: sanitizedEmail,
                id: subscriber.id,
            });

            return NextResponse.json(
                {
                    message: "Successfully subscribed to newsletter!",
                    subscriberId: subscriber.id,
                    isNew: true,
                },
                { status: 201 },
            );
        }
    } catch (error) {
        console.error("Newsletter subscription API error:", error);

        // Provide more specific error messages if possible
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to subscribe to newsletter. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// GET endpoint for admin purposes (optional)
export async function GET() {
    try {
        // This could be protected by admin authentication in production
        const subscribers = newsletterDb.getAllSubscribers();

        return NextResponse.json({
            subscribers,
            count: subscribers.length,
        });
    } catch (error) {
        console.error("Newsletter GET API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscribers" },
            { status: 500 },
        );
    }
}
