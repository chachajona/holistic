import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
    try {
        const { phoneNumber } = await request.json();

        const doc = {
            _type: "contactSubmission",
            phoneNumber,
            submittedAt: new Date().toISOString(),
        };

        await client.create(doc);

        return NextResponse.json(
            { message: "Contact submission created successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error creating contact submission:", error);
        return NextResponse.json(
            { message: "Error creating contact submission" },
            { status: 500 },
        );
    }
}
