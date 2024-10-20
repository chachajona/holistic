import React from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNavBar from "@/components/Navbar";

export default async function TreatmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header pageSlug="treatments" />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
