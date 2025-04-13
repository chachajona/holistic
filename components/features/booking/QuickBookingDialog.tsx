"use client";

import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

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

    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-robotoSerif text-2xl">
                        Đặt lịch nhanh - {service?.title || ""}
                    </DialogTitle>
                </DialogHeader>

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

                    <div className="grid gap-2">
                        <label className="font-robotoSlab text-sm font-medium">
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
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
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
            </DialogContent>
        </Dialog>
    );
}
