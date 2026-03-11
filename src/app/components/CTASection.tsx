"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
          Own the Edge.
        </h2>
        <p className="mt-6 text-lg text-white/50">
          Ships Q3 2025. Free worldwide shipping.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          {/* Glowing button */}
          <button className="group relative px-12 py-4 rounded-full bg-cyan-500 text-black font-semibold text-lg tracking-tight transition-all duration-300 hover:bg-cyan-400 hover:scale-105 active:scale-100">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-40 blur-xl transition-all duration-300 group-hover:opacity-60 group-hover:blur-2xl" />
            <span className="relative">Pre-order Now — $149</span>
          </button>

          <p className="text-sm text-white/30 mt-2">
            30-day money-back guarantee. No questions asked.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
