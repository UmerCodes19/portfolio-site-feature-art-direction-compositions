/**
 * Motion Vocabulary Specification for Projects Section
 * 
 * Standardized, named motion patterns using terms from animation-vocabulary:
 * 1. row-hover: Hover effect + gesture affordance (150ms, strong ease-out)
 * 2. preview-follow: Spring-based mouse tracking (stiffness: 150, damping: 20)
 * 3. row-enter: Staggered scroll reveal (300ms, 40ms stagger)
 * 4. modal-morph: Shared element scale-in reveal (200ms, ease-out)
 */

export const PROJECTS_MOTION = {
  /**
   * Pattern: row-hover
   * Terms: Hover effect, Press / Tap feedback, Ease-out
   */
  rowHover: {
    duration: 0.15, // 150ms
    ease: [0.23, 1, 0.32, 1] as const,
    arrowTranslateX: 2,
    arrowTranslateY: -2,
  },

  /**
   * Pattern: preview-follow
   * Terms: Spring, Momentum, Interruptible animation
   */
  previewFollow: {
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  },

  /**
   * Pattern: row-enter
   * Terms: Scroll reveal, Stagger, Fade in / Slide in
   */
  rowEnter: {
    duration: 0.3,
    staggerStep: 0.04, // 40ms cascade delay per item
    ease: [0.16, 1, 0.3, 1] as const,
    initialY: 8,
  },

  /**
   * Pattern: modal-morph
   * Terms: Shared element transition, Scale in, Fade in / Fade out
   */
  modalMorph: {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
    initialScale: 0.96,
  },
} as const;
