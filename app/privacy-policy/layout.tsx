import { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Privacy Policy | Holistic",
    description:
        "Learn about how Holistic Physical Therapy Clinic protects your privacy and personal information.",
};

export default function PrivacyPolicyLayout({
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
