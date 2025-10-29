"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/providers/LocaleProvider";

import { getTranslations } from "@/lib/i18n/utils";
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

interface PrivacySection {
    title: string;
    content: string;
    items?: string[];
}

interface PrivacyPolicy {
    title: string;
    badge: string;
    lastUpdated: string;
    sections: Record<string, PrivacySection>;
}

export default function PrivacyPolicyPage() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const { locale } = useLocale();
    const translations = getTranslations(locale);
    const privacyPolicy = translations.privacyPolicy as PrivacyPolicy;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const sections = privacyPolicy.sections;

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
            <div className="bg-brown-50 container mx-auto w-full py-6 md:px-16 md:py-8">
                <section className="my-6">
                    {/* Header */}
                    <div className="mb-8 max-w-4xl">
                        <span className="bg-primary-text/10 font-robotoMono text-primary-text mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
                            {privacyPolicy.badge}
                        </span>
                        <h1 className="font-robotoSerif text-primary-text mb-4 text-3xl font-bold capitalize md:text-5xl">
                            {privacyPolicy.title}
                        </h1>
                        <p className="font-robotoSlab text-sm text-[#5a5a5a]">
                            {privacyPolicy.lastUpdated}:{" "}
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
                        {/* Introduction */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.introduction.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.introduction.content}
                            </p>
                        </div>

                        {/* Information Collection */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.informationCollection.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.informationCollection.content}
                            </p>
                            <ul className="font-robotoSlab ml-6 list-disc space-y-2 text-base text-[#5a5a5a]">
                                {sections.informationCollection.items?.map(
                                    (item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ),
                                )}
                            </ul>
                        </div>

                        {/* Use of Information */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.useOfInformation.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.useOfInformation.content}
                            </p>
                            <ul className="font-robotoSlab ml-6 list-disc space-y-2 text-base text-[#5a5a5a]">
                                {sections.useOfInformation.items?.map(
                                    (item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ),
                                )}
                            </ul>
                        </div>

                        {/* Information Sharing */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.informationSharing.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.informationSharing.content}
                            </p>
                            <ul className="font-robotoSlab ml-6 list-disc space-y-2 text-base text-[#5a5a5a]">
                                {sections.informationSharing.items?.map(
                                    (item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ),
                                )}
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.dataSecurity.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.dataSecurity.content}
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.yourRights.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.yourRights.content}
                            </p>
                            <ul className="font-robotoSlab ml-6 list-disc space-y-2 text-base text-[#5a5a5a]">
                                {sections.yourRights.items?.map(
                                    (item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ),
                                )}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-3">
                            <h2 className="font-robotoSerif text-primary-text text-2xl font-bold">
                                {sections.contact.title}
                            </h2>
                            <p className="font-robotoSlab text-base leading-relaxed text-[#5a5a5a]">
                                {sections.contact.content}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLoaderWrapper>
    );
}
