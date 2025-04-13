"use client";

import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface QuickBookingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        treatments: Array<{
            id: string;
            name: string;
        }>;
    } | null;
}

export function QuickBookingDialog({
    isOpen,
    onClose,
    service,
}: QuickBookingDialogProps) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTreatment, setSelectedTreatment] = useState<string>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    const handleClose = () => {
        setSelectedDate(undefined);
        setSelectedTreatment(undefined);
        setSelectedTime(undefined);
        onClose();
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTreatment || !selectedTime) {
            alert("Vui lòng chọn đầy đủ thông tin.");
            return;
        }
        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    treatment: selectedTreatment,
                    date: format(selectedDate, "yyyy-MM-dd"),
                    time: selectedTime,
                }),
            });
            if (response.ok) window.location.href = "/booking?success=true";
            else throw new Error("Đặt lịch thất bại");
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    // Reusable content for both drawer and sheet
    const bookingContent = (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <label className="font-robotoSlab text-sm font-medium">
                        Chọn phương pháp điều trị
                    </label>
                    <select
                        value={selectedTreatment}
                        onChange={e => setSelectedTreatment(e.target.value)}
                        className="rounded-md border p-2"
                    >
                        <option value="">Chọn phương pháp</option>
                        {service?.treatments.map(treatment => (
                            <option key={treatment.id} value={treatment.id}>
                                {treatment.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <label className="font-robotoSlab self-start text-sm font-medium">
                        Chọn ngày
                    </label>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={vi}
                        className="rounded-md border"
                    />
                </div>

                {selectedDate && (
                    <div className="grid gap-2">
                        <label className="font-robotoSlab text-sm font-medium">
                            Chọn giờ
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map(time => (
                                <Button
                                    key={time}
                                    variant={
                                        selectedTime === time
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setSelectedTime(time)}
                                    className="text-sm"
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleBooking}
                        disabled={
                            !selectedDate || !selectedTreatment || !selectedTime
                        }
                    >
                        Xác nhận đặt lịch
                    </Button>
                </div>
            </div>
        </>
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
                            Đặt lịch nhanh
                        </DrawerTitle>
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
                        Đặt lịch nhanh
                    </SheetTitle>
                </SheetHeader>
                {bookingContent}
            </SheetContent>
        </Sheet>
    );
}
