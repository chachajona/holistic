import { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Cookie Policy | Holistic",
    description:
        "Learn about how Holistic Physical Therapy Clinic uses cookies and similar technologies.",
};

export default function CookiePolicyLayout({
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
