import React from "react";

import type { TreatmentsPageData } from "@/types/sanity";
import { getTreatmentsPage } from "@/lib/api";
import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNavBar from "@/components/layout/Navbar";

export default async function TreatmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData: TreatmentsPageData | null = await getTreatmentsPage();
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header slug="treatments" header={pageData?.Header} />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
