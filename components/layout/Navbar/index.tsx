"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Symbol+FullName_Variant3_Dark.png";
import { useLocale } from "@/providers/LocaleProvider";
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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Services and methods data moved inside DesktopNavigation to use translations

const MainNavBar: React.FC = () => {
    const { t } = useLocale();

    return (
        <nav className="font-robotoSerif text-navbar-text sticky top-0 z-50 bg-[#9a7f74] text-sm shadow-md">
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
                            <DesktopNavigation t={t} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex md:items-center md:gap-2">
                            <LanguageSwitcher />
                            <SocialIcons />
                        </div>
                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

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

const DesktopNavigation: React.FC<{ t: (key: string) => string | string[] }> = ({ t }) => {
    // Helper to ensure we get a string from t()
    const getString = (key: string): string => {
        const value = t(key);
        return typeof value === 'string' ? value : value[0] || key;
    };
    
    const services = [
        {
            title: getString("services.therapy.title"),
            description: getString("services.therapy.description"),
        },
        {
            title: getString("services.consultation.title"),
            description: getString("services.consultation.description"),
        },
        {
            title: getString("services.muscleRelaxation.title"),
            description: getString("services.muscleRelaxation.description"),
        },
        {
            title: getString("services.basicTraining.title"),
            description: getString("services.basicTraining.description"),
        },
    ];

    const methods = [
        {
            title: getString("treatments.cupping.title"),
            href: "/treatments/cupping",
            description: getString("treatments.cupping.description"),
        },
        {
            title: getString("treatments.tapping.title"),
            href: "/treatments/tapping",
            description: getString("treatments.tapping.description"),
        },
        {
            title: getString("treatments.heatLight.title"),
            href: "/treatments/heat-light",
            description: getString("treatments.heatLight.description"),
        },
        {
            title: getString("treatments.iastm.title"),
            href: "/treatments/iastm",
            description: getString("treatments.iastm.description"),
        },
        {
            title: getString("treatments.coldPlunge.title"),
            href: "/treatments/cold-plunge",
            description: getString("treatments.coldPlunge.description"),
        },
        {
            title: getString("treatments.dryNeedling.title"),
            href: "/treatments/dry-needling",
            description: getString("treatments.dryNeedling.description"),
        },
        {
            title: getString("treatments.dds.title"),
            href: "/treatments/dds",
            description: getString("treatments.dds.description"),
        },
    ];
    
    return (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-navbar-background hover:bg-navbar-accent-background/90 hover:text-navbar-text focus:bg-navbar-accent-background/90 focus:text-navbar-text data-[active]:bg-navbar-accent-background/90 data-[state=open]:bg-navbar-accent-background/90">
                    <Link href="/services">{getString("nav.services")}</Link>
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
                <NavigationMenuTrigger className="bg-navbar-background hover:bg-navbar-accent-background/90 hover:text-navbar-text focus:bg-navbar-accent-background/90 focus:text-navbar-text data-[active]:bg-navbar-accent-background/90 data-[state=open]:bg-navbar-accent-background/90">
                    {getString("nav.treatments")}
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
                <NavigationMenuLink
                    asChild
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-navbar-background hover:bg-navbar-accent-background/90 hover:text-navbar-text focus:bg-navbar-accent-background/90 focus:text-navbar-text",
                    )}
                >
                    <Link href="/about">{getString("nav.about")}</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink
                    asChild
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-navbar-background hover:bg-navbar-accent-background/90 hover:text-navbar-text focus:bg-navbar-accent-background/90 focus:text-navbar-text",
                    )}
                >
                    <Link href="/events">{getString("nav.events")}</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink
                    asChild
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-navbar-background hover:bg-navbar-accent-background/25 hover:text-navbar-text focus:bg-navbar-accent-background/35 focus:text-navbar-text",
                    )}
                >
                    <Link href="/blog">{getString("nav.blog")}</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
    );
};

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
                <p className="font-robotoSlab text-primary-text/50 line-clamp-2 text-xs font-light leading-snug">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
));
NavItem.displayName = "NavItem";

export default MainNavBar;
