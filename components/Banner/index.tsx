import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Logo_Opacity_Light.png";
import { MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="bg-primary-background max-h-10">
            <div className="container mx-auto flex max-h-10 items-center justify-between md:px-16">
                <a href="/" about="Home">
                    <Image
                        src={logo}
                        alt="Holistic"
                        width={40}
                        height={40}
                        className="hidden p-1 md:block"
                    />
                </a>
                <div className="font-robotoSlab flex w-full flex-row-reverse justify-between text-left font-normal md:justify-normal lg:items-center lg:gap-5">
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-robotoSlab text-primary-text hover:text-primary-hover hidden items-center text-xs font-semibold md:flex"
                    >
                        <MapPin size={14} className="mr-2 hidden md:block" />
                        <span>
                            Địa chỉ: 109/15 Lê Quốc Hưng, Phường 13, Quận 4
                        </span>
                    </a>
                    <Link
                        href="tel:0828959598"
                        className="text-primary-text hover:text-primary-hover flex items-center justify-center text-xs"
                    >
                        <Phone size={14} className="mr-2" />
                        <span>Hotline: 0828959598</span>
                    </Link>
                    <div className="flex items-center justify-center gap-4 align-middle md:hidden">
                        <Link
                            href="https://www.facebook.com/holisticrep/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-text hover:text-primary-hover"
                        >
                            <FaFacebook size={16} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/holisticrep/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-text hover:text-primary-hover"
                        >
                            <FaInstagram size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
