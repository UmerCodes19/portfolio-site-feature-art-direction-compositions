"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, MotionValue, useTransform } from "framer-motion";
import { Project } from "@/data/projects";

interface CursorPreviewProps {
  activeProject: Project | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isReducedMotion: boolean;
}

export function CursorPreview({
  activeProject,
  mouseX,
  mouseY,
  isReducedMotion,
}: CursorPreviewProps) {
  const [isPointerFine, setIsPointerFine] = useState(false);

  // Magnetic spring physics: responsive tracking with subtle physical momentum
  // Stiffness 120, Damping 26, Mass 0.9 produces an organic spring follow
  const springConfig = {
    stiffness: 120,
    damping: 26,
    mass: 0.9,
  };

  // Fixed top-right offset from cursor (120px right, -40px up)
  const targetX = useTransform(mouseX, (x) => {
    if (typeof window === "undefined") return x + 120;
    const cardWidth = 340;
    if (x + 120 + cardWidth > window.innerWidth - 32) {
      return x - cardWidth - 30;
    }
    return x + 120;
  });

  const targetY = useTransform(mouseY, (y) => y - 40);

  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isPointerFine || isReducedMotion) return null;

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)", y: 8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x: smoothX,
            y: smoothY,
            pointerEvents: "none",
            zIndex: 40,
          }}
          className="hidden md:block w-84 h-52 lg:w-92 lg:h-56"
        >
          {/* Frameless floating card with hairline border, soft shadow & dark glass overlay */}
          <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-950/95 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative">
            <div className="relative w-full h-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeProject.coverImage}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 336px, 368px"
                    className="object-cover brightness-[0.92] contrast-[1.05]"
                  />

                  {/* Top vignette overlay for optical depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Redesigned bottom metadata strip — ultra-clean editorial layout */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md border-t border-white/10">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 tabular-nums shrink-0 font-medium">
                        {activeProject.index}
                      </span>
                      <h4 className="text-xs font-medium tracking-tight text-white truncate">
                        {activeProject.title}
                      </h4>
                    </div>
                    
                    <span className="text-xs font-mono tracking-[0.16em] uppercase text-zinc-400 shrink-0 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-md">
                      {activeProject.category}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
