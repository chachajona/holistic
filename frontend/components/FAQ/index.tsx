"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        {
            question: "Vật lý trị liệu là gì?",
            answer: "Vật lý trị liệu là một ngành chăm sóc sức khỏe giúp duy trì, khôi phục hoặc cải thiện chuyển động, chức năng và sức khỏe tổng thể. Nó sử dụng các phương pháp như tập luyện, massage, và các kỹ thuật điều trị khác nhằm giảm đau, tăng cường sức mạnh và cải thiện khả năng vận động của bệnh nhân.",
        },
        {
            question: "Vật lý trị liệu có thể giúp tôi như thế nào?",
            answer: "Vật lý trị liệu có thể giúp bạn lấy lại khả năng vận động, giảm đau, phục hồi sau chấn thương trong nhiều loại vấn đề sức khỏe khác nhau. Các nhà vật lý trị liệu sẽ đánh giá tình trạng của bạn và lập kế hoạch điều trị được cá nhân hóa phù hợp với nhu cầu cụ thể của bạn.",
        },
        {
            question:
                "Tôi có cần giấy giới thiệu để tập vật lý trị liệu không?",
            answer: "Trong hầu hết các trường hợp, bạn không cần giấy giới thiệu để đến vật lý trị liệu. Tuy nhiên, một số chương trình bảo hiểm có thể yêu cầu giấy giới thiệu để được bảo hiểm. Tốt nhất bạn nên kiểm tra với nhà cung cấp bảo hiểm của mình hoặc liên hệ với chúng tôi để biết thêm thông tin.",
        },
        {
            question: "Một buổi vật lý trị liệu kéo dài bao lâu?",
            answer: "Thời gian của một buổi vật lý trị liệu có thể khác nhau tùy thuộc vào tình trạng và kế hoạch điều trị của bạn. Thông thường, một phiên có thể kéo dài từ 30 phút đến một giờ. Các nhà vật lý trị liệu của chúng tôi sẽ làm việc với bạn để xác định thời gian thích hợp cho buổi trị liệu của bạn.",
        },
        {
            question: "Tôi nên mặc gì khi đến buổi hẹn vật lý trị liệu?",
            answer: "Nên mặc quần áo thoải mái và dễ dàng di chuyển, ví dụ như đồ thể thao hoặc quần áo co giãn. Điều này giúp bạn dễ dàng thực hiện các bài tập và cho phép nhà vật lý trị liệu đánh giá chuyển động của bạn một cách chính xác.",
        },
    ];

    return (
        <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
            <h2 className="mb-6 font-robotoSerif text-3xl font-bold capitalize text-primary-text">
                Các câu hỏi thường gặp
            </h2>
            <p className="mb-8 font-robotoSlab text-base text-primary-text/60">
                Tìm câu trả lời cho các câu hỏi phổ biến về vật lý trị liệu và
                các dịch vụ của chúng tôi.
            </p>
            <Accordion
                type="single"
                collapsible
                className="w-full text-primary-text"
            >
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="font-robotoSlab text-lg font-semibold">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-robotoSlab text-base">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <div className="mt-8 text-left">
                <h3 className="mb-4 font-robotoSerif text-3xl font-semibold text-primary-text">
                    Vẫn còn thắc mắc?
                </h3>
                <p className="mb-4 font-robotoSlab text-sm text-primary-text/60">
                    Liên hệ với chúng tôi để biết thêm thông tin.
                </p>
                <Button
                    variant={"outline"}
                    className="border-primary-text bg-transparent font-robotoSerif text-primary-text/70 hover:bg-primary-text hover:text-white"
                >
                    Liên hệ
                </Button>
            </div>
        </section>
    );
};

export default FAQ;
