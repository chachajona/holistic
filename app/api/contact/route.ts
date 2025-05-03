import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, agreed } = body;

        // Basic server-side validation (expand as needed)
        if (!name || !email || !message || !agreed) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // ** TODO: Implement actual processing **
        // - Send email notification (e.g., using Resend, Nodemailer)
        // - Save to database
        // - Integrate with a CRM
        console.log("Received contact form submission:");
        console.log({ name, email, message });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return success response
        return NextResponse.json(
            { message: "Form submitted successfully!" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Contact form API error:", error);
        return NextResponse.json(
            { error: "Failed to submit form" },
            { status: 500 },
        );
    }
}

// Optional: Add a GET handler or other methods if needed
// export async function GET(request: Request) { ... }
