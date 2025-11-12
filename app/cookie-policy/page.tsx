"use client";

import React, { useEffect, useState } from "react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { useLocale } from "@/providers/LocaleProvider";
import { RefreshCw, Settings } from "lucide-react";

import { getTranslations } from "@/lib/i18n/utils";
import { Button } from "@/components/ui/button";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

interface CookieSection {
    title: string;
    content: string;
    items?: string[];
}

interface CookiePolicy {
    title: string;
    badge: string;
    lastUpdated: string;
    sections: Record<string, CookieSection>;
}

export default function CookiePolicyPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const { locale } = useLocale();
    const { settings, resetConsent } = useCookieConsent();
    const translations = getTranslations(locale);
    const cookiePolicy = translations.cookiePolicy as CookiePolicy;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const sections = cookiePolicy.sections;

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div className="bg-brown-50 container mx-auto w-full py-6 md:px-16 md:py-8">
                <section className="my-6">
                    {/* Header */}
                    <div className="mb-8 max-w-4xl">
                        <div className="mb-4 flex items-start justify-between">
                            <span className="bg-primary-text/10 font-robotoMono text-primary-text inline-block rounded-lg px-3 py-1 text-base font-light">
                                {cookiePolicy.badge}
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={resetConsent}
                                    className="gap-2"
                                >
                                    <RefreshCw className="size-4" />
                                    Reset Consent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => (window.location.href = "/")}
                                    className="gap-2"
                                >
                                    <Settings className="size-4" />
                                    Manage Cookies
                                </Button>
                            </div>
                        </div>
                        <h1 className="font-robotoSerif text-primary-text mb-4 text-3xl font-bold capitalize md:text-5xl">
                            {cookiePolicy.title}
                        </h1>
                        <p className="font-robotoSlab text-sm text-[#5a5a5a]">
                            {cookiePolicy.lastUpdated}:{" "}
                            {new Date().toLocaleDateString(
                                locale === "vi" ? "vi-VN" : "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                },
                            )}
                        </p>
                        {settings.hasConsented && (
                            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                                <p className="text-sm text-green-800">
                                    <strong>Current Consent Status:</strong> You
                                    have consented to{" "}
                                    {settings.consent.analytics
                                        ? "Analytics"
                                        : "no"}{" "}
                                    cookies,
                                    {settings.consent.marketing
                                        ? " Marketing"
                                        : " no"}{" "}
                                    cookies, and
                                    {settings.consent.functional
                                        ? " Functional"
                                        : " no"}{" "}
                                    cookies.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="max-w-4xl space-y-8">
                        {Object.entries(sections).map(([key, section]) => (
                            <div key={key} className="space-y-3">
                                <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                    {section.title}
                                </h2>
                                <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                    {section.content}
                                </p>
                                {section.items && section.items.length > 0 && (
                                    <ul className="font-robotoSlab ml-6 list-disc space-y-2 text-base text-[#5a5a5a]">
                                        {section.items.map(
                                            (item: string, index: number) => (
                                                <li key={index}>{item}</li>
                                            ),
                                        )}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageLoaderWrapper>
    );
}
