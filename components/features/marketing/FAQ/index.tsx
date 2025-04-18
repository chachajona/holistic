"use client";

import React, { useEffect, useState } from "react";

import { FAQ as FAQType } from "@/types/faq";
import { FAQData } from "@/types/sanity";
import { getFAQs } from "@/lib/api";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
    const [faqs, setFaqs] = useState<FAQType[]>([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            const data: FAQData[] | null = await getFAQs();
            const formattedFaqs: FAQType[] = (data ?? []).map(faq => ({
                ...faq,
                question: faq.question ?? "",
                answer: faq.answer ?? "",
            }));
            setFaqs(formattedFaqs);
        };
        fetchFAQs();
    }, []);

    if (faqs.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto w-full py-6 md:px-16 md:py-8">
            <h2 className="font-robotoSerif text-primary-text mb-6 text-3xl font-bold capitalize">
                Các câu hỏi thường gặp
            </h2>
            <p className="font-robotoSlab text-primary-text/60 mb-8 text-base">
                Tìm câu trả lời cho các câu hỏi phổ biến về vật lý trị liệu và
                các dịch vụ của chúng tôi.
            </p>
            <Accordion
                type="single"
                collapsible
                className="text-primary-text w-full"
            >
                {faqs.map((faq: FAQType) => (
                    <AccordionItem key={faq._id} value={faq._id}>
                        <AccordionTrigger className="font-robotoSlab items-start text-lg font-semibold">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-robotoSlab text-base">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <div className="mt-8 text-left">
                <h3 className="font-robotoSerif text-primary-text mb-4 text-3xl font-semibold">
                    Vẫn còn thắc mắc?
                </h3>
                <p className="font-robotoSlab text-primary-text/60 mb-4 text-sm">
                    Liên hệ với chúng tôi để biết thêm thông tin.
                </p>
                <Button
                    variant={"outline"}
                    className="border-primary-text font-robotoSerif text-primary-text/70 hover:bg-primary-text bg-transparent hover:text-white"
                >
                    Liên hệ
                </Button>
            </div>
        </section>
    );
};

export default FAQ;
