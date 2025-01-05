import React from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNavBar from "@/components/Navbar";
import { getBookingPage } from "@/lib/api";

export default async function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pageData = await getBookingPage();
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header slug="booking" header={pageData?.Header} />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
