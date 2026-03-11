"use client";

import { motion } from "framer-motion";
import { haptics } from "../utils/haptics";

const testimonials = [
  {
    quote:
      "The Handsteel X is the first mouse that actually disappears in my hand. 45 grams of pure instinct.",
    name: "KIRA",
    title: "Pro Player, Sentinel Esports",
    team: "Valorant World Champion 2025",
  },
  {
    quote:
      "I switched mid-tournament and hit my highest accuracy ever. The sensor tracks thoughts, not just movement.",
    name: "PHANTOM",
    title: "IGL, Nova Gaming",
    team: "CS2 Major Finalist",
  },
  {
    quote:
      "80 hours battery and tri-mode wireless — I haven't plugged in once. This is the endgame mouse.",
    name: "ZARA",
    title: "Streamer & Content Creator",
    team: "12M followers across platforms",
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 sm:px-6 md:px-16 lg:px-24 py-10 md:py-14" aria-label="Reviews">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white/90">
          Trusted by Pros.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.15,
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div
              onTouchStart={() => haptics.light()}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 md:p-8 flex flex-col justify-between animate-float transition-all duration-300 hover:-translate-y-2 hover:border-accent/30"
              style={{ animationDelay: `${i * 1}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none transition-all duration-300 group-hover:from-accent/[0.05]" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none neon-border" />

              <span className="text-3xl sm:text-4xl text-accent/30 font-bold leading-none mb-2 relative transition-all duration-300 group-hover:text-accent/50 group-hover:neon-text-subtle">
                &ldquo;
              </span>

              <p className="text-base sm:text-lg leading-relaxed text-white/50 mb-6 sm:mb-8 relative">
                {t.quote}&rdquo;
              </p>

              <div className="relative">
                <p className="text-sm font-bold text-white/90 tracking-wide transition-all duration-300 group-hover:text-accent">
                  {t.name}
                </p>
                <p className="text-xs sm:text-sm text-accent mt-1">{t.title}</p>
                <p className="text-xs sm:text-sm text-white/30 mt-0.5">{t.team}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
