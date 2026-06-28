import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const HeroAnalytics = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([40, 55, 45, 70, 65, 85, 80, 95]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  
  const [activeClusters, setActiveClusters] = useState(24);
  const [avgDeployTime, setAvgDeployTime] = useState("1.2m");

  useEffect(() => {
    // Chart update
    const chartInterval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 40) + 60];
        return next;
      });
    }, 2000);
    return () => clearInterval(chartInterval);
  }, []);

  useEffect(() => {
    // Clusters update (every 5-8s)
    const updateClusters = () => {
      setActiveClusters(Math.floor(Math.random() * 5) + 22); // 22-26
      setTimeout(updateClusters, Math.random() * 3000 + 5000);
    };
    const clusterTimeout = setTimeout(updateClusters, 5000);

    // Deploy time update (every 6s)
    const deployInterval = setInterval(() => {
      const time = (Math.random() * 0.9 + 0.9).toFixed(1); // 0.9 - 1.8
      setAvgDeployTime(`${time}m`);
    }, 6000);

    return () => {
      clearTimeout(clusterTimeout);
      clearInterval(deployInterval);
    };
  }, []);

  const maxValue = 100;
  const pathData = `M 0,${100 - (dataPoints[0] / maxValue) * 100} ` + 
    dataPoints.slice(1).map((val, i) => `L ${(i + 1) * (100 / (dataPoints.length - 1))},${100 - (val / maxValue) * 100}`).join(" ");

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const idx = Math.round(percentage * (dataPoints.length - 1));
    setHoverIdx(Math.max(0, Math.min(idx, dataPoints.length - 1)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-lg mx-auto p-6 rounded-xl border border-border flex flex-col gap-5 shadow-2xl relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(20,20,25,0.7) 0%, rgba(10,10,12,0.8) 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="flex justify-between items-start">
        <div>
          <div className="text-[12px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
            System Reliability
          </div>
          <div className="text-3xl font-display flex items-baseline gap-2">
            99.999%
            <span className="text-success text-[12px] font-sans font-medium flex items-center">
              +0.01% ↑
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-[11px] font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          ALL SYSTEMS GO
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-border/40 bg-gradient-to-br from-black/40 to-black/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[11px] text-muted-foreground mb-1 relative z-10">Avg Deployment Time</div>
          <div className="text-xl font-display flex">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={avgDeployTime}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {avgDeployTime}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-border/40 bg-gradient-to-br from-black/40 to-black/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[11px] text-muted-foreground mb-1 relative z-10">Active Clusters</div>
          <div className="text-xl font-display flex">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeClusters}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeClusters}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Third Metric */}
      <div className="p-3.5 rounded-lg border border-success/20 bg-gradient-to-r from-success/10 to-black/20 flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-24 h-24 bg-success/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Incidents (30d)</div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">Zero downtime streak: 127 days</div>
          </div>
        </div>
        <div className="text-2xl font-display text-success">0</div>
      </div>

      <div className="mt-1">
        <div className="text-[11px] text-muted-foreground mb-3 flex justify-between">
          <span>Traffic Load</span>
          <span>Live</span>
        </div>
        <div className="relative h-[80px] w-full">
          {/* Subtle background glow for chart */}
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full pointer-events-none" />
          
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between border-y border-border/40 pointer-events-none">
            <div className="w-full border-b border-border/20 border-dashed" />
            <div className="w-full border-b border-border/20 border-dashed" />
          </div>
          <svg 
            className="absolute inset-0 w-full h-full overflow-visible" 
            preserveAspectRatio="none" 
            viewBox="0 0 100 100"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverIdx(null)}
          >
            <motion.path
              d={pathData}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              layout
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            {/* Area under curve */}
            <motion.path
              d={`${pathData} L 100,100 L 0,100 Z`}
              fill="rgba(200,255,0,0.05)"
              layout
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            
            {/* Interactive Crosshair & Tooltip */}
            {hoverIdx !== null && (
              <g className="pointer-events-none">
                <line
                  x1={`${hoverIdx * (100 / (dataPoints.length - 1))}`}
                  y1="0"
                  x2={`${hoverIdx * (100 / (dataPoints.length - 1))}`}
                  y2="100"
                  stroke="rgba(200,255,0,0.4)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={`${hoverIdx * (100 / (dataPoints.length - 1))}`}
                  cy={`${100 - (dataPoints[hoverIdx] / maxValue) * 100}`}
                  r="3"
                  fill="var(--primary)"
                  className="drop-shadow-[0_0_4px_rgba(200,255,0,0.8)]"
                />
                <foreignObject 
                  x={`${Math.min(80, Math.max(0, hoverIdx * (100 / (dataPoints.length - 1)) - 10))}`} 
                  y={`${Math.max(0, 100 - (dataPoints[hoverIdx] / maxValue) * 100 - 30)}`} 
                  width="50" 
                  height="25"
                  className="overflow-visible"
                >
                  <div className="bg-black/80 border border-border/80 text-[9px] font-mono text-primary px-1.5 py-0.5 rounded backdrop-blur-sm whitespace-nowrap text-center">
                    {dataPoints[hoverIdx]} req/s
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
