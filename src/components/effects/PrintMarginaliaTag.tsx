"use client";

import { useEffect, useState } from "react";

interface PrintMarginaliaTagProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PrintMarginaliaTag({ text, className = "", style }: PrintMarginaliaTagProps) {
  const [coords, setCoords] = useState({ x: 1920, y: 1080 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {text}
      <span className="absolute -top-6 right-0 font-mono text-[10px] tracking-widest text-zinc-400 opacity-60 pointer-events-none select-none">
        [REF: {coords.x}pt / {coords.y}pt]
      </span>
    </span>
  );
}
