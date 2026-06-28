import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { Play, ArrowDown } from "lucide-react";

type LogLine = {
  rawHTML: React.ReactNode;
  delay: number;
};

const CICD_LOGS: LogLine[] = [
  { delay: 400, rawHTML: <><span className="text-primary">git</span>{" pull origin "}<span className="text-info">main</span></> },
  { delay: 100, rawHTML: <span className="text-muted-foreground">{"From github.com:dev-consultancy/core-api"}</span> },
  { delay: 100, rawHTML: <span className="text-muted-foreground">{" * branch            main       -> FETCH_HEAD"}</span> },
  { delay: 50,  rawHTML: <span className="text-muted-foreground">{"Already up to date."}</span> },
  { delay: 600, rawHTML: <><span className="text-primary">docker</span>{" build "}<span className="text-purple-400">-t</span>{" dev-consultancy/core-api:latest ."}</> },
  { delay: 300, rawHTML: <span className="text-muted-foreground">{"=> [internal] load build definition from Dockerfile"}</span> },
  { delay: 200, rawHTML: <span className="text-muted-foreground">{"=> [internal] transferring context: "}<span className="text-amber-400">2.14MB</span></span> },
  { delay: 600, rawHTML: <><span className="text-foreground">{"=> [stage-1 3/3] RUN "}<span className="text-primary">npm</span>{" run build"}</span></> },
  { delay: 400, rawHTML: <><span className="text-success">{"=> [stage-1] Exporting to image ("}<span className="text-amber-400">128MB</span>{")"}</span></> },
  { delay: 500, rawHTML: <><span className="text-primary">terraform</span>{" apply "}<span className="text-purple-400">-auto-approve</span></> },
  { delay: 400, rawHTML: <span className="text-muted-foreground">{"aws_ecs_cluster.main: Creating..."}</span> },
  { delay: 500, rawHTML: <span className="text-muted-foreground">{"aws_ecs_cluster.main: Creation complete after "}<span className="text-amber-400">3s</span>{" [id=arn:aws:ecs:us-east-1]"}</span> },
  { delay: 400, rawHTML: <><span className="text-success font-bold">Apply complete!</span> <span className="text-foreground">{"Resources: "}<span className="text-amber-400">1</span>{" added, "}<span className="text-amber-400">0</span>{" changed, "}<span className="text-amber-400">0</span>{" destroyed."}</span></> },
  { delay: 300, rawHTML: <><span className="text-primary">curl</span> <span className="text-blue-400">https://api.dev-consultancy.com/health</span></> },
  { delay: 200, rawHTML: <><span className="text-success">{"{\"status\":\"UP\", \"uptime\":\"0m12s\"}"}</span></> }
];

const AI_LOGS: LogLine[] = [
  { delay: 400, rawHTML: <span className="text-foreground">{"[n8n] Triggered: Webhook received from "}<span className="text-blue-400">stripe.com</span></span> },
  { delay: 300, rawHTML: <span className="text-muted-foreground">{"[n8n] Extracting customer data... "}<span className="text-success">OK</span></span> },
  { delay: 700, rawHTML: <><span className="text-primary">openai</span>{" api call "}<span className="text-purple-400">--model</span>{" gpt-4-turbo "}<span className="text-purple-400">--prompt</span>{" 'generate welcome'"}</> },
  { delay: 800, rawHTML: <span className="text-muted-foreground">{"[OpenAI] Generating text ("}<span className="text-amber-400">1.2s</span>{") ... "}<span className="text-success">complete</span></span> },
  { delay: 400, rawHTML: <><span className="text-primary">psql</span>{" "}<span className="text-purple-400">-c</span>{" 'INSERT INTO communications (type, user_id) VALUES...'"}</> },
  { delay: 200, rawHTML: <span className="text-muted-foreground">{"INSERT "}<span className="text-amber-400">0 1</span></span> },
  { delay: 500, rawHTML: <span className="text-foreground">{"[Slack] Dispatching notification to "}<span className="text-blue-400">#sales-alerts</span></span> },
  { delay: 300, rawHTML: <><span className="text-success font-bold">Workflow complete!</span> <span className="text-foreground">{"Duration: "}<span className="text-amber-400">3.4s</span></span></> }
];

const formatTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
};

export const HeroTerminal = () => {
  const [activeTab, setActiveTab] = useState<"cicd" | "ai">("cicd");
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLogs = activeTab === "cicd" ? CICD_LOGS : AI_LOGS;

  // Generate timestamps for current logs
  const logsWithTimestamps = useMemo(() => {
    let currentTime = new Date();
    currentTime.setHours(14, 30, 0, 0); // Base time
    return currentLogs.map(log => {
      currentTime = new Date(currentTime.getTime() + log.delay);
      return {
        ...log,
        timestamp: formatTime(currentTime)
      };
    });
  }, [currentLogs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedLines(0);
      setIsRunning(true);
      setIsComplete(false);
      setShowFlash(false);
      setIsPaused(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const startDeployment = () => {
    if (isRunning) return;
    setDisplayedLines(0);
    setIsRunning(true);
    setIsComplete(false);
    setShowFlash(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    let currentIndex = 0;
    
    const showNextLine = () => {
      if (currentIndex >= currentLogs.length) {
        setIsRunning(false);
        setIsComplete(true);
        setTimeout(() => setShowFlash(true), 300);
        return;
      }
      
      setDisplayedLines(currentIndex + 1);
      const nextDelay = currentLogs[currentIndex].delay;
      currentIndex++;
      
      setTimeout(showNextLine, nextDelay);
    };

    const timeout = setTimeout(showNextLine, 300);
    return () => clearTimeout(timeout);
  }, [isRunning, currentLogs]);

  // Auto-scroll logic
  useEffect(() => {
    if (!isPaused && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, isPaused]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsPaused(!isAtBottom);
    }
  };

  const handleTabSwitch = (tab: "cicd" | "ai") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setDisplayedLines(0);
    setIsRunning(false);
    setIsComplete(false);
    setShowFlash(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`w-full max-w-lg mx-auto rounded-xl overflow-hidden border transition-all duration-400 shadow-2xl relative group ${showFlash ? 'border-primary shadow-[0_0_30px_rgba(200,255,0,0.4)]' : 'border-border/80'}`}
      style={{
        background: "rgba(10, 10, 12, 0.7)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Scanline & Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.08) 3px), radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Interactive Overlay when not running */}
      <AnimatePresence>
        {!isRunning && !isComplete && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={startDeployment}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(200,255,0,0.3)]">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <span className="font-mono text-sm tracking-widest text-primary uppercase">Initialize</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MacOS Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-black/40 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:bg-green-500 transition-colors" />
        </div>
        
        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <button 
            onClick={() => handleTabSwitch("cicd")}
            className={`transition-colors ${activeTab === "cicd" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            CI/CD Deploy
          </button>
          <button 
            onClick={() => handleTabSwitch("ai")}
            className={`transition-colors ${activeTab === "ai" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            AI Workflow
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="relative z-20">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="p-6 font-mono text-[13px] leading-relaxed h-[280px] overflow-y-auto overflow-x-hidden scroll-smooth relative"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1 w-full min-h-full justify-end"
            >
              {logsWithTimestamps.slice(0, displayedLines).map((line, i) => {
                const isLast = i === displayedLines - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start break-words"
                  >
                    <span className="text-muted-foreground/50 mr-3 select-none">[{line.timestamp}]</span>
                    <span className="flex-1">
                      {line.rawHTML}
                      {isLast && isRunning && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="w-2.5 h-[15px] bg-primary inline-block ml-1.5 align-middle"
                        />
                      )}
                    </span>
                  </motion.div>
                );
              })}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start"
                >
                  <span className="text-muted-foreground/50 mr-3 select-none">[{formatTime(new Date())}]</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: 4, duration: 0.8 }}
                    className="w-2.5 h-[15px] bg-primary inline-block align-middle"
                    onAnimationComplete={(def) => {
                      // Hides permanently after blinking 4 times
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Jump to bottom button */}
        <AnimatePresence>
          {isPaused && (isRunning || isComplete) && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                setIsPaused(false);
                if (containerRef.current) {
                  containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1 shadow-lg border border-border/50"
            >
              <ArrowDown className="w-3 h-3" /> Jump to bottom
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Completion Summary Bar */}
      <AnimatePresence>
        {isComplete && showFlash && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="px-4 py-1.5 bg-success/10 border-t border-success/20 text-[10px] font-mono text-success text-center relative z-20"
          >
            {activeTab === "cicd" ? "✓ Deployed in 14.2s · 1 added · 0 changed · 0 destroyed" : "✓ Workflow executed successfully in 3.4s"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-border/50 bg-black/60 text-[10px] font-mono text-muted-foreground select-none relative z-20">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5"><div className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-warning animate-pulse" : isComplete ? "bg-success" : "bg-muted-foreground"}`} /> {isRunning ? "Running..." : isComplete ? "Completed" : "Idle"}</span>
          <span>branch: main</span>
        </div>
        <div className="flex items-center gap-3">
          {isComplete && <span className="text-success">100%</span>}
          {isRunning && <span>{Math.round((displayedLines / currentLogs.length) * 100)}%</span>}
          
          {(isComplete || isRunning) && (
            <motion.button 
              onClick={startDeployment}
              disabled={isRunning}
              animate={isComplete ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: 3, ease: "easeInOut" }}
              className="uppercase hover:text-foreground disabled:opacity-50 transition-colors"
            >
              {isRunning ? "Running" : "Restart"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
