"use client";;
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <div
        className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
        Peak a boo !! 👻👻
                you found mee  ;)
        Find more mystries{" "}
        <LinkPreview
          url="https://portfolio-theta-peach-55.vercel.app/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500">
          Here
        </LinkPreview>{" "}
      </div>
    </div>
  );
}
