import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CalendarCheck, CircleCheckBig } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full bg-hero-pattern bg-cover bg-center py-12 md:py-[85px]">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container relative md:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:gap-12 xl:grid-cols-[1fr_400px]">
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="font-robotoSerif text-4xl font-bold tracking-normal text-brown-50 text-primary-foreground md:text-6xl xl:text-[64px] xl:leading-[64px]">
              Giúp mọi người{" "}
              <span className="font-robotoSlab font-light">
                cải thiện sức khoẻ vận động một cách
              </span>{" "}
              toàn diện & bền vững.
            </h1>

            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <div className="flex w-full flex-col space-y-3 rounded-xl bg-primary-background/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:max-w-md lg:max-w-lg">
                <h3 className="font-robotoSerif text-2xl font-bold uppercase text-primary-text">
                  Tư vấn ngay trong 30 giây
                </h3>
                <div className="flex flex-wrap items-center gap-4 font-robotoSlab text-sm text-primary-text">
                  <div className="flex items-center align-middle">
                    <CalendarCheck className="mr-1 h-5 w-5" />
                    <span>Đặt lịch dễ dàng</span>
                  </div>
                  <div className="flex items-center align-middle">
                    <CircleCheckBig className="mr-1 h-5 w-5" />
                    <span>Xác nhận ngay</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      type="tel"
                      placeholder="Nhập số điện thoại..."
                      className="w-full border-gray-300 bg-brown-50/70 px-5 py-2 font-robotoSlab text-primary-text caret-primary-text outline-none transition-all focus:border-primary-text focus:bg-brown-50 focus-visible:ring-1 focus-visible:ring-primary-text focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="flex animate-shimmer items-center justify-center space-x-0 rounded-md border border-primary-text bg-[linear-gradient(110deg,#744D40,45%,#8a5d4d,55%,#744D40)] bg-[length:200%_100%] px-4 py-3 font-robotoSerif font-medium text-white transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#5a3b31] focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50 sm:space-x-2 sm:px-6"
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
