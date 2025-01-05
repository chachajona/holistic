import { getHomePage } from "@/lib/api";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MessengerChat from "@/components/MessengerChat";
import Navbar from "@/components/Navbar";
import QuickLinks from "@/components/QuickLinks";
import Testimonial from "@/components/Testimonimal";

export default async function Home() {
    const pageData = await getHomePage();
    return (
        <main className="bg-primary-background relative flex min-h-screen min-w-full flex-col">
            <Banner />
            <Navbar />
            <Hero formData={pageData?.FormContact || {}} />
            <QuickLinks />
            <Testimonial />
            <Footer />
            <MessengerChat />
        </main>
    );
}
