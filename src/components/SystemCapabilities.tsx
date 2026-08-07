"use client";

import { Cpu, Layers, Terminal } from "lucide-react";

export function SystemCapabilities() {
  return (
    <section id="capabilities" className="w-full py-24 bg-[#050B14] blueprint-grid border-b border-[#1E293B] px-6 md:px-16 xl:px-24">
      <div className="max-w-[1700px] mx-auto">
        <div className="mb-16 border-b border-[#1E293B] pb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#FF2E00] uppercase tracking-widest mb-2">
              [ SECTION_03 // ARCHITECTURAL_CAPABILITIES ]
            </div>
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-[#F1F5F9]">
              SYSTEM ARCHITECTURE & CAPABILITIES
            </h2>
          </div>
          <span className="hidden md:inline font-mono text-xs text-slate-500">[ MODULAR_SPEC ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]">
          {/* Column 1 */}
          <div className="space-y-4 pr-4 pt-4 md:pt-0">
            <div className="flex items-center gap-3 text-[#FF2E00]">
              <Cpu className="w-5 h-5" />
              <span className="font-mono text-xs font-semibold tracking-widest">[ 01 // CORE_ENGINEERING ]</span>
            </div>
            <h3 className="text-2xl font-display uppercase text-white">LOW-LEVEL FRONTEND ENGINES</h3>
            <p className="text-slate-400 font-mono text-xs leading-relaxed max-w-[45ch]">
              Custom WebGL shaders, Canvas 2D render loops, Flutter native mobile architectures, and C++ game simulation engines.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4 md:px-8 pt-6 md:pt-0">
            <div className="flex items-center gap-3 text-[#FF2E00]">
              <Layers className="w-5 h-5" />
              <span className="font-mono text-xs font-semibold tracking-widest">[ 02 // INTERACTION_CRAFT ]</span>
            </div>
            <h3 className="text-2xl font-display uppercase text-white">SPATIAL MOTION PHYSICS</h3>
            <p className="text-slate-400 font-mono text-xs leading-relaxed max-w-[45ch]">
              Hardware-accelerated GSAP timelines, Framer Motion springs, view transitions, and 60fps responsive layout orchestration.
            </p>
          </div>

          {/* Column 3 */}
          <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
            <div className="flex items-center gap-3 text-[#FF2E00]">
              <Terminal className="w-5 h-5" />
              <span className="font-mono text-xs font-semibold tracking-widest">[ 03 // SYSTEM_DESIGN ]</span>
            </div>
            <h3 className="text-2xl font-display uppercase text-white">DESIGN SYSTEM MONOGRAPHS</h3>
            <p className="text-slate-400 font-mono text-xs leading-relaxed max-w-[45ch]">
              Industrial print brutalism, strict OKLCH token systems, accessibility compliance, and anti-generic visual identity frameworks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
