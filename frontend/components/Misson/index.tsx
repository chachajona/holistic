import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronRight } from "lucide-react";

import misson from "@/assets/images/Misson.jpg";
import { About } from "@/assets/icons";

const Misson = () => {
    return (
        <section className="container mx-auto flex flex-col items-start xl:items-center justify-between bg-brown-50 py-6 md:px-16 md:py-8 lg:flex-row">
            <div className="mb-8  lg:mb-0 xl:w-1/2 xl:max-w-lg">
                <div className="text-primary-text">
                    <About className="h-16 w-16 md:h-28 md:w-28" />
                </div>
                <h1 className="mb-4 font-robotoSerif text-3xl font-bold capitalize text-primary-text lg:text-5xl lg:leading-tight">
                    Cung cấp dịch vụ vật lý trị liệu chất lượng từ năm 2005
                </h1>
                <p className="mb-6 font-robotoSlab text-base text-brown-600 md:text-lg">
                    Tại phòng khám vật lý trị liệu của chúng tôi, chúng tôi đã
                    tận tâm giúp bệnh nhân phục hồi và cải thiện chất lượng cuộc
                    sống hơn 15 năm qua. Đội ngũ chuyên viên giàu kinh nghiệm
                    của chúng tôi cam kết cung cấp sự chăm sóc cá nhân hóa và
                    các kế hoạch điều trị hiệu quả nhằm giải quyết nhiều loại
                    bệnh lý và chấn thương.
                </p>
                <div className="flex space-x-4 font-robotoSerif text-sm text-primary-text">
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
            <div className="w-full min-w-xs xl:w-1/2">
                <AspectRatio
                    ratio={1 / 1}
                    className="relative h-full w-full rounded-lg"
                >
                    <Image
                        src={misson}
                        alt="Physical therapist working with a patient"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </AspectRatio>
            </div>
        </section>
    );
};

export default Misson;
