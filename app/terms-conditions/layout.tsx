import { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Terms & Conditions | Holistic",
    description:
        "Read the terms and conditions for using Holistic Physical Therapy Clinic services.",
};

export default function TermsConditionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
