"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DualToneGlareEffectProps {
  text: string;
  glareColor?: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function DualToneGlareEffect({
  text,
  glareColor = "#71717A",
  speed = 4,
  className = "",
  style,
}: DualToneGlareEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      backgroundPosition: "200% center",
      duration: speed,
      repeat: -1,
      ease: "none",
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <span
      ref={containerRef}
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, #0A0A0A 0%, ${glareColor} 50%, #0A0A0A 100%)`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {text}
    </span>
  );
}
