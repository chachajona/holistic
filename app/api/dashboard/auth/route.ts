import { NextResponse } from "next/server";

// Deprecated route: use /api/auth/login and /api/auth/logout instead
export async function POST() {
    return NextResponse.json(
        { error: "Deprecated endpoint. Use /api/auth/login." },
        { status: 410 },
    );
}

export async function DELETE() {
    return NextResponse.json(
        { error: "Deprecated endpoint. Use /api/auth/logout." },
        { status: 410 },
    );
}
