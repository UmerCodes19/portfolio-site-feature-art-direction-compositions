"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Project, PROJECTS } from "@/data/projects";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectRow } from "./ProjectRow";

const CursorPreview = dynamic(
  () => import("./CursorPreview").then((mod) => mod.CursorPreview),
  { ssr: false }
);

const ProjectDetailModal = dynamic(
  () => import("./ProjectDetailModal").then((mod) => mod.ProjectDetailModal),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURED_SLUGS = ["adhura", "querytalk", "trace"];

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

  const displayOrderedProjects = [...featured, ...remaining];

  const getDisplayIndex = (project: Project): string => {
    const idx = displayOrderedProjects.findIndex((p) => p.slug === project.slug);
    return idx >= 0 ? String(idx + 1).padStart(2, "0") : project.index;
  };

  const activeProject =
    remaining.find((p) => p.slug === hoveredSlug) || null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const handleImagesLoaded = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleImagesLoaded);
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const headerTitle = headerRef.current.querySelector(".header-title");

        if (headerTitle) {
          gsap.fromTo(
            headerTitle,
            { opacity: 0, y: 24, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

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
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 md:mb-24 pb-8 border-b border-white/[0.06]">
        <h2 className="header-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-[#FAFAFA] leading-[0.96] opacity-0">
          Selected <span className="italic font-extralight text-zinc-400">Works.</span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase select-none hidden md:block pb-2">
          {projects.length} Works (2023 — 2026)
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
              displayIndex={getDisplayIndex(featured[0])}
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
                  displayIndex={getDisplayIndex(project)}
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
              displayIndex={getDisplayIndex(project)}
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
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          displayIndex={getDisplayIndex(selectedProject)}
          onClose={() => setSelectedProject(null)}
          isReducedMotion={isReducedMotion}
        />
      )}
    </div>
  );
}
