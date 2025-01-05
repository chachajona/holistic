import React from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Misson from "@/components/Misson";
import MainNavBar from "@/components/Navbar";
import Showcase from "@/components/Showcase";
import { getAboutPage } from "@/lib/api";

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
