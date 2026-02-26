import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { LinkPreviewDemo } from "./LinkReveal";

export function DraggableCardDemo() {
  const items = [
    {
      title: "Mecho bhoot (মেছো ভূত)",
      image:
        "https://aclisa.in/wp-content/uploads/2022/09/IMG_20180713_190737_HDR-01-1536x1536.jpeg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Gecho bhoot (গেছো ভূত)",
      image:
        "https://aclisa.in/wp-content/uploads/2022/09/NIGHT-SLEEP-1536x1536.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Shakhchunni (শাঁখচুন্নি)",
      image:
        "https://aclisa.in/wp-content/uploads/2022/09/Manisha-Illustration-1-947x1024.jpg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Bhramadaitya (ব্রহ্মদৈত্য)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Folk-tales_of_bengal%2C_illustration_by_W._Goble_1912.jpg/500px-Folk-tales_of_bengal%2C_illustration_by_W._Goble_1912.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Mamdo bhoot (মামদো ভূত)",
      image:
        "https://aclisa.in/wp-content/uploads/2022/09/IMG_20180709_184351_HDR-01-1022x1024.jpeg",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Petni (পেত্নী)",
      image:
        "https://aclisa.in/wp-content/uploads/2022/09/Gobar-jal-1-1024x1024.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Aleya (আলেয়া)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Will-o-the-wisp_and_snake_by_Hermann_Hendrich_1823.jpg/960px-Will-o-the-wisp_and_snake_by_Hermann_Hendrich_1823.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer
      className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <div
        className="absolute top-1/2 mx-auto max-w-sm text-slate-500 -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">

        <LinkPreviewDemo></LinkPreviewDemo>
      </div>
      {items.map((item,idx) => (
        <DraggableCardBody key={idx} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover" />
          <h3
            className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
