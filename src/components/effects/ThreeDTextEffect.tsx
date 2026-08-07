"use client";

import { motion } from "framer-motion";

interface ThreeDTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ThreeDTextEffect({ text, className = "", style }: ThreeDTextEffectProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        ...style,
        textShadow:
          "1px 1px 0 #D4D4D8, 2px 2px 0 #A1A1AA, 3px 3px 0 #71717A, 4px 4px 0 #52525B, 5px 5px 12px rgba(0,0,0,0.35)",
      }}
      whileHover={{
        rotateX: 12,
        rotateY: -12,
        scale: 1.03,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      {text}
    </motion.span>
  );
}
