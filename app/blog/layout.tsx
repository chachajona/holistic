import React from "react";

import { getSiteSettings } from "@/lib/api";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import MainNavBar from "@/components/layout/Navbar";

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const siteSettings = await getSiteSettings();

    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
            <MainNavBar />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer
                contactInfo={siteSettings?.contactInfo}
                socialMedia={siteSettings?.socialMedia}
            />
        </div>
    );
}
