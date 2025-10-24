import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getTestimonials } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";

export async function GET(request: NextRequest) {
    try {
        const locale = request.headers.get("x-locale");
        const validLocale: Locale =
            locale && isValidLocale(locale) ? locale : baseLanguage.id;

        const testimonials = await getTestimonials(validLocale);
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Error in testimonials API route:", error);
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 },
        );
    }
}
