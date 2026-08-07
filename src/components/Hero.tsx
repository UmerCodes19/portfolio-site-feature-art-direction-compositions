"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { HandwrittenSignature } from "@congresswiki/handwritten-signature";
import { ShinyTextEffect } from "./effects/ShinyTextEffect";
import { AuroraTextEffect } from "./effects/AuroraTextEffect";
import { GlitchTextEffect } from "./effects/GlitchTextEffect";
import { ScrambleTextEffect } from "./effects/ScrambleTextEffect";
import { BlurTextEffect } from "./effects/BlurTextEffect";
import { DualToneGlareEffect } from "./effects/DualToneGlareEffect";
import { TextPressureEffect } from "./effects/TextPressureEffect";
import { VariableProximityEffect } from "./effects/VariableProximityEffect";
import { WavyTextEffect } from "./effects/WavyTextEffect";
import { LetterPullUpEffect } from "./effects/LetterPullUpEffect";
import { LiquidMorphTextEffect } from "./effects/LiquidMorphTextEffect";
import { SparklesTextEffect } from "./effects/SparklesTextEffect";
import { SplitGlyphRevealEffect } from "./effects/SplitGlyphRevealEffect";
import { ThreeDTextEffect } from "./effects/ThreeDTextEffect";
import { TrueFocusEffect } from "./effects/TrueFocusEffect";
import { TypewriterTextEffect } from "./effects/TypewriterTextEffect";
import { InkSpreadBloomEffect } from "./effects/InkSpreadBloomEffect";
import { ElasticTextEffect } from "./effects/ElasticTextEffect";
import { BaselineWaveDistortionEffect } from "./effects/BaselineWaveDistortionEffect";
import { EditorialTypographicScramble } from "./effects/EditorialTypographicScramble";
import { TextVelocitySkewEffect } from "./effects/TextVelocitySkewEffect";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { FlipWordsEffect } from "./effects/FlipWordsEffect";
import { Circular3DRotatorEffect } from "./effects/Circular3DRotatorEffect";
import { StaggeredLetterMorphEffect } from "./effects/StaggeredLetterMorphEffect";
import { ShimmerFadeTextRotator } from "./effects/ShimmerFadeTextRotator";
import { LetterSwapForward } from "./effects/LetterSwapForward";
import { LetterSwapPingPong } from "./effects/LetterSwapPingPong";
import { Letter3DSwap } from "./effects/Letter3DSwap";
import { TextRotate } from "./effects/TextRotate";
import { PulsatingLightRotatorEffect } from "./effects/PulsatingLightRotatorEffect";

// Full Config Interface for Typography Playground
interface TypographyPlaygroundConfig {
  // Font
  fontFamily: string;
  fontWeight: number;
  fontSizeVw: number;
  lineHeight: number;
  letterSpacing: number; // em
  wordSpacing: number; // px
  strokeWidth: number; // px thickness outline/stroke
  strokeColor: string;
  
  // Transform
  scaleX: number;
  scaleY: number;
  translateX: number; // vw
  translateY: number; // vh
  rotate: number; // deg
  skewX: number; // deg
  skewY: number; // deg
  
  // Appearance & Color
  textColor: string;
  opacity: number;
  blur: number; // px
  brightness: number; // %
  contrast: number; // %
  saturation: number; // %
  blendMode: string;
  shadowBlur: number; // px
  shadowColor: string;

  // Masking
  maskStart: number; // %
  maskEnd: number; // %
  maskHorizontal: number; // %
  maskSoftness: number; // %

  // Composition
  containerWidth: number; // %
  containerOverflow: "hidden" | "visible";

  // Portrait Alignment
  portraitX: number; // px
  portraitY: number; // px
  portraitScale: number;
  portraitRotate: number;
  portraitZIndex: number;

  // Grain
  grainOpacity: number;
  grainScale: number;

  // Parallax Toggle
  enableParallax: boolean;

  // Environment Toggles
  theme: "dark" | "light";
  bgType: "black" | "dark-gray" | "light-gray" | "white" | "transparent";
  viewportDevice: "desktop" | "laptop" | "tablet" | "mobile";
  zoomLevel: number; // e.g. 1.0, 1.25

  // Signature & Overlay Controls
  signatureFont: string;
  signatureColor: string;
  signatureFontSize: number;
  signatureOffsetX: number;
  signatureOffsetY: number;
  signatureScaleX: number;
  signatureScaleY: number;
  signatureGlow: number;
  signatureGlowColor: string;
  signatureDurationMs: number;
  signatureInitialDelayMs: number;
  signatureStrokeWidth: number;
  signatureOverlapRatio: number;

  roleFontSize: number;
  roleLetterSpacing: number;
  roleFontWeight: number;
  roleOffsetX: number;
  roleOffsetY: number;
  roleGap: number;

  ctaFontSize: number;
  ctaLetterSpacing: number;
  ctaOffsetX: number;
  ctaOffsetY: number;
  ctaArrowGap: number;

  // Visibility Toggles
  showSignature: boolean;
  showRoles: boolean;
  showCTA: boolean;

  // Background Text Effect
  bgTextEffect:
    | "none"
    | "pulsating-light"
    | "shimmer-fade"
    | "gooey"
    | "letter-3d-swap"
    | "fancy-text-rotate"
    | "barrel-roll"
    | "stagger-flip"
    | "flip-3d"
    | "shiny"
    | "aurora"
    | "glitch"
    | "scramble"
    | "dual-tone";
}

// Curated Font Library — Poster & Condensed Architectural Fonts
const FONT_LIBRARY = [
  { name: "Barlow Condensed (Thin 100 - Black 900)", value: "'Barlow Condensed', sans-serif", category: "Poster Variable Weight" },
  { name: "Fira Sans Extra Condensed (Thin 100 - 900)", value: "'Fira Sans Extra Condensed', sans-serif", category: "Extra Condensed Variable" },
  { name: "Saira Extra Condensed (Ultra Thin Poster)", value: "'Saira Extra Condensed', sans-serif", category: "Poster Ultra Thin" },
  { name: "Teko (Ultra Tall Architectural)", value: "'Teko', sans-serif", category: "Ultra Tall Poster" },
  { name: "League Gothic (Vintage Poster)", value: "'League Gothic', sans-serif", category: "Vintage Display Poster" },
  { name: "Oswald (Thin 200 - Heavy 700)", value: "'Oswald', sans-serif", category: "Architectural Poster" },
  { name: "Bebas Neue (Classic Architectural)", value: "var(--font-bebas), 'Bebas Neue', sans-serif", category: "Architectural Display" },
  { name: "Staatliches (Block Poster)", value: "'Staatliches', sans-serif", category: "Block Display Poster" },
  { name: "Roboto Condensed (Thin 100 - 900)", value: "'Roboto Condensed', sans-serif", category: "Modern Grotesk Variable" },
  { name: "Encode Sans Condensed (100 - 900)", value: "'Encode Sans Condensed', sans-serif", category: "Geometric Variable" },
  { name: "IBM Plex Sans Condensed (100 - 700)", value: "'IBM Plex Sans Condensed', sans-serif", category: "Industrial Corporate" },
  { name: "Archivo Narrow (Narrow 400 - 700)", value: "'Archivo Narrow', sans-serif", category: "Technical Narrow" },
  { name: "Anton (Heavy Impact)", value: "'Anton', sans-serif", category: "Heavy Impact" },
  { name: "Syne (Artistic Display)", value: "'Syne', sans-serif", category: "Artistic Display" },
  { name: "Satoshi (Swiss Minimalist)", value: "'Satoshi', sans-serif", category: "Swiss Minimalist" },
  { name: "Clash Display (Creative Agency)", value: "'Clash Display', sans-serif", category: "Creative Agency" },
  { name: "Cinzel (Classic Roman)", value: "'Cinzel', serif", category: "Classic Roman" },
  { name: "Instrument Serif (Editorial)", value: "'Instrument Serif', serif", category: "Editorial Serif" },
];

// Presets Collection
const PRESETS: Record<string, Partial<TypographyPlaygroundConfig>> = {
  Reference: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 300,
    fontSizeVw: 23.5,
    letterSpacing: 0.02,
    scaleY: 1.4,
    scaleX: 0.92,
    translateX: 0,
    translateY: 2,
    textColor: "#131313",
    opacity: 0.95,
    maskStart: 45,
    maskEnd: 85,
    grainOpacity: 0.1,
    bgType: "black",
  },
  Architectural: {
    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
    fontWeight: 400,
    fontSizeVw: 25,
    letterSpacing: -0.02,
    scaleY: 1.55,
    scaleX: 0.88,
    translateY: 4,
    textColor: "#111111",
    maskStart: 35,
    maskEnd: 90,
  },
  Editorial: {
    fontFamily: "'Instrument Serif', serif",
    fontWeight: 400,
    fontSizeVw: 22,
    letterSpacing: -0.03,
    scaleY: 1.15,
    scaleX: 0.98,
    translateY: 0,
    textColor: "#1a1a1a",
    maskStart: 50,
    maskEnd: 95,
  },
  Minimal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 200,
    fontSizeVw: 24,
    letterSpacing: 0.08,
    scaleY: 1.25,
    scaleX: 0.95,
    textColor: "#161616",
    maskStart: 40,
    maskEnd: 80,
  },
  Swiss: {
    fontFamily: "'Satoshi', sans-serif",
    fontWeight: 700,
    fontSizeVw: 20,
    letterSpacing: -0.04,
    scaleY: 1.1,
    scaleX: 0.95,
    textColor: "#141414",
    maskStart: 55,
    maskEnd: 90,
  },
  Poster: {
    fontFamily: "'Anton', sans-serif",
    fontWeight: 400,
    fontSizeVw: 27,
    letterSpacing: -0.04,
    scaleY: 1.5,
    scaleX: 0.85,
    translateY: 5,
    textColor: "#181818",
    maskStart: 30,
    maskEnd: 75,
  },
  Monochrome: {
    fontFamily: "'Fira Sans Extra Condensed', sans-serif",
    fontWeight: 300,
    fontSizeVw: 24,
    letterSpacing: 0.04,
    scaleY: 1.35,
    scaleX: 0.9,
    textColor: "#121212",
    maskStart: 45,
    maskEnd: 85,
  },
  Luxury: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    fontSizeVw: 21,
    letterSpacing: 0.06,
    scaleY: 1.2,
    scaleX: 0.96,
    textColor: "#1a1a1a",
    maskStart: 50,
    maskEnd: 90,
  },
};

const DEFAULT_PLAYGROUND_CONFIG: TypographyPlaygroundConfig = {
  fontFamily: "'Anton', sans-serif",
  fontWeight: 400,
  fontSizeVw: 27,
  lineHeight: 1,
  letterSpacing: -0.04,
  wordSpacing: 0,
  strokeWidth: 0,
  strokeColor: "#131313",

  scaleX: 0.85,
  scaleY: 1.5,
  translateX: 0,
  translateY: 5,
  rotate: 0,
  skewX: 0,
  skewY: 0,

  textColor: "#181818",
  opacity: 0.95,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blendMode: "normal",
  shadowBlur: 0,
  shadowColor: "#000000",

  maskStart: 30,
  maskEnd: 75,
  maskHorizontal: 100,
  maskSoftness: 10,

  containerWidth: 100,
  containerOverflow: "hidden",

  portraitX: 0,
  portraitY: 0,
  portraitScale: 1,
  portraitRotate: 0,
  portraitZIndex: 30,

  grainOpacity: 0.1,
  grainScale: 0.75,

  enableParallax: false,

  theme: "dark",
  bgType: "black",
  viewportDevice: "desktop",
  zoomLevel: 1.0,

  signatureFont: "'Great Vibes', 'Sacramento', 'Alex Brush', cursive",
  signatureColor: "#af5bf0",
  signatureFontSize: 56,
  signatureOffsetX: 0,
  signatureOffsetY: 0,
  signatureScaleX: 1.0,
  signatureScaleY: 1.0,
  signatureGlow: 18,
  signatureGlowColor: "rgba(175, 91, 240, 0.4)",
  signatureDurationMs: 420,
  signatureInitialDelayMs: 800,
  signatureStrokeWidth: 2,
  signatureOverlapRatio: 0.58,

  roleFontSize: 13,
  roleLetterSpacing: 0.3,
  roleFontWeight: 500,
  roleOffsetX: 0,
  roleOffsetY: 0,
  roleGap: 6,

  ctaFontSize: 11,
  ctaLetterSpacing: 0.25,
  ctaOffsetX: 0,
  ctaOffsetY: 0,
  ctaArrowGap: 10,

  showSignature: true,
  showRoles: false,
  showCTA: true,

  bgTextEffect: "none",
};

// 22 Art Direction Composition Blueprints
interface CompositionBlueprint {
  id: number;
  name: string;
  category: "Monolithic" | "Swiss & Editorial" | "Cinematic & Tension" | "Geometric & Interlock";
  tagline: string;
  bgWord: string;
  config: Partial<TypographyPlaygroundConfig>;
}

const COMPOSITION_BLUEPRINTS: CompositionBlueprint[] = [
  {
    id: 1,
    name: "01. Monolithic Intersect",
    category: "Monolithic",
    tagline: "Centered portrait, signature overlapping chest line, bottom-centered CTA pyramid.",
    bgWord: "DEVELOPER",
    config: {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: 300,
      fontSizeVw: 23,
      scaleX: 0.95,
      scaleY: 1.35,
      translateX: 0,
      translateY: 2,
      portraitX: 0,
      portraitY: 0,
      portraitScale: 1.0,
      portraitRotate: 0,
      signatureOffsetX: 0,
      signatureOffsetY: -20,
      roleOffsetX: 0,
      roleOffsetY: 10,
      ctaOffsetX: 0,
      ctaOffsetY: 20,
      maskStart: 45,
      maskEnd: 85,
    },
  },
  {
    id: 2,
    name: "02. Swiss Brutalist Void",
    category: "Swiss & Editorial",
    tagline: "Portrait pushed left with 60% right negative space and vertical left margin typography.",
    bgWord: "DEVELOPER",
    config: {
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 700,
      fontSizeVw: 18,
      scaleX: 0.9,
      scaleY: 1.1,
      translateX: -20,
      translateY: -5,
      rotate: -90,
      portraitX: -260,
      portraitY: 40,
      portraitScale: 0.95,
      signatureOffsetX: 220,
      signatureOffsetY: -120,
      roleOffsetX: 220,
      roleOffsetY: 40,
      ctaOffsetX: 220,
      ctaOffsetY: 90,
      maskStart: 30,
      maskEnd: 90,
    },
  },
  {
    id: 3,
    name: "03. Editorial Magazine Spread",
    category: "Swiss & Editorial",
    tagline: "Left 5-column editorial text block paired with a tall right-aligned vertical portrait.",
    bgWord: "BUILD",
    config: {
      fontFamily: "'Instrument Serif', serif",
      fontWeight: 400,
      fontSizeVw: 24,
      scaleX: 0.95,
      scaleY: 1.15,
      translateX: -12,
      translateY: 8,
      portraitX: 240,
      portraitY: 20,
      portraitScale: 1.05,
      signatureOffsetX: -220,
      signatureOffsetY: -100,
      roleOffsetX: -220,
      roleOffsetY: 20,
      ctaOffsetX: -220,
      ctaOffsetY: 70,
      maskStart: 50,
      maskEnd: 95,
    },
  },
  {
    id: 4,
    name: "04. The Off-Screen Horizon",
    category: "Cinematic & Tension",
    tagline: "Portrait pushed 35% off right screen border to build cinematic tension.",
    bgWord: "CREATE",
    config: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 200,
      fontSizeVw: 26,
      scaleX: 0.88,
      scaleY: 1.4,
      translateX: 0,
      translateY: 12,
      portraitX: 340,
      portraitY: 50,
      portraitScale: 1.1,
      signatureOffsetX: -180,
      signatureOffsetY: -80,
      roleOffsetX: -180,
      roleOffsetY: 30,
      ctaOffsetX: 0,
      ctaOffsetY: 40,
      maskStart: 40,
      maskEnd: 85,
    },
  },
  {
    id: 5,
    name: "05. The Tectonic Rise",
    category: "Monolithic",
    tagline: "Portrait emerging from lower baseline with signature floating above head like a halo.",
    bgWord: "DIGITAL SYSTEMS",
    config: {
      fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
      fontWeight: 400,
      fontSizeVw: 17,
      scaleX: 0.9,
      scaleY: 1.2,
      translateX: 0,
      translateY: -14,
      portraitX: 0,
      portraitY: 130,
      portraitScale: 0.9,
      signatureOffsetX: 0,
      signatureOffsetY: -180,
      roleOffsetX: 0,
      roleOffsetY: -120,
      ctaOffsetX: 0,
      ctaOffsetY: -60,
      maskStart: 60,
      maskEnd: 100,
    },
  },
  {
    id: 6,
    name: "06. Close-Up Micro-Macro Focus",
    category: "Cinematic & Tension",
    tagline: "Extreme portrait scale zoom focusing directly on face and eyes.",
    bgWord: "DEVELOPER",
    config: {
      fontFamily: "'Fira Sans Extra Condensed', sans-serif",
      fontWeight: 200,
      fontSizeVw: 22,
      scaleX: 0.95,
      scaleY: 1.3,
      opacity: 0.25,
      portraitX: 0,
      portraitY: -110,
      portraitScale: 1.6,
      signatureOffsetX: -220,
      signatureOffsetY: -220,
      roleOffsetX: -220,
      roleOffsetY: 160,
      ctaOffsetX: 220,
      ctaOffsetY: 160,
      maskStart: 20,
      maskEnd: 80,
    },
  },
  {
    id: 7,
    name: "07. Deconstructive Shoulder Anchor",
    category: "Cinematic & Tension",
    tagline: "Lower-left shoulder silhouette acting as a diagonal directional vector.",
    bgWord: "SYSTEMS",
    config: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSizeVw: 22,
      scaleX: 0.9,
      scaleY: 1.2,
      translateX: 0,
      translateY: -12,
      portraitX: -320,
      portraitY: 160,
      portraitScale: 1.05,
      signatureOffsetX: 0,
      signatureOffsetY: -40,
      roleOffsetX: 180,
      roleOffsetY: 60,
      ctaOffsetX: 180,
      ctaOffsetY: 110,
      maskStart: 35,
      maskEnd: 85,
    },
  },
  {
    id: 8,
    name: "08. Side-Profile Spine",
    category: "Swiss & Editorial",
    tagline: "Narrow side profile facing left toward a central vertical typography spine.",
    bgWord: "DEVELOPER",
    config: {
      fontFamily: "'Teko', sans-serif",
      fontWeight: 300,
      fontSizeVw: 20,
      scaleX: 0.85,
      scaleY: 1.5,
      translateX: 0,
      translateY: 0,
      rotate: 90,
      portraitX: 300,
      portraitY: 30,
      portraitScale: 0.95,
      signatureOffsetX: -240,
      signatureOffsetY: -120,
      roleOffsetX: -240,
      roleOffsetY: 20,
      ctaOffsetX: -240,
      ctaOffsetY: 80,
      maskStart: 40,
      maskEnd: 90,
    },
  },
  {
    id: 9,
    name: "09. Typographic Interlock",
    category: "Geometric & Interlock",
    tagline: "Portrait center-right overlapping giant solid background word with handwritten signature overlay.",
    bgWord: "BUILDER",
    config: {
      fontFamily: "'Anton', sans-serif",
      fontWeight: 400,
      fontSizeVw: 25,
      scaleX: 0.88,
      scaleY: 1.45,
      translateX: 0,
      translateY: -6,
      textColor: "#1c1c1c",
      opacity: 0.95,
      portraitX: 140,
      portraitY: 20,
      portraitScale: 1.0,
      signatureOffsetX: -140,
      signatureOffsetY: -20,
      roleOffsetX: -160,
      roleOffsetY: 40,
      ctaOffsetX: -160,
      ctaOffsetY: 90,
      maskStart: 50,
      maskEnd: 90,
    },
  },
  {
    id: 10,
    name: "10. Viewport Breakout",
    category: "Cinematic & Tension",
    tagline: "Portrait anchored top-left bleeding past browser boundaries with oversized right headline.",
    bgWord: "ENGINEER",
    config: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 24,
      scaleX: 0.92,
      scaleY: 1.35,
      translateX: 10,
      translateY: 10,
      portraitX: -260,
      portraitY: -100,
      portraitScale: 1.15,
      signatureOffsetX: 180,
      signatureOffsetY: -140,
      roleOffsetX: 180,
      roleOffsetY: -40,
      ctaOffsetX: 180,
      ctaOffsetY: 60,
      maskStart: 30,
      maskEnd: 80,
    },
  },
  {
    id: 11,
    name: "11. Stencil Ghost Layer",
    category: "Geometric & Interlock",
    tagline: "Giant stencil letters cutout overlaying high-contrast midground portrait.",
    bgWord: "ENGINEER",
    config: {
      fontFamily: "'League Gothic', sans-serif",
      fontWeight: 400,
      fontSizeVw: 26,
      scaleX: 0.85,
      scaleY: 1.5,
      strokeWidth: 2,
      strokeColor: "#ffffff",
      textColor: "transparent",
      opacity: 0.8,
      portraitX: 0,
      portraitY: 10,
      portraitScale: 1.0,
      signatureOffsetX: -200,
      signatureOffsetY: -160,
      roleOffsetX: -200,
      roleOffsetY: 120,
      ctaOffsetX: 200,
      ctaOffsetY: 120,
      maskStart: 40,
      maskEnd: 90,
    },
  },
  {
    id: 12,
    name: "12. Circular Aperture Focus",
    category: "Geometric & Interlock",
    tagline: "Clean geometric circular mask top-right balanced against lower-left headline typography.",
    bgWord: "CREATE",
    config: {
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 700,
      fontSizeVw: 20,
      scaleX: 0.92,
      scaleY: 1.1,
      translateX: -10,
      translateY: 10,
      portraitX: 240,
      portraitY: -80,
      portraitScale: 0.85,
      signatureOffsetX: -200,
      signatureOffsetY: -120,
      roleOffsetX: -200,
      roleOffsetY: 20,
      ctaOffsetX: -200,
      ctaOffsetY: 80,
      maskStart: 45,
      maskEnd: 85,
    },
  },
  {
    id: 13,
    name: "13. Prism Structural Frame",
    category: "Geometric & Interlock",
    tagline: "Double-line architectural frame enclosing portrait with stacked vertical text block.",
    bgWord: "DIGITAL",
    config: {
      fontFamily: "'IBM Plex Sans Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 21,
      scaleX: 0.9,
      scaleY: 1.3,
      translateX: -16,
      translateY: 0,
      rotate: -90,
      portraitX: -60,
      portraitY: 20,
      portraitScale: 0.92,
      signatureOffsetX: 200,
      signatureOffsetY: -80,
      roleOffsetX: 200,
      roleOffsetY: 10,
      ctaOffsetX: 200,
      ctaOffsetY: 70,
      maskStart: 40,
      maskEnd: 85,
    },
  },
  {
    id: 14,
    name: "14. 12-Column International Style",
    category: "Swiss & Editorial",
    tagline: "Mathematical grid locking portrait to cols 4-7, name to cols 1-3, roles to cols 9-12.",
    bgWord: "DEVELOPER",
    config: {
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 23,
      scaleX: 0.92,
      scaleY: 1.35,
      translateX: 0,
      translateY: 12,
      portraitX: 0,
      portraitY: 20,
      portraitScale: 0.95,
      signatureOffsetX: -260,
      signatureOffsetY: -120,
      roleOffsetX: 260,
      roleOffsetY: -120,
      ctaOffsetX: 260,
      ctaOffsetY: 20,
      maskStart: 45,
      maskEnd: 90,
    },
  },
  {
    id: 15,
    name: "15. Golden Ratio Dynamic Spiral",
    category: "Geometric & Interlock",
    tagline: "Focal portrait at golden ratio intersection with text radiating along logarithmic spiral.",
    bgWord: "DIGITAL",
    config: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 500,
      fontSizeVw: 20,
      scaleX: 0.95,
      scaleY: 1.2,
      translateX: -8,
      translateY: 10,
      portraitX: 200,
      portraitY: -50,
      portraitScale: 0.9,
      signatureOffsetX: -200,
      signatureOffsetY: -100,
      roleOffsetX: -140,
      roleOffsetY: 0,
      ctaOffsetX: -80,
      ctaOffsetY: 80,
      maskStart: 45,
      maskEnd: 90,
    },
  },
  {
    id: 16,
    name: "16. One-Third Vertical Monolith",
    category: "Swiss & Editorial",
    tagline: "Full-height vertical portrait strip filling left 33% canvas strip with dominant right block.",
    bgWord: "DESIGNER",
    config: {
      fontFamily: "'Saira Extra Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 25,
      scaleX: 0.85,
      scaleY: 1.45,
      translateX: 12,
      translateY: -4,
      portraitX: -280,
      portraitY: 0,
      portraitScale: 1.05,
      signatureOffsetX: 160,
      signatureOffsetY: -100,
      roleOffsetX: 160,
      roleOffsetY: 10,
      ctaOffsetX: 160,
      ctaOffsetY: 70,
      maskStart: 40,
      maskEnd: 90,
    },
  },
  {
    id: 17,
    name: "17. Low-Opacity Texture Canvas",
    category: "Monolithic",
    tagline: "130%-scaled portrait as atmospheric background texture with floating high-contrast foreground text.",
    bgWord: "FULL STACK",
    config: {
      fontFamily: "'Archivo Narrow', sans-serif",
      fontWeight: 400,
      fontSizeVw: 22,
      scaleX: 0.92,
      scaleY: 1.3,
      opacity: 0.2,
      portraitX: 0,
      portraitY: -30,
      portraitScale: 1.35,
      signatureOffsetX: 0,
      signatureOffsetY: -40,
      roleOffsetX: 0,
      roleOffsetY: 20,
      ctaOffsetX: 0,
      ctaOffsetY: 70,
      maskStart: 30,
      maskEnd: 85,
    },
  },
  {
    id: 18,
    name: "18. Diptych Seam Split",
    category: "Geometric & Interlock",
    tagline: "Canvas split into dual columns with offset vertical image halves.",
    bgWord: "SYSTEMS",
    config: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 23,
      scaleX: 0.9,
      scaleY: 1.35,
      translateX: 0,
      translateY: -8,
      portraitX: 100,
      portraitY: 40,
      portraitScale: 0.95,
      signatureOffsetX: -220,
      signatureOffsetY: -100,
      roleOffsetX: -220,
      roleOffsetY: 20,
      ctaOffsetX: 220,
      ctaOffsetY: 80,
      maskStart: 45,
      maskEnd: 90,
    },
  },
  {
    id: 19,
    name: "19. Symmetrical Flank Mirror",
    category: "Monolithic",
    tagline: "Dual flanking silhouettes creating a theatrical focal corridor toward centered content.",
    bgWord: "SYSTEMS",
    config: {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: 300,
      fontSizeVw: 22,
      scaleX: 0.92,
      scaleY: 1.35,
      translateX: 0,
      translateY: 0,
      portraitX: 0,
      portraitY: 10,
      portraitScale: 0.95,
      signatureOffsetX: 0,
      signatureOffsetY: -30,
      roleOffsetX: 0,
      roleOffsetY: 20,
      ctaOffsetX: 0,
      ctaOffsetY: 70,
      maskStart: 45,
      maskEnd: 85,
    },
  },
  {
    id: 20,
    name: "20. Radical Avant-Garde Asymmetry",
    category: "Cinematic & Tension",
    tagline: "Locomotive / Cuberto style: bottom-right portrait, cropped top-left lettering, vertical name spine.",
    bgWord: "DEV",
    config: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSizeVw: 32,
      scaleX: 0.85,
      scaleY: 1.4,
      translateX: -18,
      translateY: -10,
      portraitX: 280,
      portraitY: 90,
      portraitScale: 0.9,
      signatureOffsetX: 40,
      signatureOffsetY: -60,
      roleOffsetX: -200,
      roleOffsetY: 60,
      ctaOffsetX: -200,
      ctaOffsetY: 110,
      maskStart: 30,
      maskEnd: 80,
    },
  },
  {
    id: 21,
    name: "21. 45-Degree Diagonal Tension",
    category: "Cinematic & Tension",
    tagline: "Active Theory style: 45-degree rotated background word forming a dynamic layout vector.",
    bgWord: "DIGITAL",
    config: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 300,
      fontSizeVw: 24,
      scaleX: 0.9,
      scaleY: 1.35,
      translateX: 0,
      translateY: 0,
      rotate: 45,
      portraitX: -120,
      portraitY: 20,
      portraitScale: 0.95,
      signatureOffsetX: 180,
      signatureOffsetY: -80,
      roleOffsetX: 180,
      roleOffsetY: 10,
      ctaOffsetX: 180,
      ctaOffsetY: 70,
      maskStart: 40,
      maskEnd: 90,
    },
  },
  {
    id: 22,
    name: "22. Corner-Pinned Architectural Frame",
    category: "Swiss & Editorial",
    tagline: "Dogstudio / Resn style: Portrait locked 0px to bottom-right corner, opposing top-left text block.",
    bgWord: "BUILD",
    config: {
      fontFamily: "'Teko', sans-serif",
      fontWeight: 300,
      fontSizeVw: 24,
      scaleX: 0.85,
      scaleY: 1.5,
      translateX: -12,
      translateY: 10,
      portraitX: 340,
      portraitY: 140,
      portraitScale: 0.9,
      signatureOffsetX: -240,
      signatureOffsetY: -150,
      roleOffsetX: -240,
      roleOffsetY: -70,
      ctaOffsetX: -240,
      ctaOffsetY: 100,
      maskStart: 40,
      maskEnd: 90,
    },
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Playground State
  const [config, setConfig] = useState<TypographyPlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG);
  const [activeTab, setActiveTab] = useState<"compositions" | "overlay" | "font" | "transform" | "appearance" | "mask" | "portrait" | "presets">("compositions");
  const [activeCompId, setActiveCompId] = useState<number>(1);
  const [customBgWord, setCustomBgWord] = useState<string>("DEVELOPER");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [hideStudioUI, setHideStudioUI] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [signatureKey, setSignatureKey] = useState<number>(0);

  const applyComposition = (comp: CompositionBlueprint) => {
    setActiveCompId(comp.id);
    setCustomBgWord(comp.bgWord);
    setConfig((prev) => ({ ...prev, ...comp.config }));
    setToastMessage(`Loaded Composition Blueprint ${comp.id}: ${comp.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReplaySignature = () => {
    setSignatureKey((prev) => prev + 1);
    setToastMessage("Replaying Signature Handwriting!");
    setTimeout(() => setToastMessage(null), 2000);
  };

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const portraitEl = portraitRef.current;
    const navEl = navRef.current;

    if (!container || !textEl || !portraitEl || !navEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance animation
    const ctx = gsap.context(() => {
      const validTargets = [
        textEl,
        portraitEl,
        navEl,
        signatureRef.current,
        titlesRef.current,
        ctaRef.current,
      ].filter((el): el is HTMLElement => el !== null);

      if (prefersReducedMotion) {
        if (validTargets.length > 0) {
          gsap.set(validTargets, { opacity: 1, y: 0 });
        }
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        navEl,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          textEl,
          { opacity: 0, filter: "blur(12px)", scale: 0.97 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2 },
          "-=0.5"
        )
        .fromTo(
          portraitEl,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.9"
        );

      if (signatureRef.current) {
        tl.fromTo(
          signatureRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.8"
        );
      }
      if (titlesRef.current) {
        tl.fromTo(
          titlesRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7"
        );
      }
    }, container);

    if (prefersReducedMotion) return () => ctx.revert();

    // Subtle 60fps depth parallax on mouse move (only if enabled)
    const handleMouseMove = (e: MouseEvent) => {
      if (!config.enableParallax) return;

      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const normX = (relativeX / rect.width - 0.5) * 2;
      const normY = (relativeY / rect.height - 0.5) * 2;

      gsap.to(portraitEl, {
        x: normX * 14 + config.portraitX,
        y: Math.max(0, normY * 12) + config.portraitY,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(textEl, {
        x: -normX * 16,
        y: -normY * 12,
        duration: 1.0,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([portraitEl, textEl], {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, [config.portraitX, config.portraitY]);

  // Export handlers
  const handleExportCSS = () => {
    const cssSnippet = `/* Typography Playground Config — DEVELOPER Hero */
font-family: ${config.fontFamily};
font-weight: ${config.fontWeight};
font-size: ${config.fontSizeVw}vw;
line-height: ${config.lineHeight};
letter-spacing: ${config.letterSpacing}em;
word-spacing: ${config.wordSpacing}px;
transform: scaleY(${config.scaleY}) scaleX(${config.scaleX}) translate(${config.translateX}vw, ${config.translateY}vh) rotate(${config.rotate}deg) skew(${config.skewX}deg, ${config.skewY}deg);
color: ${config.textColor};
opacity: ${config.opacity};
filter: blur(${config.blur}px) brightness(${config.brightness}%) contrast(${config.contrast}%);
mix-blend-mode: ${config.blendMode};
mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) ${config.maskStart}%, rgba(0,0,0,0.2) ${config.maskEnd}%, rgba(0,0,0,0) 100%);`;

    navigator.clipboard.writeText(cssSnippet);
    setToastMessage("Copied CSS to Clipboard!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportOverlayConfig = () => {
    const overlayConfig = {
      signatureFont: config.signatureFont,
      signatureColor: config.signatureColor,
      signatureFontSize: config.signatureFontSize,
      signatureOffsetX: config.signatureOffsetX,
      signatureOffsetY: config.signatureOffsetY,
      signatureScaleX: config.signatureScaleX,
      signatureScaleY: config.signatureScaleY,
      signatureGlow: config.signatureGlow,
      signatureGlowColor: config.signatureGlowColor,
      signatureDurationMs: config.signatureDurationMs,
      signatureInitialDelayMs: config.signatureInitialDelayMs,
      signatureStrokeWidth: config.signatureStrokeWidth,
      signatureOverlapRatio: config.signatureOverlapRatio,

      roleFontSize: config.roleFontSize,
      roleLetterSpacing: config.roleLetterSpacing,
      roleFontWeight: config.roleFontWeight,
      roleOffsetX: config.roleOffsetX,
      roleOffsetY: config.roleOffsetY,
      roleGap: config.roleGap,

      ctaFontSize: config.ctaFontSize,
      ctaLetterSpacing: config.ctaLetterSpacing,
      ctaOffsetX: config.ctaOffsetX,
      ctaOffsetY: config.ctaOffsetY,
      ctaArrowGap: config.ctaArrowGap,
    };

    navigator.clipboard.writeText(JSON.stringify(overlayConfig, null, 2));
    setToastMessage("Copied Overlay Config! Paste it in chat!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportMasterConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setToastMessage("Copied ALL Master Settings JSON!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const OVERLAY_PRESETS: Record<string, Partial<TypographyPlaygroundConfig>> = {
    "Reference (Exact Match)": {
      signatureFont: "'Great Vibes', 'Sacramento', 'Alex Brush', cursive",
      signatureColor: "#af5bf0",
      signatureFontSize: 56,
      signatureOffsetX: 0,
      signatureOffsetY: 0,
      signatureScaleX: 1.0,
      signatureScaleY: 1.0,
      signatureGlow: 14,
      roleFontSize: 13,
      roleLetterSpacing: 0.3,
      roleFontWeight: 500,
      roleOffsetX: 0,
      roleOffsetY: 0,
      roleGap: 6,
      ctaFontSize: 11,
      ctaLetterSpacing: 0.25,
      ctaOffsetX: 0,
      ctaOffsetY: 0,
      ctaArrowGap: 10,
      bgTextEffect: "none",
    },
    "Architectural Studio": {
      signatureFont: "'Herr Von Muellerhoff', cursive",
      signatureColor: "#c084fc",
      signatureFontSize: 72,
      signatureOffsetX: 0,
      signatureOffsetY: -10,
      signatureScaleX: 1.2,
      signatureScaleY: 0.85,
      signatureGlow: 8,
      roleFontSize: 12,
      roleLetterSpacing: 0.36,
      roleFontWeight: 300,
      roleOffsetX: 0,
      roleOffsetY: 10,
      roleGap: 8,
      ctaFontSize: 10,
      ctaLetterSpacing: 0.3,
      ctaOffsetX: 0,
      ctaOffsetY: 15,
      ctaArrowGap: 12,
      bgTextEffect: "aurora",
    },
    "Cyberpunk Glitch": {
      signatureFont: "'Kristi', cursive",
      signatureColor: "#e0e7ff",
      signatureFontSize: 64,
      signatureOffsetX: 0,
      signatureOffsetY: 0,
      signatureScaleX: 1.1,
      signatureScaleY: 0.9,
      signatureGlow: 20,
      roleFontSize: 14,
      roleLetterSpacing: 0.32,
      roleFontWeight: 600,
      roleOffsetX: 0,
      roleOffsetY: 0,
      roleGap: 6,
      ctaFontSize: 11,
      ctaLetterSpacing: 0.28,
      ctaOffsetX: 0,
      ctaOffsetY: 0,
      ctaArrowGap: 8,
      bgTextEffect: "glitch",
    },
    "Minimalist Editorial": {
      signatureFont: "'Sacramento', cursive",
      signatureColor: "#e879f9",
      signatureFontSize: 48,
      signatureOffsetX: 0,
      signatureOffsetY: 5,
      signatureScaleX: 1.0,
      signatureScaleY: 1.0,
      signatureGlow: 4,
      roleFontSize: 11,
      roleLetterSpacing: 0.4,
      roleFontWeight: 400,
      roleOffsetX: 0,
      roleOffsetY: 0,
      roleGap: 8,
      ctaFontSize: 10,
      ctaLetterSpacing: 0.35,
      ctaOffsetX: 0,
      ctaOffsetY: 10,
      ctaArrowGap: 14,
      bgTextEffect: "shiny",
    },
    "Kinetic Interactive": {
      signatureFont: "'Alex Brush', cursive",
      signatureColor: "#a855f7",
      signatureFontSize: 60,
      signatureOffsetX: 0,
      signatureOffsetY: 0,
      signatureScaleX: 1.05,
      signatureScaleY: 1.0,
      signatureGlow: 12,
      roleFontSize: 13,
      roleLetterSpacing: 0.28,
      roleFontWeight: 500,
      roleOffsetX: 0,
      roleOffsetY: 0,
      roleGap: 6,
      ctaFontSize: 11,
      ctaLetterSpacing: 0.25,
      ctaOffsetX: 0,
      ctaOffsetY: 0,
      ctaArrowGap: 10,
      bgTextEffect: "shimmer-fade",
    },
    "Asymmetric Creative": {
      signatureFont: "'WindSong', cursive",
      signatureColor: "#38bdf8",
      signatureFontSize: 68,
      signatureOffsetX: 35,
      signatureOffsetY: -15,
      signatureScaleX: 1.15,
      signatureScaleY: 0.9,
      signatureGlow: 16,
      roleFontSize: 12,
      roleLetterSpacing: 0.35,
      roleFontWeight: 400,
      roleOffsetX: -25,
      roleOffsetY: 15,
      roleGap: 8,
      ctaFontSize: 10,
      ctaLetterSpacing: 0.3,
      ctaOffsetX: 0,
      ctaOffsetY: 20,
      ctaArrowGap: 12,
      bgTextEffect: "dual-tone",
    },
  };

  const renderBgTextContent = () => {
    switch (config.bgTextEffect) {
      case "pulsating-light":
        return <PulsatingLightRotatorEffect words={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} duration={3800} />;
      case "shimmer-fade":
        return <ShimmerFadeTextRotator words={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} duration={3200} />;
      case "gooey":
        return <GooeyText texts={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} morphTime={1.2} cooldownTime={1.8} textClassName="uppercase font-bold tracking-widest text-neutral-100" />;
      case "letter-3d-swap":
        return <Letter3DSwap children="DEVELOPER" rotateDirection="right" staggerFrom="first" autoPlay={true} autoPlayInterval={3200} />;
      case "fancy-text-rotate":
        return <TextRotate texts={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} rotationInterval={2500} staggerDuration={0.025} />;
      case "barrel-roll":
        return <Circular3DRotatorEffect words={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} duration={3000} />;
      case "stagger-flip":
        return <StaggeredLetterMorphEffect words={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} duration={3200} />;
      case "flip-3d":
        return <FlipWordsEffect words={["DEVELOPER", "DESIGNER", "ENGINEER", "CREATOR", "ARCHITECT"]} flipStyle="3d-flip" duration={3000} />;
      case "shiny":
        return <ShinyTextEffect text="DEVELOPER" primaryColor={config.textColor} shimmerColor="#E4E4E7" speed={4} />;
      case "aurora":
        return <AuroraTextEffect text="DEVELOPER" primaryColor={config.textColor} shimmerColor="#C084FC" speed={6} />;
      case "glitch":
        return <GlitchTextEffect text="DEVELOPER" />;
      case "scramble":
        return <ScrambleTextEffect text="DEVELOPER" />;
      case "dual-tone":
        return <DualToneGlareEffect text="DEVELOPER" glareColor="#A1A1AA" speed={4} />;
      case "none":
      default:
        return customBgWord || "DEVELOPER";
    }
  };

  const handleExportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setToastMessage("Copied JSON Config!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const applyPreset = (presetName: string) => {
    if (PRESETS[presetName]) {
      setConfig((prev) => ({ ...prev, ...PRESETS[presetName] }));
      setToastMessage(`Applied Preset: ${presetName}`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // Background color mapping
  const getBackgroundColor = () => {
    if (config.theme === "light") return "#FAFAFA";
    switch (config.bgType) {
      case "dark-gray": return "#141414";
      case "light-gray": return "#E5E5E5";
      case "white": return "#FFFFFF";
      case "transparent": return "transparent";
      case "black":
      default: return "#080808";
    }
  };

  // Viewport Device Width Mapping
  const getViewportWidthStyle = () => {
    switch (config.viewportDevice) {
      case "laptop": return "max-w-[1440px] mx-auto border-x border-neutral-800";
      case "tablet": return "max-w-[768px] mx-auto border-x border-neutral-800";
      case "mobile": return "max-w-[375px] mx-auto border-x border-neutral-800";
      case "desktop":
      default: return "w-full";
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#040404] overflow-hidden flex flex-col justify-between select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 bg-emerald-950 text-emerald-100 text-xs font-mono rounded-xl border border-emerald-700 shadow-2xl animate-fade-in">
          ✓ {toastMessage}
        </div>
      )}

      {/* ── Main Canvas Viewport Area ───────────────────────────── */}
      <div
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden flex flex-col justify-between transition-all duration-300 pt-0 ${getViewportWidthStyle()}`}
        style={{
          backgroundColor: getBackgroundColor(),
          transform: `scale(${config.zoomLevel})`,
          transformOrigin: "top center",
        }}
      >
        {/* ── Top Minimal Navigation ──────────────────────────── */}
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className="absolute right-0 top-0 z-30 p-6 md:p-10 flex items-center justify-end gap-4 md:gap-6 transition-all duration-300 pointer-events-auto"
        >
          <button
            type="button"
            onClick={() => setIsPanelOpen((prev) => !prev)}
            className="px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 rounded-full text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:border-amber-500/50"
            title="Toggle Customization Studio"
          >
            <span>🎨</span>
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider">
              {isPanelOpen ? "Close Studio" : "Customizer"}
            </span>
          </button>

          <button
            type="button"
            className="group flex items-center gap-3 text-[#D4D4D4] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span className="text-[12px] md:text-[13px] font-sans font-medium tracking-[0.25em] uppercase select-none">
              MENU
            </span>
            <div className="flex flex-col justify-between w-[22px] h-[12px] py-[1px]">
              <span className="w-full h-[1.5px] bg-current transition-transform duration-300 group-hover:scale-x-105 origin-right" />
              <span className="w-full h-[1.5px] bg-current transition-transform duration-300 group-hover:scale-x-105 origin-right" />
              <span className="w-full h-[1.5px] bg-current transition-transform duration-300 group-hover:scale-x-105 origin-right" />
            </div>
          </button>
        </nav>

        {/* ── Oversized Background Typography ─────────────────── */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            width: `${config.containerWidth}%`,
            overflow: config.containerOverflow,
          }}
        >
          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <filter id="typographyGrain">
              <feTurbulence type="fractalNoise" baseFrequency={0.75 * config.grainScale} numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${config.grainOpacity} 0`} />
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
          </svg>

          {/* GSAP Parallax Wrapper Layer */}
          <div ref={textRef} className={`flex items-center justify-center ${config.bgTextEffect !== "none" ? "pointer-events-auto" : "pointer-events-none"}`}>
            <h1
              className="uppercase select-none transition-all duration-75 ease-out"
              style={{
                fontFamily: config.fontFamily,
                fontWeight: config.fontWeight,
                fontSize: `${config.fontSizeVw}vw`,
                lineHeight: config.lineHeight,
                letterSpacing: `${config.letterSpacing}em`,
                wordSpacing: `${config.wordSpacing}px`,
                WebkitTextStroke: config.strokeWidth > 0 ? `${config.strokeWidth}px ${config.strokeColor || config.textColor}` : "none",
                transform: `scaleY(${config.scaleY}) scaleX(${config.scaleX}) translate(${config.translateX}vw, ${config.translateY}vh) rotate(${config.rotate}deg) skew(${config.skewX}deg, ${config.skewY}deg)`,
                color: config.bgTextEffect !== "none" && (config.textColor === "#131313" || config.textColor === "#0F0F11" || config.textColor === "#000000") ? "#E4E4E7" : config.textColor,
                opacity: config.opacity,
                filter: `blur(${config.blur}px) brightness(${config.brightness}%) contrast(${config.contrast}%) saturation(${config.saturation}%) drop-shadow(0 ${config.shadowBlur}px ${config.shadowBlur}px ${config.shadowColor}) url(#typographyGrain)`,
                mixBlendMode: config.blendMode as any,
                textRendering: "optimizeLegibility",
                WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) ${config.maskStart}%, rgba(0,0,0,0.2) ${config.maskEnd}%, rgba(0,0,0,0) 100%)`,
                maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) ${config.maskStart}%, rgba(0,0,0,0.2) ${config.maskEnd}%, rgba(0,0,0,0) 100%)`,
              }}
            >
              {renderBgTextContent()}
            </h1>
          </div>
        </div>

        {/* ── Foreground Portrait ─────────────────────────────── */}
        <div
          ref={portraitRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-[1200px] h-[78vh] sm:h-[82vh] md:h-[84vh] lg:h-[86vh] pointer-events-none flex items-end justify-center"
          style={{
            zIndex: config.portraitZIndex,
          }}
        >
          <div
            className="w-full h-full relative pointer-events-none flex items-end justify-center transition-all duration-75"
            style={{
              transform: `translate(${config.portraitX}px, ${config.portraitY}px) scale(${config.portraitScale}) rotate(${config.portraitRotate}deg)`,
            }}
          >
            <Image
              src="/images/portrait.png"
              alt="Portrait of Full Stack Developer and UI/UX Designer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      priority
              quality={95}
              className="object-contain object-bottom pointer-events-none"
            />

            {/* ── Overlay Signature, Professional Title, CTA & Arrow (Exact Reference Match) ── */}
            <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center justify-end pb-7 sm:pb-9 md:pb-12 pointer-events-none">
              <div className="flex flex-col items-center text-center max-w-xl mx-auto px-4 w-full">
                {/* 1. Signature Name (Animated Cursive SVG Stroke Paths with Interactive Replay Hint & Subtle Micro-Feedback) */}
                {config.showSignature && (
                  <div
                    key={signatureKey}
                    ref={signatureRef}
                    onClick={handleReplaySignature}
                    title="Click to replay signature handwriting effect"
                    className="relative select-none mb-3 sm:mb-4 pointer-events-auto transition-all duration-75 flex flex-col items-center justify-center cursor-pointer group"
                    style={{
                      color: config.signatureColor || "#af5bf0",
                      transform: `translate(${config.signatureOffsetX}px, ${config.signatureOffsetY}px) scaleX(${config.signatureScaleX}) scaleY(${config.signatureScaleY})`,
                      filter: `drop-shadow(0 2px ${config.signatureGlow}px ${config.signatureGlowColor || config.signatureColor || "#af5bf0"})`,
                    }}
                  >
                    <HandwrittenSignature
                      text="Umer Qureshi"
                      letterHeight={config.signatureFontSize || 56}
                      letterSpacing={0}
                      durationPerLetterMs={config.signatureDurationMs || 420}
                      initialDelayMs={config.signatureInitialDelayMs || 800}
                      strokeWidth={config.signatureStrokeWidth || 2}
                      overlapRatio={config.signatureOverlapRatio ?? 0.58}
                    />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono tracking-widest text-[#af5bf0]/80 uppercase mt-1">
                      [ click to stroke-replay ]
                    </span>
                  </div>
                )}

                {/* 2. Professional Title & Local Status Touch */}
                {config.showRoles && (
                  <div
                    ref={titlesRef}
                    className="flex flex-col items-center select-none pointer-events-auto transition-all duration-75"
                    style={{
                      transform: `translate(${config.roleOffsetX}px, ${config.roleOffsetY}px)`,
                      gap: `${config.roleGap}px`,
                      marginBottom: "48px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[9px] font-mono tracking-widest text-emerald-500 uppercase">GMT+5 • Available</span>
                    </div>
                    <span
                      className="text-neutral-300 uppercase leading-tight font-sans block"
                      style={{
                        fontSize: `${config.roleFontSize}px`,
                        letterSpacing: `${config.roleLetterSpacing}em`,
                        fontWeight: config.roleFontWeight,
                      }}
                    >
                      FULL STACK DEVELOPER
                    </span>
                    <span
                      className="text-neutral-300 uppercase leading-tight font-sans block"
                      style={{
                        fontSize: `${config.roleFontSize}px`,
                        letterSpacing: `${config.roleLetterSpacing}em`,
                        fontWeight: config.roleFontWeight,
                      }}
                    >
                      UI/UX DESIGNER
                    </span>
                  </div>
                )}

                {/* 3. Call To Action & Arrow */}
                {config.showCTA && (
                  <div
                    ref={ctaRef}
                    className="flex flex-col items-center group cursor-pointer pointer-events-auto select-none transition-all duration-75"
                    style={{
                      transform: `translate(${config.ctaOffsetX}px, ${config.ctaOffsetY}px)`,
                      gap: `${config.ctaArrowGap}px`,
                    }}
                    onClick={() => {
                      const el = document.getElementById("projects") || document.getElementById("work");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                      }
                    }}
                  >
                    <span
                      className="text-neutral-400 group-hover:text-white uppercase transition-colors duration-300 font-sans block"
                      style={{
                        fontSize: `${config.ctaFontSize}px`,
                        letterSpacing: `${config.ctaLetterSpacing}em`,
                      }}
                    >
                      EXPLORE MY WORK
                    </span>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-white stroke-[1.2] transition-transform duration-300 group-hover:translate-y-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Typography Studio Multi-Tab Settings Drawer ─────────── */}
      {isPanelOpen && !hideStudioUI && (
        <aside className="fixed top-16 right-6 z-50 w-[380px] max-h-[82vh] overflow-y-auto bg-neutral-950/95 border border-neutral-800/90 rounded-2xl p-5 backdrop-blur-2xl shadow-2xl text-neutral-200 text-xs flex flex-col gap-4 font-mono">
          {/* Drawer Header & Tabs */}
          <div className="flex flex-col gap-2 pb-3 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-100 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <span>🎨</span> Playground Inspection Studio
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfig(DEFAULT_PLAYGROUND_CONFIG)}
                  className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors cursor-pointer text-xs font-bold"
                  title="Collapse Customizer Studio"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pt-1">
              {(["compositions", "overlay", "font", "transform", "appearance", "mask", "portrait", "presets"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded text-[10px] uppercase font-semibold transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-amber-500 text-neutral-950 font-bold"
                      : "bg-neutral-900 text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab === "compositions" ? "📐 Layouts" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* TAB: 22 ART DIRECTION COMPOSITION BLUEPRINTS */}
          {activeTab === "compositions" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  📐 22 Art Direction Blueprints
                </span>
                <span className="text-[10px] text-amber-300 font-bold">
                  Active Layout: #{activeCompId}
                </span>
              </div>

              {/* Categorized Layout Cards */}
              <div className="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1">
                {(["Monolithic", "Swiss & Editorial", "Cinematic & Tension", "Geometric & Interlock"] as const).map((cat) => {
                  const comps = COMPOSITION_BLUEPRINTS.filter((c) => c.category === cat);
                  return (
                    <div key={cat} className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider border-b border-neutral-800/80 pb-0.5">
                        {cat}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {comps.map((c) => {
                          const isActive = activeCompId === c.id;
                          return (
                            <button
                              key={c.id}
                              onClick={() => applyComposition(c)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                isActive
                                  ? "bg-amber-950/70 border-amber-500 shadow-lg text-amber-100 ring-1 ring-amber-500/50"
                                  : "bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-semibold text-[11px] ${isActive ? "text-amber-300 font-bold" : "text-neutral-100"}`}>
                                  {c.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] text-neutral-400 font-mono">
                                  Word: {c.bgWord}
                                </span>
                              </div>
                              <p className="text-[10px] text-neutral-400 font-sans leading-tight">
                                {c.tagline}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 0: OVERLAY CONTROLS (SIGNATURE, ROLES, CTA & VISIBILITY TOGGLES) */}
          {activeTab === "overlay" && (
            <div className="flex flex-col gap-4">
              {/* Copy Config Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleExportOverlayConfig}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg tracking-wider text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📋</span> Copy Overlay Config JSON
                </button>
                <button
                  type="button"
                  onClick={handleExportMasterConfig}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg tracking-wider text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📦</span> Copy ALL Master Settings JSON
                </button>
              </div>

              {/* SECTION: CURATED OVERLAY PRESETS */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  ⭐ Curated Overlay Presets
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(OVERLAY_PRESETS).map(([name, preset]) => (
                    <button
                      key={name}
                      onClick={() => setConfig({ ...config, ...preset })}
                      className="py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-purple-500/50 rounded text-[10px] text-neutral-300 hover:text-white font-medium text-left transition-all cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION: ELEMENT VISIBILITY TOGGLES */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  👁️ Show / Hide Element Toggles
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setConfig({ ...config, showSignature: !config.showSignature })}
                    className={`py-1.5 px-2 rounded text-[10px] uppercase font-semibold border transition-all cursor-pointer ${
                      config.showSignature
                        ? "bg-purple-950/80 border-purple-600 text-purple-200"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    Name: {config.showSignature ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, showRoles: !config.showRoles })}
                    className={`py-1.5 px-2 rounded text-[10px] uppercase font-semibold border transition-all cursor-pointer ${
                      config.showRoles
                        ? "bg-emerald-950/80 border-emerald-600 text-emerald-200"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    Roles: {config.showRoles ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, showCTA: !config.showCTA })}
                    className={`py-1.5 px-2 rounded text-[10px] uppercase font-semibold border transition-all cursor-pointer ${
                      config.showCTA
                        ? "bg-sky-950/80 border-sky-600 text-sky-200"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    CTA: {config.showCTA ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              {/* SECTION: BACKGROUND TEXT EFFECT SELECTOR (CURATED ROTATING & SHINE EFFECTS) */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  ✨ Curated Text Rotators & Shine Effects
                </span>
                <select
                  value={config.bgTextEffect}
                  onChange={(e) => setConfig({ ...config, bgTextEffect: e.target.value as any })}
                  className="bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 text-xs focus:outline-none font-sans"
                >
                  <option value="none">Default (Clean Static / Parallax)</option>
                  <option value="pulsating-light">🕯️ Pulsating Darkroom Spotlight Rotator (New)</option>
                  <option value="shimmer-fade">✨ Shimmer & Blur Fade Word Rotator</option>
                  <option value="shiny">💎 Shiny Shimmer Light Beam</option>
                  <option value="aurora">🌌 Aurora Purple Glow Sweep</option>
                  <option value="dual-tone">🌗 Dual-Tone Metallic Glare Pass</option>
                  <option value="gooey">🧪 Gooey Text Morphing (Liquid Blur Filter)</option>
                  <option value="letter-3d-swap">📦 Letter 3D Box Swap (3D Cube Flip)</option>
                  <option value="fancy-text-rotate">🔀 Fancy Text Rotate (Word Sequence)</option>
                  <option value="barrel-roll">🌀 3D Cylindrical Barrel Roll Rotator</option>
                  <option value="stagger-flip">✨ Staggered Letter Y-Axis Flip Morph</option>
                  <option value="flip-3d">🔄 3D Perspective Word Flip Rotator</option>
                  <option value="glitch">⚡ Cyberpunk RGB Glitch</option>
                  <option value="scramble">✨ Matrix Code Scramble Reveal</option>
                </select>
              </div>

              {/* SECTION 1: SIGNATURE */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                    1. Signature Controls
                  </span>
                  <button
                    type="button"
                    onClick={handleReplaySignature}
                    className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-600/60 text-purple-200 rounded text-[10px] uppercase font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>🔄</span> Replay
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-neutral-400">Signature Font Family</label>
                  <select
                    value={config.signatureFont}
                    onChange={(e) => setConfig({ ...config, signatureFont: e.target.value })}
                    className="bg-neutral-900 border border-neutral-800 rounded p-1.5 text-neutral-200 text-xs focus:outline-none font-sans"
                  >
                    <option value="'Great Vibes', 'Sacramento', 'Alex Brush', cursive">Great Vibes (Refined Cursive)</option>
                    <option value="'Sacramento', cursive">Sacramento (Modern Cursive)</option>
                    <option value="'Alex Brush', cursive">Alex Brush (Editorial)</option>
                    <option value="'Caveat', cursive">Caveat (Handwritten)</option>
                    <option value="'Dancing Script', cursive">Dancing Script (Playful)</option>
                    <option value="'Herr Von Muellerhoff', cursive">Herr Von Muellerhoff (Wide Calligraphy)</option>
                    <option value="'Kristi', cursive">Kristi (Minimal Script)</option>
                    <option value="'WindSong', cursive">WindSong (Sketch)</option>
                    <option value="'Pinyon Script', cursive">Pinyon Script (Classic)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-neutral-400">Ink Color</label>
                    <input
                      type="color"
                      value={config.signatureColor || "#af5bf0"}
                      onChange={(e) => setConfig({ ...config, signatureColor: e.target.value })}
                      className="w-6 h-6 rounded bg-transparent border border-neutral-700 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-neutral-400">Glow Color</label>
                    <input
                      type="color"
                      value={config.signatureGlowColor || "#af5bf0"}
                      onChange={(e) => setConfig({ ...config, signatureGlowColor: e.target.value })}
                      className="w-6 h-6 rounded bg-transparent border border-neutral-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Writing Speed</span>
                      <span className="text-purple-400">{config.signatureDurationMs}ms</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="20"
                      value={config.signatureDurationMs}
                      onChange={(e) => setConfig({ ...config, signatureDurationMs: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Initial Delay</span>
                      <span className="text-purple-400">{config.signatureInitialDelayMs}ms</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={config.signatureInitialDelayMs}
                      onChange={(e) => setConfig({ ...config, signatureInitialDelayMs: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Pen Thickness</span>
                      <span className="text-purple-400">{config.signatureStrokeWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="0.5"
                      value={config.signatureStrokeWidth}
                      onChange={(e) => setConfig({ ...config, signatureStrokeWidth: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Letter Overlap</span>
                      <span className="text-purple-400">{config.signatureOverlapRatio}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.85"
                      step="0.05"
                      value={config.signatureOverlapRatio}
                      onChange={(e) => setConfig({ ...config, signatureOverlapRatio: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Signature Font Size</span>
                    <span className="text-purple-400 font-semibold">{config.signatureFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="100"
                    step="2"
                    value={config.signatureFontSize}
                    onChange={(e) => setConfig({ ...config, signatureFontSize: Number(e.target.value) })}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                {/* Signature Horizontal X & Vertical Y Position */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Horizontal (X)</span>
                      <span className="text-purple-400 font-semibold">{config.signatureOffsetX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="2"
                      value={config.signatureOffsetX}
                      onChange={(e) => setConfig({ ...config, signatureOffsetX: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Vertical (Y)</span>
                      <span className="text-purple-400 font-semibold">{config.signatureOffsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-150"
                      max="150"
                      step="2"
                      value={config.signatureOffsetY}
                      onChange={(e) => setConfig({ ...config, signatureOffsetY: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-neutral-400">Scale Width (X): {config.signatureScaleX}</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.05"
                      value={config.signatureScaleX}
                      onChange={(e) => setConfig({ ...config, signatureScaleX: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-neutral-400">Scale Height (Y): {config.signatureScaleY}</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.05"
                      value={config.signatureScaleY}
                      onChange={(e) => setConfig({ ...config, signatureScaleY: Number(e.target.value) })}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Glow Blur</span>
                    <span>{config.signatureGlow}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={config.signatureGlow}
                    onChange={(e) => setConfig({ ...config, signatureGlow: Number(e.target.value) })}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* SECTION 2: ROLE TITLES */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  2. Role Titles Controls
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Role Font Size</span>
                    <span className="text-emerald-400 font-semibold">{config.roleFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="9"
                    max="28"
                    step="1"
                    value={config.roleFontSize}
                    onChange={(e) => setConfig({ ...config, roleFontSize: Number(e.target.value) })}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Letter Spacing (Tracking)</span>
                    <span>{config.roleLetterSpacing}em</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.6"
                    step="0.02"
                    value={config.roleLetterSpacing}
                    onChange={(e) => setConfig({ ...config, roleLetterSpacing: Number(e.target.value) })}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                {/* Role Position X & Y */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Horizontal (X)</span>
                      <span>{config.roleOffsetX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="2"
                      value={config.roleOffsetX}
                      onChange={(e) => setConfig({ ...config, roleOffsetX: Number(e.target.value) })}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Vertical (Y)</span>
                      <span>{config.roleOffsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="2"
                      value={config.roleOffsetY}
                      onChange={(e) => setConfig({ ...config, roleOffsetY: Number(e.target.value) })}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Line Gap Between Titles</span>
                    <span>{config.roleGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={config.roleGap}
                    onChange={(e) => setConfig({ ...config, roleGap: Number(e.target.value) })}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* SECTION 3: CTA & ARROW */}
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  3. CTA & Arrow Controls
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">CTA Font Size</span>
                    <span className="text-sky-400 font-semibold">{config.ctaFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="1"
                    value={config.ctaFontSize}
                    onChange={(e) => setConfig({ ...config, ctaFontSize: Number(e.target.value) })}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">CTA Letter Spacing</span>
                    <span>{config.ctaLetterSpacing}em</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.5"
                    step="0.02"
                    value={config.ctaLetterSpacing}
                    onChange={(e) => setConfig({ ...config, ctaLetterSpacing: Number(e.target.value) })}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                {/* CTA Position X & Y */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Horizontal (X)</span>
                      <span>{config.ctaOffsetX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="2"
                      value={config.ctaOffsetX}
                      onChange={(e) => setConfig({ ...config, ctaOffsetX: Number(e.target.value) })}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">Vertical (Y)</span>
                      <span>{config.ctaOffsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="2"
                      value={config.ctaOffsetY}
                      onChange={(e) => setConfig({ ...config, ctaOffsetY: Number(e.target.value) })}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-neutral-400">Arrow Gap Distance</span>
                    <span>{config.ctaArrowGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="1"
                    value={config.ctaArrowGap}
                    onChange={(e) => setConfig({ ...config, ctaArrowGap: Number(e.target.value) })}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: FONT SELECTION & PREVIEWS */}
          {activeTab === "font" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  Poster & Condensed Font Library
                </label>
                <div className="flex flex-col gap-1.5 max-h-[190px] overflow-y-auto pr-1">
                  {FONT_LIBRARY.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setConfig({ ...config, fontFamily: f.value })}
                      className={`p-2 rounded border text-left flex flex-col transition-all cursor-pointer ${
                        config.fontFamily === f.value
                          ? "bg-neutral-900 border-emerald-500 text-white"
                          : "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-neutral-400">
                        <span>{f.name}</span>
                        <span className="text-[9px] opacity-60">{f.category}</span>
                      </div>
                      <div
                        className="text-sm font-semibold tracking-normal text-neutral-200 mt-0.5 truncate"
                        style={{ fontFamily: f.value }}
                      >
                        DEVELOPER
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight / Thickness */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Font Weight / Thickness (100-900)</span>
                  <span className="font-semibold text-emerald-400">{config.fontWeight}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="50"
                  value={config.fontWeight}
                  onChange={(e) => setConfig({ ...config, fontWeight: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Text Outline Stroke Thickness */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Text Stroke / Outline Thickness</span>
                  <span className="font-semibold text-emerald-400">{config.strokeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.2"
                  value={config.strokeWidth}
                  onChange={(e) => setConfig({ ...config, strokeWidth: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Font Size (VW)</span>
                  <span>{config.fontSizeVw}vw</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="35"
                  step="0.5"
                  value={config.fontSizeVw}
                  onChange={(e) => setConfig({ ...config, fontSizeVw: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Letter Spacing */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Letter Spacing (EM)</span>
                  <span>{config.letterSpacing}em</span>
                </div>
                <input
                  type="range"
                  min="-0.08"
                  max="0.25"
                  step="0.005"
                  value={config.letterSpacing}
                  onChange={(e) => setConfig({ ...config, letterSpacing: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Line Height */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Line Height</span>
                  <span>{config.lineHeight}</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.5"
                  step="0.05"
                  value={config.lineHeight}
                  onChange={(e) => setConfig({ ...config, lineHeight: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TRANSFORM & SCALING */}
          {activeTab === "transform" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Vertical Stretch (Scale Y)</span>
                  <span>{config.scaleY}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.8"
                  step="0.02"
                  value={config.scaleY}
                  onChange={(e) => setConfig({ ...config, scaleY: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Horizontal Width (Scale X)</span>
                  <span>{config.scaleX}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.02"
                  value={config.scaleX}
                  onChange={(e) => setConfig({ ...config, scaleX: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Vertical Translate Y (VH)</span>
                  <span>{config.translateY}vh</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="20"
                  step="0.5"
                  value={config.translateY}
                  onChange={(e) => setConfig({ ...config, translateY: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Horizontal Translate X (VW)</span>
                  <span>{config.translateX}vw</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={config.translateX}
                  onChange={(e) => setConfig({ ...config, translateX: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Skew X (Deg)</span>
                  <span>{config.skewX}°</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={config.skewX}
                  onChange={(e) => setConfig({ ...config, skewX: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: APPEARANCE & COLOR */}
          {activeTab === "appearance" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-neutral-400">Text Color Picker</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    className="w-9 h-9 rounded bg-transparent border border-neutral-700 cursor-pointer"
                  />
                  <span className="font-mono text-neutral-200">{config.textColor}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Opacity</span>
                  <span>{Math.round(config.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.02"
                  value={config.opacity}
                  onChange={(e) => setConfig({ ...config, opacity: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Blend Mode</span>
                  <span className="uppercase">{config.blendMode}</span>
                </div>
                <select
                  value={config.blendMode}
                  onChange={(e) => setConfig({ ...config, blendMode: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none"
                >
                  <option value="normal">Normal</option>
                  <option value="screen">Screen</option>
                  <option value="multiply">Multiply</option>
                  <option value="overlay">Overlay</option>
                  <option value="difference">Difference</option>
                  <option value="soft-light">Soft Light</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Grain Micro-Texture Opacity</span>
                  <span>{Math.round(config.grainOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.02"
                  value={config.grainOpacity}
                  onChange={(e) => setConfig({ ...config, grainOpacity: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 4: MASKING & GRADIENTS */}
          {activeTab === "mask" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Vertical Mask Fade Start</span>
                  <span>{config.maskStart}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="2"
                  value={config.maskStart}
                  onChange={(e) => setConfig({ ...config, maskStart: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Vertical Mask Fade End</span>
                  <span>{config.maskEnd}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="2"
                  value={config.maskEnd}
                  onChange={(e) => setConfig({ ...config, maskEnd: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 5: PORTRAIT ALIGNMENT */}
          {activeTab === "portrait" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Portrait X Offset (PX)</span>
                  <span>{config.portraitX}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="5"
                  value={config.portraitX}
                  onChange={(e) => setConfig({ ...config, portraitX: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Portrait Y Offset (PX)</span>
                  <span>{config.portraitY}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="5"
                  value={config.portraitY}
                  onChange={(e) => setConfig({ ...config, portraitY: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-400">Portrait Scale</span>
                  <span>{config.portraitScale}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.5"
                  step="0.05"
                  value={config.portraitScale}
                  onChange={(e) => setConfig({ ...config, portraitScale: Number(e.target.value) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 6: PRESETS & EXPORT */}
          {activeTab === "presets" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-neutral-400 uppercase tracking-wider">Quick Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(PRESETS).map((p) => (
                    <button
                      key={p}
                      onClick={() => applyPreset(p)}
                      className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded text-left font-mono text-[11px] text-neutral-200 transition-colors cursor-pointer"
                    >
                      ⚡ {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleExportCSS}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg tracking-wider text-xs transition-colors cursor-pointer shadow-lg"
                >
                  Copy CSS Snippet
                </button>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 rounded-lg tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Copy Full JSON Config
                </button>
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
