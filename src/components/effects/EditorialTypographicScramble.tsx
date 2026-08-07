"use client";

import { useState, useEffect } from "react";

interface EditorialTypographicScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TYPOGRAPHIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§¶†‡#&%@";

export function EditorialTypographicScramble({
  text,
  className = "",
  style,
}: EditorialTypographicScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return TYPOGRAPHIC_CHARS[Math.floor(Math.random() * TYPOGRAPHIC_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iteration += 1;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`inline-block font-mono tracking-tight ${className}`} style={style}>
      {displayText}
    </span>
  );
}
