import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, Clock } from "lucide-react";
import Markdown from "react-markdown";

import type { TreatmentSummary } from "@/types/sanity";
import {
    Treatment,
    TreatmentBenefit,
    TreatmentProtocol,
} from "@/types/treatments";
import {
    getAllTreatments,
    getAllTreatmentSlugs,
    getSiteSettings,
    getTreatmentBySlug,
} from "@/lib/api";
import { baseLanguage, isValidLocale, type Locale } from "@/lib/i18n/languages";
import { getTranslations, translate } from "@/lib/i18n/utils";
import { getSanityImageUrl } from "@/lib/sanity-image";
import { buildMetadata } from "@/lib/seo";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingFormClient } from "@/components/features/booking/BookingFormClient";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const translations = getTranslations(validLocale);

    const [treatment, settings] = await Promise.all([
        getTreatmentBySlug(slug, validLocale),
        getSiteSettings(),
    ]);

    if (!treatment) {
        return {
            title: translate(
                translations,
                "treatmentDetail.notFound.title",
                "Treatment Not Found",
            ),
            description: translate(
                translations,
                "treatmentDetail.notFound.description",
                "The requested treatment does not exist.",
            ),
        };
    }

    const fallbackOg = treatment.image
        ? getSanityImageUrl(treatment.image, { width: 1200, quality: 90 })
        : undefined;

    return buildMetadata({
        docSeo: treatment.seo ?? null,
        defaults: {
            title: treatment.title
                ? `${treatment.title} | ${translate(translations, "treatmentDetail.sections.method", "Method")}`
                : (settings?.defaultSeo?.title ?? undefined),
            description:
                treatment.shortDescription ??
                settings?.defaultSeo?.description ??
                undefined,
            ogImage: fallbackOg,
            siteUrl: settings?.siteUrl || "",
        },
        path: `/treatments/${slug}`,
    });
}

// Generate static params for all treatment slugs
export async function generateStaticParams() {
    const treatments = await getAllTreatmentSlugs();
    return treatments.map((treatment: { slug: string }) => ({
        slug: treatment.slug,
    }));
}

// Create a function to generate booking options based on treatment data
function generateBookingOptions(treatment: Treatment) {
    // Return existing booking options if already defined
    if (treatment.booking && treatment.booking.length > 0) {
        return treatment.booking;
    }

    // Otherwise generate a default booking option based on treatment data
    return [
        {
            title: treatment.title,
            price: treatment.price,
            duration: treatment.duration,
            description: treatment.shortDescription,
        },
    ];
}

// Protocol section component
function ProtocolSection({
    protocols,
    translations,
}: {
    protocols: TreatmentProtocol[];
    translations: any;
}) {
    if (!protocols || protocols.length === 0) return null;

    const title = translate(
        translations,
        "treatmentDetail.protocol.title",
        "Treatment Protocol",
    );

    return (
        <div className="my-8">
            <h3 className="font-robotoSerif text-primary-text mb-4 text-xl font-semibold">
                {title}
            </h3>
            <div className="space-y-4">
                {protocols.map(protocol => (
                    <div
                        key={protocol.id}
                        className="bg-brown-50/50 rounded-lg p-4"
                    >
                        <div className="flex items-start gap-2">
                            <span className="font-robotoSerif text-primary-text/90 min-w-[24px] text-right font-semibold">
                                {protocol.step}.
                            </span>
                            <div>
                                <h4 className="font-robotoSerif text-primary-text font-semibold">
                                    {protocol.title}
                                </h4>
                                <p className="font-robotoSlab text-primary-text/70 mt-2">
                                    {protocol.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Treatments sidebar component
function TreatmentsSidebar({
    treatments,
    currentSlug,
    translations,
}: {
    treatments: TreatmentSummary[];
    currentSlug: string;
    translations: any;
}) {
    const title = translate(
        translations,
        "treatmentDetail.sidebar.title",
        "Treatment Methods",
    );

    return (
        <div className="bg-brown-50/80 mb-6 rounded-xl p-4">
            <h3 className="font-robotoSerif text-primary-text mb-3 text-lg font-semibold">
                {title}
            </h3>
            <ul className="space-y-2">
                {treatments
                    .filter(treatment => treatment.slug?.current != null)
                    .map(treatment => (
                        <li key={treatment._id}>
                            <Link
                                href={`/treatments/${treatment.slug!.current}`}
                                className={`block rounded-lg px-3 py-2 transition-colors ${
                                    treatment.slug!.current === currentSlug
                                        ? "bg-primary-text font-medium text-white"
                                        : "hover:bg-brown-100 text-primary-text/80"
                                }`}
                            >
                                {treatment.title ?? "Untitled"}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

// BookingForm component (server component)
function BookingForm({
    treatment,
    translations,
}: {
    treatment: Treatment;
    translations: any;
}) {
    const title = translate(
        translations,
        "treatmentDetail.booking.title",
        "Book Consultation",
    );

    return (
        <div className="bg-brown-50/80 sticky top-6 rounded-xl p-5">
            <h3 className="font-robotoSerif text-primary-text mb-4 text-lg font-semibold">
                {title}
            </h3>
            <BookingFormClient treatment={treatment} />
        </div>
    );
}

export default async function TreatmentPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const headersList = await headers();
    const locale = headersList.get("x-locale");
    const validLocale: Locale =
        locale && isValidLocale(locale) ? locale : baseLanguage.id;

    const translations = getTranslations(validLocale);

    const treatment = await getTreatmentBySlug(slug, validLocale);
    const allTreatments = await getAllTreatments(validLocale);

    if (!treatment) {
        notFound();
    }

    const bookingOptions = generateBookingOptions(treatment);
    const content = typeof treatment.content === "string" ? treatment.content.trim() : "";

    // Translation keys
    const breadcrumbTreatments = translate(
        translations,
        "treatmentDetail.breadcrumb.treatments",
        "Treatments",
    );
    const method = translate(
        translations,
        "treatmentDetail.sections.method",
        "Method",
    );
    const effectiveTreatment = translate(
        translations,
        "treatmentDetail.sections.effectiveTreatment",
        "Effective Treatment Method",
    );
    const benefits = translate(
        translations,
        "treatmentDetail.sections.benefits",
        "Key Benefits",
    );
    const bookTreatment = translate(
        translations,
        "treatmentDetail.sections.bookTreatment",
        "Book Treatment",
    );
    const bookingSubtitle = translate(
        translations,
        "treatmentDetail.booking.subtitle",
        "Free consultation",
    );
    const bookAppointment = translate(
        translations,
        "treatmentsPage.bookAppointment",
        "Book Appointment",
    );

    return (
        <div className="bg-primary-background relative w-full scroll-smooth py-16 sm:px-16">
            <div className="container mx-auto">
                <Breadcrumb className="font-robotoSlab text-primary-text mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-primary-text">
                            <BreadcrumbLink asChild>
                                <Link
                                    href="/treatments"
                                    className="hover:text-primary-text flex items-center hover:underline"
                                >
                                    {breadcrumbTreatments}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary-text/70" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary-text/50">
                                {treatment.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="bg-brown-50 container mx-auto rounded-2xl px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-12 md:p-5">
                        {/* Text content */}
                        <div className="order-2 mt-6 md:order-1 md:mt-0 md:flex-1">
                            <div className="space-y-6">
                                <div className="text-primary-text font-robotoMono text-sm uppercase tracking-wide">
                                    {method}
                                </div>
                                <h1 className="font-robotoSerif text-primary-text text-4xl font-semibold md:text-5xl">
                                    {treatment.title}
                                </h1>
                                <p className="font-robotoSlab text-primary-text/70 max-w-xl">
                                    {treatment.shortDescription}
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-primary-text text-primary-text hover:bg-primary-text font-robotoSerif bg-transparent transition-colors hover:text-white"
                                    asChild
                                >
                                    <Link href="#book">
                                        {bookAppointment}
                                        <ArrowDown className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="order-1 md:order-2 md:flex-1">
                            <div className="bg-primary-text relative aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image
                                    src={
                                        treatment.image
                                            ? getSanityImageUrl(
                                                  treatment.image,
                                                  { width: 800, quality: 85 },
                                              ) || "/placeholder.svg"
                                            : "/placeholder.svg"
                                    }
                                    alt={treatment.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-8 lg:flex-row">
                    {/* Main content column */}
                    <div className="lg:w-2/3">
                        {/* Contents */}
                        <div>
                            <Card className="w-full border-gray-400 bg-transparent">
                                <CardContent className="bg-transparent p-10">
                                    <div className="prose prose-lg font-robotoSlab text-primary-text prose-strong:text-primary-text prose-strong:font-robotoSerif prose-headings:font-robotoSerif prose-headings:text-primary-text max-w-none">
                                        {content ? (
                                            <Markdown>
                                                {content}
                                            </Markdown>
                                        ) : (
                                            <div>
                                                <h2 className="font-robotoSerif text-primary-text mb-6 text-2xl font-semibold">
                                                    {treatment.title} -{" "}
                                                    {effectiveTreatment}
                                                </h2>
                                                <p>
                                                    {treatment.fullDescription}
                                                </p>

                                                {/* Benefits section */}
                                                {treatment.benefits &&
                                                    treatment.benefits.length >
                                                        0 && (
                                                        <div className="my-8">
                                                            <h3 className="font-robotoSerif text-primary-text mb-4 text-xl font-semibold">
                                                                {benefits}
                                                            </h3>
                                                            <ul className="list-disc space-y-3 pl-5">
                                                                {treatment.benefits.map(
                                                                    (
                                                                        benefit: TreatmentBenefit,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                benefit.id
                                                                            }
                                                                        >
                                                                            <strong className="font-robotoSerif">
                                                                                {
                                                                                    benefit.title
                                                                                }
                                                                            </strong>
                                                                            <p className="text-primary-text/70 mt-1">
                                                                                {
                                                                                    benefit.description
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}

                                                {/* Treatment protocols */}
                                                <ProtocolSection
                                                    protocols={
                                                        treatment.protocols
                                                    }
                                                    translations={translations}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Cards */}
                        <div className="px-4 py-8 md:py-12" id="book">
                            <h2 className="font-robotoSerif text-primary-text border-b border-gray-400 pb-4 text-3xl font-bold">
                                {bookTreatment}
                                <p className="font-robotoSlab text-primary-text/70 mt-2 text-base font-normal">
                                    {bookingSubtitle}
                                </p>
                            </h2>
                            <div className="bg-primary-text mb-5 h-0.5 w-64 -translate-y-0.5"></div>
                            <div className="space-y-6">
                                {bookingOptions.map((booking, index) => (
                                    <div
                                        key={index}
                                        className="hover:border-primary-text rounded-lg border border-gray-400 bg-transparent p-6 transition-colors"
                                    >
                                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-robotoSerif text-primary-text text-xl font-semibold">
                                                    {booking.title}
                                                </h3>
                                                <div className="mt-2 flex items-center gap-4">
                                                    <span className="font-robotoSlab text-primary-text text-lg font-medium">
                                                        {booking.price.toLocaleString(
                                                            "vi-VN",
                                                        )}
                                                        &nbsp;VNĐ
                                                    </span>
                                                    <div className="text-primary-text/70 flex items-center gap-2">
                                                        <Clock
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="font-robotoSlab">
                                                            {booking.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="font-robotoSlab text-primary-text/70 mt-3 text-sm">
                                                    {booking.description}
                                                </p>
                                            </div>
                                            <Button
                                                className="bg-primary-text font-robotoSerif hover:bg-primary-text/90 text-white"
                                                asChild
                                            >
                                                <Link href="/booking">
                                                    {bookAppointment}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar column */}
                    <div className="lg:w-1/3">
                        <div>
                            {/* Treatments sidebar */}
                            <TreatmentsSidebar
                                treatments={allTreatments ?? []}
                                currentSlug={treatment.slug}
                                translations={translations}
                            />

                            {/* Booking form */}
                            <BookingForm
                                treatment={treatment}
                                translations={translations}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
