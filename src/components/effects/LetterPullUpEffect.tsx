"use client";

import { motion, Variants } from "framer-motion";

interface LetterPullUpEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LetterPullUpEffect({ text, className = "", style }: LetterPullUpEffectProps) {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      key={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
