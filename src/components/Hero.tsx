"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const PulsatingLightRotatorEffect = dynamic(
  () => import("./effects/PulsatingLightRotatorEffect").then((mod) => mod.PulsatingLightRotatorEffect),
  { ssr: false }
);

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none bg-[#040404] text-white">
      <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-0">
        {/* Ambient Purple Aura Vignette */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-[#af5bf0]/22 via-[#af5bf0]/8 to-transparent blur-3xl opacity-90" />
        </div>

        <h1 className="sr-only">
          Muhammad Umer Qureshi — Full-Stack Developer, UI/UX Designer & AI Engineer
        </h1>

        {/* ── Oversized Background Typography Rotator (Original Position & Layout) ─────── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="flex items-center justify-center pointer-events-none">
            <div
              aria-hidden="true"
              className="hero-bg-text uppercase select-none transition-all duration-300 ease-out"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "27vw",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                transform: "scaleY(1.5) scaleX(0.85) translateY(5vh)",
                color: "#181818",
                opacity: 0.85,
                textRendering: "optimizeLegibility",
              }}
            >
              <PulsatingLightRotatorEffect
                words={["ENGINEER", "DEVELOPER", "DESIGNER", "FULL-STACK", "ARCHITECT"]}
                duration={5500}
              />
            </div>
          </div>
        </div>

        {/* ── Foreground Portrait PNG ─────────────────────────────── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-[1200px] h-[78vh] sm:h-[82vh] md:h-[84vh] lg:h-[86vh] pointer-events-none flex items-end justify-center">
          <div
            className="w-full h-full relative pointer-events-none flex items-end justify-center"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 99%)",
            }}
          >
            <Image
              src="/images/portrait.png"
              alt="Portrait of Muhammad Umer Qureshi"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={95}
              className="object-contain object-bottom pointer-events-none relative z-10"
            />

            {/* Baseline Overlay: Tagline & Liquid Glass CTAs */}
            <div className="absolute inset-x-0 bottom-0 z-40 pb-10 sm:pb-12 pointer-events-none px-6 md:px-12 max-w-6xl mx-auto w-full flex flex-col gap-6 items-center">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 w-full max-w-5xl mx-auto">
                
                {/* Headline Tagline Statement */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left select-none pointer-events-auto">
                  <p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-normal tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    I write the logic. You see the <span className="italic font-normal font-serif magic-word-accent">magic.</span>
                  </p>
                </div>

                {/* Liquid Glass CTA Button Group */}
                <div className="flex flex-row items-center gap-4 sm:gap-5 pointer-events-auto select-none shrink-0">
                  
                  {/* Liquid Glass Primary Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("projects");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                      }
                    }}
                    className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white border border-white/25 hover:border-[#af5bf0]/80 text-sm font-sans font-medium tracking-wide backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),_0_12px_40px_rgba(175,91,240,0.35)] hover:scale-[1.03] transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <span className="relative z-10 drop-shadow-sm">Explore Projects</span>
                    <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#af5bf0] flex items-center justify-center transition-all duration-300 shadow-inner">
                      <svg
                        className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </button>

                  {/* Liquid Glass Secondary Button */}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.09] text-zinc-200 hover:text-white border border-white/15 hover:border-white/35 text-sm font-sans font-medium tracking-wide backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_12px_32px_rgba(255,255,255,0.1)] hover:scale-[1.03] transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <span className="relative z-10">Resume</span>
                    <svg
                      className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </a>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
