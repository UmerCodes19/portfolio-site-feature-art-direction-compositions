"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, PROJECTS } from "@/data/projects";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectRow } from "./ProjectRow";
import { CursorPreview } from "./CursorPreview";
import { ProjectDetailModal } from "./ProjectDetailModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURED_SLUGS = ["adhura", "algorhythms", "trace"];

interface ProjectsListClientProps {
  projects?: Project[];
}

export function ProjectsListClient({
  projects = PROJECTS,
}: ProjectsListClientProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isReducedMotion = useReducedMotion() ?? false;

  const featured = FEATURED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter(Boolean) as Project[];
  const remaining = projects.filter(
    (p) => !FEATURED_SLUGS.includes(p.slug)
  );

  const activeProject =
    remaining.find((p) => p.slug === hoveredSlug) || null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    // Load safety check: ensure ScrollTrigger recalculates after images load
    const handleImagesLoaded = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleImagesLoaded);
    }

    const ctx = gsap.context(() => {
      // 0. Section Header Entrance
      if (headerRef.current) {
        const headerNum = headerRef.current.querySelector(".header-num");
        const headerTitle = headerRef.current.querySelector(".header-title");

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        if (headerNum) {
          headerTl.fromTo(
            headerNum,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        }

        if (headerTitle) {
          headerTl.fromTo(
            headerTitle,
            { opacity: 0, y: 24, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
            "-=0.3"
          );
        }
      }

      // 1. Featured Cards: Directional Clip Wipes, Scale Reveal & Staggered Micro Tag Sequence
      const cards = featuredRef.current?.querySelectorAll(".featured-card-item");
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          const imageWrap = card.querySelector(".featured-image-wrap");
          const imageInner = card.querySelector(".featured-image-inner");
          const textBlock = card.querySelector(".featured-text-block");
          const tags = card.querySelectorAll(".featured-tag");

          if (!imageWrap || !textBlock) return;

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          // Single-direction Top-to-Bottom Mask Wipe: inset(0 0 100% 0) -> inset(0 0 0 0)
          cardTl.fromTo(
            imageWrap,
            { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, scale: 0.98 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              scale: 1,
              duration: 1.15,
              ease: "power3.inOut",
            }
          );

          // Text block reveal with subtle blur transition
          cardTl.fromTo(
            textBlock,
            { opacity: 0, y: 28, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.6"
          );

          // Staggered tag arrival sequence
          if (tags.length > 0) {
            cardTl.fromTo(
              tags,
              { opacity: 0, y: 10, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.4"
            );
          }

          // True Internal Image Window Parallax (smooth scrubbed movement)
          if (imageInner) {
            gsap.fromTo(
              imageInner,
              { y: "-18%" },
              {
                y: "18%",
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          }
        });
      }

      // 2. Compact Index Rows: Clean Staggered Cascade
      const rowItems = indexRef.current?.querySelectorAll(".compact-row-item");
      if (rowItems && rowItems.length > 0) {
        gsap.fromTo(
          rowItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: indexRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => {
      window.removeEventListener("load", handleImagesLoaded);
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <div
      onMouseMove={handleMouseMove}
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header with entrance animation */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 md:mb-24 pb-8 border-b border-white/[0.06]">
        <div className="flex flex-col gap-2">
          <span className="header-num font-mono text-xs font-medium tracking-[0.28em] uppercase text-zinc-500 select-none opacity-0">
            01 &nbsp;—&nbsp; Selected Works
          </span>
          <h2 className="header-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-[#FAFAFA] leading-[0.96] opacity-0">
            Selected <span className="italic font-extralight text-zinc-400">Works.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-zinc-400 tracking-[0.2em] uppercase select-none hidden md:block">
          {projects.length} Index Entries (2023 — 2026)
        </p>
      </div>

      {/* Featured Projects */}
      <div
        ref={featuredRef}
        className="flex flex-col gap-16 md:gap-20 mb-24 md:mb-32"
      >
        {featured[0] && (
          <div>
            <FeaturedProjectCard
              project={featured[0]}
              onSelect={setSelectedProject}
              variant="full"
            />
          </div>
        )}

        {featured.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {featured.slice(1).map((project) => (
              <div key={project.slug}>
                <FeaturedProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  variant="half"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compact Index */}
      <div ref={indexRef} className="flex flex-col">
        {remaining.map((project) => (
          <div key={project.slug}>
            <ProjectRow
              project={project}
              isHovered={hoveredSlug === project.slug}
              onHover={setHoveredSlug}
              onLeave={() => setHoveredSlug(null)}
              onSelect={setSelectedProject}
            />
          </div>
        ))}
      </div>

      {/* Cursor-following preview */}
      <CursorPreview
        activeProject={activeProject}
        mouseX={mouseX}
        mouseY={mouseY}
        isReducedMotion={isReducedMotion}
      />

      {/* Detail modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isReducedMotion={isReducedMotion}
      />
    </div>
  );
}
