import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { getSanityImageUrl } from "@/lib/sanity-image";

type SeoDoc = {
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noindex?: boolean | null;
    nofollow?: boolean | null;
    twitterCard?: "summary" | "summary_large_image" | null;
    ogImage?: SanityImageSource | null;
} | null;

export function buildMetadata({
    docSeo,
    defaults,
    path,
}: {
    docSeo?: SeoDoc;
    defaults: {
        title?: string | null;
        description?: string | null;
        ogImage?: string | null;
        siteUrl: string;
    };
    path?: string;
}): Metadata {
    const title = docSeo?.title ?? defaults.title ?? undefined;
    const description =
        docSeo?.description ?? defaults.description ?? undefined;
    const ogImageUrl = docSeo?.ogImage
        ? getSanityImageUrl(docSeo.ogImage, { width: 1200, quality: 90 })
        : (defaults.ogImage ?? undefined);

    const siteUrl = defaults.siteUrl || "";
    const base = siteUrl ? new URL(siteUrl) : undefined;
    const canonical =
        docSeo?.canonicalUrl ??
        (path && siteUrl ? new URL(path, siteUrl).toString() : undefined);

    return {
        title,
        description,
        metadataBase: base,
        alternates: canonical ? { canonical } : undefined,
        robots: docSeo
            ? {
                  index: !docSeo.noindex,
                  follow: !docSeo.nofollow,
              }
            : undefined,
        openGraph: {
            title: title,
            description: description,
            url: canonical,
            images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
        },
        twitter: {
            card: docSeo?.twitterCard ?? "summary_large_image",
            title: title,
            description: description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
    };
}
