"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface FeaturedProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  variant: "full" | "half";
  displayIndex?: string;
}

export function FeaturedProjectCard({
  project,
  onSelect,
  variant,
  displayIndex,
}: FeaturedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isGif = project.coverImage.endsWith(".gif");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="featured-card-item group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#af5bf0]"
    >
      {/* Media Window Enclosure */}
      <div
        ref={imageRef}
        className="featured-image-wrap relative w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden flex items-center justify-center rounded-2xl bg-[#121212]">
          <div className="featured-image-inner relative w-full h-full will-change-transform flex items-center justify-center rounded-2xl overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority={variant === "full"}
              unoptimized={isGif}
              sizes={
                variant === "full"
                  ? "(max-width: 768px) 100vw, 1280px"
                  : "(max-width: 768px) 100vw, 640px"
              }
              style={{
                animationPlayState:
                  isGif && !prefersReducedMotion && !isHovered
                    ? "paused"
                    : "running",
              }}
              className="object-contain rounded-2xl group-hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </div>
        </div>
      </div>

      {/* Content Block */}
      <div
        ref={textRef}
        className="featured-text-block pt-6 sm:pt-8 flex flex-col gap-3 opacity-0 transform translate-y-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 font-medium select-none">
                {displayIndex || project.index}
              </span>
              <span className="text-zinc-600 font-mono text-xs">•</span>
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400 font-medium">
                {project.category}
              </span>
            </div>
            
            <h3
              className={`font-light tracking-[-0.03em] text-zinc-100 group-hover:text-white transition-colors duration-500 ${
                variant === "full"
                  ? "text-3xl sm:text-4xl md:text-5xl leading-[1.04]"
                  : "text-2xl sm:text-3xl leading-[1.1]"
              }`}
            >
              {project.title}
            </h3>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#af5bf0]/40 group-hover:bg-[#af5bf0]/10 flex items-center justify-center shrink-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#af5bf0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`font-light leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 ${
            variant === "full"
              ? "text-base sm:text-lg max-w-[64ch]"
              : "text-sm sm:text-base max-w-[50ch]"
          }`}
        >
          {project.tagline}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="featured-tag inline-block text-xs font-mono tracking-[0.14em] uppercase text-zinc-400 bg-white/[0.03] border border-white/[0.06] group-hover:border-white/[0.12] px-2.5 py-1 rounded-md transition-all duration-300 opacity-0 transform translate-y-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
