"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete?: () => void;
}

const BRAND_BANDS = [
  {
    text: "MUHAMMAD UMER QURESHI",
    weightClass: "font-light",
    speed: 58,
    accentKeyword: "UMER",
  },
  {
    text: "SOFTWARE ENGINEER",
    weightClass: "font-semibold",
    speed: 72,
    accentKeyword: "ENGINEER",
  },
  {
    text: "FULL STACK ✦ AI",
    weightClass: "font-bold",
    speed: 52,
    accentKeyword: "AI",
  },
  {
    text: "BUILDING DIGITAL EXPERIENCES",
    weightClass: "font-normal",
    speed: 78,
    accentKeyword: "EXPERIENCES",
  },
  {
    text: "KARACHI ✦ PAKISTAN",
    weightClass: "font-black",
    speed: 64,
    accentKeyword: "PAKISTAN",
  },
  {
    text: "AVAILABLE FOR FREELANCE",
    weightClass: "font-medium",
    speed: 70,
    accentKeyword: "FREELANCE",
  },
];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [stage, setStage] = useState<"building" | "holding" | "exiting" | "hidden">("building");

  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeTweensRef = useRef<gsap.core.Tween[]>([]);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Master GSAP Choreography:
  // BUILD (Blank screen -> 0.20s stagger entrance) -> HOLD (1.0s) -> REVEAL (Cascading 0.52s exit slide + 0.16s stagger)
  const runMasterChoreography = useCallback(() => {
    if (masterTlRef.current) masterTlRef.current.kill();

    const masterTl = gsap.timeline({
      onComplete: () => {
        setStage("hidden");
        setIsVisible(false);
        onComplete?.();
      },
    });

    masterTlRef.current = masterTl;

    // 1. BUILD PHASE: Slide in bands sequentially from top to bottom
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const isEven = i % 2 === 0;
      const startX = isEven ? -140 : 140;

      gsap.set(row, { xPercent: startX, opacity: 1, rotation: 0, scaleY: 1 });

      masterTl.to(
        row,
        {
          xPercent: 0,
          duration: 0.75,
          ease: "power2.out",
        },
        0.1 + i * 0.20 // 100ms initial dark pause, then 200ms entrance stagger
      );
    });

    // 2. HOLD PHASE: 1.0s assembled marquee pause
    masterTl.to({}, { duration: 1.0 });

    // 3. REVEAL PHASE: Switch to exiting stage and slide bands offscreen horizontally with cascading stagger
    masterTl.add(() => {
      setStage("exiting");
    });

    const revealStartTime = masterTl.duration();

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const isEven = i % 2 === 0;
      const exitX = isEven ? -140 : 140;

      masterTl.to(
        row,
        {
          xPercent: exitX,
          rotation: isEven ? -0.4 : 0.4,
          scaleY: 0.995,
          opacity: 1, // Physical weight, NO fade out
          duration: 0.52,
          ease: "power2.inOut",
        },
        revealStartTime + i * 0.16 // Cascading overlap stagger
      );
    });
  }, [onComplete]);

  const handleSkip = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      clearAllTimers();
      if (masterTlRef.current) masterTlRef.current.kill();
      // Fast finish exit
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const isEven = i % 2 === 0;
        gsap.to(row, {
          xPercent: isEven ? -140 : 140,
          duration: 0.4,
          ease: "power2.in",
          onComplete:
            i === rowsRef.current.length - 1
              ? () => {
                  setStage("hidden");
                  setIsVisible(false);
                  onComplete?.();
                }
              : undefined,
        });
      });
    },
    [clearAllTimers, onComplete]
  );

  // Setup GSAP Infinite Marquees & Master Timeline
  useEffect(() => {
    let isCancelled = false;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    setIsVisible(true);

    const imagesToPreload = ["/images/portrait.png", "/images/purple_glitter_texture.png"];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const ctx = gsap.context(() => {
      marqueeTweensRef.current = [];

      // Set initial offscreen state for all rows immediately
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const isEven = i % 2 === 0;
        gsap.set(row, { xPercent: isEven ? -140 : 140, opacity: 1, rotation: 0, scaleY: 1 });

        const inner = row.querySelector(".marquee-track");
        if (!inner) return;

        const band = BRAND_BANDS[i] || BRAND_BANDS[0];

        if (isEven) {
          gsap.set(inner, { xPercent: 0 });
          const tween = gsap.to(inner, {
            xPercent: -50,
            duration: band.speed,
            ease: "none",
            repeat: -1,
          });
          marqueeTweensRef.current.push(tween);
        } else {
          gsap.set(inner, { xPercent: -50 });
          const tween = gsap.to(inner, {
            xPercent: 0,
            duration: band.speed,
            ease: "none",
            repeat: -1,
          });
          marqueeTweensRef.current.push(tween);
        }
      });
    }, containerRef);

    // Trigger Master Sequence after brief DOM tick
    const initTimer = setTimeout(() => {
      if (!isCancelled) {
        runMasterChoreography();
      }
    }, 40);

    timersRef.current.push(initTimer);

    return () => {
      isCancelled = true;
      clearAllTimers();
      ctx.revert();
    };
  }, [clearAllTimers, runMasterChoreography, onComplete]);

  if (stage === "hidden" || isVisible === false) {
    return null;
  }

  // Helper to render band phrase with subtle accent separator and accent keyword
  const renderPhraseContent = (band: typeof BRAND_BANDS[number]) => {
    const parts = band.text.split("✦");

    return (
      <span className="inline-flex items-center">
        {parts.map((part, index) => {
          const words = part.trim().split(" ");
          return (
            <span key={index} className="inline-flex items-center">
              {words.map((w, wIdx) => {
                const isAccent = w === band.accentKeyword;
                return (
                  <span
                    key={wIdx}
                    className={`mr-[0.3em] ${
                      isAccent ? "text-[#af5bf0]" : "text-zinc-200"
                    }`}
                  >
                    {w}
                  </span>
                );
              })}

              {index < parts.length - 1 && (
                <span className="text-[#af5bf0]/90 font-normal mx-8 sm:mx-12 md:mx-16">
                  ✦
                </span>
              )}
            </span>
          );
        })}
        <span className="text-[#af5bf0]/90 font-normal mx-8 sm:mx-12 md:mx-16">
          ✦
        </span>
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={() => handleSkip()}
      tabIndex={0}
      role="button"
      aria-label="Editorial marquee splash screen container"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          handleSkip();
        }
      }}
      className={`fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden select-none cursor-pointer pointer-events-auto transition-colors duration-300 ${
        stage === "exiting" ? "bg-transparent" : "bg-[#090909]"
      }`}
    >
      {/* 6 Large Horizontal Marquee Bands (Solid #090909 Background per band) */}
      <div className="relative z-0 flex-1 flex flex-col w-full h-full">
        {BRAND_BANDS.map((band, i) => (
          <div
            key={i}
            ref={(el) => {
              rowsRef.current[i] = el;
            }}
            className="w-full flex-1 flex items-center overflow-hidden border-b border-white/[0.04] bg-[#090909] relative shadow-2xl"
          >
            {/* Subtle Film Grain Overlay per Band */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Continuous Marquee Track */}
            <div
              className={`marquee-track flex whitespace-nowrap text-[clamp(44px,6.5vw,92px)] font-sans uppercase tracking-[0.14em] leading-none z-0 ${band.weightClass}`}
            >
              <div className="flex items-center pr-8 sm:pr-12 md:pr-16">
                {renderPhraseContent(band)}
                {renderPhraseContent(band)}
                {renderPhraseContent(band)}
              </div>
              <div className="flex items-center pr-8 sm:pr-12 md:pr-16">
                {renderPhraseContent(band)}
                {renderPhraseContent(band)}
                {renderPhraseContent(band)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
