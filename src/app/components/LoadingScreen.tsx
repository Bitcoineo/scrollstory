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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050708]"
        >
          <div className="flex flex-col items-center gap-6">
            <img
              src="/logo.png"
              alt="Handsteel"
              className="h-16 md:h-24 w-auto"
            />

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>

            <p className="text-sm font-mono text-white/30">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
