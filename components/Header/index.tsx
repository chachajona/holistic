"use client";
import { motion } from "framer-motion";

const Header = ({ title, subtitle, backgroundImage }: {
  title: string,
  subtitle?: string,
  backgroundImage: string
}) => {
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
          backgroundImage,
          filter: "brightness(40%)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="container relative z-10 flex h-full flex-col items-start justify-center md:px-16">
        <motion.h1
          className="font-robotoSerif text-left text-4xl font-bold sm:text-5xl md:text-6xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="font-robotoSlab mt-4 max-w-3xl text-left text-base font-light md:text-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
