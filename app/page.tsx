import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuickLinks from "@/components/QuickLinks";
import Testimonial from "@/components/Testimonimal";

export default function Home() {
  return (
    <main className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      <Banner />
      <Navbar />
      <div className="content-normal">
        <Hero />
        <QuickLinks />
        <Testimonial />
      </div>
    </main>
  );
}
