"use client";

import { StaticCta } from "./StaticCta";

export default function StaticCTAClient({
    blurDataURL,
}: {
    blurDataURL?: string;
}) {
    return (
        <StaticCta
            heading="Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!"
            description="Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng."
            primaryButtonText="Đặt lịch ngay với chúng tôi"
            primaryButtonUrl="/booking"
            theme="blue"
            backgroundImage="/CTA.png"
            blurDataURL={blurDataURL}
        />
    );
}

export { StaticCTAClient };
