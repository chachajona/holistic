"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { BlurhashImage } from "@/components/BlurhashImage";
import { getOptimizedImageData } from "@/lib/imageProcessing";
import Image, { StaticImageData } from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

import John from "@/assets/avatars/John.jpg";
import Jane from "@/assets/avatars/Jane.jpg";
import Michael from "@/assets/avatars/Michael.jpg";
import Emily from "@/assets/avatars/Emily.jpg";

interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string | StaticImageData;
}

const teamMembers: TeamMember[] = [
    {
        name: "John Doe",
        role: "Chuyên Gia Vật Lý Trị Liệu",
        description:
            "John là một chuyên gia vật lý trị liệu có tinh thần cao và hơn 10 năm kinh nghiệm.",
        image: John,
    },
    {
        name: "Jane Smith",
        role: "Chuyên viên hoạt động trị liệu",
        description:
            "Jane chuyên giúp bệnh nhân lấy lại sự độc lập thông qua liệu pháp hoạt động trị liệu.",
        image: Jane,
    },
    {
        name: "Michael Johnson",
        role: "Chuyên viên trị liệu thể thao",
        description:
            "Michael đã làm việc với các vận động viên chuyên nghiệp và có kinh nghiệm trong phục hồi chấn thương thể thao.",
        image: Michael,
    },
    {
        name: "Emily Davis",
        role: "Chuyên viên massage trị liệu",
        description:
            "Emily cung cấp các liệu pháp massage để giúp bệnh nhân thư giãn và giảm căng thẳng cơ bắp.",
        image: Emily,
    },
];

function Showcase() {
    // const processedMembers = await Promise.all(
    //     teamMembers.map(async member => {
    //         const optimizedImage = await getOptimizedImageData(member.image);
    //         return {
    //             ...member,
    //             optimizedImage,
    //         };
    //     }),
    // );
    return (
        <div className="container bg-brown-50 py-6 md:px-16 md:py-8">
            <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light text-primary-text">
                Đội ngũ
            </span>
            <h1 className="mb-4 font-robotoSerif text-3xl font-bold text-primary-text">
                Gặp gỡ đội ngũ của chúng tôi
            </h1>
            <p className="mb-8 font-robotoSlab text-primary-text">
                Làm quen với các chuyên gia vật lý trị liệu và nhân viên tận tâm
                của chúng tôi.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                    <div key={index} className="overflow-hidden bg-transparent">
                        {/* {member.optimizedImage ? (
                            <BlurhashImage
                                imageUrl={member.optimizedImage.webPDataUrl}
                                blurHash={member.optimizedImage.blurHash}
                                blurHashWidth={member.optimizedImage.width}
                                blurHashHeight={member.optimizedImage.height}
                            />
                        ) : ( */}
                        <AspectRatio className="relative h-full w-full rounded-lg">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index === 0}
                                className="rounded-lg object-cover"
                            />
                        </AspectRatio>
                        {/* )} */}
                        <div className="flex flex-col gap-1 py-4">
                            <h2 className="font-robotoSlab text-xl font-semibold text-primary-text">
                                {member.name}
                            </h2>
                            <p className="mb-2 font-robotoSlab text-base text-brown-600">
                                {member.role}
                            </p>
                            <p className="mb-4 font-robotoSlab text-sm text-brown-700">
                                {member.description}
                            </p>
                            <a
                                href="#"
                                className="text-brown-500 hover:text-brown-700"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Showcase;
