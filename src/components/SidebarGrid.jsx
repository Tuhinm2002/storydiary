"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandGithub,IconHome
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { DitherShaderDemoDuotone } from "@/components/DitherShader";
import { DraggableCardDemo } from "./DragCardDemo";
import LampDemo from "./lamp-demo";
import StoryHeadingDemo from "./StoryHeading";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    {
      label: "GitHub",
      href: "https://github.com/Tuhinm2002/storydiary/tree/main",
      icon: (
        <IconBrandGithub className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  if (!mounted) return null; // Prevent hydration shift

  return (
    <div className={cn("flex w-full h-screen overflow-hidden")}>
      <Sidebar
        open={open}
        setOpen={setOpen}
        className="bg-white border-r border-neutral-200"
      >
        <SidebarBody className="bg-white justify-between gap-10 text-black">
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

/* ---------------- Logo ---------------- */

export const Logo = () => {
  return (
    <a
      href="/"
      className="flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black" />
      <span className="font-medium whitespace-pre">
        StoryDiary
      </span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black" />
    </a>
  );
};

/* ---------------- Dashboard ---------------- */

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <main className="flex-1 bg-neutral-100 min-h-screen relative overflow-x-hidden w-full text-white">
        <LampDemo />
        <DitherShaderDemoDuotone />

        <div className="w-full mt-48">
          <StoryHeadingDemo />
          <DraggableCardDemo />
        </div>
      </main>
    </div>
  );
};