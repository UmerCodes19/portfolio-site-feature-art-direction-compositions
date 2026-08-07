"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Circular3DRotatorEffectProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Circular3DRotatorEffect({
  words = ["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"],
  duration = 3000,
  className = "",
  style,
}: Circular3DRotatorEffectProps) {
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
          initial={{ rotateX: -90, y: "100%", opacity: 0 }}
          animate={{ rotateX: 0, y: "0%", opacity: 1 }}
          exit={{ rotateX: 90, y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block origin-center whitespace-nowrap"
          style={{ transformStyle: "preserve-3d" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
