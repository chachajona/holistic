"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ServicesClientProps } from "@/types/services";
import { Button } from "@/components/ui/button";
import Banner from "@/components/common/Banner";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { ServiceFilterSelection } from "./ServiceFilterSelection";
import { TreatmentRecommendations } from "./TreatmentRecommendations";

export function ServicesClient({
    services,
    contactInfo,
    socialMedia,
}: ServicesClientProps) {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        [],
    );

    useEffect(() => {
        if (services && services.length > 0) {
            setIsContentLoaded(true);
        }
    }, [services]);

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
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <main className="bg-primary-background flex min-h-screen flex-col">
                <Banner contactInfo={contactInfo} socialMedia={socialMedia} />
                <Navbar />
                <div className="bg-primary-background relative w-full px-4 py-16 sm:px-8 md:px-16">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-5"
                        style={{ backgroundImage: "url('/Paper.png')" }}
                        aria-hidden="true"
                    />

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

                    <div className="container relative z-10 mx-auto">
                        <section
                            aria-labelledby="filters-heading"
                            role="region"
                        >
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
                                <div className="mb-8 flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-primary-text/70 mb-2 text-sm font-medium sm:mb-0 sm:mr-2">
                                        Bộ lọc đã chọn:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategoryIds.map(id => (
                                            <div
                                                key={id}
                                                className="bg-primary-text/10 flex items-center rounded-full px-2 py-1 text-xs sm:text-sm"
                                            >
                                                <span className="text-primary-text line-clamp-1 max-w-[150px] sm:max-w-[200px]">
                                                    {categoryNames.get(id) ||
                                                        "Unknown Category"}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleSelectCategory(id)
                                                    }
                                                    className="text-primary-text/60 hover:text-primary-text ml-1 p-1 sm:ml-2"
                                                    aria-label={`Xóa bộ lọc ${categoryNames.get(id) || "Unknown Category"}`}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleClearFilters}
                                            className="text-primary-text/70 hover:text-primary-text text-xs underline sm:text-sm"
                                            aria-label="Xóa tất cả bộ lọc đã chọn"
                                        >
                                            Xóa tất cả
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Treatment Recommendations */}
                        <section
                            aria-labelledby="recommendations-heading"
                            role="region"
                        >
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
                    </div>

                    <div className="relative z-10 mx-auto mt-16 text-center">
                        <div className="font-robotoSerif text-primary-text relative z-10 flex flex-col items-center justify-center gap-4 text-center font-normal sm:flex-row">
                            <Link href="/treatments">
                                <Button
                                    variant="outline"
                                    className="border-primary-text text-primary-text hover:bg-primary-text w-full bg-transparent px-8 py-3 text-base hover:text-white sm:w-auto"
                                    aria-label="Xem tất cả liệu trình điều trị"
                                >
                                    Tất cả liệu trình
                                </Button>
                            </Link>
                            <Link href="/booking">
                                <Button
                                    variant={"link"}
                                    className="text-primary-text group flex w-full flex-row items-center px-8 py-3 text-base sm:w-auto"
                                    aria-label="Đặt lịch hẹn ngay"
                                >
                                    Đặt lịch hẹn
                                    <ChevronRight
                                        className="animate-shake ml-2 size-4 group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer contactInfo={contactInfo} socialMedia={socialMedia} />
            </main>
        </PageLoaderWrapper>
    );
}
