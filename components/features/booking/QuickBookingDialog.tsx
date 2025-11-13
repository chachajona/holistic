"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trackBookingStart, trackFormError, trackFormSubmit } from "@/lib/gtm";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const bookingFormSchema = z.object({
    name: z
        .string()
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(100, "Tên không được quá 100 ký tự")
        .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),
    phone: z
        .string()
        .regex(/^0[0-9]{9,10}$/, "Số điện thoại không hợp lệ")
        .length(10, "Số điện thoại phải có 10 số"),
    note: z.string().max(500, "Ghi chú không được quá 500 ký tự").optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface QuickBookingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    treatment: {
        id: string;
        name: string;
    } | null;
}

export function QuickBookingDialog({
    isOpen,
    onClose,
    treatment,
}: QuickBookingDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { toast } = useToast();

    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            note: "",
        },
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (data: BookingFormData) => {
        if (!treatment) return;

        // Track booking start
        trackBookingStart(treatment.name, treatment.name);

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/booking-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    treatmentId: treatment.id,
                    treatmentName: treatment.name,
                    name: data.name,
                    phone: data.phone,
                    note: data.note || "",
                    source: "services-page",
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Có lỗi xảy ra");
            }

            toast({
                title: "✓ Đã gửi yêu cầu thành công",
                description:
                    "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Cảm ơn!",
            });

            // Track successful booking submission
            trackFormSubmit("quick_booking_dialog", "booking");

            // Close dialog after a short delay
            setTimeout(() => {
                handleClose();
            }, 500);
        } catch (error) {
            console.error("Booking submission error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.";

            toast({
                title: "✗ Có lỗi xảy ra",
                description: errorMessage,
                variant: "destructive",
            });

            // Track booking submission error
            trackFormError("quick_booking_dialog", "booking", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reusable form content for both drawer and sheet
    const bookingContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Treatment Display (Read-only) */}
                <div className="space-y-2">
                    <label className="font-robotoSlab text-sm font-medium">
                        Phương pháp điều trị
                    </label>
                    <div className="bg-primary-text/10 text-primary-text flex items-center gap-2 rounded-lg p-3">
                        <span className="text-lg">🧘</span>
                        <span className="font-robotoSerif font-medium">
                            {treatment?.name || "Chưa chọn"}
                        </span>
                    </div>
                </div>

                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab">
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
                            <FormLabel className="font-robotoSlab">
                                Số điện thoại{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    placeholder="0901234567"
                                    {...field}
                                    disabled={isSubmitting}
                                    className="font-robotoSlab"
                                />
                            </FormControl>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                {/* Note Field */}
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-robotoSlab">
                                Ghi chú{" "}
                                <span className="text-sm text-gray-500">
                                    (tùy chọn)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ví dụ: Tôi muốn đặt lịch vào buổi sáng hoặc có vấn đề cụ thể cần tư vấn..."
                                    {...field}
                                    disabled={isSubmitting}
                                    className="font-robotoSlab min-h-[100px] resize-none"
                                />
                            </FormControl>
                            <FormMessage className="font-robotoSlab text-xs" />
                        </FormItem>
                    )}
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary-text hover:bg-primary-text/90"
                    >
                        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}
                    </Button>
                </div>
            </form>
        </Form>
    );

    // Use Drawer for mobile view
    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={handleClose}>
                <DrawerContent
                    className={cn(
                        "bg-background fixed z-50 gap-4 border p-6 transition-transform duration-300",
                        "inset-x-0 bottom-0 mt-24 rounded-t-[10px]",
                        "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
                    )}
                >
                    <DrawerHeader className="px-0 text-left">
                        <DrawerTitle className="font-robotoSerif text-primary-text text-xl">
                            Đặt lịch tư vấn
                        </DrawerTitle>
                        <DrawerDescription className="font-robotoSlab text-sm">
                            Điền thông tin và chúng tôi sẽ liên hệ lại với bạn
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                        {bookingContent}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    // Use Sheet for desktop view
    return (
        <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent side="right" className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle className="font-robotoSerif text-2xl">
                        Đặt lịch tư vấn
                    </SheetTitle>
                    <SheetDescription className="font-robotoSlab">
                        Điền thông tin và chúng tôi sẽ liên hệ lại với bạn
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">{bookingContent}</div>
            </SheetContent>
        </Sheet>
    );
}
