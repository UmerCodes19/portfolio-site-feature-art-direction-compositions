"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Tag, Layers } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { Project } from "@/data/projects";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  isReducedMotion: boolean;
}

export function ProjectDetailModal({
  project,
  onClose,
  isReducedMotion,
}: ProjectDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store active focused element before modal opens so focus returns on close
  useEffect(() => {
    if (project) {
      triggerRef.current = document.activeElement as HTMLElement;
      setSelectedImageIndex(0);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [project]);

  // Handle Escape key & trap focus
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.images[selectedImageIndex] || project.coverImage;
  const hasCTAs = Boolean(project.liveUrl || project.repoUrl);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl z-40 cursor-pointer"
        />

        {/* Double-Bezel Hardware Modal Shell */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={
            isReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 20 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            isReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.95, y: 20 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 w-full max-w-4xl max-h-[90vh] bg-zinc-950/95 border border-white/15 rounded-[2rem] p-2 md:p-3 shadow-2xl overflow-y-auto custom-scrollbar"
        >
          {/* Inner Core Enclosure */}
          <div className="bg-[#0a0a0a] rounded-[calc(2rem-0.5rem)] p-6 sm:p-8 md:p-10 border border-white/5 flex flex-col gap-8 relative overflow-hidden">
            {/* Top Bar Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-900">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-zinc-400 font-semibold uppercase">
                    {project.index} &nbsp;—&nbsp; {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs uppercase font-mono tracking-wider bg-zinc-900 text-zinc-400 border border-white/5">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {project.logoUrl && (
                    <div className="relative w-8 h-8 rounded-md overflow-hidden bg-zinc-900 border border-white/10 p-1 flex items-center justify-center">
                      <Image
                        src={project.logoUrl}
                        alt={`${project.title} logo`}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h2
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
                  >
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close detail view"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-white/20 transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Featured Image Container with Shared Layout Morph */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 group">
              <Image
                src={currentImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain bg-black/90 p-2 sm:p-4"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
            </div>

            {/* Image Gallery Thumbnails if multiple images exist */}
            {project.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {project.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-white ring-2 ring-white/20 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description & Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
              <div className="lg:col-span-2 flex flex-col gap-4">
                <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-zinc-500">
                  Project Brief & Visual Analysis
                </h4>
                <p className="text-base text-zinc-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Sidebar Info */}
              <div className="flex flex-col gap-6 p-5 rounded-xl bg-zinc-900/50 border border-white/5">
                {/* Tech Stack */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-zinc-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-zinc-300" /> Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800 border border-white/5 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain & Year */}
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-4 border-t border-zinc-800">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-zinc-300" /> {project.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-300" /> {project.year}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button Row (Rendered ONLY if liveUrl or repoUrl exist) */}
            {hasCTAs && (
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-900 flex-wrap">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all duration-300 group"
                  >
                    <span>Visit Live Site</span>
                    <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 text-white border border-white/10 font-medium text-sm hover:bg-zinc-800 transition-all duration-300 group"
                  >
                    <span>View Repository</span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <FiGithub className="w-3.5 h-3.5 text-white" />
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
