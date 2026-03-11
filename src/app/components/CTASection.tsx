"use client";

import { motion } from "framer-motion";
import { haptics } from "../utils/haptics";

const particles = [
  { left: "15%", top: "25%", size: 2, delay: "0s" },
  { left: "82%", top: "20%", size: 3, delay: "0.8s", hideOnMobile: true },
  { left: "25%", top: "70%", size: 2, delay: "1.5s" },
  { left: "75%", top: "75%", size: 3, delay: "0.3s", hideOnMobile: true },
  { left: "40%", top: "15%", size: 2, delay: "2s" },
  { left: "60%", top: "80%", size: 2, delay: "1.2s", hideOnMobile: true },
  { left: "90%", top: "45%", size: 3, delay: "0.5s" },
  { left: "10%", top: "55%", size: 2, delay: "1.8s", hideOnMobile: true },
];

export default function CTASection() {
  return (
    <section
      id="preorder"
      className="relative px-4 sm:px-6 md:px-16 lg:px-24 py-10 md:py-14 overflow-hidden"
      aria-label="Pre-order"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-accent pointer-events-none animate-drift ${p.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-2xl mx-auto relative"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white/90 neon-text animate-neon-pulse">
          Own the Edge.
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/50">
          Coming soon. Free worldwide shipping.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4"
        >
          <div className="relative">
            {[0, 1, 2].map((ring) => (
              <div
                key={ring}
                className="absolute inset-0 rounded-full border border-accent/30 pointer-events-none animate-ring-pulse"
                style={{ animationDelay: `${ring * 0.8}s` }}
                aria-hidden="true"
              />
            ))}

            <div
              className="absolute inset-0 rounded-full bg-accent animate-pulse-glow blur-xl pointer-events-none"
              aria-hidden="true"
            />

            <a
              href="#"
              role="button"
              aria-label="Pre-order Handsteel X for $149"
              onTouchStart={() => haptics.heavy()}
              className="relative group px-8 py-3 sm:px-12 sm:py-4 rounded-full bg-accent text-black font-bold text-base sm:text-lg tracking-tight transition-all duration-300 hover:bg-accent-hover hover:scale-105 active:scale-100 neon-border hover:neon-border-intense inline-block"
            >
              Pre-order Now — $149
            </a>
          </div>

          <p className="text-xs sm:text-sm text-white/30 mt-3 sm:mt-4">
            30-day money-back guarantee. No questions asked.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
