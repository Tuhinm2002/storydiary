"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div
        >
        <LayoutTextFlip
          text="Experience Bengal's "
          words={["Legend Stories", "অলৌকিকতা", "নিশির ডাক", "মেছো ভূত","আলেয়া"]} />
      </motion.div>
      
    </div>
  );
}
