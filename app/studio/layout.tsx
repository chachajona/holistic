import "../globals.css";

import type { Metadata } from "next";
import {
    Roboto,
    Roboto_Mono,
    Roboto_Serif,
    Roboto_Slab,
} from "next/font/google";
import { headers } from "next/headers";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { getSiteSettings } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { buildMetadata } from "@/lib/seo";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-roboto",
    display: "swap",
});
const robotoSerif = Roboto_Serif({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    variable: "--font-serif",
    display: "swap",
});
const robotoMono = Roboto_Mono({
    weight: ["100", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});
const robotoSlab = Roboto_Slab({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    variable: "--font-slab",
    display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const siteUrl = settings?.siteUrl || "";
    const defaultTitle = settings?.defaultSeo?.title ?? "Holistic";
    const defaultDescription =
        settings?.defaultSeo?.description ??
        "Giúp mọi người cải thiện sức khỏe vận động một cách toàn diện và bền vững";

    return buildMetadata({
        defaults: {
            title: defaultTitle,
            description: defaultDescription,
            ogImage: undefined,
            siteUrl,
        },
        path: "/studio",
        docSeo: settings?.defaultSeo ?? null,
    });
}

export default async function StudioLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
    const isProduction = process.env.NODE_ENV === "production";

    // Get locale from middleware header
    const headersList = await headers();
    const localeHeader = headersList.get("x-locale");
    const locale: Locale =
        localeHeader && isValidLocale(localeHeader)
            ? localeHeader
            : baseLanguage.id;

    return (
        <html lang={locale} suppressHydrationWarning>
            {gtmId && isProduction && <GoogleTagManager gtmId={gtmId} />}
            <body
                className={`${roboto.variable} ${robotoSerif.variable} ${robotoSlab.variable} ${robotoMono.variable} bg-primary-background overflow-x-hidden overflow-y-scroll`}
            >
                <LocaleProvider initialLocale={locale}>
                    <main>{children}</main>
                    <Toaster />
                    <SpeedInsights />
                    <Analytics />
                </LocaleProvider>
            </body>
        </html>
    );
}
