/**
 * Section
 *
 * Enforces vertical rhythm via design-system spacing tokens.
 * Every section on the site should be wrapped in this component
 * so vertical cadence is consistent across the page.
 *
 * Renders a single element — no nested wrappers.
 * Does NOT set max-width or horizontal padding (that's Container's job).
 *
 * Compose like this:
 *   <Section size="hero">
 *     <Container>…</Container>
 *   </Section>
 */

import { type ElementType, type ComponentPropsWithRef } from "react";

/** Vertical padding scale, drawn directly from spacing tokens */
const sizes = {
  /** 6rem top + bottom — tight utility sections */
  sm: "py-24",
  /** 8rem top + bottom — standard sections */
  md: "py-32",
  /** 12rem top + bottom — chapter-level sections */
  lg: "py-48",
  /** 16rem top + bottom — hero-level breathing room */
  hero: "py-64",
} as const;

export type SectionSize = keyof typeof sizes;

type SectionProps<E extends ElementType> = {
  /** Render as any block-level element. Defaults to "section". */
  as?: E;
  /** Vertical padding preset. Defaults to "md" (8rem). */
  size?: SectionSize;
} & ComponentPropsWithRef<E>;

export function Section<E extends ElementType = "section">({
  as,
  size = "md",
  ...rest
}: SectionProps<E>) {
  const Tag = as ?? ("section" as ElementType);

  const existingClass =
    typeof rest.className === "string" ? rest.className : "";

  const paddingClass = sizes[size as SectionSize] ?? sizes.md;

  return (
    <Tag
      {...rest}
      className={`${paddingClass} ${existingClass}`.trim()}
    />
  );
}
