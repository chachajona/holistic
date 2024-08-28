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
    <div className="relative flex min-h-screen min-w-full flex-col bg-primary-background">
      <Banner />
      <MainNavBar />
      <Header />
      <main>
        <div className="content-normal">{children}</div>
      </main>
			<Footer />
    </div>
  );
}
