"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface ScrollTextProps {
  scrollProgress: MotionValue<number>;
  enterAt: number;
  exitAt: number;
  position: "left" | "center" | "right";
  children: React.ReactNode;
}

export default function ScrollText({
  scrollProgress,
  enterAt,
  exitAt,
  position,
  children,
}: ScrollTextProps) {
  const midpoint = (enterAt + exitAt) / 2;
  const fadeInEnd = enterAt + (midpoint - enterAt) * 0.4;
  const fadeOutStart = midpoint + (exitAt - midpoint) * 0.6;

  const opacity = useTransform(
    scrollProgress,
    [enterAt, fadeInEnd, fadeOutStart, exitAt],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [enterAt, fadeInEnd, fadeOutStart, exitAt],
    [30, 0, 0, -20]
  );

  const positionClasses = {
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    center: "items-center text-center",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${positionClasses[position]} pointer-events-none z-10`}
    >
      {children}
    </motion.div>
  );
}
