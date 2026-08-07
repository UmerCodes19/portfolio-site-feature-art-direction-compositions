import React, { RefObject, useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export type DynamicCSSVariable = {
  property: string;
  from: string | number;
  to: string | number;
}

export type CSSVariableInterpolation = {
  property: string;
  from: string | number;
  to: string | number;
}

export type PreserveAspectRatio =
  | "none"
  | "xMinYMin meet"
  | "xMidYMin meet"
  | "xMaxYMin meet"
  | "xMinYMid meet"
  | "xMidYMid meet"
  | "xMaxYMid meet"
  | "xMinYMax meet"
  | "xMidYMax meet"
  | "xMaxYMax meet"
  | "xMinYMin slice"
  | "xMidYMin slice"
  | "xMaxYMin slice"
  | "xMinYMid slice"
  | "xMidYMid slice"
  | "xMaxYMid slice"
  | "xMinYMax slice"
  | "xMidYMax slice"
  | "xMaxYMax slice"

export interface DepthRange {
  start: number; // 0 to 100%
  end: number;   // 0 to 100%
  depth: "front" | "back";
}

export interface MarqueeAlongSvgPathProps {
  children: React.ReactNode
  className?: string

  // Path properties
  path: string
  pathId?: string
  preserveAspectRatio?: PreserveAspectRatio
  showPath?: boolean

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string

  // Marquee properties
  baseVelocity?: number
  direction?: "normal" | "reverse"
  easing?: (value: number) => number
  slowdownOnHover?: boolean
  slowDownFactor?: number
  slowDownSpringConfig?: SpringOptions

  // Scroll properties
  useScrollVelocity?: boolean
  scrollAwareDirection?: boolean
  scrollSpringConfig?: SpringOptions
  scrollContainer?: RefObject<HTMLElement | null> | HTMLElement | null

  // Item repetition & spacing
  repeat?: number
  spacingMultiplier?: number

  // Drag properties
  draggable?: boolean
  dragSensitivity?: number
  dragVelocityDecay?: number
  dragAwareDirection?: boolean
  grabCursor?: boolean

  // Z-index & 3D Depth properties
  enableRollingZIndex?: boolean
  zIndexBase?: number
  zIndexRange?: number
  depthRanges?: DepthRange[]
  backBlur?: number

  cssVariableInterpolation?: CSSVariableInterpolation[]

  // Responsive properties
  responsive?: boolean
}

interface MarqueeItemProps {
  child: React.ReactNode
  itemKey: string
  itemIndex: number
  totalItems: number
  baseOffset: MotionValue<number>
  spacingMultiplier: number
  easing?: (v: number) => number
  pathRef: React.RefObject<SVGPathElement | null>
  path: string
  draggable: boolean
  grabCursor: boolean
  repeatIndex: number
  enableRollingZIndex: boolean
  depthRanges?: DepthRange[]
  backBlur?: number
  calculateZIndex: (distance: number) => number | undefined
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const MarqueeItem = React.memo(function MarqueeItem({
  child,
  itemIndex,
  totalItems,
  baseOffset,
  spacingMultiplier,
  easing,
  pathRef,
  path,
  draggable,
  grabCursor,
  repeatIndex,
  enableRollingZIndex,
  depthRanges,
  backBlur,
  calculateZIndex,
  onMouseEnter,
  onMouseLeave,
}: MarqueeItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [currentZIndex, setCurrentZIndex] = useState<number | undefined>(undefined)
  const [isBackDepth, setIsBackDepth] = useState<boolean>(false)

  const itemOffset = useTransform(baseOffset, (v) => {
    const position = ((itemIndex * 100) / totalItems) * spacingMultiplier
    const wrappedValue = wrap(0, 100, v + position)
    return easing ? easing(wrappedValue / 100) * 100 : wrappedValue
  })

  useEffect(() => {
    const el = itemRef.current
    if (!el) return

    const updatePosition = (pct: number) => {
      if (!el) return

      if (depthRanges && depthRanges.length > 0) {
        const norm = ((pct % 100) + 100) % 100
        const activeRange = depthRanges.find((r) => norm >= r.start && norm <= r.end)
        const depth = activeRange ? activeRange.depth : "front"
        if (depth === "back") {
          setCurrentZIndex(0)
          setIsBackDepth(true)
        } else {
          setCurrentZIndex(20)
          setIsBackDepth(false)
        }
      } else if (enableRollingZIndex) {
        const z = calculateZIndex(pct)
        setCurrentZIndex(z)
      }

      // 1. Primary positioning: getPointAtLength for exact SVG viewBox arc-length mapping
      if (pathRef.current && typeof pathRef.current.getPointAtLength === "function") {
        try {
          const totalLength = pathRef.current.getTotalLength()
          if (totalLength > 0) {
            const point = pathRef.current.getPointAtLength((pct / 100) * totalLength)
            el.style.offsetPath = "none"
            ;(el.style as any).webkitOffsetPath = "none"
            el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0px) translate(-50%, -50%)`
            return
          }
        } catch (err) {
          // fallback below
        }
      }

      // 2. Secondary fallback: CSS motion path (used if SVG getPointAtLength fails)
      const supportsOffsetPath = typeof CSS !== "undefined" && CSS.supports && (
        CSS.supports("offset-path", 'path("M0 0")') || CSS.supports("-webkit-offset-path", 'path("M0 0")')
      )

      if (!supportsOffsetPath) {
        console.warn("[MarqueeAlongSvgPath] CSS offset-path is not supported in this browser and SVG path calculation failed.")
      }

      el.style.offsetPath = `path('${path}')`
      ;(el.style as any).webkitOffsetPath = `path('${path}')`
      el.style.offsetDistance = `${pct}%`
      ;(el.style as any).webkitOffsetDistance = `${pct}%`
      el.style.transform = `translate(-50%, -50%)`
    }

    // Set initial position
    updatePosition(itemOffset.get())

    // Subscribe to live motion value updates frame by frame
    const unsubscribe = itemOffset.on("change", (val: number) => {
      updatePosition(val)
    })

    return unsubscribe
  }, [itemOffset, path, pathRef, enableRollingZIndex, depthRanges, calculateZIndex])

  return (
    <div
      ref={itemRef}
      className={cn(
        "absolute top-0 left-0 will-change-transform pointer-events-auto transition-opacity duration-200",
        draggable && grabCursor && "cursor-grab"
      )}
      style={{
        zIndex: currentZIndex,
        opacity: isBackDepth ? 0.55 : 1.0,
        filter: isBackDepth && (backBlur ?? 0) > 0 ? `blur(${backBlur}px)` : undefined,
        backfaceVisibility: "hidden",
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {child}
    </div>
  )
})

const MarqueeAlongSvgPath = ({
  children,
  className,

  // Path defaults
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 1000 1000",

  // Marquee defaults
  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.2,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },

  // Scroll defaults
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  // Items repetition & spacing
  repeat = 1,
  spacingMultiplier = 1.0,

  // Drag defaults
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  // Z-index defaults
  enableRollingZIndex = false,
  zIndexBase = 1,
  zIndexRange = 10,
  depthRanges,
  backBlur,

  cssVariableInterpolation = [],

  // Responsive defaults
  responsive = true,
}: MarqueeAlongSvgPathProps) => {
  const container = useRef<HTMLDivElement>(null)
  const marqueeContainerRef = useRef<HTMLDivElement>(null)

  const generatedId = React.useId()
  const id = pathId || `marquee-path-${generatedId.replace(/:/g, "")}`

  const baseOffset = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)

  // Responsive scaling using direct DOM manipulation
  useEffect(() => {
    if (!responsive) return

    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)
    const originalWidth = vbWidth || 1000
    const originalHeight = vbHeight || 1000

    const updateScale = () => {
      const wrapper = container.current
      const marqueeContainer = marqueeContainerRef.current
      if (!wrapper || !marqueeContainer) return

      const wrapperWidth = wrapper.clientWidth
      const wrapperHeight = wrapper.clientHeight

      const scaleX = wrapperWidth / originalWidth
      const scaleY = wrapperHeight / originalHeight
      const scale = Math.min(scaleX, scaleY)

      const scaledWidth = originalWidth * scale
      const scaledHeight = originalHeight * scale

      const offsetX = (wrapperWidth - scaledWidth) / 2
      const offsetY = (wrapperHeight - scaledHeight) / 2

      marqueeContainer.style.width = `${originalWidth}px`
      marqueeContainer.style.height = `${originalHeight}px`

      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      marqueeContainer.style.transformOrigin = "top left"
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [responsive, viewBox])

  // Create items array
  const items = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children)

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex
        const key = `${childIndex}-${repeatIndex}`
        return {
          child,
          childIndex,
          repeatIndex,
          itemIndex,
          key,
        }
      })
    )
  }, [children, repeat])

  // Scroll integration
  const targetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (scrollContainer && "current" in scrollContainer) {
      targetRef.current = scrollContainer.current
    } else if (scrollContainer && scrollContainer instanceof HTMLElement) {
      targetRef.current = scrollContainer
    }
  }, [scrollContainer])

  const { scrollY } = useScroll(
    targetRef.current ? { container: targetRef } : {}
  )
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  // Hover and drag state tracking
  const isHovered = useRef(false)
  const isDragging = useRef(false)
  const dragVelocity = useRef(0)

  const directionFactor = useRef(direction === "normal" ? 1 : -1)

  useEffect(() => {
    directionFactor.current = direction === "normal" ? 1 : -1
  }, [direction])

  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  )

  // Animation frame handler
  useAnimationFrame((_, delta) => {
    if (isDragging.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current)
      dragVelocity.current *= 0.9
      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0
      }
      return
    }

    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
    } else {
      hoverFactorValue.set(1)
    }

    let moveBy =
      directionFactor.current *
      baseVelocity *
      (delta / 1000) *
      smoothHoverFactor.get()

    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (draggable) {
      moveBy += dragVelocity.current

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay
      } else if (!isDragging.current) {
        dragVelocity.current = 0
      }
    }

    baseOffset.set(baseOffset.get() + moveBy)
  })

  const calculateZIndex = useCallback(
    (offsetDistance: number) => {
      if (!enableRollingZIndex) return undefined
      const normalizedDistance = offsetDistance % 100
      const zIndexValue =
        zIndexBase + Math.round((normalizedDistance / 100) * zIndexRange)
      return zIndexValue
    },
    [enableRollingZIndex, zIndexBase, zIndexRange]
  )

  // Pointer event handlers for dragging
  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grabbing"
    }
    isDragging.current = true
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggable || !isDragging.current) return
    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    const deltaY = currentPosition.y - lastPointerPosition.current.y
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const projectedDelta = deltaX > 0 ? delta : -delta
    dragVelocity.current = projectedDelta * dragSensitivity
    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    isDragging.current = false
    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grab"
    }
  }

  return (
    <div
      ref={container}
      className={cn("relative w-full h-full overflow-hidden", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        ref={marqueeContainerRef}
        className="relative"
        style={{ contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full pointer-events-none absolute inset-0"
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? "rgba(239, 68, 68, 0.9)" : "none"}
            strokeWidth={showPath ? "4" : "0"}
            strokeDasharray={showPath ? "8 6" : undefined}
            fill="none"
            ref={pathRef}
          />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <MarqueeItem
            key={key}
            child={child}
            itemKey={key}
            itemIndex={itemIndex}
            totalItems={items.length}
            baseOffset={baseOffset}
            spacingMultiplier={spacingMultiplier}
            easing={easing}
            pathRef={pathRef}
            path={path}
            draggable={draggable}
            grabCursor={grabCursor}
            repeatIndex={repeatIndex}
            enableRollingZIndex={enableRollingZIndex}
            depthRanges={depthRanges}
            backBlur={backBlur}
            calculateZIndex={calculateZIndex}
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
          />
        ))}
      </div>
    </div>
  )
}

export default MarqueeAlongSvgPath
