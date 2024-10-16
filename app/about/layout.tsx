import React from "react";
import Banner from "@/components/Banner";
import MainNavBar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Showcase from "@/components/Showcase";
import Misson from "@/components/Misson";

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-brown-50 relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header
                title="Giới thiệu"
                backgroundImage="url('/Team.jpg')"
                subtitle="Cung cấp dịch vụ vật lý trị liệu xuất sắc với sự chăm sóc tận tình"
            />
            <main>
                <Misson />
                <Showcase />
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
