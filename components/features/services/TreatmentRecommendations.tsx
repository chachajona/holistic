"use client";

import { memo } from "react";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

// import type { ProblemCategory } from "@/types/services";
import { Service } from "@/types/services";
import { Button } from "@/components/ui/button";

interface TreatmentRecommendationsProps {
    services: Service[];
    selectedServiceIds: string[];
    onQuickBook: (service: Service) => void;
}

export const TreatmentRecommendations = memo(
    ({
        services,
        selectedServiceIds,
        onQuickBook,
    }: TreatmentRecommendationsProps) => {
        // Get all treatments from selected services
        const allTreatments = services
            .filter(
                service =>
                    selectedServiceIds.length === 0 ||
                    selectedServiceIds.includes(service.id),
            )
            .flatMap(service => {
                // Get the problem categories for this service
                const problemCategoryNames = service.problemCategories
                    ? service.problemCategories
                          .map(category => category.title)
                          .join(", ")
                    : "";

                return (service.details?.treatments || []).map(treatment => ({
                    ...treatment,
                    sourceServiceId: service.id,
                    sourceServiceTitle: service.title,
                    problemCategories: service.problemCategories || [],
                    problemCategoryNames,
                }));
            })
            // Remove duplicates by id
            .filter(
                (treatment, index, self) =>
                    index === self.findIndex(t => t.id === treatment.id),
            );

        if (allTreatments.length === 0) {
            return (
                <div className="text-primary-text/80 py-10 text-center">
                    <h3 className="font-robotoSerif mb-3 text-xl">
                        Không tìm thấy phương pháp điều trị phù hợp
                    </h3>
                    <p>
                        Vui lòng chọn vấn đề khác hoặc liên hệ với chúng tôi để
                        được tư vấn thêm
                    </p>
                </div>
            );
        }

        return (
            <div>
                <h2 className="text-primary-text font-robotoSerif mb-5 text-2xl font-bold">
                    Phương pháp điều trị phù hợp
                </h2>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {allTreatments.map(treatment => (
                        <div
                            key={treatment.id}
                            className="border-primary-text flex flex-col overflow-hidden rounded-lg border"
                        >
                            <div className="bg-primary-text/5 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-primary-text font-robotoSerif text-lg font-medium">
                                        {treatment.name}
                                    </h3>
                                    {treatment.icon && (
                                        <div className="text-primary-text/70 size-6">
                                            {treatment.icon}
                                        </div>
                                    )}
                                </div>
                                <p className="text-primary-text/80 font-robotoSlab mb-2 text-sm">
                                    {treatment.description}
                                </p>
                                <div className="flex flex-col">
                                    <div className="text-primary-text/60 text-xs italic">
                                        Đề xuất cho:{" "}
                                        {treatment.sourceServiceTitle}
                                    </div>
                                    {treatment.problemCategoryNames && (
                                        <div className="text-primary-text/60 mt-1 text-xs">
                                            <span className="font-medium">
                                                Vấn đề:
                                            </span>{" "}
                                            {treatment.problemCategoryNames}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-primary-background mt-auto p-4">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/treatments/${treatment.href}`}
                                        passHref
                                    >
                                        <Button
                                            variant="link"
                                            className="text-primary-text group flex items-center px-0 py-2 text-sm"
                                        >
                                            Chi tiết
                                            <ChevronRight className="ml-1 size-4 group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            const service = services.find(
                                                s =>
                                                    s.id ===
                                                    treatment.sourceServiceId,
                                            );
                                            if (service) onQuickBook(service);
                                        }}
                                        className="bg-primary-text hover:bg-primary-text/90 flex items-center text-sm text-white"
                                    >
                                        <Calendar className="mr-1 size-4" />
                                        Đặt lịch
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);

TreatmentRecommendations.displayName = "TreatmentRecommendations";
