"use client";

import React from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, CircleCheckBig, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { HeroData } from "@/types/sanity";
import { trackFormError, trackFormSubmit } from "@/lib/gtm";
import { getLocalizedString } from "@/lib/i18n/utils";
import { getSanityBlurUrl, getSanityImageUrl } from "@/lib/sanity-image";
import { formatPhoneNumber } from "@/lib/utils";
import { vietnamesePhoneSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OptimizedImage } from "@/components/ui/optimized-image";
import WordRotate from "@/components/ui/word-rotate";

interface HeroProps {
    onImageLoaded?: () => void;
    heroData?: HeroData | null;
}

const HeroClient: React.FC<HeroProps> = ({ onImageLoaded, heroData }) => {
    const { t, locale } = useLocale();
    const { toast } = useToast();

    // Helper to ensure we get a string from t()
    const getString = (key: string): string => {
        const value = t(key);
        return typeof value === "string" ? value : value[0] || key;
    };

    // Create form schema with translated validation message
    const formSchema = z.object({
        phoneNumber: vietnamesePhoneSchema.refine(() => true, {
            message: getString("hero.form.phoneValidation"),
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
        },
        mode: "onChange", // Enable real-time validation
    });

    const handlePhoneChange = (
        value: string,
        onChange: (value: string) => void,
    ) => {
        const formatted = formatPhoneNumber(value);
        onChange(formatted);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: values.phoneNumber.replace(/\s/g, ""), // Remove spaces for API
                }),
            });

            if (response.ok) {
                toast({
                    title: getString("hero.form.successTitle"),
                    description: getString("hero.form.successMessage"),
                });
                form.reset();

                // Track successful hero newsletter submission
                trackFormSubmit("hero_newsletter", "newsletter");
            } else {
                throw new Error("Failed to submit form");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            toast({
                title: getString("hero.form.errorTitle"),
                description: getString("hero.form.errorMessage"),
                variant: "destructive",
            });

            // Track hero newsletter submission error
            trackFormError("hero_newsletter", "newsletter", errorMessage);
        }
    }

    const heroImageUrl = heroData?.image
        ? getSanityImageUrl(heroData.image, {
              format: "webp",
              quality: 85,
              width: 1920,
          }) || "/Hero.png"
        : "/Hero.png";
    const heroImageAlt = heroData?.image?.alt || "Hero background";
    const heroBlurDataUrl = heroData?.image
        ? (getSanityBlurUrl(heroData.image) ?? undefined)
        : undefined;

    // Get hero heading from Sanity or fallback to translation
    const heroHeading = heroData?.heading
        ? getLocalizedString(heroData.heading, locale)
        : getString("hero.mainHeading");

    const heroSubheading = heroData?.subheading
        ? getLocalizedString(heroData.subheading, locale)
        : null;

    // Get rotating words from translation
    const rotatingWordsValue = t("hero.rotatingWords");
    const rotatingWords = Array.isArray(rotatingWordsValue)
        ? rotatingWordsValue
        : ["comprehensive", "sustainable"]; // fallback

    return (
        <section className="relative max-h-screen min-h-[calc(100dvh-92px)] w-full overflow-y-auto py-16 md:min-h-[calc(100dvh-250px)] md:py-[85px]">
            <div className="absolute inset-0 z-0">
                <OptimizedImage
                    image={heroImageUrl}
                    alt={heroImageAlt}
                    fill
                    priority={true}
                    sizes="100vw"
                    className="object-cover object-center"
                    blurDataURL={heroBlurDataUrl}
                    onLoad={onImageLoaded}
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container relative z-10 md:px-16">
                <div className="grid gap-6 lg:grid-cols-[1fr_200px] lg:gap-12 xl:grid-cols-[1fr_400px]">
                    <div className="items-left flex min-w-0 flex-col justify-center gap-12 space-y-5 md:gap-0">
                        <h1
                            className="font-robotoSerif text-primary-foreground text-brown-50 relative text-5xl font-bold tracking-normal md:text-6xl xl:text-[64px] xl:leading-[64px]"
                            style={{ minHeight: "200px" }}
                        >
                            {heroHeading && (
                                <span className="font-robotoSlab font-light">
                                    {heroHeading}{" "}
                                </span>
                            )}
                            <span
                                className="inline-block align-top"
                                style={{
                                    minHeight: "120px",
                                    maxWidth: "100%",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                }}
                            >
                                <WordRotate
                                    words={rotatingWords}
                                    duration={5000}
                                />
                            </span>
                        </h1>
                        {heroSubheading && (
                            <p className="font-robotoSlab text-primary-foreground/90 text-xl md:text-2xl">
                                {heroSubheading}
                            </p>
                        )}

                        <div className="mb-4 flex flex-col gap-4 min-[400px]:flex-row">
                            <div className="bg-primary-background/80 flex w-full max-w-full flex-col space-y-3 rounded-xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:max-w-md lg:max-w-lg">
                                <h3 className="font-robotoSerif text-primary-text text-lg font-bold uppercase md:text-2xl">
                                    {getString("hero.form.heading")}
                                </h3>
                                <div className="font-robotoSlab text-primary-text flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center align-middle">
                                        <CalendarCheck className="mr-1 size-5" />
                                        <span>
                                            {getString("hero.form.easyBooking")}
                                        </span>
                                    </div>
                                    <div className="flex items-center align-middle">
                                        <CircleCheckBig className="mr-1 size-5" />
                                        <span>
                                            {getString(
                                                "hero.form.instantConfirmation",
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-start space-x-2">
                                            <FormField
                                                control={form.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem className="relative grow">
                                                        <FormControl>
                                                            <Input
                                                                type="tel"
                                                                placeholder={getString(
                                                                    "hero.form.phonePlaceholder",
                                                                )}
                                                                {...field}
                                                                onChange={e =>
                                                                    handlePhoneChange(
                                                                        e.target
                                                                            .value,
                                                                        field.onChange,
                                                                    )
                                                                }
                                                                className="bg-brown-50/70 font-robotoSlab text-primary-text caret-primary-text focus:border-primary-text focus:bg-brown-50 focus-visible:ring-primary-text w-full border-gray-300 px-5 py-2 outline-none transition-all focus-visible:ring-1 focus-visible:ring-offset-0"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="font-robotoSlab text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="border-primary-text animate-shimmer font-robotoSerif flex items-center justify-center space-x-0 rounded-md border bg-[linear-gradient(110deg,#744D40,45%,#8a5d4d,55%,#744D40)] bg-[length:200%_100%] px-4 py-3 font-medium text-white transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#5a3b31] focus:ring-offset-2 focus:ring-offset-slate-50 sm:space-x-2 sm:px-6"
                                            >
                                                <span className="hidden sm:block">
                                                    {getString(
                                                        "hero.form.submitButton",
                                                    )}
                                                </span>
                                                <Send size={20} />
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroClient;
