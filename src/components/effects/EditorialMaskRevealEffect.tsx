"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export type MaskShape = "diagonal" | "curved" | "radial" | "irregular";

interface EditorialMaskRevealEffectProps {
  text: string;
  maskShape?: MaskShape;
  className?: string;
  style?: React.CSSProperties;
}

export function EditorialMaskRevealEffect({
  text,
  maskShape = "diagonal",
  className = "",
  style,
}: EditorialMaskRevealEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset clip path state
    let fromClip = "polygon(0 0, 0 0, 0 100%, 0 100%)";
    let toClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    if (maskShape === "curved") {
      fromClip = "circle(0% at 50% 50%)";
      toClip = "circle(150% at 50% 50%)";
    } else if (maskShape === "radial") {
      fromClip = "ellipse(0% 0% at 50% 50%)";
      toClip = "ellipse(100% 100% at 50% 50%)";
    } else if (maskShape === "irregular") {
      fromClip = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
      toClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    } else {
      // Diagonal polygon reveal
      fromClip = "polygon(0 0, 0 0, 0 100%, 0 100%)";
      toClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }

    gsap.fromTo(
      el,
      { clipPath: fromClip, opacity: 0, y: 15 },
      {
        clipPath: toClip,
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.inOut",
      }
    );
  }, [text, maskShape]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        willChange: "clip-path, opacity, transform",
        ...style,
      }}
    >
      {text}
    </span>
  );
}
