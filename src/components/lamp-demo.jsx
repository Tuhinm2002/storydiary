"use client";
import { motion } from "motion/react";

export default function LampDemo() {
  return (
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-20 font-semibold mb-10 text-center text-2xl md:text-4xl tracking-tight font-atma text-slate-700"
      >
      
      Welcome to StoryDiary
      </motion.h1>
  );
}