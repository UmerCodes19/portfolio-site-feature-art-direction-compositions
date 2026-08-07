"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PulsatingLightRotatorEffectProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PulsatingLightRotatorEffect({
  words = ["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"],
  duration = 4000,
  className = "",
  style,
}: PulsatingLightRotatorEffectProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className={`inline-block relative overflow-visible h-[1.2em] leading-none ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{
            opacity: 0,
            filter: "brightness(0%) blur(16px)",
            scale: 0.98,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            filter: [
              "brightness(0%) blur(16px)",
              "brightness(220%) blur(0px)",
              "brightness(150%) blur(0px)",
              "brightness(0%) blur(16px)",
            ],
            scale: [0.98, 1, 1, 1.02],
            transition: {
              duration: duration / 1000,
              times: [0, 0.25, 0.75, 1],
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
            filter: "brightness(0%) blur(16px)",
            scale: 1.02,
          }}
          className="inline-block relative whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-400 bg-[length:200%_auto] animate-shimmer drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
