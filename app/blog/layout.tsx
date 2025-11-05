import React from "react";
import { headers } from "next/headers";

import { getServiceSummaries, getSiteSettings } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import MainNavBar from "@/components/layout/Navbar";

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const [siteSettings, services] = await Promise.all([
        getSiteSettings(),
        getServiceSummaries(validLocale),
    ]);

    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
            <MainNavBar services={services} />
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
