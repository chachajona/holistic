import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { treatmentId, treatmentName, name, phone, note, source } = body;

        // Basic server-side validation
        if (!treatmentId || !treatmentName || !name || !phone) {
            return NextResponse.json(
                { error: "Thiếu thông tin bắt buộc" },
                { status: 400 },
            );
        }

        // Name validation
        if (name.trim().length < 2 || name.trim().length > 100) {
            return NextResponse.json(
                { error: "Tên phải có từ 2-100 ký tự", field: "name" },
                { status: 400 },
            );
        }

        // Vietnamese phone number validation (10-11 digits starting with 0)
        const phoneRegex = /^0[0-9]{9,10}$/;
        if (!phoneRegex.test(phone.trim())) {
            return NextResponse.json(
                { error: "Số điện thoại không hợp lệ", field: "phone" },
                { status: 400 },
            );
        }

        // Note validation (optional, max 500 chars)
        if (note && note.trim().length > 500) {
            return NextResponse.json(
                {
                    error: "Ghi chú không được quá 500 ký tự",
                    field: "note",
                },
                { status: 400 },
            );
        }

        // Initialize Supabase client
        const supabase = await createClient();

        // Insert booking request into contacts table
        const { data, error } = await supabase
            .from("contacts")
            .insert({
                name: name.trim(),
                phone: phone.trim(),
                message: note ? note.trim() : "",
                treatment_id: treatmentId.trim(),
                treatment_name: treatmentName.trim(),
                contact_type: "booking",
                source: source || "services-page",
                status: "pending",
            })
            .select("id")
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: "Không thể lưu yêu cầu đặt lịch" },
                { status: 500 },
            );
        }

        // Log success
        console.log("Booking request submitted:", {
            requestId: data.id,
            treatmentId,
            treatmentName,
            customerName: name.trim(),
            customerPhone: phone.trim(),
            source: source || "services-page",
            timestamp: new Date().toISOString(),
        });

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Đã gửi yêu cầu thành công",
                requestId: data.id,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Booking request API error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "Có lỗi xảy ra, vui lòng thử lại sau";

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
