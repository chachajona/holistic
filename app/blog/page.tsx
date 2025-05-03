"use client";

import React, { useEffect, useState } from "react";
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
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";
import {
    PopularBlogPosts,
    RecentBlogPosts,
} from "@/components/features/blog/Post";
import FAQ from "@/components/features/marketing/FAQ";
import { NewsletterSignupClient } from "@/components/features/marketing/NewsletterSignupClient";

const BlogPage = () => {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageLoaderWrapper isContentLoaded={isContentLoaded}>
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
                                    Khám phá những hiểu biết mới nhất về Vật lý
                                    trị liệu
                                </h1>
                                <p className="text-primary-text mb-2 text-sm">
                                    bởi John Doe • 11 tháng 1 năm 2023 • đọc 3
                                    phút
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

                {/* Render the new Newsletter Signup Client Component */}
                <NewsletterSignupClient />
            </div>
        </PageLoaderWrapper>
    );
};

export default BlogPage;
