import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  SiGithubactions, SiDocker, SiKubernetes, 
  SiPostgresql, SiRedis, SiGrafana 
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const INITIAL_NODES = [
  { id: 1, level: 0, x: 15, y: 50, label: "GitHub Actions", status: "Build: Passing", icon: SiGithubactions },
  { id: 2, level: 1, x: 35, y: 50, label: "Docker Registry", status: "Image: v2.4.1", icon: SiDocker },
  { id: 3, level: 2, x: 55, y: 25, label: "AWS Infra", status: "Healthy", icon: FaAws },
  { id: 4, level: 2, x: 55, y: 75, label: "Kubernetes", status: "Pods: 12/12", icon: SiKubernetes },
  { id: 5, level: 3, x: 80, y: 25, label: "PostgreSQL", status: "Replication: OK", icon: SiPostgresql },
  { id: 6, level: 3, x: 80, y: 50, label: "Redis Cache", status: "Hit Rate: 98%", icon: SiRedis },
  { id: 7, level: 3, x: 80, y: 75, label: "Grafana Logs", status: "Monitoring", icon: SiGrafana },
];

const EDGES = [
  { id: "e1", from: 1, to: 2, label: "push" },
  { id: "e2", from: 2, to: 3, label: "deploy" },
  { id: "e3", from: 2, to: 4, label: "deploy" },
  { id: "e4", from: 3, to: 5, label: "query" },
  { id: "e5", from: 4, to: 6, label: "cache" },
  { id: "e6", from: 4, to: 7, label: "logs" },
  { id: "e7", from: 3, to: 7, label: "logs" },
];

export const HeroNodeGraph = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [activeLevel, setActiveLevel] = useState<number>(-1);

  useEffect(() => {
    const maxLevel = Math.max(...INITIAL_NODES.map((n) => n.level));
    const interval = setInterval(() => {
      // Accumulate glow. When it goes past maxLevel by 1 (to hold the all-glowing state briefly), reset to -1 (all off).
      setActiveLevel((prev) => (prev > maxLevel ? -1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-lg mx-auto h-[380px] relative rounded-xl border border-border shadow-2xl"
      style={{
        background: "rgba(10, 10, 12, 0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Background Dot Grid for Aesthetics */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none rounded-xl overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 bg-black/40 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          Live Deployment Pipeline
        </span>
      </div>

      {/* SVG Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {EDGES.map((edge, i) => {
          const fromNode = INITIAL_NODES.find((n) => n.id === edge.from)!;
          const toNode = INITIAL_NODES.find((n) => n.id === edge.to)!;
          
          // Edge remains highlighted if both nodes it connects have been activated
          const isEdgeHighlighted = activeLevel >= toNode.level;
          // Packets fire when the flow reaches the 'from' node's level
          const isEdgeActive = activeLevel === fromNode.level;
          
          const isHoverHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
          const isSelectHighlighted = selectedNode === edge.from || selectedNode === edge.to;
          const isHighlighted = isEdgeHighlighted || isHoverHighlighted || isSelectHighlighted;
          
          return (
            <g key={edge.id}>
              {/* Base line */}
              <motion.line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHighlighted ? "rgba(200,255,0,0.4)" : "rgba(255,255,255,0.05)"}
                strokeWidth={isHighlighted ? "2" : "1"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
              />
              <text
                x={`${(fromNode.x + toNode.x) / 2}%`}
                y={`${(fromNode.y + toNode.y) / 2}%`}
                fill={isHoverHighlighted || isSelectHighlighted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)"}
                fontSize="9px"
                fontFamily="monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                className="transition-colors duration-300 pointer-events-none"
              >
                {edge.label}
              </text>
              {/* Data Packet that only shows when edge is actively transmitting */}
              {isEdgeActive && (
                <motion.circle
                  r="3.5"
                  fill="var(--primary)"
                  initial={{ cx: `${fromNode.x}%`, cy: `${fromNode.y}%`, opacity: 0 }}
                  animate={{ 
                    cx: [`${fromNode.x}%`, `${toNode.x}%`], 
                    cy: [`${fromNode.y}%`, `${toNode.y}%`],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeInOut",
                  }}
                  style={{ filter: "drop-shadow(0 0 6px var(--primary))" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* HTML Nodes (Draggable) */}
      {INITIAL_NODES.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        const isSelected = selectedNode === node.id;
        // Node stays active once the flow reaches its level
        const isActive = activeLevel >= node.level || isHovered || isSelected;
        
        return (
          <motion.div
            key={node.id}
            onClick={() => setSelectedNode(isSelected ? null : node.id)}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            className="absolute flex flex-col items-center justify-center cursor-pointer z-20"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Node Icon/Circle */}
            <motion.div 
              className={`w-11 h-11 rounded-full border flex items-center justify-center relative transition-colors duration-300 ${
                isActive ? "bg-primary/20 border-primary text-primary" : "bg-black/80 border-border text-muted-foreground"
              }`}
              animate={isActive ? { 
                boxShadow: "0 0 25px rgba(200,255,0,0.4)",
                scale: 1.1 
              } : { 
                boxShadow: "none",
                scale: 1 
              }}
            >
              <node.icon className="w-5 h-5" />
              
              {/* Tooltip on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -45 : 10, scale: isHovered ? 1 : 0.9 }}
                className="absolute pointer-events-none flex flex-col items-center bottom-full mb-3 bg-black/90 border border-border/50 text-foreground px-3 py-2 rounded-lg min-w-[130px] shadow-xl z-50"
              >
                <span className="text-[12px] font-bold whitespace-nowrap">{node.label}</span>
                <span className="text-[10px] font-mono text-success">{node.status}</span>
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
              </motion.div>
            </motion.div>
            
            {/* Permanent Node Label */}
            <div className={`mt-1.5 text-[9px] font-mono whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] text-center transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-white/40'}`}>
              {node.label.length > 10 ? node.label.substring(0, 9) + "…" : node.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
