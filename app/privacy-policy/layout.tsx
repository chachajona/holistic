import { Metadata } from "next";
import { headers } from "next/headers";

import { getServiceSummaries } from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Privacy Policy | Holistic",
    description:
        "Learn about how Holistic Physical Therapy Clinic protects your privacy and personal information.",
};

export default async function PrivacyPolicyLayout({
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
