import Image from "next/image";
import { Star } from "lucide-react";

import { getTestimonials } from "@/lib/api";

interface Testimonial {
    _id: string;
    icon: {
        asset: {
            url: string;
        };
    };
    rating: number;
    quote: string;
    author: string;
}

const TestimonialCard: React.FC<Testimonial> = ({
    icon,
    rating,
    quote,
    author,
}) => (
    <div className="bg-primary-background flex flex-col items-start space-y-4 rounded-lg p-6 shadow-sm">
        <Image src={icon.asset.url} alt="icon" width={56} height={56} />
        <div className="mb-4 flex">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} className="text-brown-500 size-5 fill-current" />
            ))}
        </div>
        <blockquote className="font-robotoSerif min-h-0 text-lg font-bold leading-snug lg:min-h-[230px]">
            &quot;{quote}&quot;
        </blockquote>
        <div className="grid gap-1 text-sm">
            <div className="font-robotoSlab">{author}</div>
        </div>
    </div>
);

export default async function Testimonial(): Promise<JSX.Element> {
    const testimonials = await getTestimonials();

    return (
        <section className="bg-brown-50 text-primary-text w-full py-12 md:px-16 md:py-24 lg:py-32">
            <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="font-robotoSerif text-3xl font-bold capitalize tracking-tighter sm:text-5xl">
                        Đánh giá từ khách hàng
                    </h2>
                    <p className="font-robotoSlab text-primary-text max-w-[900px] text-left md:text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Ví dụ về khách hàng của Holistic
                    </p>
                </div>
            </div>
            <div className="container grid grid-cols-1 gap-6 px-4 md:gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial: Testimonial) => (
                    <TestimonialCard key={testimonial._id} {...testimonial} />
                ))}
            </div>
        </section>
    );
}
