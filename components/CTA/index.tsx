"use client";

import { WellnessCta } from "./WellnessCta";

// Make this the default export
export default function WellnessCTA({ blurDataURL }: { blurDataURL?: string }) {
    console.log(
        "WellnessCTA rendering with blurDataURL:",
        blurDataURL ? "exists" : "missing",
    );

    return (
        <WellnessCta
            heading="Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!"
            description="Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng."
            primaryButtonText="Schedule an appointment"
            primaryButtonUrl="/schedule"
            theme="blue"
            backgroundImage="/CTA.png"
            blurDataURL={blurDataURL}
        />
    );
}

// Also provide a named export for backwards compatibility
export { WellnessCTA };
