/**
 * Container
 *
 * Enforces horizontal padding and max-width.
 * Renders a single element — no nested wrappers.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="header">…</Container>
 *   <Container narrow>…</Container>
 */

import { type ElementType, type ComponentPropsWithRef } from "react";

type ContainerProps<E extends ElementType> = {
  /** Render as any block-level element. Defaults to "div". */
  as?: E;
  /**
   * Narrow variant caps width at ~80ch — good for prose sections.
   * Default spans the full 3xl container (1680px).
   */
  narrow?: boolean;
} & ComponentPropsWithRef<E>;

export function Container<E extends ElementType = "div">({
  as,
  narrow = false,
  ...rest
}: ContainerProps<E>) {
  const Tag = as ?? ("div" as ElementType);

  const base = "mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24";
  const width = narrow ? "max-w-[80ch]" : "max-w-[var(--container-3xl)]";

  const existingClass =
    typeof rest.className === "string" ? rest.className : "";

  return (
    <Tag
      {...rest}
      className={`${base} ${width} ${existingClass}`.trim()}
    />
  );
}
