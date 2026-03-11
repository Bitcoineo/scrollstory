"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { haptics } from "../utils/haptics";

const SCROLL_THRESHOLD = 0.3;

export default function StickyNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > window.innerHeight * SCROLL_THRESHOLD;
    if (next !== scrolledRef.current) {
      scrolledRef.current = next;
      setScrolled(next);
    }
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24"
      aria-label="Main navigation"
    >
      <img
        src="/logo.png"
        alt="Handsteel"
        className={`h-10 sm:h-14 md:h-24 w-auto transition-all duration-500 ${
          scrolled ? "drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]" : ""
        }`}
      />

      <a
        href="#preorder"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth" });
        }}
        onTouchStart={() => haptics.medium()}
        className={`px-3 py-1 sm:px-5 sm:py-1.5 rounded-full bg-accent text-black text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 hover:bg-accent-hover hover:scale-105 active:scale-100 ${
          scrolled ? "neon-border hover:neon-border-intense" : ""
        }`}
      >
        Pre-order — $149
      </a>
    </nav>
  );
}
