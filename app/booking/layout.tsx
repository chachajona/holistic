import React from "react";
import Banner from "@/components/Banner";
import MainNavBar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <MainNavBar />
            <Header
                title="Lịch hẹn"
                backgroundImage="https://images.unsplash.com/photo-1645005512964-5057008b4425?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                subtitle="Hãy bắt đầu bước đầu tiên trên con đường phục hồi của bạn và đặt lịch hên ngay hôm nay"
            />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
