"use client";

import React, { useState } from "react";

import { trackFormError, trackFormSubmit } from "@/lib/gtm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function ContactFormClient() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setFeedbackMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, phone, message }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || `HTTP error! status: ${response.status}`,
                );
            }

            setStatus("success");
            setFeedbackMessage(result.message || "Gửi thành công!");
            setName("");
            setPhone("");
            setMessage("");

            // Track successful form submission
            trackFormSubmit("contact_form", "contact");
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            const errorMessage =
                error instanceof Error ? error.message : "Không thể gửi form.";
            setFeedbackMessage(`Lỗi: ${errorMessage}`);

            // Track form submission error
            trackFormError("contact_form", "contact", errorMessage);
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label
                            htmlFor="name"
                            className="text-brown-700 block text-sm font-medium"
                        >
                            Họ và tên
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1"
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="phone"
                            className="text-brown-700 block text-sm font-medium"
                        >
                            Số điện thoại
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập số điện thoại của bạn"
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="message"
                            className="text-brown-700 block text-sm font-medium"
                        >
                            Tin nhắn đính kèm
                        </Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="mt-1"
                            placeholder="Điền tin nhắn của bạn"
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                    {feedbackMessage && (
                        <p
                            className={`text-sm ${
                                status === "error"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {feedbackMessage}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="bg-primary-text hover:bg-brown-800 w-full text-white"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Đang gửi..." : "Gửi"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
