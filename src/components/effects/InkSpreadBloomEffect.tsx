"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface InkSpreadBloomEffectProps {
  text: string;
  bloomColor?: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function InkSpreadBloomEffect({
  text,
  bloomColor = "#0A0A0A",
  speed = 1.2,
  className = "",
  style,
}: InkSpreadBloomEffectProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        filter: "blur(18px) contrast(200%)",
        opacity: 0,
        letterSpacing: "0.08em",
      },
      {
        filter: "blur(0px) contrast(100%)",
        opacity: 1,
        letterSpacing: "-0.02em",
        duration: speed,
        ease: "power3.out",
      }
    );
  }, [text, speed]);

  return (
    <span
      ref={textRef}
      className={`inline-block will-change-transform ${className}`}
      style={{
        color: bloomColor,
        ...style,
      }}
    >
      {text}
    </span>
  );
}
