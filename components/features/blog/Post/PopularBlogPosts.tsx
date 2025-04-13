import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PopularBlogPosts = () => {
    const categories = [
        "Xem tất cả",
        "Vật lý trị liệu",
        "Phòng bệnh chức năng",
        "Phòng chống thương tích",
        "Y học thể thao",
    ];

    const posts = [
        {
            title: "Lợi ích của việc tập thể dục thường xuyên",
            description:
                "Tìm hiểu cách tập thể dục đều đặn có thể cải thiện sức khỏe thể chất và tinh thần của bạn như thế nào.",
            image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person exercising on a fitness ball",
            readTime: "5 phút",
        },
        {
            title: "Lời khuyên cho lối sống lành mạnh",
            description:
                "Khám phá những cách đơn giản để duy trì lối sống lành mạnh và cảm thấy tuyệt vời hơn.",
            image: "https://images.unsplash.com/photo-1645005513709-77336f075dc8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person measuring waist",
            readTime: "7 phút",
        },
        {
            title: "Tầm quan trọng của việc kéo dài",
            description:
                "Tìm hiểu lý do tại sao việc kéo dài cơ thể quan trọng và các kỹ thuật kéo dài hiệu quả.",
            image: "https://images.unsplash.com/photo-1572341396754-c8b300b56292?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person stretching on yoga mat",
            readTime: "6 phút",
        },
        {
            title: "Kiểm soát cơn đau mãn tính",
            description:
                "Khám phá các chiến lược hiệu quả để kiểm soát cơn đau mãn tính và cải thiện chất lượng cuộc sống.",
            image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person with neck pain",
            readTime: "8 phút",
        },
        {
            title: "Lời khuyên về dinh dưỡng cho vận động viên",
            description:
                "Tìm hiểu về tầm quan trọng của dinh dưỡng hợp lý đối với vận động viên và cách tối ưu hóa chế độ ăn uống.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Healthy meal in a bowl",
            readTime: "6 phút",
        },
        {
            title: "Lời khuyên để có giấc ngủ ngon hơn",
            description:
                "Khám phá các mẹo giúp cải thiện chất lượng giấc ngủ của bạn để tỉnh táo và khỏe mạnh hơn.",
            image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Person sleeping peacefully",
            readTime: "5 phút",
        },
    ];

    return (
        <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
            <h2 className="font-robotoSerif text-primary-text mb-2 text-3xl font-bold capitalize">
                Khám phá các blog phổ biến của chúng tôi
            </h2>
            <p className="font-robotoSlab text-primary-text/60 mb-6 text-base">
                Luôn cập nhật các bài đăng blog mới nhất và phổ biến nhất của
                chúng tôi
            </p>
            <div className="mb-6 flex gap-4 overflow-x-auto">
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className="border-primary-text font-robotoSerif text-primary-text/70 hover:bg-primary-text bg-transparent hover:text-white"
                    >
                        {category}
                    </Button>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <div key={index} className="overflow-hidden bg-transparent">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            width={400}
                            height={200}
                            className="h-48 w-full rounded-lg object-cover"
                        />
                        <div className="py-4">
                            <div className="min-h-32">
                                <h3 className="font-robotoSerif text-primary-text mb-2 text-xl font-semibold">
                                    {post.title}
                                </h3>
                                <p className="font-robotoSlab text-primary-text/60 mb-4 text-sm">
                                    {post.description}
                                </p>
                            </div>
                            <div className="font-robotoSlab flex items-center justify-between">
                                <span className="text-primary-text/60 text-xs">
                                    Đọc: {post.readTime}
                                </span>
                                <Link
                                    href="#"
                                    className="text-primary-text text-sm font-semibold hover:underline"
                                >
                                    Đọc thêm →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularBlogPosts;
