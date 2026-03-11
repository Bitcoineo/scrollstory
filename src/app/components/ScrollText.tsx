"use client";

import React from "react";
import { MotionValue, useTransform, motion } from "framer-motion";

const positionClasses = {
  left: "items-start text-left pl-5 sm:pl-8 md:pl-16 lg:pl-24",
  center: "items-center text-center",
  right: "items-end text-right pr-5 sm:pr-8 md:pr-16 lg:pr-24",
} as const;

interface ScrollTextProps {
  scrollProgress: MotionValue<number>;
  enterAt: number;
  exitAt: number;
  position: keyof typeof positionClasses;
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
    [15, 0, 0, -10]
  );

  const staggerOffset = 0.012;
  const yStagger = useTransform(
    scrollProgress,
    [enterAt + staggerOffset, fadeInEnd + staggerOffset, fadeOutStart, exitAt],
    [20, 0, 0, -10]
  );
  const opacityStagger = useTransform(
    scrollProgress,
    [enterAt + staggerOffset, fadeInEnd + staggerOffset, fadeOutStart, exitAt],
    [0, 1, 1, 0]
  );

  const childArray = React.Children.toArray(children);

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute inset-0 flex flex-col justify-center ${positionClasses[position]} pointer-events-none z-10`}
    >
      {childArray[0] && (
        <motion.div style={{ y }} className="neon-text animate-neon-flicker">
          {childArray[0]}
        </motion.div>
      )}

      {childArray.slice(1).map((child, i) => (
        <motion.div key={i} style={{ y: yStagger, opacity: opacityStagger }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
