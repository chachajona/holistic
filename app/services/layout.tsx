import React from "react";
import Banner from "@/components/Banner";
import MainNavBar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
      <Banner />
      <MainNavBar />
      <Header title="Dịch vụ" backgroundImage="url('/Hero.png')" subtitle="Tự thưởng cho bản thân một gói dịch vụ và tiết kiệm hoặc kiểm tra các ưu đãi hiện tại." />
      <main>
        <div className="content-normal">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
