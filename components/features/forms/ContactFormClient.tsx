"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trackFormError, trackFormSubmit } from "@/lib/gtm";
import { formatPhoneNumber } from "@/lib/utils";
import {
    messageSchema,
    vietnameseNameSchema,
    vietnamesePhoneSchema,
} from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
    name: vietnameseNameSchema,
    phone: vietnamesePhoneSchema,
    message: messageSchema,
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactFormClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            message: "",
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

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name.trim(),
                    phone: data.phone.replace(/\s/g, ""), // Remove spaces for API
                    message: data.message.trim(),
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
                title: "✓ Gửi thành công",
                description:
                    "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!",
            });

            // Reset form
            form.reset();

            // Track successful form submission
            trackFormSubmit("contact_form", "contact");
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Không thể gửi form.";

            // Show error toast
            toast({
                title: "✗ Có lỗi xảy ra",
                description: errorMessage,
                variant: "destructive",
            });

            // Track form submission error
            trackFormError("contact_form", "contact", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="font-robotoSlab flex-1 bg-white">
            <CardHeader>
                <CardTitle className="text-brown-700 text-2xl font-normal">
                    Form liên hệ
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brown-700 text-sm font-medium">
                                        Họ và tên{" "}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nguyễn Văn A"
                                            {...field}
                                            disabled={isSubmitting}
                                            className="font-robotoSlab"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-robotoSlab text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Phone Field */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brown-700 text-sm font-medium">
                                        Số điện thoại{" "}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
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
                                            className="font-robotoSlab"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-robotoSlab text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Message Field */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brown-700 text-sm font-medium">
                                        Tin nhắn đính kèm{" "}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Vui lòng mô tả chi tiết yêu cầu của bạn..."
                                            {...field}
                                            disabled={isSubmitting}
                                            className="font-robotoSlab min-h-[120px] resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-robotoSlab text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="bg-primary-text hover:bg-brown-800 w-full text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
