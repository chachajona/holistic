"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getAllTreatments, getTreatmentBySlug } from "@/lib/api";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import SwiperCarousel from "@/components/common/SwiperCarousel";

interface TreatmentItem {
    id: string;
    title: string;
    href: string;
    description: string;
    image: string;
    imageObj?: any;
}

async function fetchTreatments(): Promise<TreatmentItem[]> {
    const treatments = await getAllTreatments();

    const detailedTreatments = await Promise.all(
        treatments.map(async (treatment: any, index: number) => {
            const fullTreatment = await getTreatmentBySlug(treatment.slug);
            return {
                id: String(index + 1).padStart(2, "0"),
                title: fullTreatment.title,
                href: `/treatments/${fullTreatment.slug}`,
                description:
                    fullTreatment.shortDescription ||
                    "Không có mô tả cho phương pháp này",
                image: fullTreatment.imageUrl || "/placeholder-image.jpg",
                imageObj: fullTreatment.image,
            };
        }),
    );

    return detailedTreatments;
}

export default function TreatmentsPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [treatments, setTreatments] = useState<TreatmentItem[]>([]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const treatmentsData = await fetchTreatments();
                setTreatments(treatmentsData);
                setIsContentLoaded(true);
            } catch (error) {
                console.error("Error loading treatments:", error);
                setIsContentLoaded(true);
            }
        };

        loadContent();
    }, []);

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
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
                        <Link href="/booking/consultation">
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

                {treatments.length > 0 && (
                    <div className="relative py-8">
                        <SwiperCarousel
                            items={treatments.map(t => ({
                                title: t.title,
                                description: t.description,
                                image: t.image,
                            }))}
                        />
                    </div>
                )}
            </div>
        </PageLoaderWrapper>
    );
}
