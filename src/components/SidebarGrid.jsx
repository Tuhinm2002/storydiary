"use client";
import React, { useState, useEffect } from "react";
import { IconBrandGithub, IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { DitherShaderDemoDuotone } from "@/components/DitherShader";
import { DraggableCardDemo } from "./DragCardDemo";
import LampDemo from "./lamp-demo";
import StoryHeadingDemo from "./StoryHeading";

const COLLAPSED = 56;
const EXPANDED = 224;
const SPRING = { type: "spring", stiffness: 300, damping: 30 };

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(undefined);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export function SidebarDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isDesktop = useIsDesktop();

  const contentMargin =
    isDesktop === undefined ? 0 : isDesktop ? (sidebarHovered ? EXPANDED : COLLAPSED) : 0;

  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Stories", href: "/stories", icon: <Image src="/ghost.svg" alt="Stories" width={20} height={20} className="shrink-0" /> },
    { label: "GitHub", href: "https://github.com/Tuhinm2002/storydiary/tree/main", icon: <IconBrandGithub className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen">

      {/* ========== DESKTOP SIDEBAR ========== */}
      <motion.aside
        onHoverStart={() => setSidebarHovered(true)}
        onHoverEnd={() => setSidebarHovered(false)}
        animate={{ width: sidebarHovered ? EXPANDED : COLLAPSED }}
        transition={SPRING}
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-40 bg-white border-r border-neutral-200 overflow-hidden"
      >
        <div className="flex items-center h-14 px-3 shrink-0">
          <LogoIcon />
          <motion.span
            animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
            transition={{ duration: 0.16 }}
            className="ml-3 font-medium whitespace-nowrap text-black"
          >
            StoryDiary
          </motion.span>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-2">
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} className="flex items-center gap-3 rounded-lg px-2 py-2.5 overflow-hidden hover:bg-gray-100 transition-colors">
              <span className="shrink-0">{link.icon}</span>
              <motion.span
                animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
                transition={{ duration: 0.16, delay: sidebarHovered ? 0.04 + 0.04 * idx : 0 }}
                className="text-sm font-medium whitespace-nowrap text-neutral-700"
              >
                {link.label}
              </motion.span>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* ========== MOBILE DRAWER ========== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={SPRING}
              className="fixed inset-y-0 left-0 z-50 md:hidden flex flex-col w-72 max-w-[80vw] bg-white border-r border-neutral-200 shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close sidebar" className="p-1 rounded-md hover:bg-gray-100 transition">
                  <IconX className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-2 px-4">
                {links.map((link, idx) => (
                  <Link key={idx} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    {link.icon}
                    <span className="text-sm font-medium text-neutral-700">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ========== MAIN CONTENT ========== */}
      <motion.div
        className="flex flex-col flex-1 min-w-0"
        animate={{ marginLeft: contentMargin }}
        transition={SPRING}
      >
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 shadow-sm">
          <LogoIcon />
          <button onClick={() => setMobileOpen(true)} aria-label="Open sidebar" className="p-1 rounded-md hover:bg-gray-100 transition">
            <IconMenu2 className="h-6 w-6" />
          </button>
        </header>

        <Dashboard />
      </motion.div>
    </div>
  );
}

/* ================= LOGOS ================= */

export const Logo = () => (
  <a href="/" className="flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black" />
    <span className="font-medium whitespace-nowrap">StoryDiary</span>
  </a>
);

export const LogoIcon = () => (
  <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black" />
);

/* ================= DASHBOARD ================= */
// StoryHeadingDemo contains LayoutTextFlip which has multiline classNames that cause
// hydration mismatches. Guarding with `mounted` ensures these components only render
// on the client, never during SSR, eliminating the mismatch entirely.

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-1">
      <main className="flex-1 bg-neutral-100 min-h-screen relative overflow-x-hidden w-full text-white">
        <LampDemo />
        <DitherShaderDemoDuotone />
        {mounted && (
          <div className="w-full mt-48">
            <StoryHeadingDemo />
            <DraggableCardDemo />
          </div>
        )}
      </main>
    </div>
  );
};
