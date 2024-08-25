import { ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Service, Team, Treatment } from "@/assets/icons";

import link1 from "@/assets/images/Link1.jpg";
import link2 from "@/assets/images/Link2.jpg";
import link3 from "@/assets/images/Link3.jpg";

interface QuickLinkCardProps {
  title: string;
  icon: React.ReactNode;
  bgImage: StaticImageData;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  title,
  icon,
  bgImage,
}) => (
  <div className="group relative min-h-[200px] overflow-hidden rounded-lg border border-[#90776E] bg-primary-background transition-all duration-300 hover:shadow-md">
    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <Image
        src={bgImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
    <div className="relative z-10 flex h-full flex-col justify-between from-primary-text to-transparent p-6 text-primary-text transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:text-white">
      <div className="text-primary text-primary-text group-hover:text-white">
        {icon}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-robotoSerif text-3xl font-medium">{title}</h3>
        <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  </div>
);

const quickLinks = [
  {
    title: "Dịch vụ",
    icon: <Service className="h-20 w-20" />,
    bgImage: link1,
  },
  {
    title: "Phương pháp",
    icon: <Treatment className="h-20 w-20" />,
    bgImage: link2,
  },
  {
    title: "Đội ngũ",
    icon: <Team className="h-20 w-20" />,
    bgImage: link3,
  },
];

export default function QuickLinkSection() {
  return (
    <section className="container mx-auto bg-primary-background px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <QuickLinkCard key={link.title} {...link} />
        ))}
      </div>
    </section>
  );
}
