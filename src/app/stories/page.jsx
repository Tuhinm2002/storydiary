"use client";
import React, { useState,useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
  IconHome
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CometCard } from "@/components/ui/comet-card";
import axios from "axios";
import Link from "next/link";




export default function SidebarDemo() {



  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
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
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {

  const [content,setContent] = useState([]);

  useEffect(() => {
  axios.get("http://127.0.0.1:5000/api/stories")
    .then((response) => {
      setContent(response.data.data);
    })
    .catch((error) => console.log(error));
}, []);

  console.log(content)

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((contents) => (
            <Link
              key={contents.contentId}
              href={`/stories/${contents.contentId}`} // dynamic route
              className="block"
            >
              <CometCard>
                <button
                  type="button"
                  className="flex w-full cursor-pointer flex-col rounded-[16px] bg-[#1F2121] p-3 md:p-4"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex-1">
                    <div className="relative aspect-[3/4] w-full">
                      <img
                        loading="lazy"
                        className="absolute inset-0 h-full w-full rounded-[16px] bg-black object-cover contrast-75"
                        alt={contents.title[0]}
                        src={contents.image[0]}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between p-2 font-mono text-white">
                    <div className="text-xs uppercase tracking-wider">
                      {contents.title[0]}
                    </div>
                    <div className="text-xs text-gray-400 opacity-70">
                      #{contents.contentId }
                    </div>
                  </div>
                </button>
              </CometCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
