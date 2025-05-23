import React from "react";

import type { AboutPageData } from "@/types/sanity";
import { getAboutPage } from "@/lib/api";
import Banner from "@/components/common/Banner";
import Misson from "@/components/features/mission/Mission";
import Showcase from "@/components/features/showcase/Showcase";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNavBar from "@/components/layout/Navbar";

// Remove the standalone default object
// const defaultHeaderData = { ... };

export default async function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData: AboutPageData | null = await getAboutPage();

    // Remove headerData creation
    // const sourceHeader = pageData?.Header;
    // const headerData = { ... };

    return (
        <div className="bg-brown-50 relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            {/* Pass pageData.Header directly */}
            <Header slug="about" header={pageData?.Header} />
            <main>
                <Misson />
                <Showcase />
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
