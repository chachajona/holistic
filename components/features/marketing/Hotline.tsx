import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

interface HotlineProps {
    phone: string;
}

export const Hotline: React.FC<HotlineProps> = ({ phone }) => {
    const cleanPhone = phone.replace(/\s/g, "").replace(/[()+-]/g, "");

    return (
        <section className="bg-brown-900 text-brown-50 py-12">
            <div className="container mx-auto px-4 text-center md:px-16">
                <div className="flex flex-col items-center justify-center gap-4">
                    <span className="bg-brown-50/10 font-robotoMono inline-block rounded-lg px-3 py-1 text-sm font-light uppercase tracking-wide">
                        Cần hỗ trợ?
                    </span>
                    <h2 className="font-robotoSerif text-3xl font-bold md:text-4xl">
                        Liên hệ hotline ngay
                    </h2>
                    <p className="font-robotoSlab max-w-2xl text-base opacity-90 md:text-lg">
                        Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ
                        trợ bạn
                    </p>
                    <Link
                        href={`tel:${cleanPhone}`}
                        className="bg-brown-50 text-brown-900 hover:bg-brown-100 group mt-4 inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                        <Phone
                            size={24}
                            className="transition-transform group-hover:scale-110"
                        />
                        <span className="font-robotoSlab text-xl md:text-2xl">
                            {phone}
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
