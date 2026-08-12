"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Tag,
  Calendar,
  UserCheck,
  Layers,
  AlertCircle,
  Zap,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { Project } from "@/data/projects";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  isReducedMotion: boolean;
  displayIndex?: string;
}

export function ProjectDetailModal({
  project,
  onClose,
  isReducedMotion,
  displayIndex,
}: ProjectDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentImage =
    project.images && project.images.length > 0
      ? project.images[selectedImageIndex] || project.coverImage
      : project.coverImage;

  const hasCTAs = Boolean(project.liveUrl || project.repoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
          <div className="bg-[#0a0a0a] rounded-[calc(2rem-0.5rem)] p-6 sm:p-8 md:p-10 border border-white/5 flex flex-col gap-8 relative overflow-hidden text-white">
            {/* Top Bar Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-900">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs tracking-widest text-zinc-400 font-semibold uppercase">
                    {displayIndex || project.index} &nbsp;—&nbsp; {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs uppercase font-mono tracking-wider bg-zinc-900 text-zinc-400 border border-white/5 font-medium">
                    {project.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide bg-[#af5bf0]/10 text-[#af5bf0] border border-[#af5bf0]/30 flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3 h-3 text-[#af5bf0]" />
                    {project.role}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {project.logoUrl && (
                    <div className="relative w-9 h-9 rounded-md overflow-hidden bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={project.logoUrl}
                        alt={`${project.title} logo`}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h2
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white"
                  >
                    {project.title}
                  </h2>
                </div>
                <p className="text-sm font-mono text-zinc-400 font-normal mt-0.5">
                  {project.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close detail view"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Featured Image Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden flex items-center justify-center rounded-2xl bg-zinc-950 border border-white/5">
              <Image
                src={currentImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain rounded-2xl"
              />
            </div>

            {/* Image Gallery Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {project.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-white ring-2 ring-white/20 opacity-100"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Case Study Arc Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Problem */}
                {project.problem && (
                  <div className="flex flex-col gap-3 p-5 rounded-2xl bg-zinc-900/40 border border-red-500/10">
                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      Problem & Context
                    </div>
                    <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Approach */}
                {project.approach && (
                  <div className="flex flex-col gap-3 p-5 rounded-2xl bg-zinc-900/40 border border-purple-500/10">
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                      <Zap className="w-4 h-4 text-purple-400" />
                      System Architecture
                    </div>
                    <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                )}

                {/* Key Decisions */}
                {project.keyDecisions && project.keyDecisions.length > 0 && (
                  <div className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-cyan-500/10">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      Key Technical Decisions
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-1">
                      {project.keyDecisions.map((decision, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outcomes */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-emerald-500/10">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Key Metrics
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-2.5 font-medium"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 h-fit">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-zinc-400 flex items-center gap-2 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-zinc-300" /> Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800 border border-white/5 text-zinc-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Domain</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-zinc-400" /> {project.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Year</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-zinc-400" /> {project.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Role</span>
                    <span className="text-[#af5bf0] font-medium flex items-center gap-1.5">
                      <UserCheck className="w-3 h-3 text-[#af5bf0]" /> {project.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            {hasCTAs && (
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-900 flex-wrap">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all duration-300 group cursor-pointer"
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
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 text-white border border-white/10 font-medium text-sm hover:bg-zinc-800 transition-all duration-300 group cursor-pointer"
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
