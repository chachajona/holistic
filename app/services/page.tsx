"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Boost from "@/assets/icons/Boost";
import Heal from "@/assets/icons/Heal";
import {
    ActivitySquare,
    Award,
    Calendar,
    ChevronDown,
    ChevronRight,
    Clock,
    FileText,
    Flame,
    Leaf,
    LeafyGreen,
    Snowflake,
    Sparkles,
    Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Define TypeScript interfaces for better type safety
interface ServiceProtocol {
    id: string;
    name: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}

interface AvailableSlot {
    id: string;
    date: string;
    time: string;
    available: boolean;
}

interface ServiceDetails {
    id: string;
    outcome: string;
    protocol: string;
    evidence: string;
    treatments: ServiceProtocol[];
    availableSlots: AvailableSlot[];
}

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: ServiceDetails;
}

// Patient-centric services data using only your actual treatments, now with custom icons
const patientCentricServices: ServiceItem[] = [
    {
        id: "pain-management",
        title: "Giảm Đau và Phục Hồi Chức Năng",
        description:
            "Các phương pháp điều trị không dùng thuốc, giúp giảm đau hiệu quả và phục hồi chức năng vận động.",
        icon: <Heal className="text-primary-text mb-4 size-14 md:size-20" />,
        details: {
            id: "pain-management-details",
            outcome: "Giảm đau hiệu quả 70% trong 3-4 tuần điều trị",
            protocol:
                "Kết hợp nhiều phương pháp điều trị để tối ưu hóa kết quả",
            evidence: "Được chứng minh hiệu quả qua các nghiên cứu lâm sàng",
            treatments: [
                {
                    id: "dry-needling",
                    name: "Châm khô",
                    description:
                        "Kỹ thuật sử dụng kim nhỏ để kích thích điểm co thắt cơ và giảm đau mãn tính.",
                    href: "/treatments/dry-needling",
                    icon: (
                        <ActivitySquare className="text-primary-text size-5 md:size-6" />
                    ),
                },
                {
                    id: "iastm",
                    name: "Cao mạc (IASTM)",
                    description:
                        "IASTM (Công cụ kích thích mô mềm) là phương pháp sử dụng dụng cụ chuyên dụng để giảm đau cơ, tăng tính linh hoạt và cải thiện hiệu quả vận động.",
                    href: "/treatments/iastm",
                    icon: (
                        <Sparkles className="text-primary-text size-5 md:size-6" />
                    ),
                },
            ],
            availableSlots: [
                {
                    id: "slot1",
                    date: "2023-07-10",
                    time: "09:00",
                    available: true,
                },
                {
                    id: "slot2",
                    date: "2023-07-10",
                    time: "14:00",
                    available: true,
                },
                {
                    id: "slot3",
                    date: "2023-07-11",
                    time: "10:00",
                    available: false,
                },
            ],
        },
    },
    {
        id: "recovery-therapies",
        title: "Thúc Đẩy Quá Trình Phục Hồi",
        description:
            "Các phương pháp điều trị hiện đại để thúc đẩy quá trình phục hồi tự nhiên của cơ thể sau chấn thương hoặc tập luyện.",
        icon: <Boost className="text-primary-text mb-4 size-14 md:size-16" />,
        details: {
            id: "recovery-therapies-details",
            outcome: "Tăng tốc quá trình phục hồi lên đến 40%",
            protocol: "Kết hợp liệu pháp nhiệt và kỹ thuật thủ công",
            evidence:
                "Được áp dụng rộng rãi với các vận động viên chuyên nghiệp",
            treatments: [
                {
                    id: "heat-light",
                    name: "Đèn hồng ngoại",
                    description:
                        "Liệu pháp đèn hồng ngoại sử dụng ánh sáng nhiệt để thâm nhập sâu vào mô cơ thể, kích thích tuần hoàn máu, giảm viêm, và giúp phục hồi các tổn thương mô mềm.",
                    href: "/treatments/heat-light",
                    icon: (
                        <Flame className="text-primary-text size-5 md:size-6" />
                    ),
                },
                {
                    id: "cold-plunge",
                    name: "Ngâm lạnh",
                    description:
                        "Phương pháp ngâm mình trong nước lạnh để giảm sưng, đau nhức cơ và tăng cường hồi phục.",
                    href: "/treatments/cold-plunge",
                    icon: (
                        <Snowflake className="text-primary-text size-5 md:size-6" />
                    ),
                },
            ],
            availableSlots: [
                {
                    id: "slot4",
                    date: "2023-07-12",
                    time: "11:00",
                    available: true,
                },
                {
                    id: "slot5",
                    date: "2023-07-13",
                    time: "15:00",
                    available: true,
                },
                {
                    id: "slot6",
                    date: "2023-07-14",
                    time: "09:00",
                    available: false,
                },
            ],
        },
    },
    {
        id: "traditional-therapies",
        title: "Phương Pháp Y Học Cổ Truyền",
        description:
            "Kết hợp các phương pháp y học cổ truyền đã được chứng minh qua thời gian với kỹ thuật hiện đại để đạt hiệu quả tối ưu.",
        icon: (
            <LeafyGreen className="text-primary-text mb-4 size-10 md:size-12" />
        ),
        details: {
            id: "traditional-therapies-details",
            outcome: "Cải thiện sức khỏe tổng thể và giảm đau mãn tính",
            protocol: "Cách tiếp cận toàn diện kết hợp phương pháp Đông-Tây y",
            evidence:
                "Dựa trên kinh nghiệm hàng ngàn năm và nghiên cứu hiện đại",
            treatments: [
                {
                    id: "cupping",
                    name: "Giác hơi",
                    description:
                        "Giác hơi là phương pháp y học cổ truyền sử dụng cốc để tạo áp lực hút trên da, giúp tăng cường lưu thông máu, giảm đau nhức cơ và cải thiện sức khỏe tổng thể.",
                    href: "/treatments/cupping",
                    icon: (
                        <Waves className="text-primary-text size-5 md:size-6" />
                    ),
                },
                {
                    id: "tapping",
                    name: "Tapping",
                    description:
                        "Tapping, hay còn gọi là Emotional Freedom Technique (EFT), kết hợp giữa việc gõ nhẹ vào các huyệt đạo trên cơ thể và thực hành tâm lý để giảm căng thẳng, lo âu và tăng cường tinh thần.",
                    href: "/treatments/tapping",
                    icon: (
                        <Leaf className="text-primary-text size-5 md:size-6" />
                    ),
                },
            ],
            availableSlots: [
                {
                    id: "slot7",
                    date: "2023-07-10",
                    time: "13:00",
                    available: true,
                },
                {
                    id: "slot8",
                    date: "2023-07-11",
                    time: "16:00",
                    available: true,
                },
                {
                    id: "slot9",
                    date: "2023-07-12",
                    time: "10:00",
                    available: false,
                },
            ],
        },
    },
];

export default function ServicesPage() {
    // State to track which service card is expanded - now with a default value for desktop
    const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
        null,
    );
    const [isBookingOpen, setIsBookingOpen] = useState<{
        [key: string]: boolean;
    }>({});
    const [isDesktop, setIsDesktop] = useState(false);

    // Check if we're in desktop view and set default expanded card
    useEffect(() => {
        const checkIfDesktop = () => {
            const desktop = window.innerWidth >= 1024; // lg breakpoint
            setIsDesktop(desktop);

            // Set default expanded card only in desktop view
            if (desktop && expandedServiceId === null) {
                setExpandedServiceId("pain-management"); // Default to first service
            }
        };

        checkIfDesktop();
        window.addEventListener("resize", checkIfDesktop);

        return () => {
            window.removeEventListener("resize", checkIfDesktop);
        };
    }, [expandedServiceId]);

    // Toggle expanded state for a service card
    const toggleServiceExpand = (serviceId: string) => {
        setExpandedServiceId(
            expandedServiceId === serviceId ? null : serviceId,
        );
    };

    // Toggle booking widget for a specific treatment
    const toggleBookingWidget = (treatmentId: string) => {
        setIsBookingOpen(prev => ({
            ...prev,
            [treatmentId]: !prev[treatmentId],
        }));
    };

    // Get the currently expanded service
    const expandedService = patientCentricServices.find(
        service => service.id === expandedServiceId,
    );

    return (
        <div className="bg-primary-background relative w-full py-16 sm:px-8 lg:px-16">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/Paper.png')",
                    filter: "opacity(0.2)",
                }}
                aria-hidden="true"
            />

            <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-sm font-light md:text-base">
                    Dịch vụ điều trị
                </span>
                <h1 className="font-robotoSerif mb-6 max-w-2xl p-1 text-2xl font-bold capitalize md:text-3xl">
                    Phương pháp điều trị chuyên biệt
                </h1>
                <p className="font-robotoSlab text-primary-text/50 mb-8 max-w-xl p-1 text-sm font-normal md:text-base">
                    Các dịch vụ chăm sóc được thiết kế để đạt kết quả điều trị
                    tối ưu, giúp bạn cải thiện sức khỏe và nâng cao chất lượng
                    cuộc sống.
                </p>
            </div>

            {/* Desktop layout (sidebar view) */}
            {isDesktop ? (
                <div className="container relative z-10 mt-10 flex">
                    {/* Service cards on the left */}
                    <div
                        className={`${expandedServiceId ? "w-1/3" : "w-full"} flex flex-col space-y-4 transition-all duration-300`}
                    >
                        {patientCentricServices.map((service, _index) => {
                            const isExpanded = service.id === expandedServiceId;
                            const isPrimary = service.id === "pain-management";

                            return (
                                <div
                                    key={service.id}
                                    className={`border-primary-text group flex cursor-pointer flex-col rounded-lg border transition-all
                                        ${isExpanded ? "bg-[#D2C9C3]/80" : "bg-transparent"}
                                        ${isPrimary ? "border-none shadow-lg ring-2 ring-amber-500" : "shadow-md"}
                                        hover:bg-[#D2C9C3] hover:shadow-lg`}
                                    onClick={() =>
                                        toggleServiceExpand(service.id)
                                    }
                                >
                                    {isExpanded || !expandedServiceId ? (
                                        // Full card when expanded or no card is expanded
                                        <div className="relative flex flex-col items-center justify-start p-6">
                                            {/* Add "Most Popular" badge for primary service */}
                                            {isPrimary && (
                                                <div className="absolute -right-2 -top-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
                                                    Phổ biến nhất
                                                </div>
                                            )}

                                            {/* Existing card content */}
                                            {service.icon}
                                            <h3 className="font-robotoSerif text-primary-text mb-6 text-center text-3xl font-bold">
                                                {service.title}
                                            </h3>
                                            <p className="font-robotoSlab text-primary-text mb-4 text-center text-base">
                                                {service.description}
                                            </p>
                                            <div className="text-primary-text/70 mt-2 flex items-center justify-center">
                                                <span className="font-robotoMono mr-2 text-sm">
                                                    {isExpanded
                                                        ? "Đang xem"
                                                        : "Xem chi tiết"}
                                                </span>
                                                {isExpanded ? (
                                                    <ChevronRight className="size-5" />
                                                ) : (
                                                    <ChevronRight className="size-5" />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        // Similar enhancement for the minimized view
                                        <div className="relative flex items-center justify-between p-4">
                                            {isPrimary && (
                                                <div className="absolute -right-2 -top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
                                                    Phổ biến nhất
                                                </div>
                                            )}
                                            {/* Rest of the existing minimized card code */}
                                            <div className="flex items-center">
                                                {React.cloneElement(
                                                    service.icon as React.ReactElement,
                                                    {
                                                        className:
                                                            "text-primary-text size-8 mr-3 mb-0",
                                                    },
                                                )}
                                                <h3 className="font-robotoSerif text-primary-text text-lg font-bold">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <ChevronRight className="text-primary-text/70 size-5" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Details panel on the right */}
                    {expandedServiceId && expandedService && (
                        <div className="border-primary-text ml-6 w-2/3 rounded-lg border bg-transparent p-6 shadow-md transition-all duration-300">
                            <div className="border-primary-text/10 mb-6 flex items-center border-b pb-4">
                                {React.cloneElement(
                                    expandedService.icon as React.ReactElement,
                                    {
                                        className:
                                            "text-primary-text size-8 mr-3 mb-0",
                                    },
                                )}
                                <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                    {expandedService.title}
                                </h2>
                            </div>

                            <div className="mb-8">
                                {/* Main service description section */}
                                <div className="mb-6 rounded-lg bg-white/30 p-5">
                                    <p className="font-robotoSlab text-primary-text/90 mb-4">
                                        {expandedService.description}
                                    </p>

                                    {/* Highlight outcomes as a special callout rather than a separate card */}
                                    <div className="mt-4 rounded-r-md border-l-4 border-amber-500 bg-amber-50/30 py-3 pl-4">
                                        <div className="mb-2 flex items-center">
                                            <Award className="mr-2 size-5 text-amber-500" />
                                            <h4 className="font-robotoSerif font-semibold">
                                                Kết quả có thể đạt được
                                            </h4>
                                        </div>
                                        <p className="font-robotoSlab text-primary-text/90">
                                            {expandedService.details.outcome}
                                        </p>
                                    </div>
                                </div>

                                {/* Treatment approach and evidence as a 2-column grid below */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-white/30 p-4">
                                        <div className="mb-2 flex items-center">
                                            <FileText className="mr-2 size-5 text-blue-500" />
                                            <h4 className="font-robotoSerif font-semibold">
                                                Phương pháp điều trị
                                            </h4>
                                        </div>
                                        <p className="font-robotoSlab text-primary-text/90">
                                            {expandedService.details.protocol}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/30 p-4">
                                        <div className="mb-2 flex items-center">
                                            <Award className="mr-2 size-5 text-green-500" />
                                            <h4 className="font-robotoSerif font-semibold">
                                                Cơ sở khoa học
                                            </h4>
                                        </div>
                                        <p className="font-robotoSlab text-primary-text/90">
                                            {expandedService.details.evidence}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-robotoSerif mb-4 text-xl font-semibold">
                                    Các phương pháp điều trị
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {expandedService.details.treatments.map(
                                        treatment => (
                                            <div
                                                key={treatment.id}
                                                className="rounded-lg bg-white/30 p-4"
                                            >
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        {treatment.icon}
                                                        <h5 className="font-robotoSerif ml-2 font-medium">
                                                            {treatment.name}
                                                        </h5>
                                                    </div>
                                                    <Button
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            toggleBookingWidget(
                                                                treatment.id,
                                                            );
                                                        }}
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-primary-text/70 text-primary-text hover:bg-primary-text bg-transparent text-xs hover:text-white"
                                                    >
                                                        <Calendar className="mr-1 size-3" />
                                                        Đặt lịch
                                                    </Button>
                                                </div>
                                                <p className="font-robotoSlab text-primary-text/80 mb-2 text-sm">
                                                    {treatment.description}
                                                </p>
                                                <Link
                                                    href={treatment.href}
                                                    className="text-primary-text inline-flex items-center text-xs hover:underline"
                                                    onClick={e =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    Tìm hiểu thêm{" "}
                                                    <ChevronRight className="ml-1 size-3" />
                                                </Link>

                                                {/* Booking widget */}
                                                {isBookingOpen[
                                                    treatment.id
                                                ] && (
                                                    <div className="border-primary-text/10 mt-3 border-t pt-3">
                                                        <h6 className="font-robotoSerif mb-2 flex items-center text-sm font-medium">
                                                            <Clock className="text-primary-text/70 mr-1 size-3" />
                                                            Lịch hẹn sẵn có
                                                        </h6>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {expandedService.details.availableSlots
                                                                .slice(0, 4)
                                                                .map(slot => (
                                                                    <Button
                                                                        key={
                                                                            slot.id
                                                                        }
                                                                        disabled={
                                                                            !slot.available
                                                                        }
                                                                        variant={
                                                                            slot.available
                                                                                ? "default"
                                                                                : "outline"
                                                                        }
                                                                        size="sm"
                                                                        className={`py-1 text-xs ${
                                                                            slot.available
                                                                                ? "bg-primary-text hover:bg-primary-text/80 text-white"
                                                                                : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                                                                        }`}
                                                                        onClick={e => {
                                                                            e.stopPropagation();
                                                                            if (
                                                                                slot.available
                                                                            ) {
                                                                                // Handle booking logic
                                                                                window.location.href = `/booking?treatment=${treatment.id}&date=${slot.date}&time=${slot.time}`;
                                                                            }
                                                                        }}
                                                                    >
                                                                        {slot.date
                                                                            .split(
                                                                                "-",
                                                                            )
                                                                            .reverse()
                                                                            .join(
                                                                                "/",
                                                                            )}{" "}
                                                                        -{" "}
                                                                        {
                                                                            slot.time
                                                                        }
                                                                    </Button>
                                                                ))}
                                                        </div>

                                                        <div className="mt-2 text-right">
                                                            <Link
                                                                href={`/booking?treatment=${treatment.id}`}
                                                                className="text-primary-text/70 hover:text-primary-text inline-flex items-center text-xs"
                                                                onClick={e =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                Xem tất cả lịch
                                                                trống
                                                                <ChevronRight className="ml-1 size-3" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Mobile layout (original)
                <div className="container relative z-10 mt-10 grid gap-8 lg:grid-cols-3">
                    {patientCentricServices.map(service => (
                        <div
                            key={service.id}
                            className={`border-primary-text group flex cursor-pointer flex-col items-center justify-start rounded-lg border bg-transparent p-6 shadow-md transition-all hover:bg-[#D2C9C3] hover:shadow-lg ${
                                expandedServiceId == service.id
                                    ? "bg-[#D2C9C3]/80"
                                    : ""
                            }`}
                            onClick={() => toggleServiceExpand(service.id)}
                        >
                            {service.icon}
                            <h3 className="font-robotoSerif text-primary-text mb-6 text-center text-2xl font-bold md:text-3xl">
                                {service.title}
                            </h3>
                            <p className="font-robotoSlab text-primary-text mb-4 text-center text-sm md:text-base">
                                {service.description}
                            </p>
                            <div className="text-primary-text/70 mt-2 flex items-center justify-center">
                                <span className="font-robotoMono mr-2 text-sm">
                                    {expandedServiceId === service.id
                                        ? "Thu gọn"
                                        : "Xem chi tiết"}
                                </span>
                                {expandedServiceId === service.id ? (
                                    <ChevronDown className="size-4 md:size-5" />
                                ) : (
                                    <ChevronRight className="size-4 md:size-5" />
                                )}
                            </div>

                            {/* Mobile expanded details */}
                            {expandedServiceId === service.id && (
                                <div className="border-primary-text/10 mt-6 w-full border-t pt-6">
                                    <div className="mb-6 grid grid-cols-1 gap-4">
                                        <div className="rounded-lg bg-white/30 p-4">
                                            <div className="mb-2 flex items-center">
                                                <Award className="mr-2 size-5 text-amber-500" />
                                                <h4 className="font-robotoSerif text-sm font-semibold md:text-base">
                                                    Kết quả điều trị
                                                </h4>
                                            </div>
                                            <p className="font-robotoSlab text-primary-text/90 text-sm">
                                                {service.details.outcome}
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-white/30 p-4">
                                            <div className="mb-2 flex items-center">
                                                <FileText className="mr-2 size-5 text-blue-500" />
                                                <h4 className="font-robotoSerif text-sm font-semibold md:text-base">
                                                    Phương pháp điều trị
                                                </h4>
                                            </div>
                                            <p className="font-robotoSlab text-primary-text/90 text-sm">
                                                {service.details.protocol}
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-white/30 p-4">
                                            <div className="mb-2 flex items-center">
                                                <Award className="mr-2 size-5 text-green-500" />
                                                <h4 className="font-robotoSerif text-sm font-semibold md:text-base">
                                                    Cơ sở khoa học
                                                </h4>
                                            </div>
                                            <p className="font-robotoSlab text-primary-text/90 text-sm">
                                                {service.details.evidence}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-robotoSerif mb-4 text-center text-lg font-semibold">
                                            Các phương pháp điều trị
                                        </h4>
                                        <div className="space-y-4">
                                            {service.details.treatments.map(
                                                treatment => (
                                                    <div
                                                        key={treatment.id}
                                                        className="rounded-lg bg-white/30 p-4"
                                                    >
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                {treatment.icon}
                                                                <h5 className="font-robotoSerif ml-2 font-medium">
                                                                    {
                                                                        treatment.name
                                                                    }
                                                                </h5>
                                                            </div>
                                                            <Button
                                                                onClick={e => {
                                                                    e.stopPropagation();
                                                                    toggleBookingWidget(
                                                                        treatment.id,
                                                                    );
                                                                }}
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-primary-text/70 text-primary-text hover:bg-primary-text bg-transparent text-xs hover:text-white"
                                                            >
                                                                <Calendar className="mr-1 size-3" />
                                                                Đặt lịch
                                                            </Button>
                                                        </div>
                                                        <p className="font-robotoSlab text-primary-text/80 mb-2 text-sm">
                                                            {
                                                                treatment.description
                                                            }
                                                        </p>
                                                        <Link
                                                            href={
                                                                treatment.href
                                                            }
                                                            className="text-primary-text inline-flex items-center text-xs hover:underline"
                                                            onClick={e =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            Tìm hiểu thêm{" "}
                                                            <ChevronRight className="ml-1 size-3" />
                                                        </Link>

                                                        {/* Booking widget */}
                                                        {isBookingOpen[
                                                            treatment.id
                                                        ] && (
                                                            <div className="border-primary-text/10 mt-3 border-t pt-3">
                                                                <h6 className="font-robotoSerif mb-2 flex items-center text-sm font-medium">
                                                                    <Clock className="text-primary-text/70 mr-1 size-3" />
                                                                    Lịch hẹn sẵn
                                                                    có
                                                                </h6>
                                                                <div className="grid grid-cols-2 gap-1">
                                                                    {service.details.availableSlots
                                                                        .slice(
                                                                            0,
                                                                            4,
                                                                        )
                                                                        .map(
                                                                            slot => (
                                                                                <Button
                                                                                    key={
                                                                                        slot.id
                                                                                    }
                                                                                    disabled={
                                                                                        !slot.available
                                                                                    }
                                                                                    variant={
                                                                                        slot.available
                                                                                            ? "default"
                                                                                            : "outline"
                                                                                    }
                                                                                    size="sm"
                                                                                    className={`py-1 text-xs ${
                                                                                        slot.available
                                                                                            ? "bg-primary-text hover:bg-primary-text/80 text-white"
                                                                                            : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                                                                                    }`}
                                                                                    onClick={e => {
                                                                                        e.stopPropagation();
                                                                                        if (
                                                                                            slot.available
                                                                                        ) {
                                                                                            // Handle booking logic
                                                                                            window.location.href = `/booking?treatment=${treatment.id}&date=${slot.date}&time=${slot.time}`;
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {slot.date
                                                                                        .split(
                                                                                            "-",
                                                                                        )
                                                                                        .reverse()
                                                                                        .join(
                                                                                            "/",
                                                                                        )}{" "}
                                                                                    -{" "}
                                                                                    {
                                                                                        slot.time
                                                                                    }
                                                                                </Button>
                                                                            ),
                                                                        )}
                                                                </div>

                                                                <div className="mt-2 text-right">
                                                                    <Link
                                                                        href={`/booking?treatment=${treatment.id}`}
                                                                        className="text-primary-text/70 hover:text-primary-text inline-flex items-center text-xs"
                                                                        onClick={e =>
                                                                            e.stopPropagation()
                                                                        }
                                                                    >
                                                                        Xem tất
                                                                        cả lịch
                                                                        trống
                                                                        <ChevronRight className="ml-1 size-3" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* View all treatments button and CTAs - shown on both layouts */}
            <div className="relative z-10 mx-auto mt-10 text-center">
                <div className="font-robotoSerif text-primary-text relative z-10 mt-8 flex flex-row items-center justify-center gap-4 text-center font-normal">
                    <Link href="/treatments">
                        <Button
                            variant={"outline"}
                            className="border-primary-text text-primary-text hover:bg-primary-text bg-transparent hover:text-white"
                        >
                            Tìm hiểu thêm
                        </Button>
                    </Link>
                    <Link href="/booking/consultation">
                        <Button
                            variant={"link"}
                            className="text-primary-text group flex flex-row items-center"
                        >
                            Đặt lịch hẹn
                            <ChevronRight className="animate-shake ml-2 size-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
