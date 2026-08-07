"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export type FlipStyle = "3d-flip" | "fade-blur" | "spring-slide" | "elastic-wave" | "split-char-flip";

interface FlipWordsEffectProps {
  words?: string[];
  duration?: number;
  flipStyle?: FlipStyle;
  className?: string;
  style?: React.CSSProperties;
}

export function FlipWordsEffect({
  words = ["UMER QURESHI", "DESIGN & CODE", "FULL-STACK ENGINEERING", "INTERFACE DESIGN"],
  duration = 3200,
  flipStyle = "3d-flip",
  className = "",
  style,
}: FlipWordsEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimatingRef.current || words.length <= 1) return;
      isAnimatingRef.current = true;

      const container = containerRef.current;
      if (!container) return;

      const nextIndex = (currentWordIndex + 1) % words.length;

      // GSAP Butter-Smooth 3D Perspective Rotation Flip
      if (flipStyle === "3d-flip" || flipStyle === "split-char-flip") {
        const letters = container.querySelectorAll(".flip-char");

        if (letters.length === 0) {
          setCurrentWordIndex(nextIndex);
          isAnimatingRef.current = false;
          return;
        }

        gsap.timeline({
          onComplete: () => {
            setCurrentWordIndex(nextIndex);
            requestAnimationFrame(() => {
              const newLetters = container.querySelectorAll(".flip-char");
              if (newLetters.length > 0) {
                gsap.fromTo(
                  newLetters,
                  { opacity: 0, rotateX: -90, y: 15, transformOrigin: "50% 50% -20px" },
                  {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.025,
                    ease: "back.out(1.4)",
                    onComplete: () => {
                      isAnimatingRef.current = false;
                    },
                  }
                );
              } else {
                isAnimatingRef.current = false;
              }
            });
          },
        }).to(letters, {
          opacity: 0,
          rotateX: 90,
          y: -15,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.in",
        });
      } else if (flipStyle === "fade-blur") {
        gsap.to(container, {
          opacity: 0,
          filter: "blur(12px)",
          y: -10,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setCurrentWordIndex(nextIndex);
            requestAnimationFrame(() => {
              gsap.fromTo(
                container,
                { opacity: 0, filter: "blur(12px)", y: 10 },
                {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  onComplete: () => {
                    isAnimatingRef.current = false;
                  },
                }
              );
            });
          },
        });
      } else if (flipStyle === "spring-slide") {
        gsap.to(container, {
          opacity: 0,
          y: -30,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            setCurrentWordIndex(nextIndex);
            requestAnimationFrame(() => {
              gsap.fromTo(
                container,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                  onComplete: () => {
                    isAnimatingRef.current = false;
                  },
                }
              );
            });
          },
        });
      } else {
        // Elastic Wave
        gsap.to(container, {
          opacity: 0,
          scale: 0.85,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setCurrentWordIndex(nextIndex);
            requestAnimationFrame(() => {
              gsap.fromTo(
                container,
                { opacity: 0, scale: 1.15, y: 20 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "elastic.out(1, 0.5)",
                  onComplete: () => {
                    isAnimatingRef.current = false;
                  },
                }
              );
            });
          },
        });
      }
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration, currentWordIndex, flipStyle]);

  const currentWord = words[currentWordIndex] || "";
  const characters = Array.from(currentWord);

  return (
    <span
      ref={containerRef}
      className={`inline-block origin-center ${className}`}
      style={{ perspective: 1200, ...style }}
    >
      {flipStyle === "3d-flip" || flipStyle === "split-char-flip" ? (
        characters.map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="flip-char inline-block"
            style={{
              whiteSpace: char === " " ? "pre" : "normal",
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      ) : (
        currentWord
      )}
    </span>
  );
}
