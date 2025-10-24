"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Logo_Opacity_Light.png";
import { useLocale } from "@/providers/LocaleProvider";
import { MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import type { ContactInfo, SocialMedia } from "@/types/sanity";

interface BannerProps {
    contactInfo?: ContactInfo | null;
    socialMedia?: SocialMedia | null;
}

const Banner: React.FC<BannerProps> = ({ contactInfo, socialMedia }) => {
    const { t } = useLocale();
    
    // Find the primary location for the banner
    const primaryLocation = contactInfo?.locations?.find(loc => loc.isPrimary);

    return (
        <div className="bg-primary-background max-h-10">
            <div className="container mx-auto flex max-h-10 items-center justify-between py-2 md:px-16 md:py-0">
                <Link href="/" about="Home">
                    <Image
                        src={logo}
                        alt="Holistic"
                        width={40}
                        height={40}
                        className="hidden p-1 md:block"
                    />
                </Link>
                <div className="font-robotoSlab flex w-full flex-row-reverse justify-between text-left font-normal md:justify-normal lg:items-center lg:gap-5">
                    {primaryLocation && (
                        <Link
                            href={primaryLocation.mapUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-robotoSlab text-primary-text hover:text-primary-hover hidden items-center text-xs font-semibold md:flex"
                        >
                            <MapPin
                                size={14}
                                className="mr-2 hidden md:block"
                            />
                            <span>{t("banner.address")}: {primaryLocation.address}</span>
                        </Link>
                    )}
                    {contactInfo?.phone && (
                        <Link
                            href={`tel:${contactInfo.phone.replace(/\s/g, "").replace(/[()+-]/g, "")}`}
                            className="text-primary-text hover:text-primary-hover flex items-center justify-center text-xs"
                        >
                            <Phone size={14} className="mr-2" />
                            <span>
                                {t("banner.hotline")}:{" "}
                                {contactInfo.phone
                                    .replace(/[()]/g, "")
                                    .replace(/\s/g, "")}
                            </span>
                        </Link>
                    )}
                    <div className="flex items-center justify-center gap-4 align-middle md:hidden">
                        {socialMedia?.facebook && (
                            <Link
                                href={socialMedia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-text hover:text-primary-hover"
                            >
                                <FaFacebook size={16} />
                            </Link>
                        )}
                        {socialMedia?.instagram && (
                            <Link
                                href={socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-text hover:text-primary-hover"
                            >
                                <FaInstagram size={16} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
