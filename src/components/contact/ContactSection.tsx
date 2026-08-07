"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Copy, Check, Sparkles } from "lucide-react";
import { CONTACT_DATA } from "@/data/contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainStageRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion() ?? false;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header GSAP Reveal
      if (headerRef.current) {
        const tagEl = headerRef.current.querySelector(".contact-tag");
        const titleEl = headerRef.current.querySelector(".contact-title");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        if (tagEl) {
          tl.fromTo(
            tagEl,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
          );
        }

        if (titleEl) {
          tl.fromTo(
            titleEl,
            { opacity: 0, y: 30, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" },
            "-=0.3"
          );
        }
      }

      // Main Stage Reveal
      if (mainStageRef.current) {
        gsap.fromTo(
          mainStageRef.current,
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainStageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-[#080808] dark:bg-[#080808] light-mode:bg-[#F5F5F7] text-white dark:text-white light-mode:text-zinc-900 overflow-hidden transition-colors duration-400"
    >
      {/*
        THESIS: An immaculate, monumental contact section designed like an Awwwards Site of the Day awardee. Features giant editorial display lettering, high-craft glass email action stage, and crisp monospaced channel rules.
        OWN-WORLD: Monochrome obsidian dark background #080808, hairline borders border-white/[0.08], Geist Sans title weights, and disciplined #af5bf0 violet highlights.
        STORY: Visitors are drawn into a striking final chapter, making it effortless to copy email addresses or jump to direct channels.
        FIRST VIEWPORT: Section header '02 — Let's Work Together' with a massive 'Initiate Contact' statement.
        FORM: Awwwards Architectural Contact Stage.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col gap-3 mb-16 md:mb-24 pb-8 border-b border-white/[0.06]">
          <span className="contact-tag font-mono text-xs font-medium tracking-[0.28em] uppercase text-zinc-500 select-none opacity-0">
            02 &nbsp;—&nbsp; Let's Work Together
          </span>
          <h2 className="contact-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-zinc-100 leading-[0.98] opacity-0">
            Initiate <span className="italic font-extralight text-zinc-400">Contact.</span>
          </h2>
        </div>

        {/* Main Stage Grid (lg:col-span-12) */}
        <div ref={mainStageRef} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-24 border-b border-white/[0.06] opacity-0">
          
          {/* Left Column: Monumental Email Stage & Availability (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10">
            
            <div className="flex flex-col gap-6">
              <p className="text-base sm:text-xl font-light text-zinc-300/90 leading-relaxed max-w-2xl">
                {CONTACT_DATA.closingStatement}
              </p>

              {/* Massive Interactive Email Action Enclosure with Atmospheric Violet Aura */}
              <div className="group relative rounded-2xl bg-zinc-950/90 border border-white/[0.08] hover:border-[#af5bf0]/30 p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_60px_rgba(175,91,240,0.12)] backdrop-blur-2xl transition-all duration-700">
                {/* Atmospheric Ambient Aura Radial Gradient */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#af5bf0]/0 via-[#af5bf0]/15 to-[#af5bf0]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl -z-10" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 font-medium">
                    Primary Direct Email
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-[#af5bf0] animate-pulse" />
                    <span className="hidden sm:inline">Active Inbox</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="inline-flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.03em] text-white hover:text-zinc-200 transition-colors"
                  >
                    <span className="underline underline-offset-8 decoration-white/20 group-hover:decoration-[#af5bf0] transition-colors duration-500">
                      {CONTACT_DATA.email}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-[#af5bf0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                  </a>

                  {/* Tactile Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-200 flex items-center gap-2 transition-all shrink-0 cursor-pointer select-none"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#af5bf0]" />
                        <span className="text-[#af5bf0] font-medium">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Availability & Location Chips */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">Availability:</span>
                <span className="text-zinc-300">{CONTACT_DATA.availability}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">Location:</span>
                <span className="text-zinc-300">{CONTACT_DATA.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Links & Profiles (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-10 lg:border-l lg:border-white/[0.06]">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] select-none font-medium">
              Direct Links & Professional Profiles
            </span>

            <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06] rounded-xl overflow-hidden bg-zinc-950/40">
              {CONTACT_DATA.socials.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-5 px-5 flex items-center justify-between text-base text-zinc-300 hover:text-white transition-all hover:bg-white/[0.02]"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-light tracking-tight text-lg group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 font-normal">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#af5bf0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Minimal Footer Anchor */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4 antialiased">
          <span>© {new Date().getFullYear()} Umer Quraishi</span>
          <span className="text-zinc-600">Software Engineer • Full-Stack Developer • UI/UX Designer</span>
        </div>

      </div>
    </section>
  );
}
