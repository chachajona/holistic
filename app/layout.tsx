import "./globals.css";

import type { Metadata } from "next";
import {
    Roboto,
    Roboto_Mono,
    Roboto_Serif,
    Roboto_Slab,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
    title: "Holistic",
    description:
        "Giúp mọi người cải thiện sức khỏe vận động một cách toàn diện và bền vững",
    authors: [
        {
            name: "Holistic",
            url: "https://holistic.com",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${roboto.variable} ${robotoSerif.variable} ${robotoSlab.variable} ${robotoMono.variable} bg-primary-background overflow-x-hidden overflow-y-scroll`}
            >
                <main>{children}</main>
                <Toaster />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
