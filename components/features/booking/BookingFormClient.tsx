// components/BookingFormClient.tsx
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Treatment } from "@/types/treatments";
import { trackBookingStart, trackFormError, trackFormSubmit } from "@/lib/gtm";
import { formatPhoneNumber } from "@/lib/utils";
import {
    emailSchema,
    vietnameseNameSchema,
    vietnamesePhoneSchema,
} from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DatePickerField } from "./DatePickerField";

const bookingFormSchema = z.object({
    name: vietnameseNameSchema,
    email: emailSchema,
    phone: vietnamesePhoneSchema,
    treatmentOption: z.string().min(1, "Vui lòng chọn phương pháp điều trị"),
    date: z
        .date({
            required_error: "Vui lòng chọn ngày hẹn",
            invalid_type_error: "Ngày không hợp lệ",
        })
        .refine(
            date => date > new Date(),
            "Ngày hẹn phải là ngày trong tương lai",
        ),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingFormClientProps {
    treatment: Treatment;
}

export function BookingFormClient({ treatment }: BookingFormClientProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            treatmentOption: treatment.id,
            date: undefined,
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

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);

        // Track booking start
        trackBookingStart("booking_form", treatment.title);

        try {
            const response = await fetch("/api/booking-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    treatmentId: data.treatmentOption,
                    treatmentName: treatment.title,
                    name: data.name.trim(),
                    phone: data.phone.replace(/\s/g, ""),
                    note: "", // Booking form doesn't have note field
                    source: "booking-page",
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
                title: "✓ Gửi yêu cầu thành công",
                description:
                    "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận lịch hẹn.",
            });

            // Reset form
            form.reset();

            // Track successful submission
            trackFormSubmit("booking_form", "booking");
        } catch (error) {
            console.error("Booking submission error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Không thể gửi yêu cầu.";

            // Show error toast
            toast({
                title: "✗ Có lỗi xảy ra",
                description: errorMessage,
                variant: "destructive",
            });

            // Track booking submission error
            trackFormError("booking_form", "booking", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab text-primary-text/80 text-sm">
                                Họ và tên{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <div className="relative mt-1">
                                <User className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                                <FormControl>
                                    <Input
                                        placeholder="Nhập họ và tên của bạn"
                                        {...field}
                                        disabled={isSubmitting}
                                        className="font-robotoSlab border-gray-300 bg-white/80 pl-10"
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab text-primary-text/80 text-sm">
                                Email <span className="text-red-500">*</span>
                            </FormLabel>
                            <div className="relative mt-1">
                                <Mail className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        {...field}
                                        disabled={isSubmitting}
                                        className="font-robotoSlab border-gray-300 bg-white/80 pl-10"
                                    />
                                </FormControl>
                            </div>
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
                            <FormLabel className="font-robotoSlab text-primary-text/80 text-sm">
                                Số điện thoại{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <div className="relative mt-1">
                                <Phone className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                                <FormControl>
                                    <Input
                                        placeholder="0901 234 567"
                                        {...field}
                                        onChange={e =>
                                            handlePhoneChange(
                                                e.target.value,
                                                field.onChange,
                                            )
                                        }
                                        disabled={isSubmitting}
                                        className="font-robotoSlab border-gray-300 bg-white/80 pl-10"
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                {/* Treatment Field */}
                <FormField
                    control={form.control}
                    name="treatmentOption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab text-primary-text/80 text-sm">
                                Phương pháp điều trị{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    disabled={isSubmitting}
                                    className="font-robotoSlab mt-1 w-full rounded-md border border-gray-300 bg-white/80 p-2 text-sm"
                                >
                                    <option value={treatment.id}>
                                        {treatment.title}
                                    </option>
                                    {treatment.booking?.map(option => (
                                        <option
                                            key={option.title}
                                            value={option.title}
                                        >
                                            {option.title} -{" "}
                                            {option.price.toLocaleString(
                                                "vi-VN",
                                            )}{" "}
                                            VNĐ
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                {/* Date Field */}
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab text-primary-text/80 text-sm">
                                Ngày hẹn <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <DatePickerField
                                    label=""
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="bg-primary-text font-robotoSerif hover:bg-primary-text/90 w-full text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </Button>

                <p className="text-primary-text/60 font-robotoSlab text-center text-xs">
                    Tư vấn miễn phí - Chúng tôi sẽ liên hệ lại trong vòng 24 giờ
                </p>
            </form>
        </Form>
    );
}
