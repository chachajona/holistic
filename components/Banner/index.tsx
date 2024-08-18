import React from "react";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "@/assets/images/Logo_Opacity_Light.png";

const Banner = () => {
  return (
    <div className="bg-primary-background py-2">
      <div className="container mx-auto flex items-center justify-between md:px-16">
        <Image
          src={logo}
          alt="Holistic"
          width={50}
          height={50}
          className="hidden p-1 md:block"
        />
        <div className="flex flex-col text-left font-robotoSlab font-normal lg:flex-row-reverse lg:items-center lg:gap-5">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-text hover:text-primary-hover flex items-center font-robotoSlab text-sm font-semibold"
          >
            <MapPin size={16} className="mr-2 hidden md:block" />
            <span>
              Địa chỉ: 70 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3
            </span>
          </a>
          <a
            href="tel:0828959598"
            className="text-primary-text hover:text-primary-hover flex items-center text-sm"
          >
            <Phone size={16} className="mr-2 hidden md:block" />
            <span>Hotline: 0828959598</span>
          </a>
          <div className="mb-1 mt-2 flex gap-4 md:hidden">
            <a
              href="https://www.facebook.com/holisticrep/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text hover:text-primary-hover"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/holisticrep/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text hover:text-primary-hover"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
