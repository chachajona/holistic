import { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Dịch vụ",
      href: "/services",
    },
    {
      title: "Phương pháp",
      href: "/treatments",
    },
    {
      title: "Giới thiệu",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  sidebarNav: [
    {
      title: "Dịch vụ",
      items: [
        {
          title: "Shoes",
          href: "/services/shoes",
          items: [],
        },
        {
          title: "Apparel",
          href: "/services/apparel",
          items: [],
        },
        {
          title: "Accessories",
          href: "/services/accessories",
          items: [],
        },
      ],
    },
    {
      title: "Phương pháp",
      items: [
        {
          title: "Blog",
          href: "/treatments/blog",
          items: [],
        },
        {
          title: "Documentation",
          href: "/treatments/documentation",
          items: [],
        },
        {
          title: "Support",
          href: "/treatments/support",
          items: [],
        },
      ],
    },
    {
      title: "Giới thiệu",
      href: "/about",
      items: [],
    },
    {
      title: "Blog",
      href: "/blog",
      items: [],
    },
  ],
};
