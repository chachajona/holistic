import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { getSiteSettings } from "@/lib/api";
import { ContactFormClient } from "@/components/features/forms/ContactFormClient";
import FAQ from "@/components/features/marketing/FAQ";
import { Hotline } from "@/components/features/marketing/Hotline";

export const revalidate = 3600;

const BookingPage = async () => {
    const siteSettings = await getSiteSettings();
    const contactInfo = siteSettings?.contactInfo;

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
                            {contactInfo?.email && (
                                <div className="text-primary-text flex items-center space-x-3">
                                    <Mail size={20} />
                                    <span>{contactInfo.email}</span>
                                </div>
                            )}
                            {contactInfo?.phone && (
                                <div className="text-primary-text flex items-center space-x-3">
                                    <Phone size={20} />
                                    <span>{contactInfo.phone}</span>
                                </div>
                            )}
                            {contactInfo?.locations &&
                                contactInfo.locations.length > 0 && (
                                    <>
                                        {contactInfo.locations.map(
                                            (location, index) => (
                                                <div
                                                    key={location._key || index}
                                                    className="text-primary-text flex items-center space-x-3"
                                                >
                                                    <MapPin size={20} />
                                                    <span>
                                                        {location.name
                                                            ? `${location.name}: `
                                                            : ""}
                                                        {location.address}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </>
                                )}
                        </div>
                    </div>
                    <ContactFormClient />
                </div>
            </div>
            {contactInfo?.phone && <Hotline phone={contactInfo.phone} />}
            <FAQ phone={contactInfo?.phone || ""} />
        </div>
    );
};

export default BookingPage;
