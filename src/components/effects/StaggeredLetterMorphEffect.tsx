"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StaggeredLetterMorphEffectProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggeredLetterMorphEffect({
  words = ["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"],
  duration = 3200,
  className = "",
  style,
}: StaggeredLetterMorphEffectProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[index];
  const characters = Array.from(currentWord);

  return (
    <span className={`inline-inline-flex items-center justify-center ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.span key={currentWord} className="inline-flex">
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              initial={{ rotateY: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 0.6 }}
              transition={{
                duration: 0.45,
                delay: i * 0.04,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="inline-block origin-center"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
