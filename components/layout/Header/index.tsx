import { headers } from "next/headers";

import type { PageHeaderData } from "@/types/sanity";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { getLocalizedString } from "@/lib/i18n/utils";
import { SanityImageLoader } from "@/components/ui/sanity-image-loader";

interface HeaderProps {
    slug: string;
    header: PageHeaderData | null | undefined;
}

const defaultHeading = "Welcome";
const defaultSubheading = "";
const defaultAltText = "Header background";

const Header: React.FC<HeaderProps> = async ({ header }) => {
    // Get locale from headers (set by middleware)
    const headersList = await headers();
    const localeHeader = headersList.get("x-locale");
    const locale: Locale = 
        localeHeader && isValidLocale(localeHeader) 
            ? localeHeader 
            : baseLanguage.id;

    // Extract localized strings
    const heading = header?.heading 
        ? (getLocalizedString(header.heading, locale) ?? defaultHeading)
        : defaultHeading;
    const subheading = header?.subheading
        ? (getLocalizedString(header.subheading, locale) ?? defaultSubheading)
        : defaultSubheading;
    const image = header?.image;
    const altText = header?.image?.alt ?? defaultAltText;

    return (
        <header className="relative h-48 max-h-96 overflow-hidden bg-black text-white sm:h-52 md:h-64 lg:h-96">
            {image && (
                <div className="absolute inset-0">
                    <SanityImageLoader
                        image={image}
                        alt={altText}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
            )}

            <div className="absolute inset-0 z-10 bg-black/50" />

            <div className="container relative z-20 flex h-full flex-col items-start justify-center md:px-16">
                <h1 className="font-robotoSerif text-left text-3xl font-bold sm:text-5xl md:text-6xl">
                    {heading}
                </h1>
                {subheading && (
                    <p className="font-robotoSlab mt-4 max-w-3xl text-left text-sm font-light md:text-lg">
                        {subheading}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;
