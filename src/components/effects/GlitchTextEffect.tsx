"use client";

import { motion } from "framer-motion";

interface GlitchTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GlitchTextEffect({ text, className = "", style }: GlitchTextEffectProps) {
  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {/* Main Text */}
      <span className="relative z-10">{text}</span>

      {/* Red Glitch Layer */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 text-red-500 opacity-70 pointer-events-none"
        animate={{
          x: [-2, 2, -1, 3, 0],
          y: [1, -2, 2, -1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 0.25,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>

      {/* Cyan Glitch Layer */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 text-cyan-400 opacity-70 pointer-events-none"
        animate={{
          x: [2, -2, 1, -3, 0],
          y: [-1, 2, -2, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 0.2,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
