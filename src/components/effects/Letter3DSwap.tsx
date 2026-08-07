"use client";

import React, { ElementType, useCallback, useMemo, useState, useEffect } from "react";
import { useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement).props;
    const childText = (props as any).children;
    if (childText != null) {
      return extractTextFromChildren(childText);
    }
  }
  return "";
};

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

interface Letter3DSwapProps {
  children?: React.ReactNode;
  as?: ElementType;
  mainClassName?: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  rotateDirection?: "top" | "right" | "bottom" | "left";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  style?: React.CSSProperties;
}

export function Letter3DSwap({
  children = "DEVELOPER",
  as = "span",
  mainClassName = "",
  frontFaceClassName = "",
  secondFaceClassName = "",
  staggerDuration = 0.05,
  staggerFrom = "first",
  rotateDirection = "right",
  autoPlay = true,
  autoPlayInterval = 3200,
  style,
  ...props
}: Letter3DSwapProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [scope, animate] = useAnimate();

  const rotationTransform = (() => {
    switch (rotateDirection) {
      case "top":
        return "rotateX(90deg)";
      case "right":
        return "rotateY(90deg)";
      case "bottom":
        return "rotateX(-90deg)";
      case "left":
        return "rotateY(-90deg)";
      default:
        return "rotateY(90deg)";
    }
  })();

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children);
    } catch {
      return "DEVELOPER";
    }
  }, [children]);

  const characters = useMemo(() => {
    const t = text?.split(" ") ?? [];
    return t.map((word: string, i: number) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== t.length - 1,
    }));
  }, [text]);

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return index * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const trigger3DRotation = useCallback(async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    const totalChars = characters.reduce(
      (sum: number, word: WordObject) => sum + word.characters.length,
      0
    );

    const delays = Array.from({ length: totalChars }, (_, i) =>
      getStaggerDelay(i, totalChars)
    );

    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: rotationTransform },
      {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: (i: number) => delays[i],
      }
    );

    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: "rotateX(0deg) rotateY(0deg)" },
      { duration: 0 }
    );

    setIsAnimating(false);
  }, [
    isAnimating,
    characters,
    getStaggerDelay,
    rotationTransform,
    animate,
  ]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      trigger3DRotation();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, trigger3DRotation]);

  const ElementTag = as || "span";

  return (
    <ElementTag
      className={cn("inline-flex flex-wrap relative cursor-pointer select-none", mainClassName)}
      onMouseEnter={trigger3DRotation}
      ref={scope}
      style={{ perspective: 1000, ...style }}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {characters.map((wordObj: WordObject, wordIndex: number, array: WordObject[]) => {
        const previousCharsCount = array
          .slice(0, wordIndex)
          .reduce((sum: number, word: WordObject) => sum + word.characters.length, 0);

        return (
          <span key={wordIndex} className="inline-flex">
            {wordObj.characters.map((char: string, charIndex: number) => {
              const totalIndex = previousCharsCount + charIndex;

              return (
                <CharBox
                  key={totalIndex}
                  char={char}
                  frontFaceClassName={frontFaceClassName}
                  secondFaceClassName={secondFaceClassName}
                  rotateDirection={rotateDirection}
                />
              );
            })}
            {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
          </span>
        );
      })}
    </ElementTag>
  );
}

interface CharBoxProps {
  char: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  rotateDirection: "top" | "right" | "bottom" | "left";
}

const CharBox = ({
  char,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
}: CharBoxProps) => {
  const getSecondFaceTransform = () => {
    switch (rotateDirection) {
      case "top":
        return `rotateX(-90deg) translateZ(0.5lh)`;
      case "right":
        return `rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)`;
      case "bottom":
        return `rotateX(90deg) translateZ(0.5lh)`;
      case "left":
        return `rotateY(-90deg) translateX(50%) rotateY(90deg) translateX(-50%) rotateY(90deg) translateX(50%)`;
      default:
        return `rotateY(90deg) translateZ(1ch)`;
    }
  };

  return (
    <span
      className="letter-3d-swap-char-box-item inline-block transform-3d transition-transform duration-300"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <span
        className={cn("relative backface-hidden inline-block", frontFaceClassName)}
      >
        {char === " " ? "\u00A0" : char}
      </span>

      <span
        className={cn("absolute backface-hidden top-0 left-0 inline-block", secondFaceClassName)}
        style={{
          transform: getSecondFaceTransform(),
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  );
};

export default Letter3DSwap;
