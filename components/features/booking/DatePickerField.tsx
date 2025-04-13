// components/DatePickerField.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
    onChange?: (date: Date | undefined) => void;
    label: string;
}

export function DatePickerField({ onChange, label }: DatePickerFieldProps) {
    const [date, setDate] = useState<Date>();

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        if (onChange) onChange(newDate);
    };

    return (
        <div>
            <Label
                htmlFor="date"
                className="font-robotoSlab text-primary-text/80 text-sm"
            >
                {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="mt-1 w-full justify-start border-gray-300 bg-white/80 text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? (
                            format(date, "PPP", { locale: vi })
                        ) : (
                            <span>Chọn ngày</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        locale={vi}
                        className="rounded-md border"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
