"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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

const numberFormatter = new Intl.NumberFormat();

function CountUpValue({ value, animate }: { value: string; animate: boolean }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!animate) return;

    const numMatch = value.match(/[\d,]+/);
    if (!numMatch) {
      setDisplay(value);
      return;
    }

    const target = parseInt(numMatch[0].replace(/,/g, ""), 10);
    const prefix = value.slice(0, value.indexOf(numMatch[0]));
    const suffix = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(prefix + numberFormatter.format(Math.round(target * eased)) + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, value]);

  return <span>{display}</span>;
}

export default function SpecsComparison() {
  const tableRef = useRef<HTMLDivElement>(null);
  const tableInView = useInView(tableRef, { once: true });

  return (
    <section className="px-6 md:px-16 lg:px-24 py-10 md:py-14" aria-label="Specifications">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90">
          The Numbers Speak.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/50 max-w-xl mx-auto">
          How Handsteel X compares to the competition.
        </p>
      </motion.div>

      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl mx-auto overflow-x-auto"
      >
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 pb-4 mb-2">
            <div className="text-sm text-white/30 uppercase tracking-widest">
              Spec
            </div>
            <div className="text-sm font-bold text-accent uppercase tracking-widest text-center neon-text-subtle">
              Handsteel X
            </div>
            <div className="text-sm text-white/30 uppercase tracking-widest text-center">
              Competitor A
            </div>
            <div className="text-sm text-white/30 uppercase tracking-widest text-center">
              Competitor B
            </div>
          </div>

          <div className="neon-line mb-2" />

          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="text-sm text-white/50">{spec.label}</div>
                <div className="text-center">
                  <span className="text-lg font-bold text-white/90">
                    <CountUpValue value={spec.handsteel} animate={tableInView} />
                  </span>
                </div>
                <div className="text-center text-sm text-white/30">
                  {spec.compA}
                </div>
                <div className="text-center text-sm text-white/30">
                  {spec.compB}
                </div>
              </div>
              <div className="neon-line opacity-30" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
