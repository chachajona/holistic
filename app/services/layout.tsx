import { Metadata } from "next";

import { getServicesPage, getSiteSettings } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const [page, settings] = await Promise.all([
        getServicesPage(),
        getSiteSettings(),
    ]);
    return buildMetadata({
        docSeo: page?.seo ?? null,
        defaults: {
            title:
                page?.Heading ??
                settings?.defaultSeo?.title ??
                "Dịch Vụ | Holistic Physical Therapy",
            description:
                settings?.defaultSeo?.description ??
                "Khám phá các dịch vụ trị liệu vật lý toàn diện giúp cải thiện sức khỏe vận động của bạn",
            siteUrl: settings?.siteUrl || "",
        },
        path: "/services",
    });
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="bg-primary-background min-h-screen">{children}</div>;
}
