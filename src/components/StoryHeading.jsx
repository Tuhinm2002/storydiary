"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export default function StoryHeadingDemo() {
  return (
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 flex flex-col items-center justify-center gap-4 text-center bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text"
      >
        <LayoutTextFlip
          text="Experience Bengal's "
          words={[
            "Legend Stories",
            "অলৌকিকতা",
            "নিশির ডাক",
            "মেছো ভূত",
            "আলেয়া",
          ]}
        />
      </motion.h1>
  );
}