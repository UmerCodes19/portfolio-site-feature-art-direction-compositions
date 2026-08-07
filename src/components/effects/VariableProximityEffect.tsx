"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface VariableProximityEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  maxDistance?: number;
}

export function VariableProximityEffect({
  text,
  className = "",
  style,
  maxDistance = 140,
}: VariableProximityEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouch) {
      // Touch Device Strategy: Scroll velocity & viewport proximity response
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const velocity = Math.min(Math.abs(currentScrollY - lastScrollY), 50);
        lastScrollY = currentScrollY;

        letterRefs.current.forEach((el, index) => {
          if (!el) return;
          const proximity = Math.sin(Date.now() * 0.003 + index * 0.3) * 0.5 + 0.5;
          const weight = Math.round(400 + (velocity / 50 + proximity * 0.5) * 450);
          const scale = 1 + (velocity / 50 + proximity * 0.5) * 0.15;

          gsap.to(el, {
            fontWeight: weight,
            scale,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Desktop Mouse Proximity with GSAP Spring Inertia
    const handleMouseMove = (e: MouseEvent) => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);

        if (distance < maxDistance) {
          const proximity = 1 - distance / maxDistance;
          const weight = Math.min(900, Math.round(400 + proximity * 500));
          const scale = 1 + proximity * 0.22;
          const tracking = `${proximity * 0.04}em`;

          gsap.to(el, {
            fontWeight: weight,
            scale,
            letterSpacing: tracking,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            fontWeight: 400,
            scale: 1,
            letterSpacing: "0em",
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
          className="inline-block origin-bottom transition-transform will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
