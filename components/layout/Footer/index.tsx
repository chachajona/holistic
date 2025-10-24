"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Symbol+FullName_Variant3_Light.png";
import { useLocale } from "@/providers/LocaleProvider";

import type { ContactInfo, SocialMedia } from "@/types/sanity";

interface FooterProps {
    contactInfo?: ContactInfo | null;
    socialMedia?: SocialMedia | null;
}

const Footer: React.FC<FooterProps> = ({ contactInfo, socialMedia }) => {
    const { t } = useLocale();
    return (
        <footer className="bg-primary-background text-primary-text py-8 font-light md:px-16">
            <div className="container mx-auto flex flex-col items-start justify-between md:flex-row">
                <div className="mb-1 md:mb-0">
                    <Link href="/" about="Home">
                        <div className="relative h-36 w-full md:ml-[-90px] md:h-24 md:max-h-24 md:max-w-sm">
                            <Image
                                src={logo}
                                alt="Holistic"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    <address className="not-italic">
                        <p className="font-robotoSlab mb-1 text-sm font-semibold">
                            {t("banner.address")}:
                        </p>
                        {contactInfo?.locations?.map(location => (
                            <p
                                key={location._key || location.name}
                                className="font-robotoMono mb-1 text-sm font-normal"
                            >
                                {location.mapUrl ? (
                                    <Link
                                        href={location.mapUrl}
                                        className="hover:text-stone-700 hover:underline"
                                    >
                                        <span className="font-robotoMono mb-1 text-sm font-normal">
                                            {location.name}: {location.address}
                                        </span>
                                    </Link>
                                ) : (
                                    <>
                                        {location.name}: {location.address}
                                    </>
                                )}
                            </p>
                        ))}
                        <p className="font-robotoSlab mb-1 mt-2 text-sm font-semibold">
                            {t("banner.hotline")}:
                        </p>
                        {contactInfo?.phone && (
                            <Link
                                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                                className="hover:text-stone-700 hover:underline"
                            >
                                <p className="font-robotoMono mb-1 text-sm font-normal">
                                    {contactInfo.phone}
                                </p>
                            </Link>
                        )}
                        {contactInfo?.email && (
                            <Link
                                href={`mailto:${contactInfo.email}`}
                                className="hover:text-stone-700 hover:underline"
                            >
                                <p className="font-robotoMono mb-4 text-sm font-normal">
                                    {contactInfo.email}
                                </p>
                            </Link>
                        )}
                    </address>

                    <SocialLinks socialMedia={socialMedia} />
                </div>
                <NavLinks t={t} />
            </div>
            <FooterBottom t={t} />
        </footer>
    );
};

const SocialLinks = ({
    socialMedia,
}: {
    socialMedia?: { facebook: string | null; instagram: string | null } | null;
}) => (
    <div className="flex space-x-4">
        {socialMedia?.facebook && (
            <SocialLink href={socialMedia.facebook} ariaLabel="Facebook">
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </SocialLink>
        )}
        {socialMedia?.instagram && (
            <SocialLink href={socialMedia.instagram} ariaLabel="Instagram">
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </SocialLink>
        )}
    </div>
);

const SocialLink = ({
    href,
    ariaLabel,
    children,
}: {
    href: string;
    ariaLabel: string;
    children: React.ReactNode;
}) => (
    <Link
        href={href}
        className="hover:text-stone-700"
        target="_blank"
        rel="noopener noreferrer"
    >
        <span className="sr-only">{ariaLabel}</span>
        <svg
            className="size-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {children}
        </svg>
    </Link>
);

const NavLinks = ({
    t,
}: {
    t: (key: string, fallback?: string) => string | string[];
}) => {
    // Helper function to ensure we get a string for navigation
    const getString = (key: string): string => {
        const result = t(key);
        return Array.isArray(result) ? result[0] || key : result;
    };

    return (
        <div className="font-robotoSlab flex flex-col space-y-4 font-medium md:space-y-0 lg:flex-row lg:space-x-12">
            {[
                { href: "/services", key: "nav.services" },
                { href: "/treatments", key: "nav.treatments" },
                { href: "/about", key: "nav.about" },
                { href: "/events", key: "nav.events" },
                { href: "/blog", key: "nav.blog" },
            ].map(({ href, key }) => (
                <Link
                    key={href}
                    href={href}
                    className="text-left hover:text-stone-700 xl:text-right"
                >
                    {getString(key)}
                </Link>
            ))}
        </div>
    );
};

const FooterBottom = ({
    t,
}: {
    t: (key: string, fallback?: string) => string | string[];
}) => {
    // Helper function to ensure we get a string for footer text
    const getString = (key: string): string => {
        const result = t(key);
        return Array.isArray(result) ? result[0] || key : result;
    };

    return (
        <div className="font-robotoMono container mt-12 flex flex-col-reverse items-start justify-between gap-10 border-t border-[#8c7e75] text-sm font-normal md:flex-row md:items-center md:pt-8">
            <p>
                {getString("footer.copyright")} &copy;{" "}
                {new Date().getFullYear()} Holistic -{" "}
                {getString("footer.allRightsReserved")}.
            </p>
            <div className="mt-4 flex flex-col items-start gap-0 sm:mt-0 md:flex-row md:items-center md:gap-3">
                {[
                    { key: "footer.privacyPolicy", href: "#" },
                    { key: "footer.termsConditions", href: "#" },
                    { key: "footer.cookiePolicy", href: "#" },
                ].map(({ key, href }) => (
                    <Link key={key} href={href} className="hover:underline">
                        {getString(key)}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Footer;
