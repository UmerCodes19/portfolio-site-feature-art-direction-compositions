"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Copy, Check, Mail, Phone, Globe, Clock } from "lucide-react";
import { CONTACT_DATA } from "@/data/contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveredStage, setIsHoveredStage] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion() ?? false;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CONTACT_DATA.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  // Live Karachi Timestamp (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Spotlight mouse effect on email stage
  const handleMouseMoveStage = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // GSAP Entrance Timeline matched to Hero & Projects
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // 01. Header Reveal
      if (headerRef.current) {
        const tagEl = headerRef.current.querySelector(".contact-tag");
        const titleEl = headerRef.current.querySelector(".contact-title");
        const descEl = headerRef.current.querySelector(".contact-desc");

        if (tagEl) {
          masterTl.fromTo(
            tagEl,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        }

        if (titleEl) {
          masterTl.fromTo(
            titleEl,
            { opacity: 0, y: 36, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            "-=0.3"
          );
        }

        if (descEl) {
          masterTl.fromTo(
            descEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );
        }
      }

      // 02. Primary Action Stage
      if (stageRef.current) {
        masterTl.fromTo(
          stageRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        );
      }

      // 03. Direct Channel Rows Stagger
      if (linksRef.current) {
        const rows = linksRef.current.querySelectorAll(".contact-channel-row");
        masterTl.fromTo(
          rows,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      // 04. Footer Anchor Reveal
      if (footerRef.current) {
        masterTl.fromTo(
          footerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
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
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Direct & High-Impact */}
        <div ref={headerRef} className="flex flex-col gap-6 mb-16 md:mb-20 pb-10 border-b border-white/[0.08]">
          <div className="contact-tag flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 select-none">
            <span className="w-2 h-2 rounded-full bg-[#af5bf0] animate-pulse" />
            <span>03 &nbsp;—&nbsp; CONTACT // DIRECTIVE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">{CONTACT_DATA.location}</span>
          </div>

          <h2 className="contact-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-[#FAFAFA] leading-[1.05]">
            Let's Build{" "}
            <span className="italic font-normal font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-[#af5bf0] to-zinc-300 bg-[length:200%_auto] animate-aurora-text">
              Extraordinary.
            </span>
          </h2>

          <p className="contact-desc font-sans text-lg sm:text-xl font-light text-zinc-400 leading-[1.65] max-w-[65ch]">
            {CONTACT_DATA.closingStatement}
          </p>
        </div>

        {/* Main Grid: Email Command Stage (Left) & Architectural Channel Rows (Right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 md:pb-28 border-b border-white/[0.08]">
          
          {/* Left Column: Primary Email & Phone Command Enclosure (lg:col-span-7) */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMoveStage}
            onMouseEnter={() => setIsHoveredStage(true)}
            onMouseLeave={() => setIsHoveredStage(false)}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            
            {/* Elevated Quartz Command Card */}
            <div className="group relative rounded-2xl bg-[#121212] border border-white/[0.08] hover:border-[#af5bf0]/40 p-8 sm:p-10 flex flex-col justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(175,91,240,0.14)] transition-all duration-500 overflow-hidden">
              
              {/* Left Active Pillar Accent */}
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#af5bf0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Cursor-Tracked Ambient Radial Spotlight Aura */}
              {isHoveredStage && !isReducedMotion && (
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
                  style={{
                    background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(175, 91, 240, 0.16), transparent 50%)`,
                  }}
                />
              )}

              {/* Card Header: Metadata & Status */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium select-none">
                  <Mail className="w-3.5 h-3.5 text-[#af5bf0]" />
                  <span>Direct Email</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 select-none">
                  <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isReducedMotion ? "" : "animate-pulse"}`} />
                  <span>Available for projects</span>
                </div>
              </div>

              {/* Main Email Display */}
              <div className="py-2 z-10">
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="inline-block text-2xl sm:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-[#FAFAFA] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#af5bf0]/80 rounded-md transition-all break-all xl:break-normal"
                >
                  <span className="underline underline-offset-8 decoration-white/20 group-hover:decoration-[#af5bf0] transition-colors duration-500">
                    {CONTACT_DATA.email}
                  </span>
                </a>
              </div>

              {/* Dual Primary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 z-10">
                {/* Send Email Button */}
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="px-6 py-3.5 rounded-lg bg-[#FAFAFA] hover:bg-white active:scale-[0.99] text-[#080808] font-sans text-sm font-medium tracking-tight flex items-center justify-center gap-2 transition-all shadow-md group/btn cursor-pointer select-none"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-4 h-4 text-[#080808] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                </a>

                {/* Copy Email Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#121212] hover:bg-zinc-900 active:scale-[0.99] border border-white/[0.08] hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#af5bf0]/80 text-sm font-mono tracking-tight text-zinc-200 flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
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
                  <div className="sr-only" aria-live="polite" aria-atomic="true">
                    {copied ? "Email address copied to clipboard." : ""}
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Phone & Location Bar */}
            <div className="rounded-xl bg-[#121212]/70 border border-white/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#af5bf0] shrink-0" />
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-200">
                  <span className="text-zinc-500 uppercase tracking-wider text-xs">Phone:</span>
                  <a href={`tel:${CONTACT_DATA.phone}`} className="hover:text-white underline decoration-white/20">
                    {CONTACT_DATA.phone}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy phone number"
                    className="p-1 text-zinc-400 hover:text-[#af5bf0] transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#af5bf0]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span>Karachi, PK</span>
                {timeString && (
                  <>
                    <span className="text-zinc-600">—</span>
                    <span className="text-[#af5bf0] font-medium">{timeString} PKT</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Channels (Synced with ProjectRow.tsx) */}
          <div ref={linksRef} className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 lg:border-l lg:border-white/[0.08]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.16em] select-none font-medium">
                Direct Channels & Profiles
              </span>
              <span className="text-xs font-mono text-zinc-600">04 Channels</span>
            </div>

            <div className="flex flex-col">
              {CONTACT_DATA.socials.map((link, idx) => {
                const isRowHovered = hoveredRow === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredRow(link.name)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onFocus={() => setHoveredRow(link.name)}
                    onBlur={() => setHoveredRow(null)}
                    className="contact-channel-row group relative w-full py-5 border-b border-white/[0.06] flex items-center justify-between gap-4 pl-3 pr-2 transition-all duration-300 hover:bg-white/[0.03] outline-none focus-visible:ring-1 focus-visible:ring-[#af5bf0]"
                  >
                    {/* Left Violet Pillar Accent drawing on hover */}
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 rounded-r bg-[#af5bf0] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isRowHovered
                          ? "opacity-100 scale-y-100"
                          : "opacity-0 scale-y-0"
                      }`}
                    />

                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-600 group-hover:text-[#af5bf0] transition-colors duration-300 tabular-nums shrink-0 w-6">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <h3 className="text-lg font-light tracking-tight text-[#FAFAFA] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] truncate">
                          {link.name}
                        </h3>
                        <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                          {link.label}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-md bg-white/[0.04] group-hover:bg-[#af5bf0]/15 border border-white/[0.08] group-hover:border-[#af5bf0]/40 flex items-center justify-center transition-all duration-300 shrink-0">
                      <ArrowUpRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          isRowHovered
                            ? "text-[#af5bf0] translate-x-0.5 -translate-y-0.5"
                            : "text-zinc-500"
                        }`}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Anchor: Clean & Direct */}
        <div ref={footerRef} className="pt-8 md:pt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 antialiased border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-sm text-zinc-200 tracking-tight font-normal">
              {CONTACT_DATA.name}
            </span>
            <span className="text-zinc-700">—</span>
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
          </div>

          <div className="text-center text-zinc-400 font-sans text-xs">
            {CONTACT_DATA.title} • Full-Stack Developer • UI/UX Designer
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Globe className="w-3 h-3 text-zinc-600" />
              <span>Karachi, PK (UTC+5)</span>
            </div>

            <div className="w-px h-3.5 bg-white/[0.08]" />

            {/* Back to Top Smooth Elevator Button */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Return to top of page"
              className="group px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-[#af5bf0]/15 border border-white/[0.08] hover:border-[#af5bf0]/40 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all duration-300 cursor-pointer select-none active:scale-95"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#af5bf0] -rotate-45 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
