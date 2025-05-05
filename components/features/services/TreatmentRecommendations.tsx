"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import { AlertCircle, Calendar, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";

// import type { ProblemCategory } from "@/types/services";
import { Service } from "@/types/services";
import { Button } from "@/components/ui/button";

interface TreatmentRecommendationsProps {
    services: Service[];
    selectedCategoryIds: string[];
    onQuickBook: (service: Service) => void;
}

export const TreatmentRecommendations = memo(
    ({
        services,
        selectedCategoryIds,
        onQuickBook,
    }: TreatmentRecommendationsProps) => {
        // Get icon component from string name
        const getIcon = useCallback(
            (
                iconName: string | null,
                className = "text-primary-text/70 size-6",
                ariaHidden = true,
            ) => {
                if (!iconName) {
                    return (
                        <AlertCircle
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }

                if (isCustomIcon(iconName)) {
                    const CustomIcon = customIcons[iconName];
                    return (
                        <CustomIcon
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }

                try {
                    const Icon = Icons[
                        iconName as keyof typeof Icons
                    ] as React.ElementType;

                    if (Icon) {
                        return (
                            <Icon
                                className={className}
                                aria-hidden={ariaHidden}
                            />
                        );
                    } else {
                        return (
                            <AlertCircle
                                className={className}
                                aria-hidden={ariaHidden}
                            />
                        );
                    }
                    // eslint-disable-next-line unused-imports/no-unused-vars
                } catch (error) {
                    return (
                        <AlertCircle
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }
            },
            [],
        );

        // Get all treatments from filtered services based on problem categories
        const allTreatments = services
            .filter(service => {
                // If no categories are selected, show all services
                if (selectedCategoryIds.length === 0) {
                    return true;
                }

                // If this service has any of the selected problem categories, include it
                return (
                    service.problemCategories?.some(category =>
                        selectedCategoryIds.includes(category._id),
                    ) || false
                );
            })
            .flatMap(service => {
                // Get the problem categories for this service
                const problemCategoryNames = service.problemCategories
                    ? service.problemCategories
                          .map(category => category.title)
                          .join(", ")
                    : "";

                // If no treatments, return empty array to avoid mapping errors
                if (
                    !service.details?.treatments ||
                    service.details.treatments.length === 0
                ) {
                    return [];
                }

                return service.details.treatments
                    .filter(treatment => treatment && treatment.id) // Ensure treatment exists and has ID
                    .map(treatment => {
                        // Generate a standardized description if missing
                        let standardDescription = treatment.description;
                        if (
                            !standardDescription ||
                            standardDescription.trim() === ""
                        ) {
                            standardDescription = `${treatment.name}: Phương pháp điều trị ${problemCategoryNames || "chuyên biệt"}`;
                        }

                        return {
                            ...treatment,
                            description: standardDescription,
                            sourceServiceId: service.id,
                            sourceServiceTitle: service.title,
                            problemCategories: service.problemCategories || [],
                            problemCategoryNames,
                        };
                    });
            })
            // Remove duplicates by id
            .filter(
                (treatment, index, self) =>
                    index === self.findIndex(t => t.id === treatment.id),
            );

        if (allTreatments.length === 0) {
            // Fallback UI if no services have treatments
            if (
                services.length > 0 &&
                services.every(
                    service =>
                        !service.details?.treatments ||
                        service.details.treatments.length === 0,
                )
            ) {
                return (
                    <div className="text-primary-text/80 py-10 text-center">
                        <h3 className="font-robotoSerif mb-3 text-xl">
                            Không có liệu trình điều trị nào được tìm thấy
                        </h3>
                        <p>
                            Các dịch vụ chưa có liệu trình điều trị cụ thể. Vui
                            lòng liên hệ với chúng tôi để được tư vấn.
                        </p>
                    </div>
                );
            }

            // Standard "no matching treatments" message
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
                <h2 className="font-robotoSerif text-primary-text mb-5 text-2xl font-bold">
                    <span className="bg-primary-text mr-2 inline-flex size-8 items-center justify-center rounded-full text-lg text-white">
                        2
                    </span>
                    Phương pháp điều trị phù hợp
                </h2>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {allTreatments.map(treatment =>
                        treatment && treatment.id ? (
                            <div
                                key={treatment.id}
                                className="border-primary-text flex flex-col overflow-hidden rounded-lg border"
                                role="article"
                                aria-labelledby={`treatment-${treatment.id}-title`}
                            >
                                <div className="bg-primary-text/5 p-3 sm:p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3
                                            id={`treatment-${treatment.id}-title`}
                                            className="text-primary-text font-robotoSerif text-base font-medium sm:text-lg"
                                        >
                                            {treatment.name || "Không có tên"}
                                        </h3>
                                        {treatment.icon ? (
                                            getIcon(treatment.icon)
                                        ) : (
                                            <AlertCircle
                                                className="text-primary-text/70 size-5 sm:size-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    <p className="font-robotoSlab text-primary-text/80 mb-2 line-clamp-2 text-xs sm:text-sm">
                                        {treatment.description ||
                                            "Không có mô tả"}
                                    </p>
                                    <div className="flex flex-col">
                                        {treatment.problemCategoryNames && (
                                            <div className="text-primary-text/60 text-xs italic">
                                                <span className="font-medium">
                                                    Đề xuất cho:
                                                </span>{" "}
                                                {treatment.problemCategoryNames}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-primary-background mt-auto p-3 sm:p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                        <Link
                                            href={`/treatments/${treatment.href}`}
                                            passHref
                                        >
                                            <Button
                                                variant="link"
                                                className="text-primary-text group flex w-full items-center justify-center gap-1 px-0 py-2 text-sm transition-all duration-200 hover:underline sm:w-auto sm:justify-start"
                                                aria-label={`Xem chi tiết về ${treatment.name || "liệu trình"}`}
                                            >
                                                Chi tiết
                                                <ChevronRight
                                                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                                                    aria-hidden="true"
                                                />
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
                                                if (service)
                                                    onQuickBook(service);
                                            }}
                                            className="bg-primary-text hover:bg-primary-text/90 flex w-full items-center justify-center rounded-md px-4 py-2 text-sm text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                                            aria-label={`Đặt lịch cho ${treatment.name || "liệu trình"}`}
                                        >
                                            <Calendar
                                                className="mr-1 size-4"
                                                aria-hidden="true"
                                            />
                                            Đặt lịch
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null,
                    )}
                </div>
            </div>
        );
    },
);

TreatmentRecommendations.displayName = "TreatmentRecommendations";
