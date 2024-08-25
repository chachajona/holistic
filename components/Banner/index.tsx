import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "@/assets/images/Logo_Opacity_Light.png";

const Banner = () => {
  return (
    <div className="bg-primary-background py-2">
      <div className="container mx-auto flex items-center justify-between md:px-16">
        <a href="/" about="Home">
          <Image
            src={logo}
            alt="Holistic"
            width={50}
            height={50}
            className="hidden p-1 md:block"
          />
        </a>
        <div className="flex w-full flex-row-reverse justify-between text-left font-robotoSlab font-normal md:justify-normal lg:items-center lg:gap-5">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center font-robotoSlab text-sm font-semibold text-primary-text hover:text-primary-hover md:flex"
          >
            <MapPin size={16} className="mr-2 hidden md:block" />
            <span>
              Địa chỉ: 70 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3
            </span>
          </a>
          <Link
            href="tel:0828959598"
            className="flex items-center text-sm text-primary-text hover:text-primary-hover"
          >
            <Phone size={16} className="mr-2" />
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
