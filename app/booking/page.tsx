import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQ from "@/components/FAQ";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const BookingPage = () => {
    return (
        <div>
            <div className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <div className="flex flex-col gap-8 bg-primary-background md:flex-row">
                    <div className="flex-1">
                        <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light">
                            Liên hệ
                        </span>
                        <h2 className="mb-4 font-robotoSerif text-5xl font-semibold capitalize text-primary-text">
                            Thông tin liên hệ
                        </h2>
                        <p className="font-robotoSlab text-lg text-primary-text/60">
                            Vui lòng điền vào biểu mẫu dưới đây với thông tin
                            chi tiết của bạn.
                        </p>
                        <div className="mt-4 space-y-4 font-robotoSlab">
                            <div className="flex items-center space-x-3 text-primary-text">
                                <Mail size={20} />
                                <span>info@holistic.io</span>
                            </div>
                            <div className="flex items-center space-x-3 text-primary-text">
                                <Phone size={20} />
                                <span>(+84) 82 895-9598</span>
                            </div>
                            <div className="flex items-center space-x-3 text-primary-text">
                                <MapPin size={20} />
                                <span>
                                    70 Bà Huyện Thanh Quan, Phường Võ Thị Sáu,
                                    Quận 3
                                </span>
                            </div>
                        </div>
                    </div>
                    <Card className="flex-1 bg-white font-robotoSlab">
                        <CardHeader>
                            <CardTitle className="text-2xl font-normal text-brown-700">
                                Form liên hệ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-brown-700"
                                    >
                                        Họ và tên
                                    </label>
                                    <Input id="name" className="mt-1" />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-brown-700"
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
                                        className="block text-sm font-medium text-brown-700"
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
                                        className="text-sm text-brown-600"
                                    >
                                        Tôi đồng ý chia sẻ thông tin
                                    </label>
                                </div>
                                <Button className="w-full bg-primary-text text-white hover:bg-brown-800">
                                    Gửi
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FAQ />
        </div>
    );
};

export default BookingPage;
