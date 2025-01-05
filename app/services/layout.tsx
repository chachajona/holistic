import React from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNavBar from "@/components/Navbar";
import { getServicesPage } from "@/lib/api";

export default async function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData = await getServicesPage();
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header slug="services" header={pageData?.Header} />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
