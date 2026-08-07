"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Terminal, Code2, Cpu, Globe, Layers, Check, Copy } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { CONTACT_DATA } from "@/data/contact";

// 10 Detailed Visual World Directions (derived from 1, 4, 5 + 7 new deep variations)
const DIRECTIONS = [
  {
    id: "dir-1",
    name: "01. Obsidian Technical Monolith",
    tagline: "Deep #080808 obsidian canvas, razor hairline rules, Geist Light display, and disciplined electric violet pulses (≤5%).",
    canvasBg: "bg-[#080808]",
    cardBg: "bg-[#121212] border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.6)]",
    headingFont: "font-sans font-light tracking-[-0.04em]",
    textColor: "text-[#FAFAFA]",
    mutedColor: "text-zinc-400",
    accentBadge: "bg-[#af5bf0]/10 text-[#af5bf0] border border-[#af5bf0]/25 font-mono",
    accentDot: "bg-[#af5bf0]",
    vibe: "Senior Engineering Precision — Understated, high-contrast, authentic.",
  },
  {
    id: "dir-2",
    name: "02. Warm Sand & Muted Emerald",
    tagline: "Muted organic sand #0E0E0C canvas, warm ivory typography, soft zinc surfaces, and subtle emerald status indicators.",
    canvasBg: "bg-[#0E0E0C]",
    cardBg: "bg-[#161614] border border-emerald-950/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)]",
    headingFont: "font-sans font-light tracking-tight",
    textColor: "text-[#F2F0E9]",
    mutedColor: "text-[#A8A69E]",
    accentBadge: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono",
    accentDot: "bg-emerald-400",
    vibe: "Handcrafted UI Craftsman — Organic, warm, calm, intelligent.",
  },
  {
    id: "dir-3",
    name: "03. Heavy Industrial Neo-Brutalist",
    tagline: "High-contrast monochrome white canvas, 2px solid razor black outlines, zero-blur block offset shadows, and Space Grotesk caps.",
    canvasBg: "bg-[#F8F9FA]",
    cardBg: "bg-white border-2 border-black shadow-[6px_6px_0px_#000]",
    headingFont: "font-mono font-black uppercase tracking-tight",
    textColor: "text-black",
    mutedColor: "text-zinc-700",
    accentBadge: "bg-yellow-300 text-black border border-black font-bold font-mono",
    accentDot: "bg-black",
    vibe: "Raw & Unconventional — High-impact, provocative, structural.",
  },
  {
    id: "dir-4",
    name: "04. Slate Darkroom Amber Safelight",
    tagline: "Darkroom slate #0B0C0E ground, amber safelight headers (#F59E0B), and silver-gray wet print developer cards.",
    canvasBg: "bg-[#0B0C0E]",
    cardBg: "bg-[#14161B] border border-amber-500/20 shadow-[0_8px_30px_rgba(245,158,11,0.06)]",
    headingFont: "font-mono font-normal tracking-tight uppercase text-amber-400",
    textColor: "text-amber-100",
    mutedColor: "text-zinc-400",
    accentBadge: "bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono",
    accentDot: "bg-amber-500",
    vibe: "Laboratory Systems — Meticulous, analytical, developer tray atmosphere.",
  },
  {
    id: "dir-5",
    name: "05. Monochromatic Matrix Density",
    tagline: "Pure #000000 black canvas, pure white hairline rules, dense monospace data streams, and zero color tinting.",
    canvasBg: "bg-black",
    cardBg: "bg-zinc-950 border border-white/20 shadow-none",
    headingFont: "font-mono font-bold tracking-tighter uppercase",
    textColor: "text-white",
    mutedColor: "text-zinc-500",
    accentBadge: "bg-white text-black font-bold font-mono",
    accentDot: "bg-white",
    vibe: "Pure High-Density Code — Uncompromising, computational, stark.",
  },
  {
    id: "dir-6",
    name: "06. Midnight Indigo & Cyan Terminal",
    tagline: "Deep midnight indigo #070913 canvas, electric cyan data highlights (#06B6D4), and translucent glass cards.",
    canvasBg: "bg-[#070913]",
    cardBg: "bg-[#0F1424] border border-cyan-500/20 shadow-[0_10px_40px_rgba(6,182,212,0.08)]",
    headingFont: "font-sans font-normal tracking-tight",
    textColor: "text-cyan-50",
    mutedColor: "text-slate-400",
    accentBadge: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono",
    accentDot: "bg-cyan-400",
    vibe: "Cloud & Infrastructure Developer — Electric, precise, modern.",
  },
  {
    id: "dir-7",
    name: "07. Matte Charcoal & Burnt Terracotta",
    tagline: "Rich matte charcoal #121214 canvas, warm bone typography (#E6E4DF), and burnt terracotta accent rules (#E05A47).",
    canvasBg: "bg-[#121214]",
    cardBg: "bg-[#1A1A1E] border border-stone-800 shadow-xl",
    headingFont: "font-sans font-light tracking-tight",
    textColor: "text-[#E6E4DF]",
    mutedColor: "text-stone-400",
    accentBadge: "bg-[#E05A47]/10 text-[#E05A47] border border-[#E05A47]/30 font-mono",
    accentDot: "bg-[#E05A47]",
    vibe: "Editorial Engineering Studio — Tactile, grounded, architectural.",
  },
  {
    id: "dir-8",
    name: "08. Cyber-Minimal Solar Flare",
    tagline: "Pitch black #040404 canvas, crisp white display titles, and intense Solar Flare Yellow (#FACC15) badges.",
    canvasBg: "bg-[#040404]",
    cardBg: "bg-zinc-900/90 border border-yellow-500/20 shadow-2xl",
    headingFont: "font-sans font-extrabold tracking-tighter uppercase",
    textColor: "text-white",
    mutedColor: "text-zinc-400",
    accentBadge: "bg-yellow-400/10 text-yellow-300 border border-yellow-400/40 font-mono",
    accentDot: "bg-yellow-400",
    vibe: "High-Performance AI Engineer — High contrast, kinetic, confident.",
  },
  {
    id: "dir-9",
    name: "09. Deep Quartz & Violet Glow",
    tagline: "Dark quartz #0D0A14 canvas, soft purple surface elevation (#181226), and radiant Violet glow boundaries.",
    canvasBg: "bg-[#0D0A14]",
    cardBg: "bg-[#181226] border border-purple-500/30 shadow-[0_12px_45px_rgba(168,85,247,0.12)]",
    headingFont: "font-sans font-light tracking-tight",
    textColor: "text-purple-50",
    mutedColor: "text-purple-200/60",
    accentBadge: "bg-purple-500/20 text-purple-300 border border-purple-400/40 font-mono",
    accentDot: "bg-purple-400",
    vibe: "Creative Technologist & UI Engineer — Rich, immersive, polished.",
  },
  {
    id: "dir-10",
    name: "10. Minimal Platinum & Gunmetal",
    tagline: "Clean platinum gray #EFEFEF canvas, gunmetal black typography (#111113), crisp white cards, and zero color noise.",
    canvasBg: "bg-[#EFEFEF]",
    cardBg: "bg-white border border-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
    headingFont: "font-sans font-normal tracking-tight",
    textColor: "text-[#111113]",
    mutedColor: "text-zinc-500",
    accentBadge: "bg-zinc-100 text-zinc-900 border border-zinc-300 font-mono font-medium",
    accentDot: "bg-zinc-900",
    vibe: "Minimalist Scandinavian Software Studio — Pristine, light, methodical.",
  },
];

export function VisualDirectionsPreviewBoard() {
  const [selectedDirection, setSelectedDirection] = useState(DIRECTIONS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`Selected Direction: ${selectedDirection.name}\n${selectedDirection.tagline}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col font-sans antialiased select-none">
      
      {/* Top Fixed Control Deck */}
      <header className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 sm:px-8 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#af5bf0]" />
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                Visual Directions Workshop Studio (10 Architectural Worlds)
              </h1>
              <p className="text-xs text-zinc-400 font-mono">
                Click any tab below to test real Hero, Project Card, and Contact Action renders live on this page.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Selection Saved!" : "Confirm Selection"}</span>
          </button>
        </div>

        {/* 10 Tab Switcher Rail */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
          {DIRECTIONS.map((dir) => (
            <button
              key={dir.id}
              onClick={() => setSelectedDirection(dir)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
                selectedDirection.id === dir.id
                  ? "bg-white text-black font-bold shadow-xl scale-[1.03]"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/10"
              }`}
            >
              {dir.name.split(". ")[1]}
            </button>
          ))}
        </div>
      </header>

      {/* Main Canvas Viewport Area */}
      <div className={`w-full flex-1 transition-colors duration-700 p-6 sm:p-12 md:p-20 ${selectedDirection.canvasBg}`}>
        <div className="max-w-6xl mx-auto flex flex-col gap-20">
          
          {/* Active Direction Master Header */}
          <div className="flex flex-col gap-3 pb-10 border-b border-current opacity-25">
            <span className={`text-xs font-mono tracking-[0.25em] uppercase ${selectedDirection.mutedColor}`}>
              Active Direction ID: {selectedDirection.id} &nbsp;—&nbsp; {selectedDirection.name}
            </span>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl ${selectedDirection.headingFont} ${selectedDirection.textColor}`}>
              {selectedDirection.tagline}
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <span className={`text-xs font-mono ${selectedDirection.accentBadge} px-3 py-1 rounded-md`}>
                Personality: {selectedDirection.vibe}
              </span>
            </div>
          </div>

          {/* Section 1: Hero Render Preview */}
          <div className="flex flex-col gap-6">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${selectedDirection.mutedColor}`}>
              01 &nbsp;—&nbsp; Hero Section Render
            </span>
            
            <div className={`p-8 sm:p-14 rounded-3xl ${selectedDirection.cardBg} flex flex-col gap-8`}>
              <div className="flex items-center justify-between border-b border-current pb-4 opacity-20">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${selectedDirection.accentDot} animate-pulse`} />
                  <span className={`text-xs font-mono uppercase tracking-widest ${selectedDirection.textColor}`}>
                    Umer Qureshi • Portfolio System
                  </span>
                </div>
                <span className={`text-xs font-mono uppercase tracking-widest ${selectedDirection.mutedColor}`}>
                  Available 2026
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <span className={`text-xs font-mono uppercase tracking-[0.3em] ${selectedDirection.mutedColor}`}>
                  Software Engineer & Full-Stack Developer
                </span>
                <h3 className={`text-4xl sm:text-6xl md:text-8xl ${selectedDirection.headingFont} ${selectedDirection.textColor}`}>
                  Engineering <span className="underline underline-offset-8">Precision.</span>
                </h3>
              </div>

              <p className={`text-base sm:text-xl max-w-2xl font-light leading-relaxed ${selectedDirection.mutedColor}`}>
                Handcrafted full-stack web architectures, performance-focused motion engineering, and high-contrast UI design systems built without corporate fluff.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <button type="button" className={`px-6 py-3 rounded-xl text-xs font-mono font-bold tracking-wider ${selectedDirection.accentBadge}`}>
                  View Selected Works
                </button>
                <button type="button" className={`px-6 py-3 rounded-xl text-xs font-mono ${selectedDirection.mutedColor} border border-current opacity-40`}>
                  Download CV (PDF)
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Featured Project Card Render Preview */}
          <div className="flex flex-col gap-6">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${selectedDirection.mutedColor}`}>
              02 &nbsp;—&nbsp; Featured Project Card Render
            </span>
            
            <div className={`group p-8 sm:p-10 rounded-3xl ${selectedDirection.cardBg} flex flex-col gap-8 transition-all duration-500`}>
              <div className="flex items-center justify-between border-b border-current pb-4 opacity-20">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${selectedDirection.accentDot}`} />
                  <span className={`text-xs font-mono tracking-[0.2em] uppercase ${selectedDirection.textColor}`}>
                    01 • FEATURED SHOWCASE
                  </span>
                </div>
                <span className={`text-xs font-mono uppercase ${selectedDirection.mutedColor}`}>
                  E-Commerce & Design
                </span>
              </div>

              {/* Cover Image Frame */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 border border-current opacity-30">
                <Image
                  src={PROJECTS[0]?.coverImage || "/placeholder.jpg"}
                  alt="Project Preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-xl">
                  <h4 className={`text-3xl sm:text-5xl ${selectedDirection.headingFont} ${selectedDirection.textColor}`}>
                    {PROJECTS[0]?.title || "ADHURA — Luxury E-Commerce"}
                  </h4>
                  <p className={`text-sm sm:text-base ${selectedDirection.mutedColor}`}>
                    {PROJECTS[0]?.tagline || "Full-stack luxury e-commerce experience with custom motion engineering and real-time inventory hooks."}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {["Next.js 15", "TypeScript", "Tailwind", "Framer Motion"].map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-md text-xs font-mono ${selectedDirection.accentBadge}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Action Stage Preview */}
          <div className="flex flex-col gap-6 pb-24">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${selectedDirection.mutedColor}`}>
              03 &nbsp;—&nbsp; Contact Action Stage Render
            </span>

            <div className={`p-8 sm:p-12 rounded-3xl ${selectedDirection.cardBg} flex flex-col md:flex-row items-center justify-between gap-8`}>
              <div className="flex flex-col gap-3">
                <span className={`text-xs font-mono uppercase tracking-widest ${selectedDirection.mutedColor}`}>
                  Primary Direct Inbox
                </span>
                <span className={`text-2xl sm:text-4xl md:text-5xl ${selectedDirection.headingFont} ${selectedDirection.textColor}`}>
                  {CONTACT_DATA.email}
                </span>
              </div>
              <button
                type="button"
                className={`px-8 py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase cursor-pointer ${selectedDirection.accentBadge}`}
              >
                Copy Address
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
