"use client";

import { motion } from "framer-motion";

interface ElasticTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ElasticTextEffect({ text, className = "", style }: ElasticTextEffectProps) {
  const letters = Array.from(text);

  return (
    <span className={`inline-block ${className}`} style={style}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block cursor-pointer origin-bottom"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
          whileHover={{
            scaleY: [1, 1.45, 0.75, 1.15, 0.95, 1],
            scaleX: [1, 0.75, 1.25, 0.9, 1.05, 1],
            transition: { duration: 0.65, ease: "easeOut" },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
