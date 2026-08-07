"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SubtleMagnetRepulsionEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  maxDistance?: number;
}

export function SubtleMagnetRepulsionEffect({
  text,
  className = "",
  style,
  maxDistance = 160,
}: SubtleMagnetRepulsionEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const power = (1 - dist / maxDistance) * 24;
          const angle = Math.atan2(dy, dx);
          const pushX = -Math.cos(angle) * power;
          const pushY = -Math.sin(angle) * power;

          gsap.to(el, {
            x: pushX,
            y: pushY,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxDistance]);

  const characters = Array.from(text);

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={style}>
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          className="inline-block will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
