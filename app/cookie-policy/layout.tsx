import { Metadata } from "next";
import { headers } from "next/headers";

import { getServiceSummaries } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Cookie Policy | Holistic",
    description:
        "Learn about how Holistic Physical Therapy Clinic uses cookies and similar technologies.",
};

export default async function CookiePolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const services = await getServiceSummaries(validLocale);

    return (
        <>
            <Navbar services={services} />
            {children}
        </>
    );
}
