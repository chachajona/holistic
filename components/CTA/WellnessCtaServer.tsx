import { getBlurDataUrl } from "@/lib/server/image-processing";

import { WellnessCta } from "./WellnessCta";

export async function WellnessCtaServer() {
    const blurDataURL = await getBlurDataUrl("/CTA.png", false);

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

export default WellnessCtaServer;
