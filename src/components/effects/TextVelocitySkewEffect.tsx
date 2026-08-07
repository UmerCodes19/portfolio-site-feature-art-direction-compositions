"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextVelocitySkewEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TextVelocitySkewEffect({ text, className = "", style }: TextVelocitySkewEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const skew = Math.max(-12, Math.min(12, delta * 0.25));

      gsap.to(el, {
        skewX: skew,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-block will-change-transform ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}
