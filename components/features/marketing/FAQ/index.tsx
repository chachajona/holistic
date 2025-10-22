"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

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

interface FAQProps {
    phone?: string;
}

const FAQ: React.FC<FAQProps> = ({ phone }) => {
    const [faqs, setFaqs] = useState<FAQType[]>([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            const data: FAQData[] | null = await getFAQs();
            const formattedFaqs: FAQType[] = (data ?? []).map(faq => ({
                _id: faq._id,
                question: faq.question ?? "",
                answer: Array.isArray(faq.answer)
                    ? "Answer contains rich text content"
                    : (faq.answer ?? ""),
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
            {phone && (
                <div className="bg-brown-900 text-brown-50 mt-8 rounded-lg px-6 py-8 text-center">
                    <h3 className="font-robotoSerif mb-4 text-3xl font-semibold">
                        Vẫn còn thắc mắc?
                    </h3>
                    <p className="font-robotoSlab text-brown-50/80 mb-4 text-sm">
                        Liên hệ với chúng tôi để biết thêm thông tin.
                    </p>
                    <Link
                        href={`tel:${phone.replace(/\s/g, "").replace(/[()+-]/g, "")}`}
                        className="inline-block"
                    >
                        <Button
                            variant={"outline"}
                            className="bg-brown-50 text-brown-900 hover:bg-brown-100 border-brown-50 font-robotoSerif hover:border-brown-100 group"
                        >
                            <Phone
                                size={18}
                                className="mr-2 inline-block transition-transform group-hover:scale-110"
                            />
                            Liên hệ
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default FAQ;
