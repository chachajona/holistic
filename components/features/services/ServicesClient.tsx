"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import * as Icons from "lucide-react";
import { Calendar, ChevronRight } from "lucide-react";

import { Service, ServicesClientProps } from "@/types/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SanityImage } from "@/components/ui/sanity-image";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import { QuickBookingDialog } from "@/components/features/booking/QuickBookingDialog";

const PopularBadge = memo(({ isPrimary }: { isPrimary: boolean }) =>
    isPrimary ? (
        <div className="absolute -right-2 -top-3 z-10 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
            Phổ biến nhất
        </div>
    ) : null,
);
PopularBadge.displayName = "PopularBadge";

export function ServicesClient({ services }: ServicesClientProps) {
    const [quickBookService, setQuickBookService] = useState<Service | null>(
        null,
    );
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        if (services && services.length > 0) {
            const timer = setTimeout(() => {
                setIsContentLoaded(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [services]);

    const handleQuickBookService = useCallback((service: Service) => {
        setQuickBookService(service);
    }, []);

    const getIcon = useCallback(
        (
            iconName: string,
            className = "text-primary-text mb-4 size-10 md:size-12",
        ) => {
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

    const ServiceCard = memo(({ service }: { service: Service }) => (
        <Link href={`/services/${service.id}`} passHref legacyBehavior>
            <a
                className={cn(
                    "border-primary-text group relative flex min-h-[400px] cursor-pointer overflow-hidden rounded-md border bg-transparent shadow-lg transition-all duration-300 hover:shadow-xl",
                    service.isPrimary && "ring-2 ring-amber-500",
                )}
                aria-label={`Xem chi tiết về ${service.title}`}
            >
                <div className="absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="relative size-full">
                        <SanityImage
                            image={service.imageSource}
                            imageUrl={service.processedImage.imageUrl}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority={service.isPrimary}
                            blurDataURL={service.processedImage.blurDataURL}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                    </div>
                </div>

                <div className="group-hover:from-brown-950/70 relative z-10 flex size-full flex-col bg-gradient-to-r from-transparent to-transparent p-6 transition-all duration-300 ease-in-out group-hover:to-transparent">
                    <div className="flex items-start justify-between">
                        <div className="text-white transition-transform duration-300 ease-in-out group-hover:scale-95">
                            {getIcon(service.icon, "size-14")}
                        </div>
                        {service.isPrimary && (
                            <PopularBadge isPrimary={service.isPrimary} />
                        )}
                    </div>

                    <div className="mt-auto translate-y-2/3 transition-all duration-300 ease-out group-hover:translate-y-0">
                        <h3 className="font-robotoSerif mb-4 text-2xl font-medium text-white">
                            {service.title}
                        </h3>

                        <div className="visibility-hidden group-hover:visibility-visible space-y-4 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                            <p className="font-robotoSlab line-clamp-3 text-sm leading-relaxed text-white/90">
                                {service.description}
                            </p>

                            <div className="flex items-center justify-start">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/70 bg-transparent text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-black/20 hover:text-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleQuickBookService(service);
                                    }}
                                    aria-label={`Đặt lịch nhanh cho ${service.title}`}
                                >
                                    <Calendar className="mr-2 size-4" />
                                    Đặt lịch nhanh
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    ));
    ServiceCard.displayName = "ServiceCard";

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
                        Các dịch vụ chăm sóc được thiết kế để đạt kết quả điều
                        trị tối ưu, giúp bạn cải thiện sức khỏe và nâng cao chất
                        lượng cuộc sống.
                    </p>
                </div>

                <div className="container relative z-10 mx-auto flex">
                    <div className="grid w-full gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
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
                        <Link href="/booking/consultation">
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
