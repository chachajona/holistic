"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, CircleCheckBig, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormData } from "@/types/form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OptimizedImage } from "@/components/ui/optimized-image";
import WordRotate from "@/components/ui/word-rotate";

const formSchema = z.object({
    phoneNumber: z.string().min(10, {
        message: "Số điện thoại phải có ít nhất 10 số.",
    }),
});

interface HeroProps {
    formData: FormData;
    heroBlurDataURL?: string;
    onImageLoaded?: () => void;
}

const HeroClient: React.FC<HeroProps> = ({ formData, onImageLoaded }) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: values.phoneNumber,
                }),
            });

            if (response.ok) {
                toast({
                    title: "Đã gửi thành công",
                    description:
                        "Chúng tôi sẽ liên hệ lại bạn trong thời gian sớm nhất.",
                });
                form.reset();
            } else {
                throw new Error("Failed to submit form");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Lỗi",
                description:
                    "Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.",
                variant: "destructive",
            });
        }
    }

    return (
        <section className="relative max-h-screen min-h-[calc(100dvh-92px)] w-full overflow-y-auto py-16 md:min-h-[calc(100dvh-250px)] md:py-[85px]">
            {/* Background image container */}
            <div className="absolute inset-0 z-0">
                <OptimizedImage
                    image="/Hero.png"
                    alt="Hero background"
                    fill
                    priority={true}
                    sizes="100vw"
                    className="object-cover object-center"
                    onLoad={onImageLoaded}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container relative z-10 md:px-16">
                <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:gap-12 xl:grid-cols-[1fr_400px]">
                    <div className="items-left flex flex-col justify-center gap-12 space-y-5 md:gap-0">
                        <h1 className="font-robotoSerif text-primary-foreground text-brown-50 text-5xl font-bold tracking-normal md:text-6xl xl:text-[64px] xl:leading-[64px]">
                            <span>Giúp mọi người</span>{" "}
                            <span className="font-robotoSlab font-light">
                                cải thiện sức khoẻ vận động một cách
                            </span>{" "}
                            <WordRotate
                                words={["toàn diện", "bền vững"]}
                                duration={5000}
                            />
                        </h1>

                        <div className="mb-4 flex flex-col gap-4 min-[400px]:flex-row">
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
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-start space-x-2">
                                            <FormField
                                                control={form.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem className="relative grow">
                                                        <FormControl>
                                                            <Input
                                                                type="tel"
                                                                placeholder={
                                                                    formData
                                                                        ?.contactFields
                                                                        ?.phonePlaceholder ||
                                                                    "Enter your phone number"
                                                                }
                                                                className="bg-brown-50/70 font-robotoSlab text-primary-text caret-primary-text focus:border-primary-text focus:bg-brown-50 focus-visible:ring-primary-text w-full border-gray-300 px-5 py-2 outline-none transition-all focus-visible:ring-1 focus-visible:ring-offset-0"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="font-robotoSlab text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="border-primary-text animate-shimmer font-robotoSerif flex items-center justify-center space-x-0 rounded-md border bg-[linear-gradient(110deg,#744D40,45%,#8a5d4d,55%,#744D40)] bg-[length:200%_100%] px-4 py-3 font-medium text-white transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#5a3b31] focus:ring-offset-2 focus:ring-offset-slate-50 sm:space-x-2 sm:px-6"
                                            >
                                                <span className="hidden sm:block">
                                                    {formData?.submitButtonText ||
                                                        "Submit"}
                                                </span>
                                                <Send size={20} />
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroClient;
