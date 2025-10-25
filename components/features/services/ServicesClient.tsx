"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Service } from "@/types/services";
import { useServicesLoading } from "@/app/services/ServicesPageWrapper";
import { Button } from "@/components/ui/button";

import { ServiceFilterSelection } from "./ServiceFilterSelection";
import { TreatmentRecommendations } from "./TreatmentRecommendations";

interface ServicesClientProps {
    services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        [],
    );
    const loadingContext = useServicesLoading();

    // Track when content is ready
    useEffect(() => {
        if (services && services.length > 0 && loadingContext) {
            // Small delay to ensure images start loading
            const timer = setTimeout(() => {
                loadingContext.setContentLoaded();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [services, loadingContext]);

    const handleSelectCategory = useCallback((categoryId: string) => {
        setSelectedCategoryIds(prev => {
            // Toggle selection
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategoryIds([]);
    }, []);

    // Create a mapping of category IDs to category names for the filter display
    const categoryNames = useMemo(() => {
        const names = new Map<string, string>();
        services.forEach(service => {
            if (service.problemCategories) {
                service.problemCategories.forEach(category => {
                    names.set(category._id, category.title);
                });
            }
        });
        return names;
    }, [services]);

    return (
        <div className="bg-primary-background relative w-full px-4 py-16 sm:px-8 md:px-16">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-5"
                style={{ backgroundImage: "url('/Paper.png')" }}
                aria-hidden="true"
            />

            <motion.div 
                className="container relative z-10 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Page Header */}
                <div className="text-primary-text relative z-10 mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center text-center">
                    <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-sm font-light tracking-wide md:text-base">
                        Dịch vụ điều trị
                    </span>
                    <h1 className="font-robotoSerif mb-5 max-w-2xl p-1 text-3xl font-bold capitalize md:text-4xl">
                        Phương pháp điều trị chuyên biệt
                    </h1>
                    <p className="font-robotoSlab text-primary-text/60 max-w-xl p-1 text-base font-normal md:text-lg">
                        Chọn vấn đề bạn đang gặp phải để tìm phương pháp
                        điều trị phù hợp nhất
                    </p>
                </div>

                <section aria-labelledby="filters-heading" role="region">
                    <div className="sr-only" id="filters-heading">
                        Bộ lọc dịch vụ
                    </div>
                    {/* Problem Category Selection Filters */}
                    <ServiceFilterSelection
                        services={services}
                        selectedCategoryIds={selectedCategoryIds}
                        onSelectCategory={handleSelectCategory}
                    />

                    {/* Selected Filters UI */}
                    {selectedCategoryIds.length > 0 && (
                        <motion.div 
                            className="mb-8 flex flex-col sm:flex-row sm:items-center"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-primary-text/70 mb-2 text-sm font-medium sm:mb-0 sm:mr-2">
                                Bộ lọc đã chọn:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {selectedCategoryIds.map((id, index) => (
                                    <motion.div
                                        key={id}
                                        className="bg-primary-text/10 flex items-center rounded-full px-2 py-1 text-xs sm:text-sm"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <span className="text-primary-text line-clamp-1 max-w-[150px] sm:max-w-[200px]">
                                            {categoryNames.get(id) ||
                                                "Unknown Category"}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleSelectCategory(id)
                                            }
                                            className="text-primary-text/60 hover:text-primary-text ml-1 p-1 transition-colors sm:ml-2"
                                            aria-label={`Xóa bộ lọc ${categoryNames.get(id) || "Unknown Category"}`}
                                        >
                                            ✕
                                        </button>
                                    </motion.div>
                                ))}
                                <motion.button
                                    onClick={handleClearFilters}
                                    className="text-primary-text/70 hover:text-primary-text text-xs underline transition-colors sm:text-sm"
                                    aria-label="Xóa tất cả bộ lọc đã chọn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Xóa tất cả
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </section>

                {/* Treatment Recommendations */}
                <section aria-labelledby="recommendations-heading" role="region">
                    <div
                        className="sr-only"
                        id="recommendations-heading"
                    >
                        Phương pháp điều trị phù hợp
                    </div>
                    <TreatmentRecommendations
                        services={services}
                        selectedCategoryIds={selectedCategoryIds}
                    />
                </section>

                <motion.div 
                    className="relative z-10 mx-auto mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                <div className="font-robotoSerif text-primary-text relative z-10 flex flex-col items-center justify-center gap-4 text-center font-normal sm:flex-row">
                    <Link href="/treatments">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                className="border-primary-text text-primary-text hover:bg-primary-text w-full bg-transparent px-8 py-3 text-base transition-all duration-300 hover:text-white sm:w-auto"
                                aria-label="Xem tất cả liệu trình điều trị"
                            >
                                Tất cả liệu trình
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="/booking">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant={"link"}
                                className="text-primary-text group flex w-full flex-row items-center px-8 py-3 text-base sm:w-auto"
                                aria-label="Đặt lịch hẹn ngay"
                            >
                                Đặt lịch hẹn
                                <ChevronRight
                                    className="animate-shake ml-2 size-4 transition-transform group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Button>
                        </motion.div>
                    </Link>
                </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
