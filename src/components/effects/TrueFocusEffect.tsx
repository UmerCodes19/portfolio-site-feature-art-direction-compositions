"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TrueFocusEffect({ text, className = "", style }: TrueFocusEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-4 ${className}`} style={style}>
      {words.map((word, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <motion.span
            key={`${word}-${i}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
              opacity: isOtherHovered ? 0.35 : 1,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative cursor-pointer inline-block"
          >
            {word}
            {isHovered && (
              <motion.span
                layoutId="focus-box"
                className="absolute -inset-x-3 -inset-y-1 rounded-lg border border-black/80 bg-black/5 pointer-events-none"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.span>
        );
      })}
    </span>
  );
}
