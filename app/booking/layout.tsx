import React from "react";
import { headers } from "next/headers";

import type { BookingPageData } from "@/types/sanity";
import { getBookingPage, getSiteSettings } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNavBar from "@/components/layout/Navbar";

export default async function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const pageData: BookingPageData | null = await getBookingPage(validLocale);
    const siteSettings = await getSiteSettings();

    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
            <MainNavBar />
            <Header slug="booking" header={pageData?.Header} />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
        </div>
    );
}
