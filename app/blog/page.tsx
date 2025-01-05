import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FAQ from "@/components/FAQ";
import { PopularBlogPosts, RecentBlogPosts } from "@/components/Post";

const BlogPage = () => {
    return (
        <div className="bg-primary-background">
            {/* Main Blog Post */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex flex-col items-start justify-start gap-5 md:w-1/3">
                        <Breadcrumb className="font-robotoSlab text-primary-text">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href="/"
                                            className="text-primary-text/70 hover:text-primary-text"
                                        >
                                            Trang chủ
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-primary-text/70" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-primary-text font-semibold">
                                        Blog
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div>
                            <h1 className="font-robotoSerif text-primary-text mb-4 text-4xl font-bold capitalize">
                                Khám phá những hiểu biết mới nhất về Vật lý trị
                                liệu
                            </h1>
                            <p className="text-primary-text mb-2 text-sm">
                                bởi John Doe • 11 tháng 1 năm 2023 • đọc 3 phút
                            </p>
                            <p className="text-primary-text font-semibold">
                                Chia sẻ bài đăng này
                            </p>
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
            <RecentBlogPosts />

            {/* Popular Blog Posts */}
            <PopularBlogPosts />

            {/* FAQ Section */}
            <FAQ />

            {/* Newsletter Signup */}
            <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
                <div className="border-primary-text flex flex-col items-center gap-8 rounded-lg border bg-transparent shadow-md md:flex-row">
                    <div className="p-8 md:w-1/2">
                        <h2 className="font-robotoSerif text-primary-text mb-4 text-5xl font-bold leading-tight">
                            Cập nhật thông tin với Blog của chúng tôi
                        </h2>
                        <p className="font-robotoSlab text-primary-text/60 mb-4 text-base">
                            Đăng ký blog hàng tuần của chúng tôi để nhận thông
                            tin cập nhật thường xuyên về các chủ đề sức khỏe.
                        </p>
                        <div className="flex gap-4">
                            <Input
                                type="phone"
                                placeholder="Nhập số điện thoại của bạn"
                                className="font-robotoSlab grow text-sm"
                            />
                            <Button className="bg-primary-text font-robotoSerif hover:bg-brown-950 text-base">
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Newsletter signup"
                            width={1000}
                            height={100}
                            className="max-h-fit rounded-lg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
