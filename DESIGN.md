---
name: Umer Qureshi Portfolio
description: Personal portfolio of a Software Engineer, Full-Stack Developer, AI Engineer, and UI/UX Designer
colors:
  bg: "#080808"
  fg: "#FAFAFA"
  muted: "#71717A"
  border: "rgba(255, 255, 255, 0.08)"
  accent: "#af5bf0"
  surface: "#121212"
typography:
  display:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  hero-serif:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "clamp(2.4rem, 10.5vw, 13rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: Umer Qureshi Portfolio

## Overview

**Creative North Star: "Restrained Technical Precision"**

This visual system governs the personal portfolio of a Software Engineer, Full-Stack Developer, AI Engineer, and UI/UX Designer. The experience is handcrafted, understated, intelligent, and timeless. Every component and interaction exists solely to communicate technical credibility and real engineering work.

The core design token system—including the `#080808` obsidian dark canvas, `#FAFAFA` crisp foreground, `#121212` elevated quartz surfaces, `#af5bf0` quartz electric violet accent, hairline `border-white/[0.08]` rules, Geist Sans display weights, and Instrument Serif italic contrast—is **strictly shared across all three core site chapters: Hero, Projects Exhibition, and Contact Section.**

**Key Characteristics:**
- **Understated & Honest**: Direct, professional tone without corporate poetry or marketing hype.
- **Pure Typographic Hierarchy**: Layout and font weight communicate importance without decorative brackets or random symbols.
- **Shared Token System**: Unified visual tokens, hairline structures, and color palettes applied consistently across Hero, Projects, and Contact.
- **Restrained Motion**: Subtle, physics-based transitions that clarify UI state rather than command attention.
- **Dark High-Contrast Palette**: Deep `#080808` background with crisp white typography and purposeful accent touches.

## Colors

A dark, high-contrast monochrome system built on `#080808` with a single, highly disciplined accent color used sparingly.

### Primary
- **Obsidian Dark** (`#080808`): Deep background canvas for all core portfolio sections.

### Neutral
- **Crisp Foreground** (`#FAFAFA`): Primary text, headings, and high-priority UI elements.
- **Muted Zinc** (`#71717A`): Supporting descriptions, captions, and secondary metadata.
- **Hairline Border** (`rgba(255, 255, 255, 0.08)`): Minimal structural dividers and card outlines.
- **Dark Surface** (`#121212`): Hover states, interactive pills, and modal overlays.

### Accent
- **Quartz Electric Violet** (`#af5bf0`): Used strictly on active state indicators, focus rings, interactive arrow containers, and atmospheric hover auras (`from-[#af5bf0]/15 blur-xl`). Never used as loud background fills or generic gradient banners.

### Atmospheric Elevation
- **Elevated Quartz Surface** (`#121212`): High-precision dark card surfaces with hairline boundaries (`rgba(255, 255, 255, 0.08)`).
- **Atmospheric Glow Layer**: Subtle 700ms radial aura highlights (`shadow-[0_20px_60px_rgba(175,91,240,0.12)]`) on primary focal points on hover.

### Named Rules
**The Rarity Accent Rule.** The purple accent is restricted to ≤5% of any viewport. Its rarity gives it purpose.
**The No-Gradient Rule.** Canvas backgrounds remain solid and clean; no loud multi-color gradients, fake particle canvases, or artificial watermarks.

## Typography

**Display Font:** Geist Sans (fallback: ui-sans-serif, system-ui, sans-serif)  
**Serif Distinction:** Instrument Serif (italic display for hero name lockup only)  
**Body Font:** Inter (fallback: ui-sans-serif, system-ui, sans-serif)  
**Label/Mono Font:** System Monospace (SFMono-Regular, Menlo, Consolas)

### Hierarchy
- **Hero Display** (Weight 400, Italic, `clamp(2.4rem, 10.5vw, 13rem)`): Used exclusively for the hero name lockup.
- **Section Heading** (Weight 300, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.08): Main title for sections.
- **Subheading / Role Title** (Weight 500, `1.25rem`–`1.5rem`): Role titles, project titles, and modal headers.
- **Body** (Weight 400, `1rem`, line-height 1.65, max measure 65ch): Readability for descriptions and summaries.
- **Label / Tag** (Monospace, `0.75rem`, letter-spacing `0.1em`): Section numbers (`01.`, `02.`), technologies, metadata.

### Named Rules
**The No-Bracket Rule.** Never surround text, numbers, or tags with brackets `[ ]`, double slashes `//`, random dots `•`, or stars `✦`.
**The Clear Language Rule.** Use plain, direct software engineering terminology. Never invent fake titles or corporate jargon.

## Layout

A spacious 12-column responsive layout anchored to a 1680px maximum container.

- **Vertical Rhythm**: Generous section padding (`py-24` to `py-36` / `96px` to `144px`) allowing each chapter to breathe.
- **Horizontal Margins**: Responsive padding (`px-4 sm:px-6 lg:px-8`) keeping content comfortably bounded.
- **Density**: Single-focused content areas per scroll frame to avoid cognitive overload.

## Elevation & Depth

Surfaces are flat at rest. Depth is established through subtle background luminance shifts (`bg-[#080808]` to `bg-[#121212]`) and ultra-thin hairline borders (`border-white/[0.08]`).

### Named Rules
**The Flat-By-Default Rule.** Surfaces do not use heavy drop shadows or glow effects. Depth is expressed through crisp hairline boundaries and subtle background contrast.

## Shapes

- **Corners**: Subtle, clean corner radii (`4px` for tags, `8px` for inputs/buttons, `12px` for cards).
- **Borders**: Hairline rules (`1px` width with `rgba(255, 255, 255, 0.08)` stroke).

## Components

### Buttons
- **Shape**: `rounded-md` (`8px` radius).
- **Primary**: Background `#FAFAFA`, text `#080808`. Hover: opacity `0.9`.
- **Secondary**: Background `#121212`, text `#FAFAFA`, border `border-white/[0.08]`. Hover: border `border-white/[0.2]`.

### Expandable Experience Stream
- **Rest State**: Clean horizontal rows with role, company, duration, and location. Hairline top/bottom dividers.
- **Expanded State**: Smooth Framer Motion height expansion revealing summary, responsibilities, technology tags, and project links.

### Project Exhibition Cards
- **Structure**: High-contrast brand typography, clean project metadata, direct image/video viewports without stacked nested cards.

### Contact Section & Editorial Colophon
- **Headline**: Geist Sans Light paired with Instrument Serif Italic text shimmer for kinetic climax statement (`Initiate Contact.`).
- **Direct Action Stage**: Elevated `#121212` quartz enclosure with prominent mailto headline link, dual primary buttons (`Send Email` primary + `Copy Address` secondary with tactile feedback state), and live status indicator.
- **Direct Channels**: Vertical editorial cards with hairline `border-white/[0.08]` dividers, channel metadata, and top-right arrow hover transitions.
- **Colophon Footer**: Standardized to `Umer Qureshi` copyright, role summary, and live location/timezone metadata.

## Do's and Don'ts

### Do:
- **Do** write direct, simple, human copy describing real software engineering work.
- **Do** rely on typography weight, font size, and whitespace for visual hierarchy.
- **Do** maintain strict monochrome styling with subtle accent touches on active focus states.
- **Do** respect system preferences (`prefers-reduced-motion`).

### Don't:
- **Don't** use decorative brackets `[ EXAMPLE ]`, double slashes `//`, fake catalog numbers `03.01`, random dots `•`, or stars `✦`.
- **Don't** use forbidden jargon words (e.g. *Architecture*, *Editorial Chronicle*, *Spatial*, *Manifesto*, *Innovation Labs*, *Visual Artifact*, *Systems Direction*, *Creative Technologist*).
- **Don't** invent fake companies, projects, dates, awards, or achievements. Use clean, honest placeholders when real data is not available.
- **Don't** use nested cards inside cards inside cards.
