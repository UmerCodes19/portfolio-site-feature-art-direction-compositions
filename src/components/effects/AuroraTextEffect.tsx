"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AuroraTextEffectProps {
  text: string;
  primaryColor?: string;
  shimmerColor?: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AuroraTextEffect({
  text,
  primaryColor = "#0A0A0A",
  shimmerColor = "#E4E4E7",
  speed = 8,
  className = "",
  style,
}: AuroraTextEffectProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
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
      ref={textRef}
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${primaryColor} 0%, #3F3F46 25%, ${shimmerColor} 50%, #3F3F46 75%, ${primaryColor} 100%)`,
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
