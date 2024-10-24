import React from "react";

import { getTreatmentsPage } from "@/lib/api";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNavBar from "@/components/Navbar";

export default async function TreatmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData = await getTreatmentsPage();
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header slug="treatments" header={pageData?.Header || {}} />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
