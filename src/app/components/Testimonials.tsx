"use client";

import { motion } from "framer-motion";

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
    <section className="px-6 md:px-16 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white/90">
          Trusted by Pros.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.15,
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between"
          >
            {/* Glassmorphism highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            <p className="text-base leading-relaxed text-white/70 mb-8 relative">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="relative">
              <p className="text-sm font-semibold text-white/90 tracking-wide">
                {t.name}
              </p>
              <p className="text-xs text-cyan-400/80 mt-1">{t.title}</p>
              <p className="text-xs text-white/30 mt-0.5">{t.team}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
