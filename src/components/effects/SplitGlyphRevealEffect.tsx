"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitGlyphRevealEffectProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SplitGlyphRevealEffect({
  text,
  speed = 0.9,
  className = "",
  style,
}: SplitGlyphRevealEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    gsap.fromTo(
      letters,
      {
        y: 40,
        opacity: 0,
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: speed,
        stagger: 0.03,
        ease: "power3.out",
      }
    );
  }, [text, speed]);

  const characters = Array.from(text);

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={{ perspective: 1000, ...style }}>
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          className="inline-block origin-bottom will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
