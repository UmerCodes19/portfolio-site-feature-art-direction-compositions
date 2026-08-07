"use client";

import { motion } from "framer-motion";

interface WavyTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function WavyTextEffect({ text, className = "", style }: WavyTextEffectProps) {
  const characters = Array.from(text);

  return (
    <span className={`inline-block ${className}`} style={style}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
