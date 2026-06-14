import { useEffect, useRef, useState } from "react";

/**
 * Full-page scroll-driven SVG "circuit board" line that draws itself as the
 * user scrolls. Desktop only (>1024px). Purely decorative overlay.
 */

const PATH_D =
  "M 120 80 L 120 300 L 1320 300 L 1320 520 L 800 520 L 800 750 " +
  "L 200 750 L 200 1050 L 600 1050 L 600 1200 L 1300 1200 L 1300 1500 " +
  "L 720 1500 L 720 1800 L 180 1800 L 180 2100 L 1300 2100 L 1300 2350 " +
  "L 720 2350 L 720 2600 L 200 2600 L 200 2900 L 1200 2900 L 1200 3200 " +
  "L 500 3200 L 500 3500 L 1300 3500 L 1300 3700";

// Corner turn coordinates (every L vertex) — PCB solder joints
const NODES: Array<[number, number]> = [
  [120, 300], [1320, 300], [1320, 520], [800, 520], [800, 750],
  [200, 750], [200, 1050], [600, 1050], [600, 1200], [1300, 1200],
  [1300, 1500], [720, 1500], [720, 1800], [180, 1800], [180, 2100],
  [1300, 2100], [1300, 2350], [720, 2350], [720, 2600], [200, 2600],
  [200, 2900], [1200, 2900], [1200, 3200], [500, 3200], [500, 3500],
  [1300, 3500], [1300, 3700],
];

const LABELS: Array<{ x: number; y: number; text: string }> = [
  { x: 210, y: 1040, text: "SYS.MONITOR" },
  { x: 730, y: 1490, text: "DEPLOY.INIT" },
  { x: 190, y: 2090, text: "BUILD.EXEC" },
];

export default function ScrollCircuitPath() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const trackRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [enabled, setEnabled] = useState(false);

  // Enable only on desktop
  useEffect(() => {
    const check = () => setEnabled(window.innerWidth > 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track full document height (recompute on resize / content changes)
  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const t = window.setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
      clearTimeout(t);
    };
  }, [enabled]);

  // Scroll-driven draw
  useEffect(() => {
    if (!enabled) return;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const drawLength = totalLength * pct;
      path.style.strokeDashoffset = `${totalLength - drawLength}`;

      const point = path.getPointAtLength(drawLength);
      dot.setAttribute("cx", `${point.x}`);
      dot.setAttribute("cy", `${point.y}`);

      // Reveal nodes once drawn line reaches them
      NODES.forEach(([nx, ny], i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        // approximate: reveal when drawLength surpasses the node's pathLength
        // cheap proxy — compare against cumulative y for monotonic-ish path
        const reached = drawLength >= getApproxLengthAt(nx, ny, totalLength);
        el.style.opacity = reached ? "0.5" : "0";
      });

      // Reveal labels when scroll line passes their Y
      LABELS.forEach((lbl, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const reached = drawLength >= getApproxLengthAt(lbl.x, lbl.y, totalLength);
        el.style.opacity = reached ? "1" : "0";
      });
    };

    // Cached approximate-length lookup per node (computed once)
    const lengthCache = new Map<string, number>();
    function getApproxLengthAt(x: number, y: number, total: number) {
      const key = `${x}:${y}`;
      const cached = lengthCache.get(key);
      if (cached !== undefined) return cached;
      // binary search along path for nearest point
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        const p = path!.getPointAtLength(mid);
        // prioritize y-progress along this mostly-monotonic-down path
        if (p.y < y || (Math.abs(p.y - y) < 1 && p.x < x)) lo = mid;
        else hi = mid;
      }
      lengthCache.set(key, lo);
      return lo;
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, pageHeight]);

  if (!enabled) return null;

  const viewBoxHeight = Math.max(pageHeight || 6000, 3800);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox={`0 0 1440 ${viewBoxHeight}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${pageHeight || 0}px`,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "visible",
      }}
    >
      <defs>
        <filter id="dc-circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint track */}
      <path
        ref={trackRef}
        d={PATH_D}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* glowing animated path */}
      <path
        id="scroll-path"
        ref={pathRef}
        d={PATH_D}
        fill="none"
        stroke="#c8ff00"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          opacity: 0.6,
          filter:
            "drop-shadow(0 0 4px #c8ff00) drop-shadow(0 0 12px rgba(200,255,0,0.3))",
        }}
      />

      {/* solder joint nodes */}
      {NODES.map(([x, y], i) => (
        <circle
          key={`${x}-${y}-${i}`}
          ref={(el) => (nodeRefs.current[i] = el)}
          cx={x}
          cy={y}
          r={3}
          fill="none"
          stroke="#c8ff00"
          strokeWidth={1.5}
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        />
      ))}

      {/* section labels */}
      {LABELS.map((lbl, i) => (
        <text
          key={lbl.text}
          ref={(el) => (labelRefs.current[i] = el)}
          x={lbl.x}
          y={lbl.y}
          fontFamily="monospace"
          fontSize={10}
          fill="rgba(200,255,0,0.4)"
          letterSpacing={2}
          style={{ opacity: 0, transition: "opacity 0.4s ease" }}
        >
          {lbl.text}
        </text>
      ))}

      {/* leading glow dot */}
      <circle
        id="path-dot"
        ref={dotRef}
        r={4}
        fill="#c8ff00"
        filter="url(#dc-circuit-glow)"
      />
    </svg>
  );
}