"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Box, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "BẠN ĐANG BỊ ĐAU MỎI CƠ",
    description:
      "Dịch vụ vật lý trị liệu chính hướng của chúng tôi tập trung vào điều trị các bệnh lý và chấn thương cơ xương khớp, giúp bạn giảm đau và cải thiện chức năng.",
  },
  {
    title: "BẠN BỊ CHẤN THƯƠNG",
    description:
      "Các chương trình phục hồi chức năng thể thao của chúng tôi được thiết kế để giúp các vận động viên phục hồi sau chấn thương, nâng cao hiệu quả và ngăn ngừa chấn thương trong tương lai.",
  },
  {
    title: "Phục hồi Sau Phẫu thuật",
    description:
      "Chúng tôi cung cấp dịch vụ chăm sóc chuyên biệt để hỗ trợ quá trình phục hồi của bạn sau phẫu thuật, giúp bạn lấy lại sức mạnh và khả năng vận động.",
  },
];

export default function ServicesPage() {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-primary-background py-16 sm:px-16"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Paper.png')",
          filter: "opacity(0.2)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center text-primary-text"
      >
        <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light">
          Gói dịch vụ
        </span>
        <h2 className="mb-6 max-w-2xl font-robotoSerif text-3xl font-bold capitalize">
          Dịch vụ Vật lý Trị liệu Toàn diện cho Mọi Nhu cầu
        </h2>
        <p className="mb-8 max-w-xl font-robotoSlab font-normal text-primary-text/50">
          Dịch vụ vật lý trị liệu của chúng tôi đáp ứng nhu cầu đa dạng, bao gồm
          vật lý trị liệu chỉnh hình, phục hồi chức năng thể thao và phục hồi
          sau phẫu thuật. Chúng tôi cam kết cung cấp dịch vụ chăm sóc toàn diện
          và cá nhân hóa để giúp bạn lấy lại sức mạnh và khả năng vận động.
        </p>
      </motion.div>

      <motion.div
        className="container relative z-10 mt-10 grid gap-8 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group flex cursor-pointer flex-col items-center justify-start rounded-lg border border-primary-text bg-transparent p-6 shadow-md transition-all hover:bg-[#D2C9C3] hover:shadow-lg"
          >
            <Box className="mb-4 h-12 w-12 text-primary-text" />
            <h3 className="mb-6 text-center font-robotoSerif text-3xl font-bold text-primary-text">
              {service.title}
            </h3>
            <p className="text-center font-robotoSlab text-base text-primary-text">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 flex flex-row items-center justify-center text-center font-robotoSerif font-normal text-primary-text"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button
          variant={"outline"}
          className="border-primary-text bg-transparent text-primary-text hover:bg-primary-text hover:text-white"
        >
          Tìm hiểu thêm
        </Button>
        <Button
          variant={"link"}
          className="group flex flex-row text-primary-text"
        >
          Đặt lịch hẹn
          <ChevronRight className="animate-shake ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
