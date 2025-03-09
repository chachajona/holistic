import { NextResponse } from "next/server";

import { getTestimonials } from "@/lib/api";

export async function GET() {
    try {
        const testimonials = await getTestimonials();
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Error in testimonials API route:", error);
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 },
        );
    }
}
