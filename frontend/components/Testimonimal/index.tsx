"use client";

import { Star } from "lucide-react";
import worker from "@/assets/images/Worker.png";
import cycler from "@/assets/images/Cycler.png";
import athlete from "@/assets/images/Athlete.png";

import Image, { StaticImageData } from "next/image";

interface Testimonial {
  icon: StaticImageData;
  rating: number;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    icon: worker,
    rating: 5,
    quote:
      "Mình chọn Holistic ở đây có lẽ có công đầu là mình cần, không cần tốn công tìm đi nhiều nơi khác nhau. Mình được tư vấn kĩ lưỡng từ đầu và được sắp xếp cả quá trình trị liệu lẫn bài tập về nhà rất rõ ràng.",
    author:
      "Minh 26 tuổi, làm việc văn phòng thường gặp stress, đi co bó vào đứng dáng, đau đầu, đau cổ vai gáy đeo mãi.",
  },
  {
    icon: cycler,
    rating: 5,
    quote:
      "Mình chọn Holistic vì uy tín. Toàn bộ quá trình tư vấn, trị liệu và tập vật lý trị liệu của mình đều được theo dõi sát sao việc tiến bộ phục hồi. Mình thấy sự cải thiện rõ rệt chỉ sau vài tuần rehab.",
    author:
      "Minh 30 tuổi, người công việc bận rộn muốn có chế độ tập luyện giúp duy trình lối sống lành mạnh thường xuyên và không thể tập tục nhóm.",
  },
  {
    icon: athlete,
    rating: 4,
    quote:
      "Mình thấy rất tin tưởng vì Holistic ở ngay trung tâm, có nhiều phương pháp trị liệu, đội ngũ bác sĩ, founder là những người uy tín trong ngành, giá cả lại hợp lý nữa.",
    author:
      "Mình là vận động viên chuyên nghiệp, thường đến Holistic thư giãn cơ bắp để khôi phục phong độ thể thao.",
  },
];

const TestimonialCard: React.FC<Testimonial> = ({
  icon,
  rating,
  quote,
  author,
}) => (
  <div className="flex flex-col items-start space-y-4 rounded-lg bg-primary-background p-6 shadow-sm">
    <Image src={icon} alt="icon" width={56} height={56} />
    <div className="mb-4 flex">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current text-brown-500" />
      ))}
    </div>
    <blockquote className="min-h-0 font-robotoSerif text-lg font-bold leading-snug lg:min-h-[230px]">
      “{quote}”
    </blockquote>
    <div className="grid gap-1 text-sm">
      <div className="font-robotoSlab">{author}</div>
    </div>
  </div>
);

export default function Testimonial(): JSX.Element {
  return (
    <section className="w-full bg-brown-50 py-12 text-primary-text md:px-16 md:py-24 lg:py-32">
      <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="font-robotoSerif text-3xl font-bold capitalize tracking-tighter sm:text-5xl">
            Đánh giá từ khách hàng
          </h2>
          <p className="max-w-[900px] text-left font-robotoSlab text-primary-text md:text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ví dụ về khách hàng của Holistic
          </p>
        </div>
      </div>
      <div className="container grid grid-cols-1 gap-6 px-4 md:gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
