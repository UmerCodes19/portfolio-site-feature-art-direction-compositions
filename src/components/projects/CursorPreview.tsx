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
          {/* Clean frameless floating image with subtle image crossfade */}
          <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              >
                <Image
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  fill
                  sizes="(max-width: 1024px) 336px, 368px"
                  className="object-cover rounded-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
