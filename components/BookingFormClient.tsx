// components/BookingFormClient.tsx
"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, User } from "lucide-react";

import { Treatment } from "@/types/treatments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DatePickerField } from "./DatePickerField";

interface BookingFormClientProps {
    treatment: Treatment;
}

export function BookingFormClient({ treatment }: BookingFormClientProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        treatmentOption: treatment.id,
        date: undefined as Date | undefined,
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        // You could make an API call here
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label
                    htmlFor="name"
                    className="font-robotoSlab text-primary-text/80 text-sm"
                >
                    Họ và tên
                </Label>
                <div className="relative mt-1">
                    <User className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={e =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nhập họ và tên của bạn"
                        className="border-gray-300 bg-white/80 pl-10"
                    />
                </div>
            </div>

            <div>
                <Label
                    htmlFor="email"
                    className="font-robotoSlab text-primary-text/80 text-sm"
                >
                    Email
                </Label>
                <div className="relative mt-1">
                    <Mail className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Nhập email của bạn"
                        className="border-gray-300 bg-white/80 pl-10"
                    />
                </div>
            </div>

            <div>
                <Label
                    htmlFor="phone"
                    className="font-robotoSlab text-primary-text/80 text-sm"
                >
                    Số điện thoại
                </Label>
                <div className="relative mt-1">
                    <Phone className="text-primary-text/50 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={e =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="Nhập số điện thoại của bạn"
                        className="border-gray-300 bg-white/80 pl-10"
                    />
                </div>
            </div>

            <div>
                <Label
                    htmlFor="treatment"
                    className="font-robotoSlab text-primary-text/80 text-sm"
                >
                    Phương pháp điều trị
                </Label>
                <select
                    id="treatment"
                    value={formData.treatmentOption}
                    onChange={e =>
                        setFormData({
                            ...formData,
                            treatmentOption: e.target.value,
                        })
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white/80 p-2 text-sm"
                >
                    <option value={treatment.id}>{treatment.title}</option>
                    {treatment.booking?.map(option => (
                        <option key={option.title} value={option.title}>
                            {option.title} -{" "}
                            {option.price.toLocaleString("vi-VN")} VNĐ
                        </option>
                    ))}
                </select>
            </div>

            <DatePickerField
                label="Ngày hẹn"
                onChange={date => setFormData({ ...formData, date })}
            />

            <Button
                type="submit"
                className="bg-primary-text font-robotoSerif hover:bg-primary-text/90 w-full text-white"
            >
                Gửi yêu cầu tư vấn
            </Button>

            <p className="text-primary-text/60 font-robotoSlab text-center text-xs">
                Tư vấn miễn phí - Chúng tôi sẽ liên hệ lại trong vòng 24 giờ
            </p>
        </form>
    );
}
