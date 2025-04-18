import React from "react";

import type { ServicesPageData } from "@/types/sanity";
import { getServicesPage } from "@/lib/api";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNavBar from "@/components/layout/Navbar";

export default async function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData: ServicesPageData | null = await getServicesPage();
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
