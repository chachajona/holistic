import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ServicesNotFound() {
    return (
        <div className="bg-primary-background relative flex min-h-[60vh] w-full flex-col items-center justify-center py-16 sm:px-8 lg:px-16">
            <div className="text-primary-text bg-brown-50 mb-6 rounded-full p-4">
                <Search size={48} />
            </div>
            <h2 className="font-robotoSerif text-primary-text mb-3 text-2xl font-bold md:text-3xl">
                Không tìm thấy dịch vụ
            </h2>
            <p className="font-robotoSlab text-primary-text/70 mb-8 max-w-md text-center">
                Hiện tại chúng tôi chưa có thông tin về các dịch vụ. Vui lòng
                quay lại sau hoặc liên hệ với chúng tôi để biết thêm chi tiết.
            </p>
            <Link href="/">
                <Button className="bg-primary-text hover:bg-primary-text/90 text-white">
                    Về trang chủ
                </Button>
            </Link>
        </div>
    );
}
