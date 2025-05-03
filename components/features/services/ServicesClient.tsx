"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Service, ServicesClientProps } from "@/types/services";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import { QuickBookingDialog } from "@/components/features/booking/QuickBookingDialog";

import { ServiceFilterSelection } from "./ServiceFilterSelection";
import { TreatmentRecommendations } from "./TreatmentRecommendations";

export function ServicesClient({ services }: ServicesClientProps) {
    const [quickBookService, setQuickBookService] = useState<Service | null>(
        null,
    );
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

    useEffect(() => {
        if (services && services.length > 0) {
            setIsContentLoaded(true);
        }
    }, [services]);

    const handleQuickBookService = useCallback((service: Service) => {
        setQuickBookService(service);
    }, []);

    const handleSelectService = useCallback((id: string) => {
        setSelectedServiceIds(prev => {
            // Toggle selection
            if (prev.includes(id)) {
                return prev.filter(sId => sId !== id);
            } else {
                return [...prev, id];
            }
        });
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedServiceIds([]);
    }, []);

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
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
                        Chọn vấn đề bạn đang gặp phải để tìm phương pháp điều
                        trị phù hợp nhất
                    </p>
                </div>

                <div className="container relative z-10 mx-auto">
                    {/* Service Selection Filters */}
                    <ServiceFilterSelection
                        services={services}
                        selectedServiceIds={selectedServiceIds}
                        onSelectService={handleSelectService}
                    />

                    {/* Selected Filters UI */}
                    {selectedServiceIds.length > 0 && (
                        <div className="mb-8 flex items-center">
                            <span className="text-primary-text/70 mr-2 text-sm">
                                Bộ lọc đã chọn:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {selectedServiceIds.map(id => {
                                    const service = services.find(
                                        s => s.id === id,
                                    );
                                    return service ? (
                                        <div
                                            key={id}
                                            className="bg-primary-text/10 flex items-center rounded-full px-3 py-1 text-sm"
                                        >
                                            <span className="text-primary-text">
                                                {service.title}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleSelectService(id)
                                                }
                                                className="text-primary-text/60 hover:text-primary-text ml-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : null;
                                })}
                                <button
                                    onClick={handleClearFilters}
                                    className="text-primary-text/70 hover:text-primary-text text-sm underline"
                                >
                                    Xóa tất cả
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Treatment Recommendations */}
                    <TreatmentRecommendations
                        services={services}
                        selectedServiceIds={selectedServiceIds}
                        onQuickBook={handleQuickBookService}
                    />
                </div>

                <QuickBookingDialog
                    isOpen={!!quickBookService}
                    onClose={() => setQuickBookService(null)}
                    service={
                        quickBookService
                            ? {
                                  title: quickBookService.title,
                                  treatments:
                                      quickBookService.details.treatments.map(
                                          t => ({ id: t.id, name: t.name }),
                                      ),
                              }
                            : null
                    }
                />

                <div className="relative z-10 mx-auto mt-16 text-center">
                    <div className="font-robotoSerif text-primary-text relative z-10 flex flex-col items-center justify-center gap-4 text-center font-normal sm:flex-row">
                        <Link href="/treatments">
                            <Button
                                variant="outline"
                                className="border-primary-text text-primary-text hover:bg-primary-text w-full bg-transparent px-8 py-3 text-base hover:text-white sm:w-auto"
                            >
                                Tất cả liệu trình
                            </Button>
                        </Link>
                        <Link href="/booking">
                            <Button
                                variant={"link"}
                                className="text-primary-text group flex w-full flex-row items-center px-8 py-3 text-base sm:w-auto"
                            >
                                Đặt lịch hẹn
                                <ChevronRight className="animate-shake ml-2 size-4 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </PageLoaderWrapper>
    );
}
