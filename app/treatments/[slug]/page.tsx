import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock } from "lucide-react";
import Markdown from "react-markdown";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TreatmentBooking {
    title: string;
    price: number;
    duration: string;
    description: string;
}

interface Treatment {
    title: string;
    description: string;
    fullDescription: string;
    image?: string;
    content: string;
    booking?: TreatmentBooking[];
}

const treatmentDetails: Record<string, Treatment> = {
    cupping: {
        title: "Giác hơi",
        description:
            "Phương pháp sử dụng lực hút chân không để giảm đau và thư giãn cơ bắp.",
        fullDescription: `Giác hơi là một phương pháp điều trị truyền thống hiệu quả, sử dụng các chén hút để tạo ra lực hút chân không trên bề mặt da. Phương pháp này giúp cải thiện tuần hoàn máu, giảm đau và thư giãn cơ bắp một cách tự nhiên.`,
        image: "https://images.unsplash.com/photo-1598555748505-ccca0d9b9f7b?q=80&w=1497&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: `
### Giác Hơi: Bí Quyết Chăm Sóc Sức Khỏe & Thư Giãn Hiệu Quả

**Giác hơi hoạt động qua 3 giai đoạn chính:**
1. **Kích thích tuần hoàn máu**
2. **Loại bỏ độc tố**
3. **Thư giãn cơ thể và tinh thần**

### Cơ Chế Hoạt Động Của Giác Hơi
Giác hơi sử dụng lực hút từ các cốc chuyên dụng để tạo áp lực âm trên bề mặt da. Quá trình này thúc đẩy lưu thông máu, kích thích hệ bạch huyết và tăng cường khả năng tự phục hồi của cơ thể. Ngoài ra, giác hơi giúp giảm căng cơ, đau nhức và giải phóng độc tố tích tụ lâu ngày.

**Các yếu tố làm nên hiệu quả vượt trội của liệu pháp giác hơi:**
- **Tăng tuần hoàn máu:** Đưa oxy và dưỡng chất đến các vùng cơ thể bị tổn thương.
- **Thải độc:** Giúp loại bỏ chất độc tích tụ trong cơ thể qua da và hệ bạch huyết.
- **Thư giãn:** Giảm căng thẳng, cải thiện chất lượng giấc ngủ và nâng cao sức khỏe tinh thần.

### Lợi Ích Nổi Bật Của Giác Hơi
Giác hơi là một liệu pháp đa năng, phù hợp để giải quyết nhiều vấn đề về sức khỏe và cơ thể, bao gồm:

- **Giảm đau nhức cơ và khớp:** Hiệu quả đối với đau lưng, đau vai gáy và viêm khớp.
- **Giảm căng thẳng:** Giúp thư giãn cơ bắp, giảm lo âu và căng thẳng mệt mỏi.
- **Hỗ trợ tuần hoàn máu:** Thúc đẩy tuần hoàn máu và giải độc cơ thể.
- **Cải thiện làn da:** Làm giảm mụn, cải thiện sắc tố da và hỗ trợ giảm viêm nhiễm.
- **Tăng cường hệ miễn dịch:** Thúc đẩy cơ thể khỏe mạnh từ bên trong.

**Giác hơi hiệu quả với các tình trạng:**
- Đau cơ và căng cứng cơ
- Căng thẳng và mất ngủ
- Mệt mỏi kéo dài
- Các vấn đề về tuần hoàn máu
- Làn da mụn, viêm và xỉn màu

### Chi Phí Dịch Vụ Giác Hơi

- **Giác hơi mặt:** 400.000 VNĐ
- **Giác hơi toàn thân:** 600.000 VNĐ
- **Gói trị liệu 5 buổi:** 2.500.000 VNĐ (tiết kiệm 500.000 VNĐ)
- **Ưu đãi đặc biệt:** 1 buổi đầu tiên chỉ còn 350.000 VNĐ (tiết kiệm 50.000 VNĐ)`,
        booking: [
            {
                title: "Giác hơi mặt",
                price: 400000,
                duration: "30 phút",
                description:
                    "Liệu trình giác hơi tập trung vào các điểm trên khuôn mặt, giúp cải thiện tuần hoàn máu, giảm căng thẳng cơ mặt và làm sáng da một cách tự nhiên.",
            },
            {
                title: "Giác hơi toàn thân",
                price: 600000,
                duration: "60 phút",
                description:
                    "Dịch vụ giác hơi toàn thân giúp thư giãn cơ bắp, tăng cường tuần hoàn máu khắp cơ thể và hỗ trợ giải tỏa mệt mỏi hiệu quả.",
            },
            {
                title: "Gói trị liệu 5 buổi",
                price: 2500000,
                duration: "5 buổi",
                description:
                    "Gói trị liệu chuyên sâu gồm 5 buổi giác hơi, mang lại hiệu quả lâu dài trong việc giảm đau nhức, cải thiện sức khỏe và tăng cường thể trạng.",
            },
        ],
    },
    tapping: {
        title: "Tapping",
        description:
            "Phương pháp gõ nhẹ nhằm kích thích các cơ và dây thần kinh, giúp giảm căng thẳng và cải thiện tuần hoàn.",
        fullDescription: `Taping là kỹ thuật trị liệu đơn giản nhưng hiệu quả, sử dụng động tác gõ nhẹ để kích thích các điểm huyệt và đường kinh lạc trên cơ thể. Phương pháp này giúp cân bằng năng lượng và giảm căng thẳng.`,
        content: "",
        booking: [
            {
                title: "Tapping cơ bản",
                price: 450000,
                duration: "45 phút",
                description:
                    "Liệu trình taping cơ bản tập trung vào việc gõ nhẹ các huyệt đạo chính trên cơ thể, giúp giảm căng thẳng, cải thiện tuần hoàn máu và mang lại cảm giác thư giãn tức thì.",
            },
            {
                title: "Tapping chuyên sâu",
                price: 650000,
                duration: "75 phút",
                description:
                    "Liệu trình taping chuyên sâu kết hợp gõ huyệt đạo cùng với các kỹ thuật thư giãn chuyên biệt, hỗ trợ giải tỏa căng thẳng sâu, nâng cao năng lượng và phục hồi toàn diện.",
            },
        ],
    },
    "heat-light": {
        title: "Đèn hồng ngoại",
        description:
            "Liệu pháp sử dụng ánh sáng hồng ngoại để làm ấm cơ, cải thiện tuần hoàn máu và giảm đau.",
        fullDescription: `Liệu pháp đèn hồng ngoại sử dụng nhiệt từ tia hồng ngoại để thâm nhập sâu vào các mô, giúp tăng cường tuần hoàn máu và thúc đẩy quá trình chữa lành tự nhiên của cơ thể.`,
        content: "",
        booking: [
            {
                title: "Điều trị vùng cục bộ",
                price: 350000,
                duration: "30 phút",
                description:
                    "Điều trị tập trung vào một vùng cụ thể của cơ thể.",
            },
            {
                title: "Điều trị toàn thân",
                price: 550000,
                duration: "60 phút",
                description:
                    "Liệu trình điều trị toàn diện cho toàn bộ cơ thể.",
            },
        ],
    },
    iastm: {
        title: "Cao mạc (IASTM)",
        description:
            "Kỹ thuật sử dụng công cụ chuyên dụng để kích thích và cải thiện mô mềm.",
        fullDescription: `IASTM (Instrument Assisted Soft Tissue Mobilization) là kỹ thuật điều trị sử dụng các dụng cụ chuyên biệt để tác động lên các mô mềm, giúp phá vỡ các mô sẹo và tăng cường linh hoạt cho các mô.`,
        content: "",
        booking: [
            {
                title: "Điều trị vùng cục bộ",
                price: 350000,
                duration: "30 phút",
                description:
                    "Điều trị tập trung vào một vùng cụ thể của cơ thể.",
            },
        ],
    },
    "cold-plunge": {
        title: "Ngâm lạnh",
        description:
            "Phương pháp ngâm mình trong nước lạnh để giảm sưng, đau nhức cơ và tăng cường hồi phục.",
        fullDescription: `Ngâm lạnh là một phương pháp điều trị đơn giản nhưng hiệu quả, sử dụng nước lạnh để tác động lên các mô, giúp giảm sưng, đau nhức và tăng cường hồi phục.`,
        image: "https://images.unsplash.com/photo-1734117928667-c7f943a27e80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "",
        booking: [
            {
                title: "Ngâm lạnh cơ bản",
                price: 350000,
                duration: "30 phút",
                description:
                    "Liệu trình ngâm lạnh tập trung vào việc ngâm mình trong nước lạnh.",
            },
        ],
    },
    "dry-needling": {
        title: "Châm khô",
        description:
            "Kỹ thuật sử dụng kim nhỏ để kích thích điểm co thắt cơ và giảm đau mãn tính.",
        fullDescription: `Châm khô là một phương pháp điều trị đơn giản nhưng hiệu quả, sử dụng các kim nhỏ để kích thích các điểm co thắt cơ và giảm đau mãn tính.`,
        content: "",
        booking: [
            {
                title: "Châm khô cơ bản",
                price: 350000,
                duration: "30 phút",
                description:
                    "Liệu trình châm khô tập trung vào việc kích thích các điểm co thắt cơ.",
            },
        ],
    },
    dds: {
        title: "Điện sinh học (DDS)",
        description:
            "Liệu pháp sử dụng dòng điện nhẹ để kích thích cơ và dây thần kinh, giảm đau và thúc đẩy phục hồi.",
        fullDescription: `Điện sinh học (DDS) là một phương pháp điều trị sử dụng dòng điện nhẹ để kích thích cơ và dây thần kinh, giảm đau và thúc đẩy phục hồi.`,
        content: "",
        booking: [
            {
                title: "Điện sinh học cơ bản",
                price: 350000,
                duration: "30 phút",
                description:
                    "Liệu trình điện sinh học tập trung vào việc kích thích các điểm co thắt cơ.",
            },
        ],
    },
};

export default async function TreatmentPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const treatment = treatmentDetails[slug as keyof typeof treatmentDetails];

    if (!treatment) {
        return <div>Treatment not found</div>;
    }

    return (
        <div className="bg-primary-background relative w-full scroll-smooth py-16 sm:px-16">
            <div className="container mx-auto">
                <Breadcrumb className="font-robotoSlab text-primary-text mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-primary-text">
                            <BreadcrumbLink asChild>
                                <Link
                                    href="/treatments"
                                    className="hover:text-primary-text flex items-center hover:underline"
                                >
                                    Phương pháp
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary-text/70" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary-text/50">
                                {treatment.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="bg-brown-50 container mx-auto rounded-2xl px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-12 md:p-5">
                        {/* Text content */}
                        <div className="order-2 mt-6 md:order-1 md:mt-0 md:flex-1">
                            <div className="space-y-6">
                                <div className="text-primary-text font-robotoMono text-sm uppercase tracking-wide">
                                    Phương pháp
                                </div>
                                <h1 className="font-robotoSerif text-primary-text text-4xl font-semibold md:text-5xl">
                                    {treatment.title}
                                </h1>
                                <p className="font-robotoSlab text-primary-text/70 max-w-xl">
                                    {treatment.fullDescription}
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-primary-text text-primary-text hover:bg-primary-text font-robotoSerif bg-transparent transition-colors hover:text-white"
                                    asChild
                                >
                                    <Link href="#book">
                                        Đặt lịch hẹn
                                        <ArrowDown className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="order-1 md:order-2 md:flex-1">
                            <div className="bg-primary-text relative aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image
                                    src={treatment.image || "/placeholder.svg"}
                                    alt={treatment.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contents */}
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <Card className="w-full border-gray-400 bg-transparent">
                        <CardContent className="bg-transparent p-10">
                            <div className="prose prose-lg font-robotoSlab text-primary-text prose-strong:text-primary-text prose-strong:font-robotoSerif prose-headings:font-robotoSerif prose-headings:text-primary-text max-w-none">
                                <Markdown>{treatment.content}</Markdown>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Booking Cards */}
                <div className="container mx-auto px-4 py-8 md:py-12" id="book">
                    <h2 className="font-robotoSerif text-primary-text border-b border-gray-400 pb-8 text-3xl font-bold">
                        Đặt lịch điều trị
                    </h2>
                    <div className="bg-primary-text mb-5 h-0.5 w-64 -translate-y-0.5"></div>
                    <div className="space-y-6">
                        {treatment.booking?.map((booking, index) => (
                            <div
                                key={index}
                                className="hover:border-primary-text rounded-lg border border-gray-400 bg-transparent p-6 transition-colors"
                            >
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-robotoSerif text-primary-text text-xl font-semibold">
                                            {booking.title}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-4">
                                            <span className="font-robotoSlab text-primary-text text-lg font-medium">
                                                {booking.price.toLocaleString(
                                                    "vi-VN",
                                                )}
                                                &nbsp;VNĐ
                                            </span>
                                            <div className="text-primary-text/70 flex items-center gap-2">
                                                <Clock className="size-4" />
                                                <span className="font-robotoSlab">
                                                    {booking.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="font-robotoSlab text-primary-text/70 mt-3 text-sm">
                                            {booking.description}
                                        </p>
                                    </div>
                                    <Button
                                        className="bg-primary-text  font-robotoSerif hover:bg-primary-text/90 text-white"
                                        asChild
                                    >
                                        <Link href="/booking">
                                            Đặt lịch hẹn
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
