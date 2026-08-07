"use client";

import { motion, Variants } from "framer-motion";

interface BlurTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function BlurTextEffect({ text, className = "", style, delay = 0.05 }: BlurTextEffectProps) {
  const characters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      transform: "translateY(15px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={charVariants}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
