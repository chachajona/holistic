import { getBlurDataUrl } from "@/lib/server/image-processing";

import { StaticCta } from "./StaticCta";

export async function StaticCtaServer() {
    const blurDataURL = await getBlurDataUrl("/CTA.png", false);

    return (
        <StaticCta
            heading="Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!"
            description="Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng."
            primaryButtonText="Đặt lịch ngay với chúng tôi"
            primaryButtonUrl="/schedule"
            theme="blue"
            backgroundImage="/CTA.png"
            blurDataURL={blurDataURL}
        />
    );
}
