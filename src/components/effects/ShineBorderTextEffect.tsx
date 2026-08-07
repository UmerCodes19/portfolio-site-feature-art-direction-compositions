"use client";

interface ShineBorderTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ShineBorderTextEffect({ text, className = "", style }: ShineBorderTextEffectProps) {
  return (
    <span
      className={`inline-block text-stroke-shine ${className}`}
      style={{
        ...style,
        WebkitTextStroke: "1.5px rgba(10, 10, 10, 0.85)",
        color: "transparent",
        filter: "drop-shadow(0 0 12px rgba(10, 10, 10, 0.15))",
      }}
    >
      {text}
    </span>
  );
}
