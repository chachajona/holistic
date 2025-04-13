"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import * as Icons from "lucide-react";
import { Award, Calendar, ChevronDown, ChevronRight } from "lucide-react";

import { Service, ServicesClientProps } from "@/types/services";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { SanityImage } from "@/components/ui/sanity-image";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import { QuickBookingDialog } from "@/components/features/booking/QuickBookingDialog";

// Memoize components for better performance
const MemoizedQuickBookButton = memo(
    ({
        service,
        onClick,
    }: {
        service: Service;
        onClick: (service: Service) => void;
    }) => (
        <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-4 bg-amber-500 text-white hover:bg-amber-600"
            onClick={e => {
                e.stopPropagation();
                onClick(service);
            }}
            aria-label={`Đặt lịch nhanh cho ${service.title}`}
        >
            <Calendar className="mr-2 size-4" />
            Đặt lịch nhanh
        </Button>
    ),
);
MemoizedQuickBookButton.displayName = "QuickBookButton";

const PopularBadge = memo(({ isPrimary }: { isPrimary: boolean }) =>
    isPrimary ? (
        <div className="absolute -right-2 -top-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
            Phổ biến nhất
        </div>
    ) : null,
);
PopularBadge.displayName = "PopularBadge";

const ExpandIndicator = memo(({ isExpanded }: { isExpanded: boolean }) => (
    <div className="flex items-center text-sm">
        {isExpanded ? (
            <ChevronDown className="size-5 opacity-75" />
        ) : (
            <ChevronRight className="size-5 opacity-75" />
        )}
    </div>
));
ExpandIndicator.displayName = "ExpandIndicator";

export function ServicesClient({ services }: ServicesClientProps) {
    const [quickBookService, setQuickBookService] = useState<Service | null>(
        null,
    );
    const [selectedService, setSelectedService] = useState<Service | null>(
        null,
    );
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        // Consider services loaded once the array is available
        if (services && services.length > 0) {
            const timer = setTimeout(() => {
                setIsContentLoaded(true);
            }, 500); // Simulate a short delay
            return () => clearTimeout(timer);
        }
    }, [services]);

    // Memoize handlers
    const handleSelectService = useCallback((service: Service) => {
        setSelectedService(service);
    }, []);

    const handleQuickBookService = useCallback((service: Service) => {
        setQuickBookService(service);
    }, []);

    const getIcon = useCallback(
        (
            iconName: string,
            className = "text-primary-text mb-4 size-10 md:size-12",
        ) => {
            // Check if it's a custom icon first
            if (isCustomIcon(iconName)) {
                const CustomIcon = customIcons[iconName];
                return <CustomIcon className={className} />;
            }

            // Fall back to Lucide icons
            const Icon = Icons[
                iconName as keyof typeof Icons
            ] as React.ElementType;
            return Icon ? <Icon className={className} /> : null;
        },
        [],
    );

    // Service details display component (used in both dialog and drawer)
    const ServiceDetails = memo(({ service }: { service: Service }) => (
        <div className="w-full">
            {/* Outcome section */}
            {service.details.outcome && (
                <div className="bg-brown-50/80 mb-6 overflow-hidden rounded-xl shadow-sm">
                    <div className="border-l-4 border-amber-500 bg-gradient-to-r from-amber-50/50 to-transparent p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-full bg-amber-500/10 p-2">
                                <Award className="size-5 text-amber-500" />
                            </div>
                            <h4 className="font-robotoSerif text-primary-text text-lg font-semibold">
                                Kết quả có thể đạt được
                            </h4>
                        </div>
                        <p className="font-robotoSlab text-primary-text/80 leading-relaxed">
                            {service.details.outcome}
                        </p>
                    </div>
                </div>
            )}

            {/* Protocol section */}
            {service.details.protocol && (
                <div className="bg-brown-50/80 mb-6 overflow-hidden rounded-xl shadow-sm">
                    <div className="border-brown-500 from-brown-50/50 border-l-4 bg-gradient-to-r to-transparent p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="bg-brown-500/10 rounded-full p-2">
                                <Icons.ClipboardList className="text-brown-500 size-5" />
                            </div>
                            <h4 className="font-robotoSerif text-primary-text text-lg font-semibold">
                                Quy trình điều trị
                            </h4>
                        </div>
                        <p className="font-robotoSlab text-primary-text/80 leading-relaxed">
                            {service.details.protocol}
                        </p>
                    </div>
                </div>
            )}

            {/* Evidence section */}
            {service.details.evidence && (
                <div className="bg-brown-50/80 mb-8 overflow-hidden rounded-xl shadow-sm">
                    <div className="border-primary-text from-brown-50/50 border-l-4 bg-gradient-to-r to-transparent p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="bg-primary-text/10 rounded-full p-2">
                                <Icons.BookOpen className="text-primary-text size-5" />
                            </div>
                            <h4 className="font-robotoSerif text-primary-text text-lg font-semibold">
                                Cơ sở khoa học
                            </h4>
                        </div>
                        <p className="font-robotoSlab text-primary-text/80 leading-relaxed">
                            {service.details.evidence}
                        </p>
                    </div>
                </div>
            )}

            {/* Treatment methods grid */}
            <div className="grid gap-5">
                {service.details.treatments.map(treatment => (
                    <div
                        key={treatment.id}
                        className="bg-brown-50/80 group relative overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-text/10 rounded-lg p-2">
                                    {getIcon(
                                        treatment.icon,
                                        "text-primary-text size-5",
                                    )}
                                </div>
                                <h5 className="font-robotoSerif text-primary-text text-lg font-medium">
                                    {treatment.name}
                                </h5>
                            </div>
                            <Button
                                onClick={() => handleQuickBookService(service)}
                                variant="outline"
                                className="font-robotoSerif border-primary-text text-primary-text hover:bg-primary-text bg-transparent hover:text-white"
                            >
                                <Calendar className="mr-2 size-3.5" />
                                Đặt lịch
                            </Button>
                        </div>
                        <p className="font-robotoSlab text-primary-text/80 mb-4 text-sm leading-relaxed">
                            {treatment.description}
                        </p>
                        <Link
                            href={treatment.href}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
                        >
                            Tìm hiểu thêm
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    ));
    ServiceDetails.displayName = "ServiceDetails";

    // Fixed ResponsiveDialog implementation
    const ResponsiveDialog = ({ children }: { children: React.ReactNode }) => {
        if (isDesktop) {
            return (
                <Dialog
                    open={!!selectedService}
                    onOpenChange={open => {
                        if (!open) setSelectedService(null);
                    }}
                >
                    <DialogContent className="bg-primary-background max-h-[85vh] overflow-y-auto p-0 sm:max-w-[600px]">
                        <DialogTitle className="sr-only">
                            {selectedService?.title || "Chi tiết dịch vụ"}
                        </DialogTitle>
                        <div className="bg-primary-background sticky top-0 z-10 p-6 pb-4 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-text/10 rounded-xl p-2">
                                    {getIcon(
                                        selectedService!.icon,
                                        "text-primary-text size-8",
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-robotoSerif text-primary-text text-2xl font-medium">
                                        {selectedService!.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="font-robotoSlab text-primary-text/80 mt-4">
                                {selectedService!.description}
                            </p>
                        </div>
                        <div className="p-6 pt-2">{children}</div>
                    </DialogContent>
                </Dialog>
            );
        }

        return (
            <Drawer
                open={!!selectedService}
                onOpenChange={open => {
                    if (!open) setSelectedService(null);
                }}
            >
                <DrawerContent className="bg-primary-background">
                    <DrawerHeader className="bg-primary-background/80 sticky top-0 z-10 px-6 pb-4 backdrop-blur-sm">
                        <DrawerTitle className="sr-only">
                            {selectedService?.title || "Chi tiết dịch vụ"}
                        </DrawerTitle>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-text/10 rounded-xl p-2">
                                {getIcon(
                                    selectedService!.icon,
                                    "text-primary-text size-8",
                                )}
                            </div>
                            <div>
                                <h2 className="font-robotoSerif text-primary-text text-2xl font-medium">
                                    {selectedService!.title}
                                </h2>
                            </div>
                        </div>
                        <p className="font-robotoSlab text-primary-text/80 mt-4">
                            {selectedService!.description}
                        </p>
                    </DrawerHeader>
                    <div className="max-h-[65vh] overflow-y-auto px-6 pb-8">
                        <div className="mx-auto w-full max-w-md">
                            {children}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    };

    const ServiceCard = memo(({ service }: { service: Service }) => (
        <div
            className={cn(
                "border-primary-text group relative flex min-h-[400px] cursor-pointer overflow-hidden rounded-md border bg-transparent shadow-lg transition-all duration-300 hover:shadow-xl",
                service.isPrimary && "ring-2 ring-amber-500",
            )}
            onClick={() => handleSelectService(service)}
            role="button"
            tabIndex={0}
            aria-label={`Xem chi tiết về ${service.title}`}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                <div className="relative size-full">
                    <SanityImage
                        image={service.imageSource}
                        imageUrl={service.processedImage.imageUrl}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={service.isPrimary}
                        blurDataURL={service.processedImage.blurDataURL}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                </div>
            </div>

            {/* Content Container */}
            <div className="group-hover:from-brown-950/70 relative z-10 flex size-full flex-col bg-gradient-to-r from-transparent to-transparent p-6 transition-all duration-300 ease-in-out group-hover:to-transparent">
                {/* Top Section - Always Visible */}
                <div className="flex items-start justify-between">
                    <div className="text-white transition-transform duration-300 ease-in-out group-hover:scale-95">
                        {getIcon(service.icon, "size-14")}
                    </div>
                    {service.isPrimary && (
                        <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                            Phổ biến nhất
                        </span>
                    )}
                </div>

                {/* Sliding Content Container - Updated transitions */}
                <div className="mt-auto translate-y-2/3 transition-all duration-300 ease-out group-hover:translate-y-0">
                    {/* Title */}
                    <h3 className="font-robotoSerif mb-4 text-2xl font-medium text-white">
                        {service.title}
                    </h3>

                    {/* Description and Actions - Updated fade effect */}
                    <div className="visibility-hidden group-hover:visibility-visible space-y-4 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                        <p className="font-robotoSlab text-sm leading-relaxed text-white/90">
                            {service.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="sm"
                                className="hover:text-primary-text border-white bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleQuickBookService(service);
                                }}
                            >
                                <Calendar className="mr-2 size-4" />
                                Đặt lịch ngay
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary-text border-white bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleSelectService(service);
                                }}
                            >
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    ServiceCard.displayName = "ServiceCard";

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div className="bg-primary-background relative w-full py-16 sm:px-16">
                {/* Background decoration */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/Paper.png')" }}
                    aria-hidden="true"
                />

                {/* Header section */}
                <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                    <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-sm font-light md:text-base">
                        Dịch vụ điều trị
                    </span>
                    <h1 className="font-robotoSerif mb-6 max-w-2xl p-1 text-2xl font-bold capitalize md:text-3xl">
                        Phương pháp điều trị chuyên biệt
                    </h1>
                    <p className="font-robotoSlab text-primary-text/50 mb-8 max-w-xl p-1 text-sm font-normal md:text-base">
                        Các dịch vụ chăm sóc được thiết kế để đạt kết quả điều
                        trị tối ưu, giúp bạn cải thiện sức khỏe và nâng cao chất
                        lượng cuộc sống.
                    </p>
                </div>

                {/* Services grid */}
                <div className="container relative z-10 mt-10 flex">
                    <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>

                {/* Responsive dialog for service details */}
                {selectedService && (
                    <ResponsiveDialog>
                        <>
                            <ServiceDetails service={selectedService} />
                        </>
                    </ResponsiveDialog>
                )}

                {/* Quick booking dialog */}
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

                {/* Bottom CTAs */}
                <div className="relative z-10 mx-auto mt-10 text-center">
                    <div className="font-robotoSerif text-primary-text relative z-10 mt-8 flex flex-row items-center justify-center gap-4 text-center font-normal">
                        <Link href="/treatments">
                            <Button
                                variant="outline"
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
        </PageLoaderWrapper>
    );
}
