import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background flex max-h-screen min-h-screen min-w-full flex-col">
      <Banner />
      <Navbar />
      <div className="content-normal"></div>
    </main>
  );
}
