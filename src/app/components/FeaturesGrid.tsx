"use client";

import { type MouseEvent } from "react";
import { motion } from "framer-motion";
import { haptics } from "../utils/haptics";
import {
  Crosshair,
  Feather,
  CircleDot,
  BatteryFull,
  Wifi,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const heroFeatures = [
  {
    icon: Crosshair,
    title: "16K DPI Sensor",
    description:
      "Sub-micron precision tracking with zero smoothing. Every movement, captured. Every flick, registered.",
  },
  {
    icon: Feather,
    title: "45g Ultralight",
    description:
      "Magnesium alloy shell — lighter than a tennis ball, stronger than aluminum. Feels like nothing.",
  },
];

const supportFeatures = [
  {
    icon: CircleDot,
    title: "Titanium Scroll Wheel",
    description: "CNC-machined titanium with magnetic detents.",
  },
  {
    icon: BatteryFull,
    title: "80hr Battery",
    description: "Quick charge gives 20hrs in 10 minutes.",
  },
  {
    icon: Wifi,
    title: "Wireless + USB-C",
    description: "Tri-mode: 2.4GHz, Bluetooth 5.3, wired.",
  },
  {
    icon: Sparkles,
    title: "RGB Underglow",
    description: "16.8M color zone lighting with per-key sync.",
  },
];

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function HeroCard({
  feature,
  index,
}: {
  feature: { icon: LucideIcon; title: string; description: string };
  index: number;
}) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(var(--accent-rgb),0.07), transparent 60%)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.05] hover:-translate-y-1"
      onTouchStart={() => haptics.light()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <feature.icon
        className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-4 sm:mb-6 animate-icon-pulse transition-transform duration-300 group-hover:scale-110 group-hover:neon-text"
        strokeWidth={1.5}
        style={{ animationDelay: `${index * 0.7}s` }}
      />
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white/90 mb-3 sm:mb-4">
        {feature.title}
      </h3>
      <p className="text-base sm:text-lg text-white/50 max-w-sm">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  return (
    <section className="px-4 sm:px-6 md:px-16 lg:px-24 py-10 md:py-14" aria-label="Features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white/90">
          Built Different.
        </h2>
        <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto">
          Six innovations that redefine what a mouse can be.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-4 sm:mb-6">
        {heroFeatures.map((feature, i) => (
          <HeroCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {supportFeatures.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
            onTouchStart={() => haptics.light()}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.04] hover:-translate-y-0.5"
          >
            <feature.icon
              className="w-6 h-6 text-accent mb-3 sm:mb-4 animate-icon-pulse"
              strokeWidth={1.5}
              style={{ animationDelay: `${(i + 2) * 0.5}s` }}
            />
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white/90 mb-1.5 sm:mb-2">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-white/30">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
