"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

interface TextProps {
  label: string;
  reverse?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function LetterSwapPingPong({
  label = "DEVELOPER",
  reverse = true,
  staggerDuration = 0.03,
  staggerFrom = "first",
  className = "",
  autoPlay = true,
  autoPlayInterval = 3000,
  onClick,
  style,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const mergeTransition = useCallback(
    (baseTransition: any) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom as any,
      }),
    }),
    [staggerDuration, staggerFrom]
  );

  const transition = { type: "spring", duration: 0.7 };

  const triggerPingPong = useCallback(() => {
    const nextHover = !isHoveredRef.current;
    setIsHovered(nextHover);

    if (nextHover) {
      animate(".letter", { y: reverse ? "100%" : "-100%" }, mergeTransition(transition));
      animate(".letter-secondary", { top: "0%" }, mergeTransition(transition));
    } else {
      animate(".letter", { y: 0 }, mergeTransition(transition));
      animate(".letter-secondary", { top: reverse ? "-100%" : "100%" }, mergeTransition(transition));
    }
  }, [animate, mergeTransition, reverse]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      triggerPingPong();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, triggerPingPong]);

  return (
    <motion.span
      className={`inline-flex justify-center items-center relative overflow-hidden select-none cursor-pointer ${className}`}
      onMouseEnter={triggerPingPong}
      onClick={onClick}
      ref={scope}
      style={style}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => (
        <span className="whitespace-pre relative flex" key={i} aria-hidden={true}>
          <motion.span className="relative letter" style={{ top: 0 }}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
          <motion.span
            className="absolute letter-secondary"
            style={{ top: reverse ? "-100%" : "100%" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default LetterSwapPingPong;
