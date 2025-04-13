"use client";

import React, { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FAQ from "@/components/features/marketing/FAQ";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

const BookingPage = () => {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div>
                <div className="container mx-auto w-full py-6 md:px-16 md:py-8">
                    <div className="bg-primary-background flex flex-col gap-8 md:flex-row">
                        <div className="flex-1">
                            <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                                Liên hệ
                            </span>
                            <h2 className="font-robotoSerif text-primary-text mb-4 text-5xl font-semibold capitalize">
                                Thông tin liên hệ
                            </h2>
                            <p className="font-robotoSlab text-primary-text/60 text-lg">
                                Vui lòng điền vào biểu mẫu dưới đây với thông
                                tin chi tiết của bạn.
                            </p>
                            <div className="font-robotoSlab mt-4 space-y-4">
                                <div className="text-primary-text flex items-center space-x-3">
                                    <Mail size={20} />
                                    <span>info@holistic.io</span>
                                </div>
                                <div className="text-primary-text flex items-center space-x-3">
                                    <Phone size={20} />
                                    <span>(+84) 82 895-9598</span>
                                </div>
                                <div className="text-primary-text flex items-center space-x-3">
                                    <MapPin size={20} />
                                    <span>
                                        70 Bà Huyện Thanh Quan, Phường Võ Thị
                                        Sáu, Quận 3
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Card className="font-robotoSlab flex-1 bg-white">
                            <CardHeader>
                                <CardTitle className="text-brown-700 text-2xl font-normal">
                                    Form liên hệ
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="text-brown-700 block text-sm font-medium"
                                        >
                                            Họ và tên
                                        </label>
                                        <Input id="name" className="mt-1" />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-brown-700 block text-sm font-medium"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="text-brown-700 block text-sm font-medium"
                                        >
                                            Tin nhắn đính kèm
                                        </label>
                                        <Textarea
                                            id="message"
                                            className="mt-1"
                                            placeholder="Điền tin nhắn của bạn"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-brown-600 text-sm"
                                        >
                                            Tôi đồng ý chia sẻ thông tin
                                        </label>
                                    </div>
                                    <Button className="bg-primary-text hover:bg-brown-800 w-full text-white">
                                        Gửi
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <FAQ />
            </div>
        </PageLoaderWrapper>
    );
};

export default BookingPage;
