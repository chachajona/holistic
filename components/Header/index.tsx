"use client";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="relative h-96 max-h-96 overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Hero.png')",
          filter: "brightness(40%)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="container relative z-10 flex h-full flex-col items-start justify-center md:px-16">
        <motion.h1
          className="text-left font-robotoSerif text-4xl font-bold sm:text-5xl md:text-6xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Dịch Vụ
        </motion.h1>
        <motion.p
          className="mt-4 max-w-3xl text-left font-robotoSlab text-base md:text-lg font-light"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Tự thưởng cho bản thân một gói dịch vụ và tiết kiệm hoặc kiểm tra các
          ưu đãi hiện tại.
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
