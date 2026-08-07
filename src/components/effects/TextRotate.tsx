"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random";
  style?: React.CSSProperties;
}

export function TextRotate({
  texts = ["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"],
  rotationInterval = 2800,
  mainClassName = "",
  staggerDuration = 0.025,
  staggerFrom = "first",
  style,
}: TextRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  const currentText = texts[index] || texts[0] || "";
  const characters = Array.from(currentText);

  return (
    <span className={cn("inline-flex overflow-hidden relative leading-none select-none", mainClassName)} style={style}>
      <AnimatePresence mode="wait">
        <motion.span key={index} className="inline-flex flex-wrap">
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                delay: i * staggerDuration,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextRotate;
