"use client";

import { useState, useEffect } from "react";

interface TypewriterTextEffectProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TypewriterTextEffect({
  text,
  speed = 90,
  className = "",
  style,
}: TypewriterTextEffectProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={`inline-block ${className}`} style={style}>
      {displayedText}
      <span className="inline-block animate-pulse font-mono font-normal">|</span>
    </span>
  );
}
