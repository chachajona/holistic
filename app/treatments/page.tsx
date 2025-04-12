"use client";

import React, { useEffect, useState } from "react";
import acupuncture from "@/assets/images/acupuncture.jpg";
import exercise from "@/assets/images/Exercise.jpg";
import stretching from "@/assets/images/Stretching.jpg";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/PageLoaderWrapper";
import SwiperCarousel from "@/components/SwiperCarousel";

const treatments = [
    {
        title: "Giác hơi",
        href: "/treatments/cupping",
        description:
            "Giác hơi là phương pháp y học cổ truyền sử dụng cốc để tạo áp lực hút trên da, giúp tăng cường lưu thông máu, giảm đau nhức cơ và cải thiện sức khỏe tổng thể.",
        image: stretching,
    },
    {
        title: "Tapping",
        href: "/treatments/tapping",
        description:
            "Tapping, hay còn gọi là Emotional Freedom Technique (EFT), kết hợp giữa việc gõ nhẹ vào các huyệt đạo trên cơ thể và thực hành tâm lý để giảm căng thẳng, lo âu và tăng cường tinh thần.",
        image: exercise,
    },
    {
        title: "Đèn hồng ngoại",
        href: "/treatments/heat-light",
        description:
            "Liệu pháp đèn hồng ngoại sử dụng ánh sáng nhiệt để thâm nhập sâu vào mô cơ thể, kích thích tuần hoàn máu, giảm viêm, và giúp phục hồi các tổn thương mô mềm.",
        image: acupuncture,
    },
    {
        title: "Cao mạc (IASTM)",
        href: "/treatments/iastm",
        description:
            "IASTM (Công cụ kích thích mô mềm) là phương pháp sử dụng dụng cụ chuyên dụng để giảm đau cơ, tăng tính linh hoạt và cải thiện hiệu quả vận động.",
        image: acupuncture,
    },
    {
        title: "Ngâm lạnh",
        href: "/treatments/cold-plunge",
        description:
            "Phương pháp ngâm mình trong nước lạnh để giảm sưng, đau nhức cơ và tăng cường hồi phục.",
        image: stretching,
    },
    {
        title: "Châm khô",
        href: "/treatments/dry-needling",
        description:
            "Kỹ thuật sử dụng kim nhỏ để kích thích điểm co thắt cơ và giảm đau mãn tính.",
        image: stretching,
    },
];

export default function TreatmentsPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageLoaderWrapper
            isContentLoaded={isContentLoaded}
        >
            <div className="bg-primary-background relative w-full py-16 sm:px-16">
                <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                    <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                        Khám phá
                    </span>
                    <h2 className="font-robotoSerif mb-6 max-w-2xl p-1 text-3xl font-bold capitalize">
                        Các phương pháp điều trị toàn diện cho sự phục hồi tối
                        ưu
                    </h2>
                    <p className="font-robotoSlab text-primary-text/50 mb-8 max-w-xl p-1 font-normal">
                        Các phương pháp điều trị vật lý trị trị liệu của chúng
                        tôi bao gồm một lọa các giải pháp để đáp ứng nhu cầu
                        riêng của bạn. Từ liệu pháp thủ công đến điện châm,
                        chúng tôi sẽ giúp bạn tạo ra một phương pháp điều trị cá
                        nhân hóa để giúp bạn đạt được sự phục hồi tối ưu.
                    </p>
                </div>
                <div className="font-robotoSerif text-primary-text relative z-10 mt-12 flex flex-row items-center justify-center text-center font-normal">
                    <Button
                        variant={"outline"}
                        className="border-primary-text text-primary-text hover:bg-primary-text bg-transparent hover:text-white"
                    >
                        Tìm hiểu thêm
                    </Button>
                    <Button
                        variant={"link"}
                        className="text-primary-text group flex flex-row"
                    >
                        Đặt lịch hẹn
                        <ChevronRight className="animate-shake ml-2 size-4" />
                    </Button>
                </div>
                <div className="mt-12">
                    <SwiperCarousel
                        items={treatments.map(treatment => ({
                            ...treatment,
                            image: treatment.image.src,
                            link: treatment.href,
                        }))}
                    />
                </div>
            </div>
        </PageLoaderWrapper>
    );
}
