import { NextResponse } from "next/server";

// Deprecated: Superseded by Supabase session handling in middleware
export async function POST() {
    return NextResponse.json({ error: "Deprecated endpoint" }, { status: 410 });
}
