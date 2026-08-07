"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShimmerFadeTextRotatorProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ShimmerFadeTextRotator({
  words = ["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"],
  duration = 3200,
  className = "",
  style,
}: ShimmerFadeTextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className={`inline-block relative overflow-hidden h-[1.2em] leading-none ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, filter: "blur(14px)", y: 15, scale: 0.95 }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            filter: "blur(14px)",
            y: -15,
            scale: 1.05,
            transition: { duration: 0.45, ease: "easeIn" },
          }}
          className="inline-block relative whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-500 bg-[length:200%_auto] animate-shimmer"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
