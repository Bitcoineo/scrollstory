"use client";

import { motion } from "framer-motion";

const specs = [
  { label: "Weight", handsteel: "45g", compA: "63g", compB: "58g" },
  { label: "Sensor", handsteel: "16,000 DPI", compA: "12,000 DPI", compB: "8,000 DPI" },
  { label: "Battery", handsteel: "80 hrs", compA: "60 hrs", compB: "50 hrs" },
  { label: "Polling Rate", handsteel: "8,000 Hz", compA: "4,000 Hz", compB: "1,000 Hz" },
  { label: "Switches", handsteel: "Optical", compA: "Mechanical", compB: "Mechanical" },
  { label: "Connectivity", handsteel: "Tri-mode", compA: "Dual-mode", compB: "Wireless" },
  { label: "Shell Material", handsteel: "Magnesium", compA: "Plastic", compB: "Plastic" },
  { label: "Price", handsteel: "$149", compA: "$159", compB: "$129" },
];

export default function SpecsComparison() {
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
          The Numbers Speak.
        </h2>
        <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
          How Handsteel X compares to the competition.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl mx-auto overflow-x-auto"
      >
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 pb-4 mb-2 border-b border-white/10">
            <div className="text-sm text-white/30 uppercase tracking-widest">
              Spec
            </div>
            <div className="text-sm font-semibold text-cyan-400 uppercase tracking-widest text-center">
              Handsteel X
            </div>
            <div className="text-sm text-white/30 uppercase tracking-widest text-center">
              Competitor A
            </div>
            <div className="text-sm text-white/30 uppercase tracking-widest text-center">
              Competitor B
            </div>
          </div>

          {/* Rows */}
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.05,
              }}
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-4 py-4 border-b border-white/5 items-center"
            >
              <div className="text-sm text-white/60">{spec.label}</div>
              <div className="text-center">
                <span className="text-base font-semibold text-white/90">
                  {spec.handsteel}
                </span>
              </div>
              <div className="text-center text-sm text-white/40">
                {spec.compA}
              </div>
              <div className="text-center text-sm text-white/40">
                {spec.compB}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
