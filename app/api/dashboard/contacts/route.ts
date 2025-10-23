import { NextResponse } from "next/server";

import { sanitizeSearchTerm } from "@/lib/security/sanitization";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rawSearch = searchParams.get("search") || "";
        const sanitizedSearch = sanitizeSearchTerm(rawSearch);

        const supabase = await createClient();

        let query = supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100);

        if (sanitizedSearch) {
            const searchPattern = `%${sanitizedSearch}%`;
            query = query.or(
                `name.ilike.${searchPattern},phone.ilike.${searchPattern},message.ilike.${searchPattern}`,
            );
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching contacts:", error);
            return NextResponse.json(
                { error: "Failed to fetch contacts" },
                { status: 500 },
            );
        }

        return NextResponse.json({ contacts: data }, { status: 200 });
    } catch (error) {
        console.error("Dashboard contacts API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch contacts" },
            { status: 500 },
        );
    }
}
