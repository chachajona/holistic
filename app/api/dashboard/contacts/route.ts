import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    try {
        // Parse search parameters
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";

        // Initialize Supabase client
        const supabase = await createClient();

        // Build query with search filter
        let query = supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });

        // Apply search filter if provided
        if (search) {
            query = query.or(
                `name.ilike.%${search}%,phone.ilike.%${search}%,message.ilike.%${search}%`,
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
