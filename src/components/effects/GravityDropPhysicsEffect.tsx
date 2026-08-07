"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface GravityDropPhysicsEffectProps {
  text: string;
  bounceStiffness?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function GravityDropPhysicsEffect({
  text,
  bounceStiffness = 1.6,
  speed = 0.8,
  className = "",
  style,
}: GravityDropPhysicsEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    gsap.fromTo(
      letters,
      {
        y: -60,
        opacity: 0,
        scaleY: 1.3,
      },
      {
        y: 0,
        opacity: 1,
        scaleY: 1,
        duration: speed,
        stagger: 0.04,
        ease: `bounce.out`,
      }
    );
  }, [text, speed, bounceStiffness]);

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
