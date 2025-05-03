"use client";

import { memo, useCallback, useMemo } from "react";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import * as Icons from "lucide-react";

// import type { ProblemCategory } from "@/types/services";
import { Service } from "@/types/services";
import { cn } from "@/lib/utils";

// Local interface for our component needs
interface ProblemCategoryWithServices {
    id: string;
    label: string;
    icon: string;
    serviceIds: string[];
}

interface ServiceFilterProps {
    services: Service[];
    selectedServiceIds: string[];
    onSelectService: (id: string) => void;
}

export const ServiceFilterSelection = memo(
    ({ services, selectedServiceIds, onSelectService }: ServiceFilterProps) => {
        // Convert Sanity problem categories to our component format
        const problemCategories = useMemo(() => {
            // Collect all unique problem categories from services
            const categoriesMap = new Map<
                string,
                ProblemCategoryWithServices
            >();

            services.forEach(service => {
                // Process problem categories if they exist in the service
                if (
                    service.problemCategories &&
                    service.problemCategories.length > 0
                ) {
                    service.problemCategories.forEach(category => {
                        const categoryId = category._id;

                        // If we haven't seen this category before, add it
                        if (!categoriesMap.has(categoryId)) {
                            categoriesMap.set(categoryId, {
                                id: categoryId,
                                label: category.title,
                                icon: category.icon || "Activity", // Default icon if none specified
                                serviceIds: [service.id],
                            });
                        } else {
                            // Add this service to the existing category
                            const existingCategory =
                                categoriesMap.get(categoryId)!;
                            if (
                                !existingCategory.serviceIds.includes(
                                    service.id,
                                )
                            ) {
                                existingCategory.serviceIds.push(service.id);
                            }
                        }
                    });
                }
            });

            // Convert the map to an array and sort by label
            return Array.from(categoriesMap.values()).sort((a, b) =>
                a.label.localeCompare(b.label),
            );
        }, [services]);

        const getIcon = useCallback(
            (iconName: string, className = "text-primary-text mb-2 size-6") => {
                if (isCustomIcon(iconName)) {
                    const CustomIcon = customIcons[iconName];
                    return <CustomIcon className={className} />;
                }
                const Icon = Icons[
                    iconName as keyof typeof Icons
                ] as React.ElementType;
                return Icon ? <Icon className={className} /> : null;
            },
            [],
        );

        // Handle problem category selection
        const handleProblemSelect = useCallback(
            (category: ProblemCategoryWithServices) => {
                // Toggle all service IDs in this category
                const allSelected = category.serviceIds.every(id =>
                    selectedServiceIds.includes(id),
                );

                if (allSelected) {
                    // Remove all services in this category
                    category.serviceIds.forEach(id => onSelectService(id));
                } else {
                    // Add all services in this category
                    const servicesToAdd = category.serviceIds.filter(
                        id => !selectedServiceIds.includes(id),
                    );
                    servicesToAdd.forEach(id => onSelectService(id));
                }
            },
            [selectedServiceIds, onSelectService],
        );

        // Check if a problem category is selected (any of its services are selected)
        const isProblemSelected = useCallback(
            (category: ProblemCategoryWithServices) => {
                return category.serviceIds.some(id =>
                    selectedServiceIds.includes(id),
                );
            },
            [selectedServiceIds],
        );

        // If no problem categories were found, show an empty state
        if (problemCategories.length === 0) {
            return (
                <div className="mb-10 text-center">
                    <h2 className="text-primary-text font-robotoSerif mb-3 text-2xl font-bold">
                        Chọn vấn đề của bạn
                    </h2>
                    <p className="text-primary-text/60">
                        Không tìm thấy danh mục vấn đề nào. Vui lòng thêm danh
                        mục trong Sanity Studio.
                    </p>
                </div>
            );
        }

        return (
            <div className="mb-10">
                <h2 className="text-primary-text font-robotoSerif mb-5 text-2xl font-bold">
                    Chọn vấn đề của bạn
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {problemCategories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleProblemSelect(category)}
                            className={cn(
                                "border-primary-text flex min-h-[100px] flex-col items-center justify-center rounded-lg border p-4 text-center transition-all duration-300",
                                isProblemSelected(category)
                                    ? "bg-primary-text text-white"
                                    : "bg-primary-background/50 hover:bg-primary-text/10",
                            )}
                        >
                            {getIcon(
                                category.icon,
                                cn(
                                    "size-10",
                                    isProblemSelected(category)
                                        ? "text-white"
                                        : "text-primary-text",
                                ),
                            )}
                            <span
                                className={cn(
                                    "font-robotoSlab mt-2 text-sm",
                                    isProblemSelected(category)
                                        ? "text-white"
                                        : "text-primary-text",
                                )}
                            >
                                {category.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    },
);

ServiceFilterSelection.displayName = "ServiceFilterSelection";
