import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, Rocket, ShieldCheck, Cpu, Cloud, GitBranch, Mail, Phone, BarChart, Bell, Terminal } from "lucide-react";
import {
  SiGooglecloud, SiDocker, SiKubernetes, SiTerraform, SiGithubactions,
  SiJenkins, SiN8N, SiLangchain, SiOpenai, SiZapier,
  SiPostgresql, SiRedis, SiGrafana
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ScrollPath } from "@/components/ScrollPath";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { HeroTerminal } from "@/components/hero/HeroTerminal";
import { HeroNodeGraph } from "@/components/hero/HeroNodeGraph";
import { HeroAnalytics } from "@/components/hero/HeroAnalytics";
/* Lock dev-consultancy accent tokens */
const ACCENT_HSL = "75 100% 60%"; // electric lime #D4FF3A

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Process", href: "#process" },
];

const TopNav = () => {
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: navVisible ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div 
        className="flex items-center justify-between w-full max-w-[900px] h-16 px-6 rounded-full border transition-all duration-300"
        style={{
          backdropFilter: "blur(24px)",
          background: scrolled ? "rgba(10,10,10,0.8)" : "rgba(10,10,10,0.3)",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
          boxShadow: scrolled ? "0 10px 40px -10px rgba(0,0,0,0.5)" : "none"
        }}
      >
        <Link to="/" className="flex items-center gap-2 group relative z-10">
          <img
            src="/logo.png"
            alt="Dev Consultancy"
            className="h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            style={{ filter: "grayscale(1) invert(1)", opacity: 0.92 }}
          />
          <span className="text-[18px] font-semibold tracking-tight relative -top-0.5">
            Dev<span className="text-muted-foreground">·</span>Consultancy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 relative z-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onMouseEnter={() => setHoveredLink(l.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative z-10">{l.label}</span>
              {hoveredLink === l.label && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 bg-white/5 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="relative inline-flex items-center gap-1.5 text-[13px] font-medium h-9 px-5 rounded-full text-black bg-primary overflow-hidden group z-10 transition-transform active:scale-95"
        >
          <span className="relative z-10">Free Audit</span>
          <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <motion.div 
            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </motion.nav>
  );
};

const TAGS = ["AI", "CLOUD", "DEVOPS", "QA AUTOMATION", "DASHBOARDS"];

const METRICS = [
  { value: "70%", label: "Manual workflow reduction" },
  { value: "2x", label: "Faster release cycle" },
  { value: "24/7", label: "Cloud-ready monitoring" },
  { value: "AI", label: "Automation-first model" },
];

const SERVICES = [
  {
    no: "01",
    icon: Cpu,
    title: "AI Workflow Automation",
    desc: "Automate reports, internal tasks, support workflows, approvals and business processes using AI tools and custom logic.",
    stack: ["OpenAI", "LangChain", "n8n", "Zapier"],
  },
  {
    no: "02",
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "AWS, Azure, GCP setup, hosting, deployment architecture, monitoring, backups and cost optimization.",
    stack: ["AWS", "Azure", "GCP", "Terraform"],
  },
  {
    no: "03",
    icon: GitBranch,
    title: "DevOps & CI/CD",
    desc: "Automated build, test and deployment pipelines using GitHub Actions, Jenkins, Azure DevOps and Docker.",
    stack: ["GitHub Actions", "Jenkins", "Docker", "K8s"],
  },
  {
    no: "04",
    icon: ShieldCheck,
    title: "QA Automation",
    desc: "Regression automation, Playwright setup, test frameworks, sanity suites and release validation systems.",
    stack: ["Playwright", "Cypress", "Selenium", "Jest"],
  },
  {
    no: "05",
    icon: BarChart,
    title: "Dashboards & Reporting",
    desc: "Power BI, automated HTML reports, operational dashboards, release reports and KPI tracking systems.",
    stack: ["Power BI", "Tableau", "Looker", "Next.js"],
  },
  {
    no: "06",
    icon: Rocket,
    title: "Website & Product Launch",
    desc: "Professional websites, landing pages, product MVPs, hosting setup and launch-ready digital presence.",
    stack: ["React", "Next.js", "Tailwind", "Vite"],
  },
  {
    no: "07",
    icon: Bell,
    title: "Notification Engines",
    desc: "Multi-channel alerts and automated notification systems for Email, SMS, Push, and WhatsApp.",
    stack: ["Twilio", "SendGrid", "AWS SNS", "Novu"],
  },
];

const BADGES = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: Rocket, label: "Startup-Friendly Pricing" },
  { icon: ShieldCheck, label: "Enterprise-Grade Execution" },
];

const CLIENTS = [
  { name: "Kakaji Namkeen", logo: "/kakaji.png", industry: "Food & FMCG" },
  { name: "SBJ Insurance", logo: "/sbjinsurance.png", industry: "Insurance" },
  { name: "Prihul", logo: "/prihul1.jpeg", industry: "Retail" },
  { name: "MyShipr", logo: "/myshipr1.jpeg", industry: "Logistics" },
  { name: "Moonbeam Retreat", logo: "/moonbeamretreatupdated.jpeg", industry: "Hospitality" },
  { name: "Medler", logo: "/medler.png", industry: "Technology" },
  { name: "Taru Yoga", logo: "/taruyoga1.jpeg", industry: "Wellness" },
  { name: "Vardhan", logo: "/vardhan.jpeg", industry: "Healthcare" },
];

const PROCESS = [
  { no: "01", title: "Discovery", desc: "We audit your current stack, workflows and bottlenecks." },
  { no: "02", title: "Architecture", desc: "We design the system blueprint tailored to your scale." },
  { no: "03", title: "Build", desc: "We execute with precision — no hand-waving, just shipped code." },
  { no: "04", title: "Deploy", desc: "We launch with automated CI/CD pipelines and zero-downtime deploys." },
  { no: "05", title: "Monitor", desc: "We set up 24/7 alerting, dashboards and ongoing optimization." },
];

const STACK = [
  { name: "AWS", icon: FaAws },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "Azure", icon: VscAzure },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Terraform", icon: SiTerraform },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Jenkins", icon: SiJenkins },
  { name: "n8n", icon: SiN8N },
  { name: "LangChain", icon: SiLangchain },
  { name: "OpenAI", icon: SiOpenai },
  { name: "Zapier", icon: SiZapier },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Grafana", icon: SiGrafana },
];

const CASES = [
  { tag: "DEVOPS", headline: "Reduced deployment time by 3x for a Series-A SaaS startup.", metric: "3x faster", stack: "GitHub Actions + Docker + AWS ECS" },
  { tag: "AI AUTOMATION", headline: "Automated 70% of manual ops workflows for a logistics company.", metric: "70% saved", stack: "n8n + OpenAI + PostgreSQL" },
  { tag: "CLOUD INFRA", headline: "Cut cloud costs by 40% through infrastructure optimization.", metric: "40% cost reduction", stack: "Terraform + AWS + Grafana" },
];

const FAQS = [
  { q: "What does the free audit include?", a: "A full review of your tech stack, deployment pipeline, automation gaps and cloud spend. We deliver a written report with prioritized recommendations within 5 business days." },
  { q: "How long does a typical project take?", a: "Depends on scope. A CI/CD pipeline setup takes 1–2 weeks. A full cloud migration or AI automation build typically runs 4–8 weeks." },
  { q: "Do you work with early-stage startups?", a: "Yes — in fact most of our clients are seed to Series-B. We have startup-friendly pricing and can work with limited runway." },
  { q: "What industries do you specialize in?", a: "SaaS, logistics, fintech, e-commerce, and marketplaces. If you run a digital business with operational complexity, we can help." },
  { q: "Do you provide ongoing support after delivery?", a: "Yes. We offer retainer packages for monitoring, maintenance, iteration and on-call DevOps support." },
  { q: "Can you work with our existing engineering team?", a: "Absolutely. We embed alongside your team, augment capacity, or operate fully independently — whatever works best." },
];

/* ── Reveal hook ── */
const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".dc-reveal, .dc-word").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* ── Drag Scroll hook ── */
const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    ref.current.style.cursor = "grabbing";
    ref.current.style.scrollSnapType = "none";
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (ref.current) {
      ref.current.style.cursor = "grab";
      ref.current.style.scrollSnapType = "";
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (ref.current) {
      ref.current.style.cursor = "grab";
      ref.current.style.scrollSnapType = "";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
};

/* ── Counter ── */
const Counter = ({ to, suffix = "", trigger }: { to: number; suffix?: string; trigger: boolean }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, to]);
  return <>{v}{suffix}</>;
};

/* ── Typewriter label ── */
const Typewriter = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [showCaret, setShowCaret] = useState(true);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          let i = 0;
          const int = setInterval(() => {
            i++;
            setShown(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(int);
              setDone(true);
              setTimeout(() => setShowCaret(false), 1500);
            }
          }, 40);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [text]);
  return (
    <p ref={ref} className={className}>
      {shown}
      {showCaret && <span style={{ animation: "caret-blink 1s steps(1) infinite" }}>|</span>}
      {done && !showCaret ? "" : ""}
    </p>
  );
};

/* ── WhatsApp Icon ── */
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ── AI letter reveal ── */
const AILetters = ({ trigger }: { trigger: boolean }) => {
  const chars = ["A", "I"];
  return (
    <span>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: trigger ? 1 : 0,
            transform: trigger ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.4s ease",
            transitionDelay: `${i * 80}ms`,
          }}
        >
          {c}
        </span>
      ))}
    </span>
  );
};

const FontCycleWord = () => {
  const fonts = [
    { family: "'Instrument Serif', serif", style: "italic", weight: 400 },
    { family: "'Geist', sans-serif", style: "normal", weight: 400 },
    { family: "'JetBrains Mono', monospace", style: "normal", weight: 400 },
    { family: "'Inter', sans-serif", style: "normal", weight: 800 },
    { family: "'Georgia', serif", style: "italic", weight: 600 },
    { family: "'Courier New', Courier, monospace", style: "normal", weight: 700 },
  ];
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % fonts.length);
        setFading(false);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        width: "4.5em", // Fixed width prevents horizontal jumping
      }}
    >
      {/* Invisible placeholder guarantees the line box height never changes */}
      <span style={{ visibility: "hidden", pointerEvents: "none" }}>
        automate
      </span>
      {/* Absolutely positioned animated word */}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: "0.05em", // Aligns closely to the baseline
          fontFamily: fonts[idx].family,
          fontStyle: fonts[idx].style,
          fontWeight: fonts[idx].weight,
          background: "linear-gradient(90deg, #c8ff00, #00ff88)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 15px rgba(200,255,0,0.4))",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.35s ease",
          whiteSpace: "nowrap",
          lineHeight: "1",
        }}
      >
        automate
      </span>
    </span>
  );
};

const ServiceCard = ({ s, i }: { s: any; i: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      className="dc-reveal relative bg-background p-8 flex flex-col min-h-[420px] w-[85vw] md:w-[420px] shrink-0 snap-start group border border-border overflow-hidden"
      style={{ transitionDelay: `${i * 50}ms` }}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { y: 0, borderColor: "rgba(255,255,255,0.1)" },
        hover: { y: -8, borderColor: "rgba(200,255,0,0.2)" }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(200,255,0,0.06),
              transparent 40%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-10">
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
            {s.no}
          </span>
          <motion.div
            variants={{
              initial: { scale: 1, rotate: 0, boxShadow: "none", color: "var(--foreground)" },
              hover: { scale: 1.1, rotate: 5, boxShadow: "0 0 24px rgba(200,255,0,0.3)", color: "var(--primary)" }
            }}
            className="h-10 w-10 grid place-items-center border border-border group-hover:border-primary bg-background"
          >
            <s.icon className="h-4 w-4" />
          </motion.div>
        </div>

        <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] mb-4">
          {s.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-muted-foreground mb-8">
          {s.desc}
        </p>

        <div className="mt-auto pt-6 border-t border-border flex flex-wrap gap-2">
          {s.stack.map((tag: string) => (
            <motion.span
              key={tag}
              variants={{
                initial: { backgroundColor: "transparent", color: "var(--muted-foreground)" },
                hover: { backgroundColor: "rgba(200,255,0,0.1)", color: "var(--primary)" }
              }}
              className="font-mono text-[10px] tracking-wider uppercase border border-border px-2 py-1"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const Landing = () => {
  const { theme } = useTheme();

  const [activeAsset, setActiveAsset] = useState<number>(0);

  // Parallax / Interaction refs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const heroX = useTransform(smoothX, [-500, 500], [-15, 15]);
  const heroY = useTransform(smoothY, [-500, 500], [-15, 15]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", ACCENT_HSL);
    root.style.setProperty("--ring", ACCENT_HSL);
  }, [theme]);

  useReveal();
  const dragScroll = useDragScroll();

  /* Page load intro overlay */
  const [overlay, setOverlay] = useState(true);
  const [clientsPaused, setClientsPaused] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOverlay(false), 700);
    return () => clearTimeout(t);
  }, []);

  /* Navbar scroll state + floating CTA visibility */
  const [scrolled, setScrolled] = useState(false);
  const [hideFloating, setHideFloating] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const fr = footerRef.current;
      if (fr) {
        const top = fr.getBoundingClientRect().top;
        setHideFloating(top - window.innerHeight < 400);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cursor trailer */
  const trailerRef = useRef<HTMLDivElement>(null);
  const [hoverInteractive, setHoverInteractive] = useState(false);
  useEffect(() => {
    let mx = -100, my = -100, x = mx, y = my, raf = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      x += (mx - x) * 0.12;
      y += (my - y) * 0.12;
      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHoverInteractive(!!t.closest("a, button"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Magnetic hero button */
  const magRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = magRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 80 + Math.max(r.width, r.height) / 2) {
        const f = Math.min(1, 1 - dist / 200);
        el.style.transform = `translate(${dx * 0.15 * f}px, ${dy * 0.15 * f}px)`;
        el.style.transition = "transform 0.15s ease";
      } else {
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform 0.4s ease";
      }
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
      el.style.transition = "transform 0.4s ease";
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Process section line trigger */
  const processRef = useRef<HTMLDivElement>(null);
  const processIn = useInView(processRef, { once: true, margin: "-100px" });

  /* Stats trigger */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setStatsIn(true); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* FAQ state */
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const headlineWords = ["We", "help", "startups"];

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background overflow-x-hidden"
      style={{ position: "relative" }}
    >
      {/* Page load overlay */}
      {overlay && (
        <div
          className="fixed inset-0 z-[10000] pointer-events-none"
          style={{
            background: "#0a0a0a",
            animation: "fade-out 0.6s ease forwards",
          }}
        />
      )}

      {/* Cursor trailer */}
      <div
        ref={trailerRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: hoverInteractive ? 24 : 8,
          height: hoverInteractive ? 24 : 8,
          background: "#c8ff00",
          filter: "blur(2px)",
          opacity: hoverInteractive ? 0.4 : 0.7,
          zIndex: 9999,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />

      {/* ───────────── NAV ───────────── */}
      <TopNav />

      {/* ───────────── HERO ───────────── */}
      <section
        className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-border"
        onMouseMove={handleHeroMouseMove}
      >
        {/* animated dot grid backdrop */}
        <div className="dc-hero-dots absolute inset-0 opacity-[0.35] pointer-events-none" />
        {/* transparent grid/graph-paper overlay with slow drift */}
        <div
          className="dc-hero-grid absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />
        {/* radial glow blobs removed by request */}
        <div className="mx-auto max-w-[1280px] relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* eyebrow tags ticker */}
            <div className="dc-reveal flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-10">
              {TAGS.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span className="text-primary">•</span>}
                  <span>{t}</span>
                </span>
              ))}
            </div>

            <motion.h1
              className="font-display text-[clamp(2.5rem,4vw,4.5rem)] xl:text-[5rem] leading-[0.95] tracking-[-0.03em] max-w-[1100px]"
            >
              {["We", "help", "startups"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 100, damping: 14 }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 3 * 0.08, type: "spring", stiffness: 100, damping: 14 }}
              >
                <FontCycleWord />
              </motion.span>
              <br />
              {["scale", "and"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i + 4) * 0.08, type: "spring", stiffness: 100, damping: 14 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block italic font-serif font-normal"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 6 * 0.08, type: "spring", stiffness: 100, damping: 14 }}
              >
                deploy faster.
              </motion.span>
            </motion.h1>

            <p className="dc-reveal mt-8 text-[17px] leading-[1.55] text-muted-foreground max-w-[480px]">
              Architectural precision meets high-speed execution. Elevating digital
              infrastructure for modern enterprises.
            </p>

            <div className="dc-reveal mt-10 flex flex-wrap items-center gap-3">
              <a
                ref={magRef}
                href="https://api.whatsapp.com/send/?phone=919654722000&text=Hi+Dev+Consultancy%2C+I+want+a+free+consultation&type=phone_number&app_absent=0"
                target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-primary text-background h-12 px-6 text-[14px] font-medium hover:opacity-90 transition-opacity"
              >
                <WhatsappIcon className="h-4 w-4" />
                Book Free Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-foreground/30 text-foreground h-12 px-6 text-[14px] font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                Explore Services
              </a>
            </div>

            <div className="dc-reveal mt-14 flex flex-wrap gap-x-8 gap-y-3">
              {BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <b.icon className="h-4 w-4 text-primary" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block lg:col-span-5 xl:col-span-5 perspective-[1000px]">
            <AnimatePresence mode="wait">
              {activeAsset === 0 && (
                <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <HeroTerminal />
                </motion.div>
              )}
              {activeAsset === 1 && (
                <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <HeroNodeGraph />
                </motion.div>
              )}
              {activeAsset === 2 && (
                <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <HeroAnalytics />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Demo Switcher */}
            <div className="sticky bottom-4 mx-auto w-max mt-8 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-border/50 p-1.5 rounded-full z-20 shadow-2xl">
              {[
                { label: "Terminal", icon: Terminal },
                { label: "Data Pipeline", icon: GitBranch },
                { label: "Analytics", icon: BarChart }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAsset(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-colors relative ${activeAsset === idx
                      ? "bg-primary text-black"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <item.icon className="w-[10px] h-[10px]" />
                  {item.label}
                  {activeAsset === idx && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(200,255,0,0.8)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div
        className="overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          height: 48,
        }}
      >
        <div className="dc-marquee-track flex items-center h-full whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8 px-4">
              {Array.from({ length: 3 }).flatMap(() =>
                ["AUTOMATION", "CLOUD INFRA", "CI/CD", "AI WORKFLOWS", "DEVOPS", "QA TESTING", "MONITORING", "SCALABLE SYSTEMS", "FAST DELIVERY"]
              ).map((t, i) => (
                <span key={i} className="font-sans" style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, letterSpacing: "0.15em", fontWeight: 400 }}>
                  {t} <span className="ml-8">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      

{/* ───────────── METRICS ───────────── */}
      <section id="metrics" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              {/* <Typewriter text="↳ 002 / IMPACT" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
              <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                What we improve for{" "}
                <span className="italic font-serif font-normal">your business.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="dc-reveal text-[16px] leading-[1.6] text-muted-foreground">
                Less manual work. Faster releases. Better systems. Cleaner reporting.
                Scalable infrastructure.
              </p>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className="dc-reveal dc-stat-card border-r border-b border-border p-6 md:p-8 group hover:bg-primary/5"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-foreground group-hover:text-primary transition-colors">
                  {m.value === "70%" && <><Counter to={70} suffix="%" trigger={statsIn} /></>}
                  {m.value === "2x" && <><Counter to={2} suffix="x" trigger={statsIn} /></>}
                  {m.value === "24/7" && <><Counter to={24} suffix="/7" trigger={statsIn} /></>}
                  {m.value === "AI" && <AILetters trigger={statsIn} />}
                </div>
                <div className="mt-4 text-[13px] text-muted-foreground leading-snug max-w-[180px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

{/* ───────────── CLIENTS ───────────── */}
      <section id="clients" className="py-20 border-b border-border overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 mb-12">
          {/* <Typewriter
            text="↳ 003 / CLIENTS"
            className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]"
          /> */}
          <div className="flex items-end justify-between">
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              Trusted by{" "}
              <span className="italic font-serif font-normal">growing teams.</span>
            </h2>
            <p
              className="dc-reveal hidden md:block text-right max-w-[320px]"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}
            >
              From early-stage startups to scaling enterprises — we've built the
              backbone that keeps them moving.
            </p>
          </div>
        </div>

        {/* Infinite scroll track */}
        <div
          className="dc-clients-viewport"
          onMouseEnter={() => setClientsPaused(true)}
          onMouseLeave={() => setClientsPaused(false)}
          style={{ width: "100%", overflow: "hidden" }}
        >
          <div
            className={`dc-clients-track flex gap-5 ${clientsPaused ? "paused" : ""}`}
            style={{ width: "max-content" }}
          >
            {/* Render CLIENTS twice for seamless infinite loop */}
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={i}
                className="dc-client-card"
                style={{
                  width: 300,
                  background: "transparent",
                  border: "none",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "default",
                }}
              >
                {/* Logo container */}
                <div
                  style={{
                    width: "100%",
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      opacity: 0.7,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "1";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.7";
                    }}
                  />
                </div>

                {/* Client name removed */}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
{/* ───────────── SERVICES ───────────── */}
      <section id="services" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-6">
              {/* <Typewriter text="↳ 004 / SERVICES" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
              <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                Services built for{" "}
                <span className="italic font-serif font-normal">serious</span> business
                growth.
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="dc-reveal text-[16px] leading-[1.6] text-muted-foreground">
                We do not just build websites. We build the technical backbone that
                helps companies operate faster, smarter and more efficiently.
              </p>
            </div>
          </div>

          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 select-none"
            {...dragScroll}
          >
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      

{/* ───────────── PROCESS ───────────── */}
      <section id="process" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16">
            {/* <Typewriter text="↳ 004 / PROCESS" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              How we <span className="italic font-serif font-normal">deliver.</span>
            </h2>
          </div>

          <div className="relative" ref={processRef}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative" style={{ zIndex: 1 }}>
              {PROCESS.map((p, i) => (
                <div
                  key={p.no}
                  className={`dc-process-step p-6 group cursor-default ${processIn ? "dc-process-glow-anim" : ""}`}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    opacity: processIn ? 1 : 0.3,
                    transform: processIn ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: processIn ? `${0.2 + i * 0.35}s` : "0s",
                    animationDelay: processIn ? `${0.8 + i * 0.4}s` : "0s",
                  }}
                  onMouseEnter={(e) => {
                    if (!processIn) return;
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(200,255,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.transitionDelay = "0s";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <div
                    className="font-display transition-colors duration-300 group-hover:text-primary"
                    style={{ fontSize: 48, color: processIn ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)", lineHeight: 1 }}
                  >
                    {p.no}
                  </div>
                  <h3 className="text-white mt-4" style={{ fontSize: 18 }}>{p.title}</h3>
                  <p className="mt-2" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

{/* ───────────── TECH STACK ───────────── */}
      <section id="stack" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12">
            {/* <Typewriter text="↳ 005 / STACK" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] mb-4">
              The tools behind <span className="italic font-serif font-normal">the results.</span>
            </h2>
            <p className="dc-reveal max-w-[560px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              We work with the best-in-class tooling across every layer of your infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {STACK.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(200,255,0,0.05)",
                  borderColor: "rgba(200,255,0,0.4)",
                  color: "#ffffff"
                }}
                className="flex items-center gap-3 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "12px 20px",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                }}
              >
                <t.icon className="h-4 w-4 text-primary opacity-80" />
                {t.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CASE STUDIES ───────────── */}
      <section id="work" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16">
            {/* <Typewriter text="↳ 006 / WORK" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              Results we've <span className="italic font-serif font-normal">delivered.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <article
                key={c.headline}
                className="dc-reveal dc-case-card flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 28,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span
                  className="font-mono inline-block self-start mb-6"
                  style={{
                    background: "rgba(200,255,0,0.1)",
                    border: "1px solid rgba(200,255,0,0.3)",
                    color: "#c8ff00",
                    borderRadius: 100,
                    padding: "4px 12px",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                  }}
                >
                  {c.tag}
                </span>
                <h3 className="font-display text-white" style={{ fontSize: 20, lineHeight: 1.3 }}>{c.headline}</h3>
                <div className="font-display text-white mt-6" style={{ fontSize: 36, letterSpacing: "-0.02em" }}>{c.metric}</div>
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{c.stack}</span>
                </div>
                <a href="#contact" className="dc-case-link mt-4 text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  View Details →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12">
            {/* <Typewriter text="↳ 007 / FAQ" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" /> */}
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              Common <span className="italic font-serif font-normal">questions.</span>
            </h2>
          </div>
          <div className="max-w-[880px]">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="dc-reveal" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left py-5"
                  >
                    <span className="text-white" style={{ fontSize: 17, fontWeight: 500 }}>{f.q}</span>
                    <span
                      className="text-primary"
                      style={{
                        fontSize: 22,
                        transition: "transform 0.3s ease",
                        transform: open ? "rotate(45deg)" : "rotate(0)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: open ? 240 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <p className="pb-5 pr-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.6 }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section id="contact" className="px-6 py-24 border-b border-border relative overflow-hidden">
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '200%',
              height: '100%',
            }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <style>{`
                @keyframes diagonalScroll {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .diag-group {
                  animation: diagonalScroll 18s linear infinite;
                }
              `}</style>
            </defs>

            <g className="diag-group">
              {Array.from({ length: 80 }).map((_, i) => (
                <line
                  key={i}
                  x1={i * 40 - 200}
                  y1="-100%"
                  x2={i * 40 - 200 + 600}
                  y2="200%"
                  stroke={i % 20 === 5 || i % 20 === 15 ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.08)"}
                  strokeWidth="1.5"
                />
              ))}
              {Array.from({ length: 80 }).map((_, i) => (
                <line
                  key={`b${i}`}
                  x1={i * 40 - 200 + 1440}
                  y1="-100%"
                  x2={i * 40 - 200 + 1440 + 600}
                  y2="200%"
                  stroke={i % 20 === 5 || i % 20 === 15 ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.08)"}
                  strokeWidth="1.5"
                />
              ))}
            </g>
          </svg>
        </div>
        {/* Floating decorative + dots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const isPlus = i % 2 === 0;
          const size = isPlus ? 14 : 4;
          const left = (i * 13 + 7) % 95;
          const dur = 15 + (i * 1.3) % 10;
          const delay = (i * 1.7) % 6;
          return (
            <span
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${left}%`,
                bottom: -40,
                width: size,
                height: size,
                color: "rgba(200,255,0,0.12)",
                fontSize: size,
                lineHeight: 1,
                background: isPlus ? "transparent" : "rgba(200,255,0,0.12)",
                borderRadius: isPlus ? 0 : "50%",
                animation: `float-up ${dur}s linear ${delay}s infinite`,
              }}
            >
              {isPlus ? "+" : ""}
            </span>
          );
        })}
        <div className="mx-auto max-w-[1280px] relative">
          <div
            className="border border-border bg-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="max-w-[640px]">
              {/* <Typewriter text="↳ 008 / AUDIT" className="font-mono text-[11px] tracking-[0.18em] text-primary mb-4 min-h-[16px]" /> */}
              <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                Let's audit your stack —{" "}
                <span className="italic font-serif font-normal">on the house.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto md:items-end">
              <a
                href="mailto:Contact@dev-consultancy.com"
                className="dc-cta-glow group inline-flex items-center justify-start gap-3 bg-primary text-background h-14 px-8 text-[15px] font-medium hover:opacity-90 transition-all shrink-0 w-full"
              >
                <Mail className="h-5 w-5" />
                Contact@dev-consultancy.com
              </a>
              <a
                href="tel:+919654722000"
                className="dc-cta-glow group inline-flex items-center justify-start gap-3 bg-primary text-background h-14 px-8 text-[15px] font-medium hover:opacity-90 transition-all shrink-0 w-full"
              >
                <Phone className="h-5 w-5" />
                +91 96547 22000
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=919654722000&text=Hi+Dev+Consultancy%2C+I+want+a+free+consultation&type=phone_number&app_absent=0"
                target="_blank" rel="noreferrer"
                className="dc-cta-glow group inline-flex items-center justify-start gap-3 bg-primary text-background h-14 px-8 text-[15px] font-medium hover:opacity-90 transition-all shrink-0 w-full"
              >
                <WhatsappIcon className="h-5 w-5" />
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer gradient divider */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #01fe93 0%, #5f79ff 33%, #c8ff00 66%, #0a0a0a 100%)" }} />

      {/* ───────────── FOOTER ───────────── */}
      <footer ref={footerRef} className="px-6 py-12">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Dev Consultancy"
              style={{
                height: 40,
                width: "auto",
                objectFit: "contain",
                filter: "grayscale(1) invert(1)",
                mixBlendMode: "screen",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
            />
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#services" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#clients" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Clients</a>
            <a href="#process" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Process</a>
          </nav>

          <p className="text-[12px] text-muted-foreground font-mono">
            © 2026 Dev Consultancy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating book a call widget */}
      <a
        href="https://api.whatsapp.com/send/?phone=919654722000&text=Hi+Dev+Consultancy%2C+I+want+a+free+consultation&type=phone_number&app_absent=0"
        target="_blank" rel="noreferrer"
        className="dc-floating-cta hidden md:inline-flex items-center gap-2"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: "#c8ff00",
          color: "#0a0a0a",
          fontWeight: 600,
          borderRadius: 100,
          padding: "12px 20px",
          fontSize: 13,
          opacity: hideFloating ? 0 : 1,
          pointerEvents: hideFloating ? "none" : "auto",
        }}
      >
        <span
          style={{
            width: 6, height: 6, borderRadius: "50%", background: "#fff",
            display: "inline-block",
            animation: "dot-pulse 2s ease-in-out infinite",
          }}
        />
        <WhatsappIcon className="h-4 w-4" /> Book a Call
      </a>
    </div>
  );
};

export default Landing;