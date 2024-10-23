import { Header as HeaderType } from "@/types/header";

interface HeaderProps {
    slug: string;
    header: HeaderType;
}

const Header: React.FC<HeaderProps> = async ({ header }) => {
    if (!header) {
        return null;
    }

    const backgroundImageUrl =
        header.image?.asset?.url || "/fallback-image.jpg";

    return (
        <header className="relative h-96 max-h-96 overflow-hidden bg-black text-white">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    filter: "brightness(40%)",
                }}
            />
            <div className="container relative z-10 flex h-full flex-col items-start justify-center md:px-16">
                <h1 className="font-robotoSerif text-left text-4xl font-bold sm:text-5xl md:text-6xl">
                    {header.heading}
                </h1>
                {header.subheading && (
                    <p className="font-robotoSlab mt-4 max-w-3xl text-left text-base font-light md:text-lg">
                        {header.subheading}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;
