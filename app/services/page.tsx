"use client";

import React from "react";
import { Box, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const services = [
    {
        title: "BẠN ĐANG BỊ ĐAU MỎI CƠ",
        description:
            "Dịch vụ vật lý trị liệu chính hướng của chúng tôi tập trung vào điều trị các bệnh lý và chấn thương cơ xương khớp, giúp bạn giảm đau và cải thiện chức năng.",
    },
    {
        title: "BẠN BỊ CHẤN THƯƠNG",
        description:
            "Các chương trình phục hồi chức năng thể thao của chúng tôi được thiết kế để giúp các vận động viên phục hồi sau chấn thương, nâng cao hiệu quả và ngăn ngừa chấn thương trong tương lai.",
    },
    {
        title: "Phục hồi Sau Phẫu thuật",
        description:
            "Chúng tôi cung cấp dịch vụ chăm sóc chuyên biệt để hỗ trợ quá trình phục hồi của bạn sau phẫu thuật, giúp bạn lấy lại sức mạnh và khả năng vận động.",
    },
];

export default function ServicesPage() {
    const containerRef = React.useRef(null);

    return (
        <div
            ref={containerRef}
            className="bg-primary-background relative w-full py-16 sm:px-16"
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/Paper.png')",
                    filter: "opacity(0.2)",
                }}
            />
            <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                    Gói dịch vụ
                </span>
                <h2 className="font-robotoSerif mb-6 max-w-2xl p-1 text-3xl font-bold capitalize">
                    Dịch vụ Vật lý Trị liệu Toàn diện cho Mọi Nhu cầu
                </h2>
                <p className="font-robotoSlab text-primary-text/50 mb-8 max-w-xl p-1 font-normal">
                    Dịch vụ vật lý trị liệu của chúng tôi đáp ứng nhu cầu đa
                    dạng, bao gồm vật lý trị liệu chỉnh hình, phục hồi chức năng
                    thể thao và phục hồi sau phẫu thuật. Chúng tôi cam kết cung
                    cấp dịch vụ chăm sóc toàn diện và cá nhân hóa để giúp bạn
                    lấy lại sức mạnh và khả năng vận động.
                </p>
            </div>

            <div className="container relative z-10 mt-10 grid gap-8 lg:grid-cols-3">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="border-primary-text group flex cursor-pointer flex-col items-center justify-start rounded-lg border bg-transparent p-6 shadow-md transition-all hover:bg-[#D2C9C3] hover:shadow-lg"
                    >
                        <Box className="text-primary-text mb-4 size-12" />
                        <h3 className="font-robotoSerif text-primary-text mb-6 text-center text-3xl font-bold">
                            {service.title}
                        </h3>
                        <p className="font-robotoSlab text-primary-text text-center text-base">
                            {service.description}
                        </p>
                    </div>
                ))}
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
        </div>
    );
}
