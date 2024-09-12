"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import dynamic from "next/dynamic";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

// Dynamic import for Swiper
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
    ssr: false,
});
const SwiperSlide = dynamic(
    () => import("swiper/react").then((mod) => mod.SwiperSlide),
    { ssr: false },
);

// Dynamic import for Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel({ items }: { items: { title: string, description: string, image: StaticImageData }[] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const ServiceCard = ({ title, description, image }: { title: string, description: string, image: StaticImageData }) => (
        <div className="overflow-hidden rounded-lg bg-stone-100 shadow-md">
            <Image
                src={image}
                alt={title}
                width={400}
                height={300}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold text-stone-800">{title}</h2>
                <p className="text-sm text-stone-600">{description}</p>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {items.map((service, index) => (
                    <SwiperSlide key={index}>
                        <ServiceCard {...service} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    return (
        <div className="relative mx-auto max-h-96 rounded-lg bg-brown-50 p-6">
            <Tabs className="flex flex-col sm:flex-row-reverse items-start justify-center" defaultValue={items[0].title}>
                <TabsList className="sm:flex-col h-auto sm:h-auto sm:w-1/2 bg-transparent">
                    {items.map((treatment, index) => (
                        <TabsTrigger
                            className="w-full text-left justify-start flex-col items-start p-4 bg-transparent mb-2 data-[state=active]:bg-[#D2C9C3] text-primary-text/60 data-[state=active]:text-primary-text data-[state=active]:font-bold data-[state=active]:border-l-2 data-[state=active]:border-[#90776E]"
                            key={index}
                            value={treatment.title}
                        >
                            <div className="flex flex-col">
                                <h4 className="text-3xl font-robotoSerif font-semibold mb-1">{treatment.title}</h4>
                                <p className="!font-normal text-sm font-robotoSlab !text-primary-text/40 line-clamp-2">
                                    {treatment.description}
                                </p>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="h-full mt-4 sm:mt-0 sm:ml-4 flex-grow">
                    {items.map((treatment, index) => (
                        <TabsContent key={index} value={treatment.title}>
                            <div className="relative h-full rounded-lg overflow-hidden">
                                <Image
                                    src={treatment.image}
                                    alt={treatment.title}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    );
}
