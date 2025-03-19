"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ServicesError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="bg-primary-background relative flex min-h-[60vh] w-full flex-col items-center justify-center py-16 sm:px-8 lg:px-16">
            <div className="mb-6 rounded-full bg-amber-100 p-4 text-amber-500">
                <AlertTriangle size={48} />
            </div>
            <h2 className="font-robotoSerif text-primary-text mb-3 text-2xl font-bold md:text-3xl">
                Không thể tải dịch vụ
            </h2>
            <p className="font-robotoSlab text-primary-text/70 mb-8 max-w-md text-center">
                Đã xảy ra lỗi khi tải thông tin dịch vụ. Vui lòng thử lại sau
                hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp diễn.
            </p>
            <div className="flex flex-row gap-4">
                <Button
                    variant="outline"
                    className="border-primary-text text-primary-text"
                    onClick={() => reset()}
                >
                    Thử lại
                </Button>
                <Link href="/">
                    <Button className="bg-amber-500 text-white hover:bg-amber-600">
                        Về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
}
