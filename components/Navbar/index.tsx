"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "@/assets/images/Symbol+FullName_Variant3.png";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/ui/mobile-nav";

const services = [
  {
    title: "Trị liệu",
    description:
      "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  },
  {
    title: "Tư vấn chuyên sâu",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
  },
  {
    title: "Thư giãn cơ",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Tập luyện cơ bản",
    description: "Styles for headings, paragraphs, lists...etc",
  },
];

const methods = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const MainNavBar: React.FC = () => (
  <nav className="bg-navbar-background font-robotoSerif text-sm text-navbar-text shadow-md">
    <div className="container mx-auto px-0 md:pl-12 md:pr-16">
      <div className="flex max-h-[72px] items-center justify-between py-6">
        <div className="flex items-center gap-11">
          <Link href="/" about="Home">
            <Image src={logo} alt="Holisticrep" width={200} height={100} />
          </Link>
          <div className="hidden items-center space-x-4 md:flex">
            <DesktopNavigation />
          </div>
        </div>
        <SocialIcons />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  </nav>
);

const SocialIcons: React.FC = () => (
  <div className="hidden items-center space-x-4 md:flex">
    {[
      { href: "https://www.facebook.com/holisticrep/", Icon: FaFacebook },
      { href: "https://www.instagram.com/holisticrep/", Icon: FaInstagram },
    ].map(({ href, Icon }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-navbar-text hover:text-navbar-text/80"
      >
        <Icon size={16} />
      </a>
    ))}
  </div>
);

const DesktopNavigation: React.FC = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text data-[active]:bg-navbar-accent-background/35 data-[state=open]:bg-navbar-accent-background/35">
          Dịch vụ
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-primary-background">
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-navbar-accent-background/35 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium text-primary-text">
                    {services[0].title}
                  </div>
                  <p className="text-xs leading-tight text-primary-text/50">
                    {services[0].description}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            {services.slice(1).map((service) => (
              <NavItem key={service.title} href="/docs" title={service.title}>
                {service.description}
              </NavItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text data-[active]:bg-navbar-accent-background/35 data-[state=open]:bg-navbar-accent-background/35">
          Phương pháp
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-primary-background">
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {methods.map((method) => (
              <NavItem
                key={method.title}
                title={method.title}
                href={method.href}
              >
                {method.description}
              </NavItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      {["Giới thiệu", "Blog"].map((item) => (
        <NavigationMenuItem key={item}>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text",
              )}
            >
              {item}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const NavItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-navbar-accent-background/25 hover:text-navbar-accent-text focus:bg-navbar-accent-background/25 focus:text-navbar-accent-text group",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-semibold leading-4 text-primary-text group-hover:underline">
          {title}
        </div>
        <p className="line-clamp-2 font-robotoMono text-xs font-light leading-snug text-primary-text/50">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
NavItem.displayName = "NavItem";

export default MainNavBar;
