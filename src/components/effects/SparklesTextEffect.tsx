"use client";

import { motion } from "framer-motion";

interface SparklesTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const SPARKLES = [
  { top: "-10%", left: "10%", delay: 0 },
  { top: "20%", left: "85%", delay: 0.4 },
  { top: "75%", left: "25%", delay: 0.8 },
  { top: "80%", left: "70%", delay: 1.2 },
  { top: "-5%", left: "50%", delay: 1.6 },
];

export function SparklesTextEffect({ text, className = "", style }: SparklesTextEffectProps) {
  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {text}
      {SPARKLES.map((sparkle, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-500 pointer-events-none select-none text-base md:text-2xl"
          style={{ top: sparkle.top, left: sparkle.left }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </span>
  );
}
