"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

export function LetterSwapForward({
  label = "DEVELOPER",
  reverse = true,
  staggerDuration = 0.03,
  staggerFrom = "first",
  className = "",
  autoPlay = true,
  autoPlayInterval = 2800,
  onClick,
  style,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const blockedRef = useRef(false);
  blockedRef.current = blocked;

  const triggerAnimation = useCallback(() => {
    if (blockedRef.current) return;
    setBlocked(true);

    const mergeTransition = (baseTransition: any) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom as any,
      }),
    });

    const transition = { type: "spring", duration: 0.7 };

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition)
    ).then(() => {
      animate(".letter", { y: 0 }, { duration: 0 }).then(() => {
        setBlocked(false);
      });
    });

    animate(
      ".letter-secondary",
      { top: "0%" },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter-secondary",
        { top: reverse ? "-100%" : "100%" },
        { duration: 0 }
      );
    });
  }, [animate, reverse, staggerDuration, staggerFrom]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      triggerAnimation();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, triggerAnimation]);

  return (
    <span
      className={`inline-flex justify-center items-center relative overflow-hidden select-none cursor-pointer ${className}`}
      onMouseEnter={triggerAnimation}
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
    </span>
  );
}

export default LetterSwapForward;
