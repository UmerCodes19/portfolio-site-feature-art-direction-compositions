"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { DepthRange } from "./marquee-along-svg-path";

export interface PathNode {
  id: string;
  x: number;
  y: number;
}

export interface PathSegment {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  depth: "front" | "back";
}

export interface FreehandPathDrawerProps {
  onPathComplete: (pathD: string, depthRanges: DepthRange[]) => void;
  onClose?: () => void;
  containerStyle?: React.CSSProperties;
}

/**
 * Perpendicular distance from a point to a line segment (P1-P2).
 */
function perpendicularDistance(pt: PathNode, p1: PathNode, p2: PathNode): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  if (dx === 0 && dy === 0) {
    return Math.hypot(pt.x - p1.x, pt.y - p1.y);
  }
  const num = Math.abs(dy * pt.x - dx * pt.y + p2.x * p1.y - p2.y * p1.x);
  const den = Math.hypot(dx, dy);
  return num / den;
}

/**
 * Ramer-Douglas-Peucker algorithm to simplify a dense path down to key anchor points.
 */
export function simplifyPathNodes(pts: PathNode[], epsilon: number = 30): PathNode[] {
  if (pts.length <= 2) return pts;

  let maxDist = 0;
  let index = 0;
  const end = pts.length - 1;

  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(pts[i], pts[0], pts[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }

  if (maxDist > epsilon) {
    const rec1 = simplifyPathNodes(pts.slice(0, index + 1), epsilon);
    const rec2 = simplifyPathNodes(pts.slice(index), epsilon);
    return [...rec1.slice(0, rec1.length - 1), ...rec2];
  } else {
    return [pts[0], pts[end]];
  }
}

/**
 * Converts a set of path nodes into a smooth cubic Bezier SVG path d-string.
 */
export function nodesToBezierPath(nodes: PathNode[], smoothing: number = 0.25): string {
  if (nodes.length === 0) return "";
  if (nodes.length === 1) return `M ${nodes[0].x} ${nodes[0].y}`;
  if (nodes.length === 2) return `M ${nodes[0].x} ${nodes[0].y} L ${nodes[1].x} ${nodes[1].y}`;

  let d = `M ${Math.round(nodes[0].x)} ${Math.round(nodes[0].y)}`;

  for (let i = 0; i < nodes.length - 1; i++) {
    const p0 = nodes[i === 0 ? i : i - 1];
    const p1 = nodes[i];
    const p2 = nodes[i + 1];
    const p3 = nodes[i + 2 < nodes.length ? i + 2 : i + 1];

    const cp1x = Math.round(p1.x + (p2.x - p0.x) * smoothing);
    const cp1y = Math.round(p1.y + (p2.y - p0.y) * smoothing);
    const cp2x = Math.round(p2.x - (p3.x - p1.x) * smoothing);
    const cp2y = Math.round(p2.y - (p3.y - p1.y) * smoothing);

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${Math.round(p2.x)} ${Math.round(p2.y)}`;
  }

  return d;
}

interface HistoryState {
  nodes: PathNode[];
  segments: PathSegment[];
}

export function FreehandPathDrawer({
  onPathComplete,
  onClose,
  containerStyle,
}: FreehandPathDrawerProps) {
  const [nodes, setNodes] = useState<PathNode[]>([]);
  const [segments, setSegments] = useState<PathSegment[]>([]);
  const [mode, setMode] = useState<"draw" | "edit">("draw");

  // History stack for Undo / Redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const activeDragNodeId = useRef<string | null>(null);
  const rawSampledNodes = useRef<PathNode[]>([]);
  const isDrawing = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const pushHistory = useCallback((newNodes: PathNode[], newSegments: PathSegment[]) => {
    const newEntry = { nodes: newNodes, segments: newSegments };
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newEntry]);
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setNodes(prev.nodes);
      setSegments(prev.segments);
      setHistoryIndex(historyIndex - 1);
    } else if (historyIndex === 0) {
      setNodes([]);
      setSegments([]);
      setHistoryIndex(-1);
      setMode("draw");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setNodes(next.nodes);
      setSegments(next.segments);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const getSvgCoordinates = useCallback((e: React.PointerEvent): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;

    try {
      const ctm = svg.getScreenCTM();
      if (ctm) {
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        const transformed = svgPoint.matrixTransform(ctm.inverse());

        return {
          x: Math.max(0, Math.min(1000, Math.round(transformed.x))),
          y: Math.max(0, Math.min(1000, Math.round(transformed.y))),
        };
      }
    } catch (err) {
      // fallback
    }

    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000);

    return {
      x: Math.max(0, Math.min(1000, x)),
      y: Math.max(0, Math.min(1000, y)),
    };
  }, []);

  const buildSegmentsFromNodes = (nodeList: PathNode[]): PathSegment[] => {
    const newSegs: PathSegment[] = [];
    for (let i = 0; i < nodeList.length - 1; i++) {
      const from = nodeList[i];
      const to = nodeList[i + 1];
      // Auto-assign: upper region (y < 450) defaults to 'back', lower region to 'front'
      const avgY = (from.y + to.y) / 2;
      newSegs.push({
        id: `seg-${from.id}-${to.id}`,
        fromNodeId: from.id,
        toNodeId: to.id,
        depth: avgY < 450 ? "back" : "front",
      });
    }
    return newSegs;
  };

  // Pointer Down (Start Freehand Drag)
  const handlePointerDownSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    if (mode !== "draw") return;
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);

    const pt = getSvgCoordinates(e);
    if (!pt) return;

    isDrawing.current = true;
    const startNode: PathNode = { id: `node-${Date.now()}-0`, x: pt.x, y: pt.y };
    rawSampledNodes.current = [startNode];
    setNodes([startNode]);
    setSegments([]);
  };

  // Pointer Move (Sampling smooth points while drawing or dragging nodes)
  const handlePointerMoveSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    if (mode === "edit" && activeDragNodeId.current) {
      const pt = getSvgCoordinates(e);
      if (!pt) return;
      setNodes((prev) =>
        prev.map((n) => (n.id === activeDragNodeId.current ? { ...n, x: pt.x, y: pt.y } : n))
      );
      return;
    }

    if (mode !== "draw" || !isDrawing.current) return;

    const pt = getSvgCoordinates(e);
    if (!pt) return;

    const raw = rawSampledNodes.current;
    if (raw.length === 0) {
      rawSampledNodes.current = [{ id: `node-${Date.now()}-0`, x: pt.x, y: pt.y }];
      return;
    }

    const last = raw[raw.length - 1];
    const dx = pt.x - last.x;
    const dy = pt.y - last.y;

    if (dx * dx + dy * dy >= 15 * 15) {
      const newNode: PathNode = { id: `node-${Date.now()}-${raw.length}`, x: pt.x, y: pt.y };
      rawSampledNodes.current.push(newNode);
      setNodes([...rawSampledNodes.current]);
    }
  };

  // Pointer Up (Finished Freehand Drag — Automatically Simplify Path!)
  const handlePointerUpSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activeDragNodeId.current) {
      activeDragNodeId.current = null;
      pushHistory(nodes, segments);
      return;
    }

    if (mode === "draw" && isDrawing.current) {
      isDrawing.current = false;
      const raw = rawSampledNodes.current;
      if (raw.length >= 2) {
        // Run Ramer-Douglas-Peucker simplification to turn 70 raw points into 4-6 clean key anchor nodes!
        const simplified = simplifyPathNodes(raw, 32);
        const finalNodes = simplified.length >= 2 ? simplified : raw;
        const newSegs = buildSegmentsFromNodes(finalNodes);

        setNodes(finalNodes);
        setSegments(newSegs);
        pushHistory(finalNodes, newSegs);
        setMode("edit"); // Automatically switch to clean Layer & Segment Editor mode
      }
    }
  };

  const handleSimplifyMore = () => {
    if (nodes.length <= 3) return;
    const simplified = simplifyPathNodes(nodes, 45);
    if (simplified.length >= 2 && simplified.length < nodes.length) {
      const newSegs = buildSegmentsFromNodes(simplified);
      setNodes(simplified);
      setSegments(newSegs);
      pushHistory(simplified, newSegs);
    }
  };

  const handlePointerDownNode = (nodeId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    activeDragNodeId.current = nodeId;
  };

  const toggleSegmentDepth = (segmentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSegments((prev) => {
      const updated = prev.map((s) =>
        s.id === segmentId ? { ...s, depth: s.depth === "front" ? ("back" as const) : ("front" as const) } : s
      );
      pushHistory(nodes, updated);
      return updated;
    });
  };

  const handleClear = () => {
    rawSampledNodes.current = [];
    setNodes([]);
    setSegments([]);
    setHistory([]);
    setHistoryIndex(-1);
    setMode("draw");
  };

  // Compute Bezier path string
  const pathD = useMemo(() => nodesToBezierPath(nodes), [nodes]);

  // Compute exact arc-length percentage depth ranges for MarqueeAlongSvgPath using real SVG path segment lengths
  const calculatedDepthRanges = useMemo<DepthRange[]>(() => {
    if (segments.length === 0 || nodes.length < 2) return [{ start: 0, end: 100, depth: "front" }];

    // Measure total path length and individual segment lengths via offscreen SVG path element
    try {
      const fullPath = nodesToBezierPath(nodes);
      const svgNs = "http://www.w3.org/2000/svg";
      const pathEl = document.createElementNS(svgNs, "path");
      pathEl.setAttribute("d", fullPath);
      const totalLen = pathEl.getTotalLength();

      if (totalLen > 0) {
        const ranges: DepthRange[] = [];
        let accumulatedLen = 0;

        for (let i = 0; i < nodes.length - 1; i++) {
          const subNodes = nodes.slice(i, i + 2);
          const subD = nodesToBezierPath(subNodes);
          const subEl = document.createElementNS(svgNs, "path");
          subEl.setAttribute("d", subD);
          const subLen = subEl.getTotalLength();

          const seg = segments[i];
          const depth = seg ? seg.depth : "front";

          const startPct = Math.round((accumulatedLen / totalLen) * 100);
          accumulatedLen += subLen;
          const endPct = i === nodes.length - 2 ? 100 : Math.round((accumulatedLen / totalLen) * 100);

          ranges.push({ start: startPct, end: endPct, depth });
        }

        return ranges;
      }
    } catch (e) {
      // Fallback below
    }

    const totalSegs = segments.length;
    const ranges: DepthRange[] = [];

    segments.forEach((seg, idx) => {
      const start = Math.round((idx / totalSegs) * 100);
      const end = Math.round(((idx + 1) / totalSegs) * 100);
      ranges.push({
        start,
        end: idx === totalSegs - 1 ? 100 : end,
        depth: seg.depth,
      });
    });

    return ranges;
  }, [segments, nodes]);

  const handleApply = () => {
    if (nodes.length >= 2) {
      onPathComplete(pathD, calculatedDepthRanges);
      if (onClose) onClose();
    }
  };

  return (
    <div className="absolute inset-0 z-50 pointer-events-auto flex flex-col items-center justify-between p-4" style={containerStyle}>
      {/* Top Controls Header */}
      <div className="bg-black/90 backdrop-blur-md text-white text-xs font-mono px-4 py-2 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 animate-fade-in">
        <div className="flex items-center gap-1.5 border-r border-white/20 pr-3">
          <button
            onClick={() => setMode("draw")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === "draw" ? "bg-purple-600 text-white shadow-lg" : "text-white/60 hover:text-white"
            }`}
          >
            ✏️ Redraw Path
          </button>
          <button
            onClick={() => setMode("edit")}
            disabled={nodes.length < 2}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all disabled:opacity-40 ${
              mode === "edit" ? "bg-emerald-600 text-white shadow-lg" : "text-white/60 hover:text-white"
            }`}
          >
            🎯 Layer & Segment Editor
          </button>
        </div>

        {mode === "edit" && nodes.length > 3 && (
          <button
            onClick={handleSimplifyMore}
            className="px-2.5 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium"
            title="Simplify down to fewer key anchor points"
          >
            ✨ Simplify Points ({nodes.length} Nodes)
          </button>
        )}

        <div className="flex items-center gap-1 border-l border-white/20 pl-3">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= -1}
            className="px-2.5 py-1 rounded-lg border border-white/10 text-white/80 hover:text-white disabled:opacity-30 text-xs font-medium"
            title="Undo"
          >
            ↩️ Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="px-2.5 py-1 rounded-lg border border-white/10 text-white/80 hover:text-white disabled:opacity-30 text-xs font-medium"
            title="Redo"
          >
            ↪️ Redo
          </button>
          <button
            onClick={handleClear}
            className="px-2.5 py-1 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/20 text-xs font-medium"
            title="Clear canvas"
          >
            🧹 Clear
          </button>
        </div>
      </div>

      {/* Interactive Canvas Overlay */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="w-full h-full cursor-crosshair select-none touch-none absolute inset-0"
        onPointerDown={handlePointerDownSvg}
        onPointerMove={handlePointerMoveSvg}
        onPointerUp={handlePointerUpSvg}
        onPointerLeave={handlePointerUpSvg}
      >
        {/* DRAW MODE PREVIEW STROKE */}
        {mode === "draw" && pathD && (
          <path
            d={pathD}
            stroke="#EF4444"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]"
          />
        )}

        {/* EDIT MODE: Render Clean Segment Lines with Layer Color Coding */}
        {mode === "edit" &&
          segments.map((seg) => {
            const fromNode = nodes.find((n) => n.id === seg.fromNodeId);
            const toNode = nodes.find((n) => n.id === seg.toNodeId);
            if (!fromNode || !toNode) return null;

            const isFront = seg.depth === "front";
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={seg.id} className="cursor-pointer group" onClick={(e) => toggleSegmentDepth(seg.id, e)}>
                {/* Thick interactive hit area */}
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="transparent"
                  strokeWidth="28"
                />

                {/* Visible segment stroke */}
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isFront ? "#10B981" : "#A855F7"}
                  strokeWidth={isFront ? "8" : "5"}
                  strokeDasharray={isFront ? "none" : "8 6"}
                  strokeLinecap="round"
                  opacity={isFront ? "0.95" : "0.75"}
                />

                {/* Clickable Layer Badge Tag on segment midpoint */}
                <g transform={`translate(${midX}, ${midY})`} className="transition-transform group-hover:scale-125">
                  <rect
                    x="-42"
                    y="-14"
                    width="84"
                    height="28"
                    rx="8"
                    fill={isFront ? "#065F46" : "#581C87"}
                    stroke={isFront ? "#34D399" : "#C084FC"}
                    strokeWidth="2"
                    className="shadow-xl"
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono pointer-events-none"
                  >
                    {isFront ? "FRONT ✓" : "BEHIND 👁️"}
                  </text>
                </g>
              </g>
            );
          })}

        {/* EDIT MODE: Render Draggable Point Handle Circles */}
        {mode === "edit" &&
          nodes.map((node, idx) => (
            <g key={node.id} className="cursor-move">
              <circle
                cx={node.x}
                cy={node.y}
                r="10"
                fill={idx === 0 ? "#EF4444" : idx === nodes.length - 1 ? "#3B82F6" : "#FFFFFF"}
                stroke="#000000"
                strokeWidth="2.5"
                className="transition-transform hover:scale-125 drop-shadow-md"
                onPointerDown={(e) => handlePointerDownNode(node.id, e)}
              />
              <text
                x={node.x}
                y={node.y + 24}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                className="font-mono pointer-events-none drop-shadow-md"
              >
                P{idx + 1}
              </text>
            </g>
          ))}
      </svg>

      {/* Bottom Action Footer */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-lg bg-black/90 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
        <div className="text-[11px] text-white/80 font-mono">
          {nodes.length < 2 ? (
            <span className="text-amber-400 animate-pulse">Drag mouse over photo to draw orbit path</span>
          ) : (
            <span>
              {segments.length} Segments ({segments.filter((s) => s.depth === "front").length} Front,{" "}
              {segments.filter((s) => s.depth === "back").length} Behind) — Click badges to toggle layer!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-white/10 text-white/70 hover:text-white text-xs font-medium hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleApply}
            disabled={nodes.length < 2}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black text-xs font-bold transition-all shadow-xl font-mono uppercase tracking-wider"
          >
            Apply Orbit Path ✓
          </button>
        </div>
      </div>
    </div>
  );
}
