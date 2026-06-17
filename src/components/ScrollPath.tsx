import { useEffect, useRef, useState, useCallback } from "react";

export const ScrollPath = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<{ cx: number; cy: number }[]>([]);
  const [labels, setLabels] = useState<{
    x: number;
    y: number;
    text: string;
    anchor?: string;
  }[]>([]);

  // Store cached page height so scroll handler doesn't re-measure
  const cachedH = useRef(0);
  const cachedLen = useRef(0);
  const cachedLookup = useRef<{ y: number; l: number }[]>([]);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const path = pathRef.current;
    const dot = dotRef.current;
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!path || !dot || !svg || !wrap) return;

    // ── Accurate page-height measurement ──
    // Hide the wrapper so it can't inflate scrollHeight, measure, restore.
    const measurePageHeight = (): number => {
      wrap.style.display = "none";
      const h = document.documentElement.scrollHeight;
      wrap.style.display = "";
      return h;
    };

    // ── Build / rebuild everything ──
    const rebuild = () => {
      const w = window.innerWidth;
      const h = measurePageHeight();
      if (h < 100) return; // safety

      cachedH.current = h;

      // Size the SVG to exactly match the page in pixels
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.style.width = `${w}px`;
      svg.style.height = `${h}px`;

      const buildPath = (w: number, h: number) => {
        // Content sits inside max-w-[1280px] centered.
        // On any screen, the safe gutter zones are:
        //   Left gutter:  x = 0  to  x = (w - 1280) / 2 + 40   (left of content)
        //   Right gutter: x = (w + 1280) / 2 - 40  to  x = w   (right of content)
        // The path swings ONLY between these two gutter zones.
        // On screens narrower than 1280px, fall back to left/right 5% margins.

        const contentWidth = 1280;
        const leftGutter  = Math.max(w * 0.02, (w - contentWidth) / 2 - 40);
        const rightGutter = Math.min(w * 0.98, (w + contentWidth) / 2 + 40);
        const centerX     = w / 2;

        // L = left gutter anchor, R = right gutter anchor
        const L = leftGutter;
        const R = rightGutter;

        // The path crosses between L and R at section boundaries only.
        // Section boundary Y positions (proportional to page height h):
        // Hero ends ~11%, Marquee ~13%, Stats ~27%, Services ~41%,
        // Process ~55%, Stack ~68%, Work ~81%, FAQ/CTA ~91%

        const d = `
          M ${R} 0

          C ${R} ${h * 0.04},
            ${R} ${h * 0.08},
            ${centerX} ${h * 0.09}

          C ${L} ${h * 0.10},
            ${L} ${h * 0.11},
            ${L} ${h * 0.13}

          L ${L} ${h * 0.275}

          M ${L} ${h * 0.13}
          C ${L + w * 0.2} ${h * 0.14},
            ${R} ${h * 0.14},
            ${R} ${h * 0.16}

          L ${R} ${h * 0.24}
          C ${R} ${h * 0.26},
            ${L} ${h * 0.26},
            ${L} ${h * 0.275}

          L ${L} ${h * 0.46}

          C ${L} ${h * 0.48},
            ${R} ${h * 0.48},
            ${R} ${h * 0.50}

          L ${R} ${h * 0.65}
          C ${R} ${h * 0.68},
            ${L} ${h * 0.68},
            ${L} ${h * 0.71}

          L ${L} ${h * 0.77}

          C ${L} ${h * 0.79},
            ${R} ${h * 0.79},
            ${R} ${h * 0.81}

          L ${R} ${h * 0.83}
          C ${R} ${h * 0.85},
            ${L} ${h * 0.85},
            ${L} ${h * 0.87}

          L ${L} ${h * 0.88}
          C ${L + w * 0.04} ${h * 0.90},
            ${L + w * 0.04} ${h * 0.93},
            ${L} ${h * 0.95}

          L ${L} ${h * 1.0}
        `.replace(/\n\s+/g, ' ').trim();

        path.setAttribute('d', d);
        if (ghostRef.current) ghostRef.current.setAttribute('d', d);

        const len = path.getTotalLength();
        cachedLen.current = len;
        path.style.strokeDasharray = `${len}px`;
        path.style.strokeDashoffset = `${len}px`;

        // Rebuild the Y→arc-length lookup table
        const samples = 600;
        const lookup: { y: number; l: number }[] = [];
        for (let i = 0; i < samples; i++) {
          const l = (i / (samples - 1)) * len;
          const pt = path.getPointAtLength(l);
          lookup.push({ y: pt.y, l });
        }
        lookup.sort((a, b) => a.y - b.y);
        cachedLookup.current = lookup;

        // Sample node dots evenly along the path
        const nodeCount = 12;
        const newNodes = Array.from({ length: nodeCount }, (_, i) => {
          const pt = path.getPointAtLength(len * ((i + 0.5) / nodeCount));
          return { cx: pt.x, cy: pt.y };
        });
        setNodes(newNodes);

        // Sample label positions at section crossing points
        // These fractions correspond to where the line crosses between L and R
        const labelFractions = [0.13, 0.27, 0.41, 0.55, 0.68, 0.81];
        const labelTexts = [
          'SYS.BOOT',
          'DEPLOY.INIT',
          'BUILD.EXEC',
          'MONITOR.RUN',
          'STACK.READY',
          'CI.PIPELINE',
        ];
        const newLabels = labelFractions.map((f, i) => {
          const pt = path.getPointAtLength(len * f);
          // Offset label so it doesn't sit on the line itself
          const offsetX = pt.x < w / 2 ? 14 : -14;
          const anchor  = pt.x < w / 2 ? 'start' : 'end';
          return { x: pt.x + offsetX, y: pt.y - 10, text: labelTexts[i], anchor };
        });
        setLabels(newLabels);

        updateDraw();
      };
      
      buildPath(w, h);
    };

    // ── Scroll draw (fast — no measurement, just math) ──
    const updateDraw = () => {
      const len = cachedLen.current;
      const h = cachedH.current;
      const lookup = cachedLookup.current;
      if (len === 0 || h === 0 || lookup.length === 0) return;

      const scrollTop = window.scrollY;
      const maxScroll = h - window.innerHeight;
      if (maxScroll <= 0) return;

      const pct = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      
      // targetY perfectly tracks the viewport proportionally
      const targetY = h * pct;

      // Find the corresponding arc length for targetY
      let drawn = 0;
      if (targetY <= lookup[0].y) {
        drawn = lookup[0].l;
      } else if (targetY >= lookup[lookup.length - 1].y) {
        drawn = lookup[lookup.length - 1].l;
      } else {
        // Find closest segment
        let i = 0;
        while (i < lookup.length - 1 && lookup[i + 1].y < targetY) i++;
        const a = lookup[i];
        const b = lookup[i + 1];
        if (b.y === a.y) {
          drawn = a.l;
        } else {
          const t = (targetY - a.y) / (b.y - a.y);
          drawn = a.l + t * (b.l - a.l);
        }
      }

      path.style.strokeDashoffset = `${len - drawn}px`;

      if (drawn > 0) {
        const pt = path.getPointAtLength(drawn);
        dot.setAttribute("cx", `${pt.x}`);
        dot.setAttribute("cy", `${pt.y}`);
        dot.style.opacity = "1";
      }
    };

    const onScroll = () => {
      requestAnimationFrame(updateDraw);
    };

    // ── Initial builds (staggered to let DOM settle) ──
    const t1 = setTimeout(rebuild, 200);
    const t2 = setTimeout(rebuild, 800);
    const t3 = setTimeout(rebuild, 2000);

    // ── Listeners ──
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", rebuild);

    // Periodic re-check in case content loads late (images, fonts, etc.)
    const interval = setInterval(() => {
      const freshH = measurePageHeight();
      if (Math.abs(freshH - cachedH.current) > 50) {
        rebuild();
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", rebuild);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hidden lg:block"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        overflow: "visible",
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#39ff85" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#00ffe0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c8ff00" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ghost track */}
        <path
          ref={ghostRef}
          d=""
          fill="none"
          stroke="rgba(200,255,0,0.05)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ display: "none" }}
        />

        {/* Main animated path */}
        <path
          ref={pathRef}
          d=""
          fill="none"
          stroke="url(#path-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-glow)"
          style={{ willChange: "stroke-dashoffset", display: "none" }}
        />

        {/* Node dots */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="none"
            stroke="#c8ff00"
            strokeWidth="1.5"
            opacity="0.25"
          />
        ))}

        {/* Labels */}
        {/* {labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="rgba(200,255,0,0.28)"
            letterSpacing="2"
            textAnchor={(label as any).anchor ?? 'start'}
          >
            {label.text}
          </text>
        ))} */}

        {/* Glowing dot at the tip */}
        <circle
          ref={dotRef}
          cx="0"
          cy="0"
          r="5"
          fill="#c8ff00"
          filter="url(#dot-glow)"
          style={{ opacity: 0, transition: "opacity 0.3s ease", display: "none" }}
        />
      </svg>
    </div>
  );
};
