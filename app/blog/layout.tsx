import React from "react";

import Banner from "@/components/common/Banner";
import Footer from "@/components/layout/Footer";
import MainNavBar from "@/components/layout/Navbar";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
