import React from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import MainNavBar from "@/components/Navbar";

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
