// import Image from "next/image";

import { Header as HeaderType } from "@/types/header";

import { SanityImageLoader } from "../ui/sanity-image-loader";

interface HeaderProps {
    slug: string;
    header: HeaderType;
}

const Header: React.FC<HeaderProps> = async ({ header }) => {
    if (!header) {
        return null;
    }

    return (
        <header className="relative h-48 max-h-96 overflow-hidden bg-black text-white sm:h-52 md:h-64 lg:h-96">
            {header.image && (
                <div className="absolute inset-0">
                    <SanityImageLoader
                        image={header.image}
                        alt={header.heading || "Header background"}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
            )}

            <div className="absolute inset-0 z-10 bg-black/50" />

            <div className="container relative z-20 flex h-full flex-col items-start justify-center md:px-16">
                <h1 className="font-robotoSerif text-left text-3xl font-bold sm:text-5xl md:text-6xl">
                    {header.heading}
                </h1>
                {header.subheading && (
                    <p className="font-robotoSlab mt-4 max-w-3xl text-left text-sm font-light md:text-lg">
                        {header.subheading}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;
