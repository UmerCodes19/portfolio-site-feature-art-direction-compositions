"use client";

import { useState, useEffect } from "react";

interface ScrambleTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function ScrambleTextEffect({ text, className = "", style }: ScrambleTextEffectProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length * 4;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration / 4) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iteration += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`inline-block ${className}`} style={style}>
      {displayText}
    </span>
  );
}
