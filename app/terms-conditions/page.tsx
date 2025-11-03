"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";

import { getTranslations } from "@/lib/i18n/utils";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

interface TermsSection {
    title: string;
    content: string;
    items?: string[];
}

interface TermsConditions {
    title: string;
    badge: string;
    lastUpdated: string;
    sections: Record<string, TermsSection>;
}

export default function TermsConditionsPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const { locale } = useLocale();
    const translations = getTranslations(locale);
    const termsConditions = translations.termsConditions as TermsConditions;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const sections = termsConditions.sections;

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div className="bg-brown-50 container mx-auto w-full py-6 md:px-16 md:py-8">
                <section className="my-6">
                    {/* Header */}
                    <div className="mb-8 max-w-4xl">
                        <span className="bg-primary-text/10 font-robotoMono text-primary-text mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                            {termsConditions.badge}
                        </span>
                        <h1 className="font-robotoSerif text-primary-text mb-4 text-3xl font-bold capitalize md:text-5xl">
                            {termsConditions.title}
                        </h1>
                        <p className="font-robotoSlab text-sm text-[#5a5a5a]">
                            {termsConditions.lastUpdated}:{" "}
                            {new Date().toLocaleDateString(
                                locale === "vi" ? "vi-VN" : "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                },
                            )}
                        </p>
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
