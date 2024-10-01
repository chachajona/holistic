import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";

const BlogPage = () => {
    return (
        <div className="bg-primary-background">
            {/* Main Blog Post */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex flex-col items-start gap-5 justify-start md:w-1/3">
                        <Breadcrumb className="font-robotoSlab text-primary-text">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Trang chủ</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-primary-text">Blog</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div>
                            <h1 className="mb-4 font-robotoSerif text-4xl font-bold capitalize text-primary-text">
                                Khám phá những hiểu biết mới nhất về Vật lý trị
                                liệu
                            </h1>
                            <p className="mb-2 text-sm">
                                bởi John Doe • 11 tháng 1 năm 2023 • đọc 3 phút
                            </p>
                            <p>Chia sẻ bài đăng này</p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Image
                            src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Physical therapy"
                            width={800}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Recent Blog Posts */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <h2 className="mb-6 font-robotoSerif text-3xl font-bold capitalize text-primary-text">
                    Khám phá các blog gần đây của chúng tôi
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-lg bg-white shadow-md"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt={`Blog post ${i}`}
                                width={400}
                                height={200}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="mb-2 text-xl font-semibold">
                                    Tiêu đề blog post
                                </h3>
                                <p className="mb-4 text-sm">
                                    Mô tả ngắn về bài viết...
                                </p>
                                <p className="text-xs">
                                    11 tháng 1 năm 2023 • đọc 5 phút
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Button variant="outline">Xem tất cả</Button>
                </div>
            </section>

            {/* Popular Blog Posts */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <h2 className="mb-6 font-robotoSerif text-3xl font-bold capitalize text-primary-text">
                    Khám phá các blog phổ biến của chúng tôi
                </h2>
                <div className="mb-6 flex gap-4 overflow-x-auto">
                    <Button variant="outline">Xem tất cả</Button>
                    <Button variant="outline">Vật lý trị liệu</Button>
                    <Button variant="outline">Phục hồi chức năng</Button>
                    <Button variant="outline">Phòng chống thương tích</Button>
                    <Button variant="outline">Y học thể thao</Button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-lg bg-white shadow-md"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt={`Popular blog post ${i}`}
                                width={400}
                                height={200}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="mb-2 text-xl font-semibold">
                                    Tiêu đề blog post phổ biến
                                </h3>
                                <p className="mb-4 text-sm">
                                    Mô tả ngắn về bài viết phổ biến...
                                </p>
                                <p className="text-xs">Đọc 3 phút</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <h2 className="mb-6 text-3xl font-bold">
                    Các câu hỏi thường gặp
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {[1, 2, 3, 4, 5].map(i => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger>
                                Câu hỏi thường gặp {i}?
                            </AccordionTrigger>
                            <AccordionContent>
                                Đây là câu trả lời cho câu hỏi thường gặp {i}.
                                Chúng tôi cung cấp thông tin chi tiết và hữu ích
                                để giải đáp thắc mắc của bạn.
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="mt-8 text-center">
                    <Button>Liên hệ</Button>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <div className="flex flex-col items-center gap-8 rounded-lg bg-white p-8 shadow-md md:flex-row">
                    <div className="md:w-1/2">
                        <h2 className="mb-4 text-3xl font-bold">
                            Cập nhật thông tin với Blog của chúng tôi
                        </h2>
                        <p className="mb-4">
                            Đăng ký blog hàng tuần của chúng tôi để nhận thông
                            tin cập nhật thường xuyên về các chủ đề sức khỏe.
                        </p>
                        <div className="flex gap-4">
                            <Input
                                type="email"
                                placeholder="Địa chỉ email của bạn"
                                className="flex-grow"
                            />
                            <Button>Đăng ký</Button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src="https://images.unsplash.com/photo-1572341396754-c8b300b56292?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Newsletter signup"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
