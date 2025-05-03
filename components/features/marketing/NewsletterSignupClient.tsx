"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function NewsletterSignupClient() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubscribe = async () => {
        if (!phoneNumber.trim()) {
            setFeedbackMessage("Vui lòng nhập số điện thoại.");
            setStatus("error");
            return;
        }
        setStatus("loading");
        setFeedbackMessage("");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || `HTTP error! status: ${response.status}`,
                );
            }

            setStatus("success");
            setFeedbackMessage(result.message || "Đăng ký thành công!");
            setPhoneNumber("");
        } catch (error: any) {
            console.error("Subscription error:", error);
            setStatus("error");
            setFeedbackMessage(`Lỗi: ${error.message || "Không thể đăng ký."}`);
        } finally {
            setTimeout(() => {
                if (status !== "loading") setStatus("idle");
            }, 4000);
        }
    };

    // Handle input change and clear error messages
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        if (status === "error") {
            setStatus("idle"); // Reset status if user starts typing after an error
            setFeedbackMessage("");
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
                    {/* Input and Button */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Input
                            type="tel" // Use tel for phone numbers
                            value={phoneNumber}
                            onChange={handleInputChange} // Use updated handler
                            placeholder="Nhập số điện thoại của bạn"
                            className="font-robotoSlab grow text-sm"
                            aria-label="Số điện thoại đăng ký nhận tin" // Accessibility
                            disabled={status === "loading"}
                            aria-invalid={status === "error"} // Accessibility
                            aria-describedby="newsletter-feedback" // Accessibility
                        />
                        <Button
                            onClick={handleSubscribe}
                            className="bg-primary-text font-robotoSerif hover:bg-brown-950 text-base text-white"
                            disabled={status === "loading"}
                        >
                            {status === "loading"
                                ? "Đang đăng ký..."
                                : "Đăng ký"}
                        </Button>
                    </div>
                    {/* Feedback Message */}
                    {feedbackMessage && (
                        <p
                            id="newsletter-feedback" // For aria-describedby
                            className={`mt-2 text-sm ${
                                status === "error"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {feedbackMessage}
                        </p>
                    )}
                </div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2 md:self-stretch">
                    <Image
                        src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Abstract image representing newsletter signup"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="rounded-r-lg object-cover" // Ensure image covers the container
                    />
                </div>
            </div>
        </section>
    );
}
