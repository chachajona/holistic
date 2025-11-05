"use client";

import { useLocale } from "@/providers/LocaleProvider";

import { CTAData } from "@/types/sanity";
import { getLocalizedString } from "@/lib/i18n/utils";
import { getSanityImageUrl } from "@/lib/sanity-image";

import { StaticCta } from "./StaticCta";
import { WellnessCta } from "./WellnessCta";

// Interface for the wrapper component's props
interface WellnessCTAWrapperProps {
    blurDataURL?: string;
    onImageLoaded?: () => void;
}

interface StaticCTAProps {
    onImageLoaded?: () => void;
    ctaData?: CTAData | null;
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

export function StaticCTA({ onImageLoaded, ctaData }: StaticCTAProps) {
    const { locale } = useLocale();

    // Use Sanity localized data if available, otherwise fallback to hardcoded defaults
    const heading = ctaData?.heading
        ? (getLocalizedString(ctaData.heading, locale) ??
          "Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!")
        : "Bắt đầu hành trình sức khỏe của bạn ngay hôm nay!";

    const description = ctaData?.description
        ? (getLocalizedString(ctaData.description, locale) ??
          "Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng.")
        : "Bắt đầu hành trình cải thiện sức khỏe cùng dịch vụ vật lý trị liệu chuyên gia của chúng tôi. Lên lịch hẹn ngay để phục hồi nhanh chóng.";

    const primaryButtonText = ctaData?.primaryButtonText
        ? (getLocalizedString(ctaData.primaryButtonText, locale) ??
          "Đặt lịch ngay với chúng tôi")
        : "Đặt lịch ngay với chúng tôi";

    const primaryButtonUrl = ctaData?.primaryButtonUrl ?? "/booking";
    const theme = (ctaData?.theme as "blue" | "light" | "dark") ?? "blue";

    // Get therapy image from Sanity or fallback to local image
    const therapyImage = ctaData?.therapyImage
        ? getSanityImageUrl(ctaData.therapyImage, {
              width: 800,
              quality: 85,
          }) || "/Therapy.jpg"
        : "/Therapy.jpg";

    return (
        <StaticCta
            heading={heading}
            description={description}
            primaryButtonText={primaryButtonText}
            primaryButtonUrl={primaryButtonUrl}
            theme={theme}
            backgroundImage="/CTA.png"
            therapyImage={therapyImage}
            onImageLoaded={onImageLoaded}
        />
    );
}
