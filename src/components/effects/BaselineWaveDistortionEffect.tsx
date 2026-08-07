"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BaselineWaveDistortionEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BaselineWaveDistortionEffect({ text, className = "", style }: BaselineWaveDistortionEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    const tween = gsap.to(letters, {
      y: -14,
      duration: 1.2,
      stagger: {
        each: 0.08,
        repeat: -1,
        yoyo: true,
      },
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [text]);

  const characters = Array.from(text);

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={style}>
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
