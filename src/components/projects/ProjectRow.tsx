"use client";

import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  isHovered: boolean;
  onHover: (slug: string) => void;
  onLeave: (slug: string) => void;
  onSelect: (project: Project) => void;
}

export function ProjectRow({
  project,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: ProjectRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      onMouseEnter={() => onHover(project.slug)}
      onMouseLeave={() => onLeave(project.slug)}
      onFocus={() => onHover(project.slug)}
      onBlur={() => onLeave(project.slug)}
      className="compact-row-item group relative w-full py-4 sm:py-5 border-b border-white/[0.04] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/20 transition-colors duration-300 hover:bg-white/[0.02] light-mode:hover:bg-black/[0.02]"
    >
      {/* Violet left indicator — draws down from top with cubic-bezier ease-out */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r bg-[#af5bf0] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered
            ? "opacity-100 scale-y-100 translate-y-[-50%]"
            : "opacity-0 scale-y-0 translate-y-[-80%]"
        }`}
      />

      <div className="relative flex items-center justify-between gap-4 pl-3 sm:pl-5 pr-1 sm:pr-2">
        {/* Left: Index + Title with subtle reactive horizontal shift on hover */}
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="row-index font-mono text-xs tracking-[0.2em] text-zinc-600 light-mode:text-zinc-400 group-hover:text-zinc-300 light-mode:group-hover:text-zinc-600 transition-colors duration-300 shrink-0 w-6 tabular-nums select-none">
            {project.index}
          </span>
          <h3 className="row-title text-sm sm:text-base font-light tracking-tight text-zinc-300 light-mode:text-zinc-600 group-hover:text-white light-mode:group-hover:text-zinc-900 group-hover:translate-x-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] truncate">
            {project.title}
          </h3>
        </div>

        {/* Right: Category + Year + Arrow */}
        <div className="flex items-center gap-6 shrink-0">
          <span className="row-meta hidden sm:block text-xs font-mono tracking-[0.12em] text-zinc-500 light-mode:text-zinc-400 group-hover:text-zinc-300 light-mode:group-hover:text-zinc-600 transition-colors duration-300 uppercase">
            {project.category}
          </span>
          <span className="row-meta text-xs font-mono tabular-nums text-zinc-500 light-mode:text-zinc-400 group-hover:text-zinc-400 light-mode:group-hover:text-zinc-600 transition-colors duration-300">
            {project.year}
          </span>
          <ArrowUpRight
            className={`row-arrow w-4 h-4 transition-all duration-300 ${
              isHovered
                ? "opacity-100 text-[#af5bf0] translate-x-0.5 -translate-y-0.5"
                : "opacity-40 text-zinc-600 light-mode:text-zinc-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
