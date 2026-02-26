"use client";
import React, { useState,useEffect,useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";




export default function SidebarDemo() {



  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
          label: "Stories",
          href: "/stories",
          icon: (
            <Image
              src="/ghost.svg"
              alt="Stories"
              width={20}
              height={20}
              className="shrink-0"
            />
          ),
        },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full h-screen overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="bg-white justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
      
    </div>
    
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        StoryDiary
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/stories/${id}`)
      .then((response) => setContent(response.data.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!content) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 h-screen">
        Loading content...
      </div>
    );
  }

  // Safe access arrays
  const titlesEng = content.title || [];
  const titlesBeng = content.titleBeng || [];
  const images = content.image || [];
  const contentEng = content.contentEng || [];
  const contentBeng = content.contentBeng || [];

  return (
     <div className="flex-1 overflow-y-auto bg-neutral-100 text-neutral-800">
    {/* Hero Section */}
    {titlesEng.length > 0 && contentEng.length > 0 && (
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-atma">
          {titlesEng[0]} / {titlesBeng[0] || ""}
        </h1>
        <p className="max-w-2xl text-neutral-400 text-lg md:text-xl">
          {contentEng[0]}
        </p>
      </section>
    )}

    {/* Content Sections */}
    {contentEng.map((section, index) => (
      <section
        key={index}
        className="min-h-screen flex items-center px-6 py-20"
      >
        <div
          className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {images[index] && (
            <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
              <img
                src={images[index]}
                alt={titlesEng[index] || `Section ${index + 1}`}
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            <span className="inline-block px-4 py-1 text-sm font-semibold bg-white/10 rounded-full">
              Section {index + 1}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              {titlesEng[index] || ""}
            </h2>
            <div className="text-neutral-800 space-y-4 text-lg leading-relaxed">
              <p>{section}</p>
              {contentBeng[index] && (
                <p className="italic text-gray-600">{contentBeng[index]}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    ))}

    {/* Footer */}
    <footer className="py-16 text-center text-neutral-500">
      © 2026 StoryDiary All rights reserved.
    </footer>
  </div>
  );
};