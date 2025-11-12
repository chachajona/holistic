import "./globals.css";

import type { Metadata } from "next";
import {
    Roboto,
    Roboto_Mono,
    Roboto_Serif,
    Roboto_Slab,
} from "next/font/google";
import { headers } from "next/headers";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { getSiteSettings } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { buildMetadata } from "@/lib/seo";
import ChatWidgets from "@/components/common/ChatWidgets";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";

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
        path: "/",
        docSeo: settings?.defaultSeo ?? null,
    });
}

export default async function RootLayout({
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
            {gtmId && isProduction && (
                <>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtmId}', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=Lax;Secure'
});`,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
                        }}
                    />
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                        }}
                    />
                </>
            )}
            <body
                className={`${roboto.variable} ${robotoSerif.variable} ${robotoSlab.variable} ${robotoMono.variable} bg-primary-background overflow-x-hidden overflow-y-scroll`}
            >
                <CookieConsentProvider>
                    <LocaleProvider initialLocale={locale}>
                        <main>{children}</main>
                        <ChatWidgets />
                        <CookieConsentBanner />
                        <Toaster />
                        <SpeedInsights />
                        <Analytics />
                    </LocaleProvider>
                </CookieConsentProvider>
            </body>
        </html>
    );
}
