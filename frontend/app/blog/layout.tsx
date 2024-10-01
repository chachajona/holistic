import React from "react";
import Banner from "@/components/Banner";
import MainNavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen min-w-full flex-col bg-primary-background">
            <Banner />
            <MainNavBar />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
