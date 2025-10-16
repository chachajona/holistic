import { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@sanity/types";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SanityImageLoader } from "@/components/ui/sanity-image-loader";

// In a real implementation, you would import these from your Sanity client
// import { getPostBySlug } from "@/lib/api";
// import { urlFor } from "@/sanity/lib/image";

// This would be your Sanity post type
interface Post {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    author: {
        name: string;
        image?: SanityImageSource;
    };
    mainImage?: SanityImageSource;
    categories?: {
        title: string;
    }[];
    excerpt?: string;
    body?: PortableTextBlock[];
    readingTime?: string;
}

// This would be your Sanity query to get post data
async function getPostData(_slug: string): Promise<Post> {
    // In a real implementation, you would fetch from Sanity:
    // return getPostBySlug(slug);

    // Mock data for demonstration
    return {
        _id: "post-1",
        title: "Lợi ích của việc tập thể dục thường xuyên",
        slug: "loi-ich-cua-viec-tap-the-duc-thuong-xuyen",
        publishedAt: "2023-05-15",
        author: {
            name: "Jane Smith",
            // This would be a Sanity image reference
            image: {
                _type: "image",
                asset: { _ref: "image-abc123-400x400-jpg" },
            },
        },
        // This would be a Sanity image reference
        mainImage: {
            _type: "image",
            asset: { _ref: "image-def456-1200x800-jpg" },
        },
        categories: [{ title: "Sức khỏe" }, { title: "Thể dục" }],
        excerpt:
            "Tìm hiểu cách tập thể dục đều đặn có thể cải thiện sức khỏe thể chất và tinh thần của bạn như thế nào.",
        body: [
            {
                _key: "block1",
                _type: "block",
                style: "normal",
                markDefs: [],
                children: [
                    {
                        _key: "span1",
                        _type: "span",
                        marks: [],
                        text: "Tập thể dục thường xuyên mang lại nhiều lợi ích cho sức khỏe thể chất và tinh thần. Nghiên cứu đã chỉ ra rằng hoạt động thể chất đều đặn có thể giúp giảm nguy cơ mắc nhiều bệnh mãn tính, cải thiện sức khỏe tim mạch, tăng cường sức mạnh cơ bắp và xương, và thậm chí cải thiện tâm trạng và giảm lo lắng.",
                    },
                ],
            },
        ],
        readingTime: "5 phút",
    };
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    return {
        title: `${post.title} | Holistic Blog`,
        description: post.excerpt || "",
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostData(slug);
    const formattedDate = new Date(post.publishedAt).toLocaleDateString(
        "vi-VN",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        },
    );

    return (
        <div className="bg-primary-background">
            <article className="container mx-auto w-full py-6 md:px-16 md:py-8">
                {/* Breadcrumb */}
                <Breadcrumb className="font-robotoSlab text-primary-text mb-6">
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
                            <BreadcrumbLink asChild>
                                <Link
                                    href="/blog"
                                    className="text-primary-text/70 hover:text-primary-text"
                                >
                                    Blog
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary-text/70" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary-text font-semibold">
                                {post.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Post Header */}
                <header className="mb-8">
                    <h1 className="font-robotoSerif text-primary-text mb-4 text-4xl font-bold md:text-5xl">
                        {post.title}
                    </h1>

                    <div className="font-robotoSlab text-primary-text/70 flex flex-wrap items-center gap-4 text-sm">
                        {post.author.image && (
                            <div className="flex items-center">
                                <div className="mr-2 size-8 overflow-hidden rounded-full">
                                    <SanityImageLoader
                                        image={post.author.image}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="size-full object-cover"
                                    />
                                </div>
                                <span>{post.author.name}</span>
                            </div>
                        )}
                        <span>•</span>
                        <span>{formattedDate}</span>
                        {post.readingTime && (
                            <>
                                <span>•</span>
                                <span>Đọc: {post.readingTime}</span>
                            </>
                        )}
                        {post.categories && post.categories.length > 0 && (
                            <>
                                <span>•</span>
                                <div className="flex flex-wrap gap-2">
                                    {post.categories.map(category => (
                                        <span
                                            key={category.title}
                                            className="bg-primary-text/10 rounded-full px-3 py-1 text-xs"
                                        >
                                            {category.title}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="mb-8 overflow-hidden rounded-xl">
                        <SanityImageLoader
                            image={post.mainImage}
                            alt={post.title}
                            aspectRatio={16 / 9}
                            priority={true}
                            className="w-full"
                        />
                    </div>
                )}

                {/* Post Content */}
                <div className="font-robotoSlab text-primary-text prose prose-lg mx-auto max-w-3xl">
                    {post.body && <PortableText value={post.body} />}
                </div>
            </article>
        </div>
    );
}
