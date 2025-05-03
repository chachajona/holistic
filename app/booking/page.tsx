import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactFormClient } from "@/components/features/forms/ContactFormClient";
import FAQ from "@/components/features/marketing/FAQ";

export const revalidate = 3600;

const BookingPage = () => {
    return (
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
                            Vui lòng điền vào biểu mẫu dưới đây với thông tin
                            chi tiết của bạn.
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
                                    70 Bà Huyện Thanh Quan, Phường Võ Thị Sáu,
                                    Quận 3
                                </span>
                            </div>
                        </div>
                    </div>
                    <ContactFormClient />
                </div>
            </div>
            <FAQ />
        </div>
    );
};

export default BookingPage;
