import { Metadata } from "next";
import { headers } from "next/headers";

import {
    getServiceSummaries,
    getServicesPage,
    getSiteSettings,
} from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { buildMetadata } from "@/lib/seo";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNavBar from "@/components/layout/Navbar";

import { ServicesPageWrapper } from "./ServicesPageWrapper";

export async function generateMetadata(): Promise<Metadata> {
    const [page, settings] = await Promise.all([
        getServicesPage(),
        getSiteSettings(),
    ]);
    return buildMetadata({
        docSeo: page?.seo ?? null,
        defaults: {
            title:
                page?.Heading ??
                settings?.defaultSeo?.title ??
                "Dịch Vụ | Holistic Physical Therapy",
            description:
                settings?.defaultSeo?.description ??
                "Khám phá các dịch vụ trị liệu vật lý toàn diện giúp cải thiện sức khỏe vận động của bạn",
            siteUrl: settings?.siteUrl || "",
        },
        path: "/services",
    });
}

export default async function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const [pageData, siteSettings, services] = await Promise.all([
        getServicesPage(),
        getSiteSettings(),
        getServiceSummaries(validLocale),
    ]);

    return (
        <ServicesPageWrapper>
            <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
                <Banner
                    contactInfo={siteSettings?.contactInfo}
                    socialMedia={siteSettings?.socialMedia}
                />
                <MainNavBar services={services} />
                <Header slug="services" header={pageData?.Header} />
                <main>
                    <div className="content-normal">{children}</div>
                </main>
                <Footer
                    contactInfo={siteSettings?.contactInfo}
                    socialMedia={siteSettings?.socialMedia}
                />
            </div>
        </ServicesPageWrapper>
    );
}
