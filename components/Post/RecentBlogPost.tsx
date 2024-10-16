import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const RecentBlogPosts = () => {
    const posts = [
        {
            title: "10 lời khuyên cho lối sống lành mạnh",
            category: "Sức khỏe",
            author: "John Doe",
            date: "11 tháng 1 năm 2022",
            readTime: "4 phút",
            image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Hands holding pink dumbbells",
        },
        {
            title: "Lợi ích của việc tập thể dục thường xuyên",
            category: "Sự thích hợp",
            author: "Jane Smith",
            date: "11 tháng 1 năm 2022",
            readTime: "7 phút",
            image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person exercising on a fitness ball",
        },
        {
            title: "Sức mạnh của siêu thực phẩm",
            category: "Dinh dưỡng",
            author: "Michael Brown",
            date: "11 tháng 1 năm 2022",
            readTime: "4 phút",
            image: "https://images.unsplash.com/photo-1610415946035-bad6fc9f5b8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Assortment of colorful fruits and vegetables",
        },
    ];

    return (
        <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
            <h2 className="font-robotoSerif text-primary-text mb-2 text-3xl font-bold capitalize">
                Khám phá các blog gần đây của chúng tôi
            </h2>
            <p className="font-robotoSlab text-primary-text/60 mb-6 text-base">
                Luôn cập nhật các bài đăng blog đầy thông tin của chúng tôi
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {posts.map((post, index) => (
                    <div key={index} className="overflow-hidden bg-transparent">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            width={400}
                            height={200}
                            className="h-48 w-full rounded-lg object-cover"
                        />
                        <div className="flex flex-col items-start justify-between py-4">
                            <div className="min-h-28">
                                <span className="font-robotoSlab text-primary-text/60 mb-2 inline-block text-xs font-semibold">
                                    {post.category}
                                </span>
                                <h3 className="font-robotoSerif text-primary-text mb-2 text-xl font-semibold">
                                    {post.title}
                                </h3>
                            </div>
                            <p className="font-robotoSlab text-primary-text/60 mb-4 text-sm">
                                {post.author} • {post.date} • đọc{" "}
                                {post.readTime}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-right">
                <Button
                    variant={"outline"}
                    className="border-primary-text font-robotoSerif text-primary-text/70 hover:bg-primary-text bg-transparent hover:text-white"
                >
                    Xem tất cả
                </Button>
            </div>
        </section>
    );
};

export default RecentBlogPosts;
