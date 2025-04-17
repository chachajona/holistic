"use client";

import { StaticCta } from "./StaticCta";
import { WellnessCta } from "./WellnessCta";

// Interface for the wrapper component's props
interface WellnessCTAWrapperProps {
    blurDataURL?: string;
    onImageLoaded?: () => void;
}

export function WellnessCTA({
    blurDataURL,
    onImageLoaded,
}: WellnessCTAWrapperProps) {
    return (
        <WellnessCta
            heading="Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!"
            description="Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng."
            primaryButtonText="Đặt lịch ngay với chúng tôi"
            primaryButtonUrl="/booking"
            theme="blue"
            backgroundImage="/CTA.png"
            blurDataURL={blurDataURL}
            onImageLoaded={onImageLoaded} // Pass the callback down
        />
    );
}

export function StaticCTA({
    blurDataURL,
    onImageLoaded,
}: WellnessCTAWrapperProps) {
    return (
        <StaticCta
            heading="Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!"
            description="Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng."
            primaryButtonText="Đặt lịch ngay với chúng tôi"
            primaryButtonUrl="/booking"
            theme="blue"
            backgroundImage="/CTA.png"
            blurDataURL={blurDataURL}
            onImageLoaded={onImageLoaded}
        />
    );
}
