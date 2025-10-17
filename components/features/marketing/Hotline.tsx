import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

interface HotlineProps {
    phone: string;
}

export const Hotline: React.FC<HotlineProps> = ({ phone }) => {
    const cleanPhone = phone.replace(/\s/g, "").replace(/[()+-]/g, "");

    return (
        <section className="bg-brown-900 text-brown-50 py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="font-robotoSerif text-xl font-bold md:text-2xl">
                        Cần hỗ trợ tư vấn?
                    </h2>
                    <Link
                        href={`tel:${cleanPhone}`}
                        className="bg-brown-50 text-brown-900 hover:bg-brown-100 group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                        <Phone
                            size={20}
                            className="transition-transform group-hover:scale-110"
                        />
                        <span className="font-robotoSlab text-base md:text-lg">
                            Gọi để tư vấn miễn phí
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
