"use client";

import { motion } from "framer-motion";
import {
  Crosshair,
  CircleDot,
  BatteryFull,
  Sparkles,
  Wifi,
  Feather,
} from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "16K DPI Sensor",
    description:
      "Sub-micron precision tracking with zero smoothing. Every movement, captured.",
  },
  {
    icon: CircleDot,
    title: "Titanium Scroll Wheel",
    description:
      "CNC-machined titanium with magnetic detents. Infinite scroll or tactile steps.",
  },
  {
    icon: BatteryFull,
    title: "80hr Battery",
    description:
      "Marathon sessions without the cable. Quick charge gives 20hrs in 10 minutes.",
  },
  {
    icon: Sparkles,
    title: "RGB Underglow",
    description:
      "16.8M color zone lighting with per-key sync. Subtle or bold — your call.",
  },
  {
    icon: Wifi,
    title: "Wireless + USB-C",
    description:
      "Tri-mode connectivity: 2.4GHz, Bluetooth 5.3, or wired USB-C. Zero compromise.",
  },
  {
    icon: Feather,
    title: "45g Ultralight",
    description:
      "Magnesium alloy shell. Lighter than a tennis ball, stronger than aluminum.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white/90">
          Built Different.
        </h2>
        <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
          Six innovations that redefine what a mouse can be.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.1,
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.04]"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

            <feature.icon className="w-8 h-8 text-cyan-500/80 mb-5" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold tracking-tight text-white/90 mb-3">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/50">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
