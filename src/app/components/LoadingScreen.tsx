"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

export default function LoadingScreen({
  progress,
  isComplete,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]"
        >
          <div className="text-center">
            <p className="text-6xl font-bold tracking-tighter text-white/40">
              {progress}%
            </p>
            <p className="mt-4 text-sm tracking-widest uppercase text-white/20">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
