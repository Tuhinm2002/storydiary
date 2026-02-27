"use client";
import React, { useState, useEffect } from "react";
import { IconBrandGithub, IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

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

export default function SidebarDemo() {
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-800">

      {/* ========== DESKTOP SIDEBAR ========== */}
      <motion.aside
        onHoverStart={() => setSidebarHovered(true)}
        onHoverEnd={() => setSidebarHovered(false)}
        animate={{ width: sidebarHovered ? EXPANDED : COLLAPSED }}
        transition={SPRING}
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-40 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden"
      >
        <div className="flex items-center h-14 px-3 shrink-0">
          <LogoIcon />
          <motion.span
            animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
            transition={{ duration: 0.16 }}
            className="ml-3 font-semibold whitespace-nowrap text-black dark:text-white"
          >
            StoryDiary
          </motion.span>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-2">
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} className="flex items-center gap-3 rounded-lg px-2 py-2.5 overflow-hidden hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
              <span className="shrink-0">{link.icon}</span>
              <motion.span
                animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
                transition={{ duration: 0.16, delay: sidebarHovered ? 0.04 + 0.04 * idx : 0 }}
                className="text-sm font-medium whitespace-nowrap text-neutral-700 dark:text-neutral-200"
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
              className="fixed inset-y-0 left-0 z-50 md:hidden flex flex-col w-72 max-w-[80vw] bg-white dark:bg-neutral-900 shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close sidebar" className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                  <IconX className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-2 px-4">
                {links.map((link, idx) => (
                  <Link key={idx} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700 transition">
                    {link.icon}
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{link.label}</span>
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
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 shadow">
          <LogoIcon />
          <button onClick={() => setMobileOpen(true)} aria-label="Open sidebar" className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
            <IconMenu2 className="h-6 w-6" />
          </button>
        </header>

        <Dashboard />
      </motion.div>
    </div>
  );
}

/* ================= LOGOS ================= */

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-nowrap">
      StoryDiary
    </motion.span>
  </div>
);

const LogoIcon = () => (
  <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
);

/* ================= DASHBOARD ================= */

const Dashboard = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get(`https://storydiarybackend.vercel.app/api/stories/${id}`)
      .then((response) => setContent(response.data.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!content) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 min-h-screen">
        Loading content...
      </div>
    );
  }

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
        <section key={index} className="min-h-screen flex items-center px-4 sm:px-6 py-20">
          <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
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
