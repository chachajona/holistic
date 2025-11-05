"use client";

import { memo, useCallback, useMemo } from "react";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import { useLocale } from "@/providers/LocaleProvider";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

import { Service } from "@/types/services";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Local interface for our component needs
interface ProblemCategoryWithServices {
    id: string;
    label: string;
    icon: string;
    description?: string;
    serviceIds: string[];
}

interface ServiceFilterProps {
    services: Service[];
    selectedCategoryIds: string[];
    onSelectCategory: (categoryId: string) => void;
}

export const ServiceFilterSelection = memo(
    ({
        services,
        selectedCategoryIds,
        onSelectCategory,
    }: ServiceFilterProps) => {
        const { t } = useLocale();
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
                                icon: category.icon || "Activity",
                                description:
                                    category.description ||
                                    `${category.title}: ${t("servicesPage.problemSelection.descriptionFallback", "Specialized Treatment")}`,
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
                    return (
                        <CustomIcon className={className} aria-hidden="true" />
                    );
                }
                const Icon = Icons[
                    iconName as keyof typeof Icons
                ] as React.ElementType;
                return Icon ? (
                    <Icon className={className} aria-hidden="true" />
                ) : null;
            },
            [],
        );

        // Check if a problem category is selected
        const isProblemSelected = useCallback(
            (category: ProblemCategoryWithServices) => {
                return selectedCategoryIds.includes(category.id);
            },
            [selectedCategoryIds],
        );

        // If no problem categories were found, show an empty state
        if (problemCategories.length === 0) {
            return (
                <div className="mb-10 text-center">
                    <h2 className="text-primary-text font-robotoSerif mb-3 text-2xl font-bold">
                        {t(
                            "servicesPage.problemSelection.stepTitle",
                            "Choose Your Problem",
                        )}
                    </h2>
                    <p className="text-primary-text/60">
                        {t(
                            "servicesPage.problemSelection.emptyState",
                            "No problem categories found. Please add categories in Sanity Studio.",
                        )}
                    </p>
                </div>
            );
        }

        return (
            <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="font-robotoSerif text-primary-text mb-5 text-2xl font-bold">
                    <span className="bg-primary-text mr-2 inline-flex size-8 items-center justify-center rounded-full text-lg text-white">
                        1
                    </span>
                    {t(
                        "servicesPage.problemSelection.stepTitle",
                        "Choose Your Problem",
                    )}
                </h2>
                <ScrollArea className="pb-4">
                    <div className="flex flex-wrap gap-3 sm:flex-row md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {problemCategories.map((category, index) => (
                            <TooltipProvider key={category.id}>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <motion.button
                                            onClick={() =>
                                                onSelectCategory(category.id)
                                            }
                                            className={cn(
                                                "border-primary-text flex min-h-[80px] min-w-[100px] flex-1 flex-col items-center justify-center rounded-lg border p-3 text-center transition-all duration-300 sm:min-w-[120px] sm:flex-none",
                                                isProblemSelected(category)
                                                    ? "bg-primary-text text-white shadow-lg"
                                                    : "bg-primary-background/50 hover:bg-primary-text/10",
                                            )}
                                            aria-pressed={isProblemSelected(
                                                category,
                                            )}
                                            aria-label={`${t("servicesPage.problemSelection.ariaLabel", "Problem:")} ${category.label}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.3 + index * 0.05,
                                                duration: 0.3,
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <motion.div
                                                animate={
                                                    isProblemSelected(category)
                                                        ? {
                                                              scale: [
                                                                  1, 1.1, 1,
                                                              ],
                                                          }
                                                        : {}
                                                }
                                                transition={{ duration: 0.3 }}
                                            >
                                                {getIcon(
                                                    category.icon,
                                                    cn(
                                                        "size-10 sm:size-12",
                                                        isProblemSelected(
                                                            category,
                                                        )
                                                            ? "text-white"
                                                            : "text-primary-text",
                                                    ),
                                                )}
                                            </motion.div>
                                            <span
                                                className={cn(
                                                    "font-robotoSlab mt-1 text-xs sm:text-sm",
                                                    isProblemSelected(category)
                                                        ? "text-white"
                                                        : "text-primary-text",
                                                )}
                                            >
                                                {category.label}
                                            </span>
                                        </motion.button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="bottom"
                                        className="max-w-[200px] text-center"
                                    >
                                        <p>{category.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </ScrollArea>
            </motion.div>
        );
    },
);

ServiceFilterSelection.displayName = "ServiceFilterSelection";
