import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import massage from "@/assets/images/Massage.jpg";

export default function AboutPage() {
    return (
        <div>
            <section className="container mx-auto w-full bg-brown-50 md:px-16">
                <div className="my-6 flex flex-col md:flex-row items-start justify-between">
                    <div className="md:w-1/2 max-w-lg">
                        <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light text-primary-text ">
                            Thống kê
                        </span>
                        <h2 className="mb-2 font-bold font-robotoSerif text-2xl text-primary-text md:text-5xl capitalize">
                            Cung cấp dịch vụ vật lý trị liệu vượt trội
                        </h2>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-between gap-5">
                        <p className="mb-4 text-base text-[#5a5a5a] font-robotoSlab">
                            Tại phòng khám của chúng tôi, chúng tôi chú trọng đến sự phát triển, thành công và phục hồi của bệnh nhân. Với nhiều năm kinh nghiệm, chúng tôi đã giúp nhiều khách hàng đạt được mục tiêu và cải thiện chất lượng cuộc sống của họ.
                        </p>
                        <div className="mb-4 flex justify-between text-primary-text">
                            <div>
                                <p className="text-4xl font-bold  font-robotoSerif">50%</p>
                                <p className="text-sm  font-robotoSlab">Tỷ lệ thành công</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold  font-robotoSerif">50%</p>
                                <p className="text-sm font-robotoSlab">Khách hàng hài lòng</p>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-sm text-primary-text">
                            <Button
                                variant={"outline"}
                                className="border-primary-text bg-transparent text-primary-text hover:bg-primary-text hover:text-white"
                            >
                                Tìm hiểu thêm
                            </Button>
                            <Button
                                variant={"link"}
                                className="group flex flex-row text-primary-text"
                            >
                                Đặt lịch hẹn
                                <ChevronRight className="ml-2 h-4 w-4 animate-shake" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-h-screen">
                    <AspectRatio ratio={1 / 1} className="relative max-h-screen w-full">
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
    );
}
