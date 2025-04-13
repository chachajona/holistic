import React from "react";

import { getAboutPage } from "@/lib/api";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Misson from "@/components/features/mission/Mission";
import MainNavBar from "@/components/layout/Navbar";
import Showcase from "@/components/features/showcase/Showcase";

export default async function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData = await getAboutPage();
    return (
        <div className="bg-brown-50 relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
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
