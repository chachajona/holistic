import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuickLinks from "@/components/QuickLinks";
import Testimonial from "@/components/Testimonimal";

export default function Home() {
  return (
    <main className="relative flex min-h-screen min-w-full flex-col bg-primary-background">
      <Banner />
      <Navbar />
      <Hero />
      <QuickLinks />
      <Testimonial />
      <Footer />
    </main>
  );
}
