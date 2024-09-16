"use client";

import Image, { StaticImageData } from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Carousel({
  items,
}: {
  items: { title: string; description: string; image: StaticImageData }[];
}) {
  return (
    <div className="relative mx-auto my-auto h-screen w-full rounded-lg bg-brown-50 p-4 sm:p-6">
      <Tabs
        className="h-ful relative flex flex-col items-start justify-start gap-5 lg:flex-row-reverse"
        defaultValue={items[0].title}
      >
        <ScrollArea className="h-full w-full lg:w-1/2">
          <div className="relative h-auto lg:h-[calc(100dvh-10vh)]">
            <TabsList className="relative flex h-full min-h-20 w-full flex-row justify-normal overflow-x-auto bg-transparent lg:absolute lg:flex-col">
              {items.map((item, index) => (
                <TabsTrigger
                  className="mb-2 flex flex-shrink-0 flex-col items-start justify-start bg-transparent p-3 text-left text-primary-text/60 data-[state=active]:border-b-2 data-[state=active]:border-[#90776E] data-[state=active]:bg-[#D2C9C3] data-[state=active]:font-bold data-[state=active]:text-primary-text lg:p-4 lg:data-[state=active]:border-b-0 lg:data-[state=active]:border-l-2"
                  key={index}
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

        <div className="h-80 w-full flex-grow lg:h-[calc(100dvh-10vh)] lg:w-1/2">
          {items.map((item, index) => (
            <TabsContent key={index} value={item.title} className="h-full">
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
    </div>
  );
}
