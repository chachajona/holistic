import React, { useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/providers/LocaleProvider";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";

import type { ServiceSummary } from "@/lib/api";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const MenuIcon: React.FC = () => (
    <svg
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
    >
        <path
            d="M3 5H11M3 12H16M3 19H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    className?: string;
    children: React.ReactNode;
}

const MobileLink: React.FC<MobileLinkProps> = ({
    href,
    onOpenChange,
    className,
    children,
    ...props
}) => {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={cn(className)}
            prefetch={false}
            {...props}
        >
            {children}
        </Link>
    );
};

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <Link
        href={href}
        className="font-robotoSlab hover:bg-navbar-accent-background/25 flex w-full items-center p-2 text-lg font-normal"
        prefetch={false}
    >
        {children}
    </Link>
);

interface CollapsibleNavItemProps {
    title: string;
    children: React.ReactNode;
}

const CollapsibleNavItem: React.FC<CollapsibleNavItemProps> = ({
    title,
    children,
}) => (
    <Collapsible className="grid gap-4">
        <CollapsibleTrigger className="font-robotoSlab hover:bg-navbar-accent-background/25 [&[data-state=open]]:bg-navbar-accent-background/35 flex w-full items-center p-2 text-lg font-normal [&[data-state=open]>svg]:rotate-90">
            {title}
            <ChevronRight className="ml-auto size-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div className="-mx-6 grid gap-6 px-8 py-2">{children}</div>
        </CollapsibleContent>
    </Collapsible>
);

interface SubLinkProps {
    href: string;
    title: string;
    description: string;
}

const SubLink: React.FC<SubLinkProps> = ({ href, title, description }) => (
    <MobileLink
        href={href}
        className="group grid h-auto w-full justify-start gap-1"
        prefetch={false}
    >
        <div className="font-robotoSerif text-sm font-medium leading-none group-hover:underline">
            {title}
        </div>
        <div className="font-robotoMono text-primary-text/50 line-clamp-2 text-xs leading-snug">
            {description}
        </div>
    </MobileLink>
);

interface MobileNavProps {
    services?: ServiceSummary[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ services = [] }) => {
    const { t } = useLocale();
    const [open, setOpen] = useState<boolean>(false);

    // Helper to ensure we get a string from t()
    const getString = (key: string): string => {
        const value = t(key);
        return typeof value === "string" ? value : value[0] || key;
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-navbar-text hover:text-navbar-text/80 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <MenuIcon />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-primary-background text-primary-text"
            >
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                </SheetHeader>
                <MobileLink
                    href="/"
                    className="flex items-center pt-4"
                    onOpenChange={setOpen}
                >
                    <Icons.logo className="mr-1 size-16" />
                    <span className="font-robotoMono text-primary-text text-xl font-normal">
                        {siteConfig.name}
                    </span>
                </MobileLink>
                <div className="flex h-[calc(100vh-8rem)] flex-col">
                    <ScrollArea className="flex-1">
                        <div className="grid gap-2 py-4">
                            <NavLink href="/">{getString("nav.home")}</NavLink>
                            <CollapsibleNavItem
                                title={getString("nav.services")}
                            >
                                {services.map(service => (
                                    <SubLink
                                        key={service.id}
                                        href="/services"
                                        title={service.title}
                                        description={service.description}
                                    />
                                ))}
                                <SubLink
                                    href="/services"
                                    title={getString("nav.viewAllServices")}
                                    description={getString(
                                        "nav.viewAllServicesDescription",
                                    )}
                                />
                            </CollapsibleNavItem>
                            <CollapsibleNavItem
                                title={getString("nav.treatments")}
                            >
                                <SubLink
                                    href="/treatments/cupping"
                                    title={getString(
                                        "treatments.cupping.title",
                                    )}
                                    description={getString(
                                        "treatments.cupping.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/tapping"
                                    title={getString(
                                        "treatments.tapping.title",
                                    )}
                                    description={getString(
                                        "treatments.tapping.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/heat-light"
                                    title={getString(
                                        "treatments.heatLight.title",
                                    )}
                                    description={getString(
                                        "treatments.heatLight.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/iastm"
                                    title={getString("treatments.iastm.title")}
                                    description={getString(
                                        "treatments.iastm.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/cold-plunge"
                                    title={getString(
                                        "treatments.coldPlunge.title",
                                    )}
                                    description={getString(
                                        "treatments.coldPlunge.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/dry-needling"
                                    title={getString(
                                        "treatments.dryNeedling.title",
                                    )}
                                    description={getString(
                                        "treatments.dryNeedling.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments/dds"
                                    title={getString("treatments.dds.title")}
                                    description={getString(
                                        "treatments.dds.description",
                                    )}
                                />
                                <SubLink
                                    href="/treatments"
                                    title={getString("nav.viewAllTreatments")}
                                    description={getString(
                                        "nav.viewAllTreatmentsDescription",
                                    )}
                                />
                            </CollapsibleNavItem>
                            <NavLink href="/about">
                                {getString("nav.about")}
                            </NavLink>
                            <NavLink href="/events">
                                {getString("nav.events")}
                            </NavLink>
                            <NavLink href="/blog">
                                {getString("nav.blog")}
                            </NavLink>
                        </div>
                    </ScrollArea>

                    {/* Language Switcher - Fixed at the bottom */}
                    <div className="border-primary-text/10 mt-auto flex justify-center border-t py-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
