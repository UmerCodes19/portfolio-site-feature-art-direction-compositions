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
  duration = 5500,
  className = "",
  style,
}: PulsatingLightRotatorEffectProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration, isHovered]);

  const handleNextWord = () => {
    setIndex((prev) => (prev + 1) % words.length);
  };

  const currentWord = words[index];

  return (
    <span
      onClick={handleNextWord}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to advance to next word"
      className={`inline-block relative overflow-visible h-[1.2em] leading-none cursor-pointer group transition-transform duration-300 active:scale-98 ${className}`}
      style={style}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.03,
                delayChildren: 0.05,
              },
            },
            exit: {
              opacity: 0,
              filter: "blur(10px)",
              y: -8,
              transition: { duration: 0.3, ease: "easeIn" },
            },
          }}
          className="inline-flex relative whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-white to-neutral-300 bg-[length:200%_auto] animate-shimmer"
        >
          {currentWord.split("").map((char, charIdx) => (
            <motion.span
              key={`${currentWord}-${charIdx}`}
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
