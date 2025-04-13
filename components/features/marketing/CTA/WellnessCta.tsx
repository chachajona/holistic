import { cn } from "@/lib/utils";
import { MagneticSpinButton } from "@/components/ui/magnetic-spin-button";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface WellnessCtaProps {
    heading: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText?: string;
    primaryButtonUrl: string;
    secondaryButtonUrl?: string;
    backgroundImage?: string;
    blurDataURL?: string;
    theme?: "light" | "dark" | "blue";
    onImageLoaded?: () => void;
}

export function WellnessCta({
    heading,
    description,
    primaryButtonUrl,
    backgroundImage,
    blurDataURL,
    theme = "light",
    onImageLoaded,
}: WellnessCtaProps) {
    const themeStyles = {
        light: "bg-amber-50 text-amber-900",
        dark: "bg-amber-900 text-amber-50",
        blue: "bg-blue-900 text-white",
    };

    const useImageBackground = !!backgroundImage;
    const sectionClasses = cn(
        "relative overflow-hidden",
        useImageBackground ? "text-white" : themeStyles[theme],
    );

    const handleImageLoad = () => {
        onImageLoaded?.();
    };

    const therapyImagePath = "/Therapy.jpg";

    return (
        <section className={sectionClasses}>
            {/* Background image for all screen sizes */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 z-10 bg-black/30" />
                    <OptimizedImage
                        image={backgroundImage}
                        alt=""
                        fill
                        priority={true}
                        sizes="100vw"
                        className="object-cover"
                        blurDataURL={blurDataURL}
                    />
                </div>
            )}

            <div className="container relative z-20 mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                {/* Absolute positioned button for mobile only */}
                <div className="absolute bottom-20 right-16 z-30 md:hidden">
                    <MagneticSpinButton
                        href={primaryButtonUrl}
                        text="ĐẶT LỊCH NGAY • VỚI CHÚNG TÔI • "
                        size={{
                            default: "md",
                            sm: "md",
                        }}
                        className="scale-100"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-12">
                    {/* Left Column - Text */}
                    <div className="text-center md:col-span-5 md:text-left">
                        <h2
                            className="font-robotoSerif mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
                            role="heading"
                        >
                            {heading}
                        </h2>
                        <p className="font-robotoSlab text-base opacity-90 sm:text-lg">
                            {description}
                        </p>
                    </div>

                    {/* Middle Column - Magnetic Spin Button (desktop only) */}
                    <div className="hidden items-center justify-center md:col-span-3 md:flex">
                        <MagneticSpinButton
                            href={primaryButtonUrl}
                            text="ĐẶT LỊCH NGAY • VỚI CHÚNG TÔI • "
                            size={{
                                default: "lg",
                            }}
                        />
                    </div>

                    {/* Right Column - Image */}
                    <div className="md:col-span-4">
                        <div className="relative h-64 w-full md:h-80 md:translate-x-6 md:scale-110 lg:h-96 lg:translate-x-12 lg:scale-125">
                            <div className="absolute -bottom-4 -right-4 h-full w-[90%] rounded-bl-[40px] rounded-tr-[40px] bg-[#7A3300]/20 md:-bottom-6 md:-right-6"></div>

                            <div className="group relative h-full w-[90%] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#7A3300]/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40"></div>

                                <OptimizedImage
                                    image={therapyImagePath}
                                    alt="Physical therapy session"
                                    fill
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="rounded-bl-[40px] rounded-tr-[40px] object-cover object-center transition-transform duration-700"
                                    onLoad={handleImageLoad}
                                />

                                <div className="absolute -right-1 -top-1 size-12 rounded-bl-lg border-b-2 border-l-2 border-white/70"></div>
                                <div className="absolute -bottom-1 -left-1 size-12 rounded-tr-lg border-r-2 border-t-2 border-white/70"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
