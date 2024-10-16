import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CalendarCheck, CircleCheckBig } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-hero-pattern relative max-h-screen min-h-[calc(100dvh-92px)] w-full bg-cover bg-center py-16 md:min-h-[calc(100dvh-250px)] md:py-[85px]">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container relative md:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:gap-12 xl:grid-cols-[1fr_400px]">
          <div className="items-left flex flex-col justify-center gap-12 space-y-5 md:gap-0">
            <h1 className="font-robotoSerif text-brown-50 text-primary-foreground text-5xl font-bold tracking-normal md:text-6xl xl:text-[64px] xl:leading-[64px]">
              Giúp mọi người{" "}
              <span className="font-robotoSlab font-light">
                cải thiện sức khoẻ vận động một cách
              </span>{" "}
              toàn diện & bền vững.
            </h1>

            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <div className="bg-primary-background/80 flex w-full flex-col space-y-3 rounded-xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:max-w-md lg:max-w-lg">
                <h3 className="font-robotoSerif text-primary-text text-lg font-bold uppercase md:text-2xl">
                  Tư vấn ngay trong 30 giây
                </h3>
                <div className="font-robotoSlab text-primary-text flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center align-middle">
                    <CalendarCheck className="mr-1 size-5" />
                    <span>Đặt lịch dễ dàng</span>
                  </div>
                  <div className="flex items-center align-middle">
                    <CircleCheckBig className="mr-1 size-5" />
                    <span>Xác nhận ngay</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative grow">
                    <Input
                      type="tel"
                      placeholder="Nhập số điện thoại..."
                      className="bg-brown-50/70 font-robotoSlab text-primary-text caret-primary-text focus:border-primary-text focus:bg-brown-50 focus-visible:ring-primary-text w-full border-gray-300 px-5 py-2 outline-none transition-all focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="animate-shimmer border-primary-text font-robotoSerif focus:ring-primary flex items-center justify-center space-x-0 rounded-md border bg-[linear-gradient(110deg,#744D40,45%,#8a5d4d,55%,#744D40)] bg-[length:200%_100%] px-4 py-3 font-medium text-white transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#5a3b31] focus:ring-offset-2 focus:ring-offset-slate-50 sm:space-x-2 sm:px-6"
                  >
                    <span className="hidden sm:block">Tư vấn ngay</span>
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
