"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidMorphTextEffectProps {
  words?: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function LiquidMorphTextEffect({
  words = ["UMER QURESHI", "DESIGN & CODE", "FULL-STACK ENGINEERING", "INTERFACE DESIGN"],
  duration = 3400,
  className = "",
  style,
}: LiquidMorphTextEffectProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[index];

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {/* SVG Liquid / Molten Gooey Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="gooey-molten-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <span
        className="inline-block"
        style={{
          filter: "url(#gooey-molten-filter)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            initial={{ opacity: 0, filter: "blur(14px) contrast(200%)", scaleX: 1.25, y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px) contrast(100%)", scaleX: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(14px) contrast(200%)", scaleX: 0.75, y: -15 }}
            transition={{
              duration: 0.85,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="inline-block origin-center whitespace-nowrap"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
