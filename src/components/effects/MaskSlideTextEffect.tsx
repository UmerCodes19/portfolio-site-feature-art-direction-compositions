"use client";

import { motion } from "framer-motion";

interface MaskSlideTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MaskSlideTextEffect({ text, className = "", style }: MaskSlideTextEffectProps) {
  return (
    <span className="inline-block overflow-hidden py-1">
      <motion.span
        key={text}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-block ${className}`}
        style={style}
      >
        {text}
      </motion.span>
    </span>
  );
}
