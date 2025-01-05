"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Symbol+FullName_Variant3.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/ui/mobile-nav";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const services = [
    {
        title: "Trị liệu",
        description:
            "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
    },
    {
        title: "Tư vấn chuyên sâu",
        description:
            "Re-usable components built using Radix UI and Tailwind CSS.",
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
];

const MainNavBar: React.FC = () => (
    <nav className="bg-navbar-background font-robotoSerif text-navbar-text sticky top-0 z-50 text-sm shadow-md">
        <div className="container mx-auto px-0 md:pl-12 md:pr-16">
            <div className="flex max-h-[72px] items-center justify-between py-6">
                <div className="flex items-center gap-11">
                    <Link href="/" about="Home">
                        <Image
                            src={logo}
                            alt="Holisticrep"
                            width={200}
                            height={100}
                        />
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
            {
                href: "https://www.instagram.com/holisticrep/",
                Icon: FaInstagram,
            },
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
                    <Link href="/services">Dịch vụ</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-primary-background">
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                                <a
                                    className="bg-navbar-accent-background/35 from-muted/50 to-muted flex size-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                                    href="/"
                                >
                                    <div className="text-primary-text mb-2 mt-4 text-lg font-medium">
                                        {services[0].title}
                                    </div>
                                    <p className="text-primary-text/50 text-xs leading-tight">
                                        {services[0].description}
                                    </p>
                                </a>
                            </NavigationMenuLink>
                        </li>
                        {services.slice(1).map(service => (
                            <NavItem
                                key={service.title}
                                href="/docs"
                                title={service.title}
                            >
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
                        {methods.map(method => (
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

            <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text",
                        )}
                    >
                        Giới thiệu
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text",
                        )}
                    >
                        Blog
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
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
                    "hover:bg-navbar-accent-background/25 hover:text-navbar-accent-text focus:bg-navbar-accent-background/25 focus:text-navbar-accent-text group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                    className,
                )}
                {...props}
            >
                <div className="text-primary-text text-sm font-semibold leading-4 group-hover:underline">
                    {title}
                </div>
                <p className="font-robotoMono text-primary-text/50 line-clamp-2 text-xs font-light leading-snug">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
));
NavItem.displayName = "NavItem";

export default MainNavBar;
