"use client";

import React from "react";
import { Linkedin } from "lucide-react";
import Image from "next/image";

interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "John Doe",
        role: "Chuyên Gia Vật Lý Trị Liệu",
        description:
            "John là một chuyên gia vật lý trị liệu có tinh thần cao và hơn 10 năm kinh nghiệm.",
        image: "/api/placeholder/200/200",
    },
    {
        name: "Jane Smith",
        role: "Occupational Therapist",
        description:
            "Jane specializes in helping patients regain their independence through occupational therapy.",
        image: "/api/placeholder/200/200",
    },
    {
        name: "Michael Johnson",
        role: "Sports Therapist",
        description:
            "Michael has worked with professional athletes and is experienced in sports injury rehabilitation.",
        image: "/api/placeholder/200/200",
    },
    {
        name: "Emily Davis",
        role: "Massage Therapist",
        description:
            "Emily provides therapeutic massages to help patients relax and relieve muscle tension.",
        image: "/api/placeholder/200/200",
    },
];

const Showcase: React.FC = () => {
    return (
        <div className="contianer bg-brown-50 py-6 md:px-16 md:py-8">
            <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light text-primary-text">
                Đội ngũ
            </span>
            <h1 className="mb-4 text-3xl font-bold font-robotoSerif text-primary-text">
                Gặp gỡ đội ngũ của chúng tôi
            </h1>
            <p className="mb-8 text-primary-text">
                Làm quen với các chuyên gia vật lý trị liệu và nhân viên tận tâm của
                chúng tôi.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg bg-transparent shadow-md"
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={300}
                            height={100}
                            className="object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-brown-800">
                                {member.name}
                            </h2>
                            <p className="mb-2 text-brown-600">{member.role}</p>
                            <p className="mb-4 text-sm text-brown-700">
                                {member.description}
                            </p>
                            <a href="#" className="text-brown-500 hover:text-brown-700">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Showcase;
