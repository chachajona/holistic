"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import massage from "@/assets/images/Massage.jpg";
import { ChevronRight } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

export default function AboutPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div>
                <section className="bg-brown-50 container mx-auto w-full py-6 md:px-16 md:py-8">
                    <div className="my-6 flex flex-col items-start justify-between md:flex-row">
                        <div className="max-w-lg md:w-1/2">
                            <span className="bg-primary-text/10 font-robotoMono text-primary-text mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                                Thống kê
                            </span>
                            <h2 className="font-robotoSerif text-primary-text mb-2 text-2xl font-bold capitalize md:text-5xl">
                                Cung cấp dịch vụ vật lý trị liệu vượt trội
                            </h2>
                        </div>
                        <div className="flex flex-col justify-between gap-5 md:w-1/2">
                            <p className="font-robotoSlab mb-4 text-base text-[#5a5a5a]">
                                Tại phòng khám của chúng tôi, chúng tôi chú
                                trọng đến sự phát triển, thành công và phục hồi
                                của bệnh nhân. Với nhiều năm kinh nghiệm, chúng
                                tôi đã giúp nhiều khách hàng đạt được mục tiêu
                                và cải thiện chất lượng cuộc sống của họ.
                            </p>
                            <div className="text-primary-text mb-4 flex justify-between">
                                <div>
                                    <p className="font-robotoSerif text-4xl font-bold">
                                        50%
                                    </p>
                                    <p className="font-robotoSlab text-sm">
                                        Tỷ lệ thành công
                                    </p>
                                </div>
                                <div>
                                    <p className="font-robotoSerif text-4xl font-bold">
                                        50%
                                    </p>
                                    <p className="font-robotoSlab text-sm">
                                        Khách hàng hài lòng
                                    </p>
                                </div>
                            </div>
                            <div className="font-robotoSerif text-primary-text flex space-x-4 text-sm">
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
                        </div>
                    </div>
                    <div className="relative max-h-screen w-full">
                        <AspectRatio
                            ratio={1 / 1}
                            className="relative max-h-screen w-full"
                        >
                            <Image
                                src={massage}
                                alt="Physical therapist working on a patient"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-lg object-cover"
                            />
                        </AspectRatio>
                    </div>
                </section>
            </div>
        </PageLoaderWrapper>
    );
}
