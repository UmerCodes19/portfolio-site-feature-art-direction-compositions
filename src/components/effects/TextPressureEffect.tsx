"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TextPressureEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TextPressureEffect({ text, className = "", style }: TextPressureEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const characters = Array.from(text);

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={style}>
      {characters.map((char, i) => {
        let weight = 400;
        let scaleY = 1;
        let letterSpacing = "0em";

        const charEl = charRefs.current[i];
        if (charEl) {
          const rect = charEl.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dist = Math.hypot(mousePos.x - charCenterX, mousePos.y - charCenterY);
          const maxDist = 140;

          if (dist < maxDist) {
            const pressure = 1 - dist / maxDist;
            weight = Math.min(900, Math.round(400 + pressure * 500));
            scaleY = 1 + pressure * 0.3;
            letterSpacing = `${pressure * 0.08}em`;
          }
        }

        return (
          <motion.span
            key={`${char}-${i}`}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            animate={{
              fontWeight: weight,
              scaleY: scaleY,
              letterSpacing: letterSpacing,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="inline-block origin-bottom transition-all"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
}
