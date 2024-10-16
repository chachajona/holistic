"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "@/hooks/use-media-query";

type CarouselItem = {
  title: string;
  description: string;
  image: string;
};

interface CarouselProps {
  items: CarouselItem[];
}

const SwiperCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
  const isTablet = useMediaQuery("(max-width: 1023px)");

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  const renderTabletView = () => (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      plugins={[autoplayPlugin.current]}
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
      className="h-full w-full max-w-sm md:max-w-4xl"
    >
      <CarouselContent className="h-full">
        {items.map((item, index) => (
          <CarouselItem
            key={item.title}
            className="h-full w-[90%] md:basis-1/2"
          >
            <Card className="h-full border-none bg-transparent">
              <CardContent className="flex h-full flex-col items-center justify-start gap-5 p-4 md:h-[85dvh] md:p-6">
                <AspectRatio ratio={1 / 1} className="relative w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </AspectRatio>
                <div className="flex h-2/5 flex-col items-start justify-between">
                  <h3 className="text-primary-text text-left font-robotoSerif text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="whitespace-normal break-words font-robotoSlab text-xs !font-normal !text-primary-text/40 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute bottom-0 right-0 text-primary-text focus:bg-primary-text focus:text-white border-none" />
      <CarouselPrevious className="absolute bottom-0 left-0 text-primary-text focus:bg-primary-text focus:text-white border-none" />
      <div className="py-2 text-right text-sm font-robotoMono text-primary-text/40">
        {current} / {count}
      </div>
    </Carousel>
  );

  const renderDesktopView = () => (
    <Tabs
      className="relative flex h-full flex-col items-start justify-start gap-5 lg:flex-row-reverse"
      defaultValue={items[0].title}
    >
      <ScrollArea className="h-full w-full lg:w-1/2">
        <div className="relative h-auto lg:h-[calc(100dvh-10vh)]">
          <TabsList className="relative flex h-full min-h-20 w-full flex-row justify-normal overflow-x-auto bg-transparent lg:absolute lg:flex-col">
            {items.map((item) => (
              <TabsTrigger
                key={item.title}
                className="mb-2 flex flex-shrink-0 flex-col items-start justify-start bg-transparent p-3 text-left text-primary-text/60 data-[state=active]:border-b-2 data-[state=active]:border-[#90776E] data-[state=active]:bg-[#D2C9C3] data-[state=active]:font-bold data-[state=active]:text-primary-text lg:p-4 lg:data-[state=active]:border-b-0 lg:data-[state=active]:border-l-2"
                value={item.title}
              >
                <div className="flex w-full flex-col">
                  <h4 className="mb-1 font-robotoSerif text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
                    {item.title}
                  </h4>
                  <p className="hidden whitespace-normal break-words font-robotoSlab text-xs !font-normal !text-primary-text/40 sm:text-sm lg:block">
                    {item.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </ScrollArea>

      <div className="h-80 w-full flex-grow lg:h-[calc(100dvh-30vh)] lg:w-1/2">
        {items.map((item, index) => (
          <TabsContent key={item.title} value={item.title} className="h-full">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
            <p className="mt-4 block whitespace-normal break-words font-robotoSlab text-xs !font-normal !text-primary-text/40 sm:text-sm lg:hidden">
              {item.description}
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );

  return (
    <div className="relative mx-auto my-auto lg:h-[calc(100dvh-20dvh)] w-full rounded-lg bg-brown-50 p-4 sm:p-6">
      {isTablet ? renderTabletView() : renderDesktopView()}
    </div>
  );
};

export default SwiperCarousel;
