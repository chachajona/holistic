import React, { useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";

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

export const MobileNav: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

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
                <ScrollArea className="h-[calc(100vh-10rem)]">
                    <div className="grid gap-2 py-4">
                        <NavLink href="/">Trang chủ</NavLink>
                        <CollapsibleNavItem title="Dịch vụ">
                            <SubLink
                                href="/services"
                                title="Trị liệu"
                                description="Trị liệu đa phương pháp giúp cải thiện mọi tình trạng chấn thương đau mỏi, bệnh lí cơ, xương, khớp"
                            />
                            <SubLink
                                href="/services"
                                title="Tư vấn chuyên sâu"
                                description="Chuyên gia lượng giá chức năng sức khoẻ vận động và cá nhân hoá liệu trình phù hợp với từng trường hợp khách hàng"
                            />
                            <SubLink
                                href="/services"
                                title="Thư giãn cơ"
                                description="Giảm căng cơ, cải thiện sức khoẻ vận động"
                            />
                            <SubLink
                                href="/services"
                                title="Tập luyện cơ bản"
                                description="Coaching 1-1 với các bài tập rehab để cải thiện tư thế vận động, phục hồi sau chấn thương"
                            />
                        </CollapsibleNavItem>
                        <CollapsibleNavItem title="Phương pháp">
                            <SubLink
                                href="/treatments/cupping"
                                title="Giác hơi"
                                description="Phương pháp sử dụng lực hút chân không để giảm đau và thư giãn cơ bắp."
                            />
                            <SubLink
                                href="/treatments/tapping"
                                title="Tapping"
                                description="Phương pháp gõ nhẹ nhằm kích thích các cơ và dây thần kinh, giúp giảm căng thẳng và cải thiện tuần hoàn."
                            />
                            <SubLink
                                href="/treatments/heat-light"
                                title="Đèn hồng ngoại"
                                description="Liệu pháp sử dụng ánh sáng hồng ngoại để làm ấm cơ, cải thiện tuần hoàn máu và giảm đau."
                            />
                            <SubLink
                                href="/treatments/iastm"
                                title="Cao mạc (Dùng công cụ chuyển động mô mềm)"
                                description="Kỹ thuật sử dụng công cụ chuyên dụng để kích thích và cải thiện mô mềm, giảm đau và tăng cường phục hồi."
                            />
                            <SubLink
                                href="/treatments/cold-plunge"
                                title="Ngâm lạnh"
                                description="Liệu pháp sử dụng nước lạnh để giảm đau và cải thiện tuần hoàn."
                            />
                            <SubLink
                                href="/treatments/dry-needling"
                                title="Châm khô"
                                description="Kỹ thuật sử dụng kim nhỏ để kích thích điểm co thắt cơ và giảm đau mãn tính."
                            />
                            <SubLink
                                href="/treatments/dds"
                                title="Điện sinh học (DDS)"
                                description="Liệu pháp sử dụng dòng điện nhẹ để kích thích cơ và dây thần kinh, giảm đau và thúc đẩy phục hồi."
                            />
                        </CollapsibleNavItem>
                        <NavLink href="/about">Giới thiệu</NavLink>
                        <NavLink href="/events">Sự kiện</NavLink>
                        <NavLink href="/blog">Blog</NavLink>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
