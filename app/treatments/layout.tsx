import React from "react";
import Banner from "@/components/Banner";
import MainNavBar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TreatmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen min-w-full flex-col bg-primary-background">
            <Banner />
            <MainNavBar />
            <Header title="Phương pháp" backgroundImage="url('/Treatment.jpg')" subtitle="Khám phá nhiều phương pháp điều trị vật lý trị liệu của chúng tôi được thiết kế để cải thiện sức khỏe của bạn" />
            <main>
                <div className="content-normal">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
