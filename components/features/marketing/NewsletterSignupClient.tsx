"use client";

import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trackFormError, trackFormSubmit } from "@/lib/gtm";
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

const newsletterFormSchema = z.object({
    phoneNumber: vietnamesePhoneSchema,
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export function NewsletterSignupClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterFormSchema),
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

    const onSubmit = async (data: NewsletterFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: data.phoneNumber.replace(/\s/g, ""), // Remove spaces for API
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || `HTTP error! status: ${response.status}`,
                );
            }

            // Show success toast
            toast({
                title: "✓ Đăng ký thành công",
                description: "Cảm ơn bạn đã đăng ký nhận tin tức từ chúng tôi!",
            });

            // Reset form
            form.reset();

            // Track successful newsletter subscription
            trackFormSubmit("newsletter_signup", "newsletter");
        } catch (error) {
            console.error("Subscription error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Không thể đăng ký.";

            // Show error toast
            toast({
                title: "✗ Có lỗi xảy ra",
                description: errorMessage,
                variant: "destructive",
            });

            // Track newsletter subscription error
            trackFormError("newsletter_signup", "newsletter", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
            <div className="border-primary-text flex flex-col items-center gap-8 rounded-lg border bg-transparent p-6 shadow-md md:flex-row md:p-0">
                {/* Text Content */}
                <div className="p-8 md:w-1/2">
                    <h2 className="font-robotoSerif text-primary-text mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                        Cập nhật thông tin với Blog của chúng tôi
                    </h2>
                    <p className="font-robotoSlab text-primary-text/60 mb-4 text-base">
                        Đăng ký blog hàng tuần của chúng tôi để nhận thông tin
                        cập nhật thường xuyên về các chủ đề sức khỏe.
                    </p>

                    {/* Form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="0901 234 567"
                                                    {...field}
                                                    onChange={e =>
                                                        handlePhoneChange(
                                                            e.target.value,
                                                            field.onChange,
                                                        )
                                                    }
                                                    disabled={isSubmitting}
                                                    className="font-robotoSlab text-sm"
                                                    aria-label="Số điện thoại đăng ký nhận tin"
                                                />
                                            </FormControl>
                                            <FormMessage className="font-robotoSlab text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="bg-primary-text font-robotoSerif hover:bg-brown-950 text-base text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Đang đăng ký..."
                                        : "Đăng ký"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2 md:self-stretch">
                    <Image
                        src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Abstract image representing newsletter signup"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="rounded-r-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
