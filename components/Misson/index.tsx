import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronRight } from "lucide-react";

import misson from "@/assets/images/Misson.jpg";
import { About } from "@/assets/icons";

const Misson = () => {
    return (
        <section className="bg-brown-50 container mx-auto flex flex-col items-start justify-between py-6 md:px-16 md:py-8 lg:flex-row xl:items-center">
            <div className="mb-8  lg:mb-0 xl:w-1/2 xl:max-w-lg">
                <div className="text-primary-text">
                    <About className="size-16 md:size-28" />
                </div>
                <h1 className="font-robotoSerif text-primary-text mb-4 text-3xl font-bold capitalize lg:text-5xl lg:leading-tight">
                    Cung cấp dịch vụ vật lý trị liệu chất lượng từ năm 2005
                </h1>
                <p className="font-robotoSlab text-brown-600 mb-6 text-base md:text-lg">
                    Tại phòng khám vật lý trị liệu của chúng tôi, chúng tôi đã
                    tận tâm giúp bệnh nhân phục hồi và cải thiện chất lượng cuộc
                    sống hơn 15 năm qua. Đội ngũ chuyên viên giàu kinh nghiệm
                    của chúng tôi cam kết cung cấp sự chăm sóc cá nhân hóa và
                    các kế hoạch điều trị hiệu quả nhằm giải quyết nhiều loại
                    bệnh lý và chấn thương.
                </p>
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
            <div className="min-w-xs w-full xl:w-1/2">
                <AspectRatio
                    ratio={1 / 1}
                    className="relative size-full rounded-lg"
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
