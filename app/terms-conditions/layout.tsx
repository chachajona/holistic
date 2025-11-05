import { Metadata } from "next";
import { headers } from "next/headers";

import { getServiceSummaries } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Terms & Conditions | Holistic",
    description:
        "Read the terms and conditions for using Holistic Physical Therapy Clinic services.",
};

export default async function TermsConditionsLayout({
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
