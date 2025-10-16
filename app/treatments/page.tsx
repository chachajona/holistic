import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { TreatmentSummary } from "@/types/sanity";
import { getAllTreatments } from "@/lib/api";
import { getSanityImageUrl } from "@/lib/sanity-image";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import SwiperCarousel from "@/components/common/SwiperCarousel";

interface TreatmentCarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon?: string;
    slug?: string;
    category?: string;
}

export const revalidate = 3600;

export default async function TreatmentsPage() {
    const treatmentData: TreatmentSummary[] | null = await getAllTreatments();
    const validTreatmentData = treatmentData || [];

    const mappedTreatments: TreatmentCarouselItem[] = validTreatmentData
        .filter(treatment => treatment.slug?.current != null)
        .map((treatment, index) => ({
            id: treatment._id ?? String(index + 1),
            title: treatment.title ?? "Untitled Treatment",
            description:
                treatment.shortDescription || "No description available",
            image: treatment.image
                ? getSanityImageUrl(treatment.image, {
                      width: 600,
                      quality: 85,
                  }) || "/placeholder-image.jpg"
                : "/placeholder-image.jpg",
            icon: treatment.icon?.title,
            slug: treatment.slug!.current,
            category: treatment.icon?.title ?? "General",
        }));

    return (
        <PageLoaderWrapper isContentLoaded={true}>
            <div className="bg-primary-background relative w-full px-4 py-16 sm:px-8 lg:px-16">
                <div className="mb-8 flex flex-col lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
                    <div className="w-full max-w-full lg:w-1/2 lg:max-w-2xl">
                        <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                            Khám phá
                        </span>
                        <h2 className="text-primary-text font-robotoSerif mb-6 text-5xl font-bold">
                            Phương pháp trị liệu
                        </h2>
                    </div>

                    <div className="mt-6 flex size-full flex-col items-start justify-start gap-2 md:flex-row md:items-center lg:mt-0 lg:w-1/2 lg:justify-between">
                        <p className="text-primary-text/70 font-robotoSlab mr-4 max-w-md text-justify text-base md:text-lg">
                            Các phương pháp điều trị vật lý trị trị liệu của
                            chúng tôi bao gồm một lọa các giải pháp để đáp ứng
                            nhu cầu riêng của bạn.
                        </p>
                        <Link href="/booking">
                            <Button
                                variant={"link"}
                                className="text-primary-text group flex w-full flex-row items-center px-0 py-3 text-base sm:w-auto md:px-8"
                            >
                                Đặt lịch hẹn
                                <ChevronRight className="animate-shake ml-2 size-4 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {mappedTreatments.length > 0 && (
                    <div className="relative py-8">
                        <SwiperCarousel items={mappedTreatments} />
                    </div>
                )}
            </div>
        </PageLoaderWrapper>
    );
}
