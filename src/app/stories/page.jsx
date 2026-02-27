"use client";
import React, { useState, useEffect } from "react";
import { IconBrandGithub, IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";

const COLLAPSED = 56;
const EXPANDED = 224;
const SPRING = { type: "spring", stiffness: 300, damping: 30 };

/**
 * Returns true/false once mounted on the client, undefined during SSR.
 * Initializing as undefined ensures the server and first client render both
 * produce marginLeft:0, eliminating the hydration mismatch.
 */
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

  // undefined = not yet mounted (SSR) → 0 to match server output
  const contentMargin =
    isDesktop === undefined ? 0 : isDesktop ? (sidebarHovered ? EXPANDED : COLLAPSED) : 0;

  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5 shrink-0" /> },
    { label: "GitHub", href: "https://github.com/Tuhinm2002/storydiary/tree/main", icon: <IconBrandGithub className="h-5 w-5 shrink-0" /> },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">

      {/* ========== DESKTOP SIDEBAR ========== */}
      <motion.aside
        onHoverStart={() => setSidebarHovered(true)}
        onHoverEnd={() => setSidebarHovered(false)}
        animate={{ width: sidebarHovered ? EXPANDED : COLLAPSED }}
        transition={SPRING}
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-40 bg-white dark:bg-neutral-800 shadow-lg overflow-hidden"
      >
        <div className="flex items-center h-14 px-3 shrink-0">
          <LogoIcon />
          <motion.span
            animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
            transition={{ duration: 0.16 }}
            className="ml-3 font-medium whitespace-nowrap text-black dark:text-white"
          >
            StoryDiary
          </motion.span>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-2">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 overflow-hidden hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <span className="shrink-0">{link.icon}</span>
              <motion.span
                animate={{ opacity: sidebarHovered ? 1 : 0, x: sidebarHovered ? 0 : -10 }}
                transition={{ duration: 0.16, delay: sidebarHovered ? 0.04 + 0.04 * idx : 0 }}
                className="text-sm font-medium whitespace-nowrap"
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
              className="fixed inset-y-0 left-0 z-50 md:hidden flex flex-col w-72 max-w-[80vw] bg-white dark:bg-neutral-800 shadow-xl"
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
                    <span className="text-sm font-medium">{link.label}</span>
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
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 shadow">
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
    <div className="h-6 w-6 rounded-lg bg-black dark:bg-white shrink-0" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" text-black dark:text-white">
      StoryDiary
    </motion.span>
  </div>
);

const LogoIcon = () => (
  <div className="h-6 w-6 rounded-lg bg-black dark:bg-white shrink-0" />
);

/* ================= DASHBOARD ================= */

const Dashboard = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://storydiarybackend.vercel.app/api/stories")
      .then((res) => { setContent(res.data.data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] text-gray-500 text-sm">
        Loading content...
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {content.map((item) => (
            <Link key={item.contentId} href={`/stories/${item.contentId}`} className="block">
              <CometCard>
                <div className="flex flex-col bg-[#1F2121] rounded-2xl p-2 sm:p-3 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-2xl">
                    <img src={item.image[0]} alt={item.title[0]} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-start justify-between gap-2 text-white font-mono uppercase tracking-wide">
                    <span className="text-[10px] sm:text-xs leading-tight line-clamp-2">{item.title[0]}</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap shrink-0">#{item.contentId}</span>
                  </div>
                </div>
              </CometCard>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
