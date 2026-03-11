"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { haptics } from "../utils/haptics";

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

export default function LoadingScreen({
  progress,
  isComplete,
}: LoadingScreenProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (isComplete && !firedRef.current) {
      firedRef.current = true;
      haptics.success();
    }
  }, [isComplete]);
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
              className="h-10 sm:h-14 md:h-16 lg:h-24 w-auto"
            />

            <div className="w-32 sm:w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>

            <p className="text-xs sm:text-sm font-mono text-white/30">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
