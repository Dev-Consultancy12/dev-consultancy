import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, Rocket, ShieldCheck, Cpu, Cloud, GitBranch } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

/* Lock dev-consultancy accent tokens */
const ACCENT_HSL = "75 100% 60%"; // electric lime #D4FF3A

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#metrics" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

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
];

const BADGES = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: Rocket, label: "Startup-Friendly Pricing" },
  { icon: ShieldCheck, label: "Enterprise-Grade Execution" },
];

const PROCESS = [
  { no: "01", title: "Discovery",   desc: "We audit your current stack, workflows and bottlenecks." },
  { no: "02", title: "Architecture", desc: "We design the system blueprint tailored to your scale." },
  { no: "03", title: "Build",       desc: "We execute with precision — no hand-waving, just shipped code." },
  { no: "04", title: "Deploy",      desc: "We launch with automated CI/CD pipelines and zero-downtime deploys." },
  { no: "05", title: "Monitor",     desc: "We set up 24/7 alerting, dashboards and ongoing optimization." },
];

const STACK = [
  "AWS","Google Cloud","Azure","Docker","Kubernetes",
  "Terraform","GitHub Actions","Jenkins","n8n","LangChain",
  "OpenAI","Zapier","PostgreSQL","Redis","Grafana",
];

const CASES = [
  { tag: "DEVOPS",        headline: "Reduced deployment time by 3x for a Series-A SaaS startup.", metric: "3x faster",        stack: "GitHub Actions + Docker + AWS ECS" },
  { tag: "AI AUTOMATION", headline: "Automated 70% of manual ops workflows for a logistics company.", metric: "70% saved",     stack: "n8n + OpenAI + PostgreSQL" },
  { tag: "CLOUD INFRA",   headline: "Cut cloud costs by 40% through infrastructure optimization.", metric: "40% cost reduction", stack: "Terraform + AWS + Grafana" },
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

const Landing = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", ACCENT_HSL);
    root.style.setProperty("--ring", ACCENT_HSL);
  }, [theme]);

  useReveal();

  /* Page load intro overlay */
  const [overlay, setOverlay] = useState(true);
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background overflow-x-hidden">
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
      <nav
        className="fixed top-0 z-50 w-full"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          background: scrolled ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0.4)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 grid place-items-center bg-primary text-background font-mono text-[11px] font-bold">
              {"<>"}
            </div>
            <span className="text-[13px] font-semibold tracking-tight">
              Dev<span className="text-muted-foreground">·</span>Consultancy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="dc-nav-link text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="dc-audit-pulse group inline-flex items-center gap-1.5 text-[13px] font-medium bg-foreground text-background h-9 px-4 hover:bg-primary hover:text-background transition-colors"
          >
            Free Audit
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-border">
        {/* animated dot grid backdrop */}
        <div className="dc-hero-dots absolute inset-0 opacity-[0.35] pointer-events-none" />
        {/* radial glow blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px", right: "-120px", width: 700, height: 700,
            background: "rgba(95,121,255,0.10)", filter: "blur(140px)", zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-160px", left: "-120px", width: 700, height: 700,
            background: "rgba(200,255,0,0.05)", filter: "blur(140px)", zIndex: 0,
          }}
        />
        <div className="mx-auto max-w-[1280px] relative">
          {/* eyebrow tags ticker */}
          <div className="dc-reveal flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-10">
            {TAGS.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-primary">•</span>}
                <span>{t}</span>
              </span>
            ))}
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-[1100px]">
            {["We", "help", "startups"].map((w, i) => (
              <span key={i} className="dc-word is-in mr-[0.25em]" style={{ animationDelay: `${i * 60}ms` }}>{w}</span>
            ))}
            <span className="dc-word is-in italic font-serif font-normal text-primary mr-[0.05em]" style={{ animationDelay: `${3 * 60}ms` }}>automate</span>
            <span className="dc-word is-in mr-[0.25em]" style={{ animationDelay: `${4 * 60}ms` }}>,</span>
            <br />
            {["scale", "and"].map((w, i) => (
              <span key={i} className="dc-word is-in mr-[0.25em]" style={{ animationDelay: `${(5 + i) * 60}ms` }}>{w}</span>
            ))}
            <span className="dc-word is-in italic font-serif font-normal" style={{ animationDelay: `${7 * 60}ms` }}>deploy faster.</span>
          </h1>

          <p className="dc-reveal mt-8 text-[17px] leading-[1.55] text-muted-foreground max-w-[560px]">
            Architectural precision meets high-speed execution. Elevating digital
            infrastructure for modern enterprises.
          </p>

          <div className="dc-reveal mt-10 flex flex-wrap items-center gap-3">
            <a
              ref={magRef}
              href="#contact"
              className="group inline-flex items-center gap-2 bg-primary text-background h-12 px-6 text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              Book Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                ["AUTOMATION","CLOUD INFRA","CI/CD","AI WORKFLOWS","DEVOPS","QA TESTING","MONITORING","SCALABLE SYSTEMS","FAST DELIVERY"]
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
              <Typewriter text="↳ 002 / IMPACT" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
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

      {/* ───────────── SERVICES ───────────── */}
      <section id="services" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-6">
              <Typewriter text="↳ 003 / SERVICES" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
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

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="dc-reveal dc-service-card bg-background p-8 flex flex-col min-h-[420px] group hover:bg-card"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                    {s.no}
                  </span>
                  <div className="dc-service-icon h-10 w-10 grid place-items-center border border-border group-hover:border-primary group-hover:text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] mb-4">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-muted-foreground mb-8">
                  {s.desc}
                </p>

                <div className="mt-auto pt-6 border-t border-border flex flex-wrap gap-2">
                  {s.stack.map((tag) => (
                    <span
                      key={tag}
                      className="dc-stack-pill font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-border px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PROCESS ───────────── */}
      <section id="process" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16">
            <Typewriter text="↳ 004 / PROCESS" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              How we <span className="italic font-serif font-normal">deliver.</span>
            </h2>
          </div>

          <div className="relative">
            <svg className="hidden md:block absolute top-1/2 left-0 w-full" height="1" style={{ overflow: "visible" }}>
              <line x1="0" y1="0" x2="100%" y2="0"
                stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                strokeDasharray="2000" strokeDashoffset="2000"
                style={{ animation: "stroke-draw 1.2s ease forwards 0.3s" }}
              />
            </svg>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {PROCESS.map((p, i) => (
                <div
                  key={p.no}
                  className="dc-reveal dc-process-step p-6"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="font-display" style={{ fontSize: 48, color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>{p.no}</div>
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
            <Typewriter text="↳ 005 / STACK" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
            <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] mb-4">
              The tools behind <span className="italic font-serif font-normal">the results.</span>
            </h2>
            <p className="dc-reveal max-w-[560px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              We work with the best-in-class tooling across every layer of your infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {STACK.map((t, i) => (
              <div
                key={t}
                className="dc-reveal dc-tech-pill flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "12px 20px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 13,
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-primary opacity-60" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CASE STUDIES ───────────── */}
      <section id="work" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16">
            <Typewriter text="↳ 006 / WORK" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
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
            <Typewriter text="↳ 007 / FAQ" className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4 min-h-[16px]" />
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
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, hsl(var(--border)) 0px, hsl(var(--border)) 1px, transparent 1px, transparent 14px)",
          }}
        />
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
          <div className="border border-border bg-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-[640px]">
              <Typewriter text="↳ 008 / AUDIT" className="font-mono text-[11px] tracking-[0.18em] text-primary mb-4 min-h-[16px]" />
              <h2 className="dc-reveal font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                Let's audit your stack —{" "}
                <span className="italic font-serif font-normal">on the house.</span>
              </h2>
            </div>
            <a
              href="mailto:hello@dev-consultancy.com"
              className="dc-cta-glow group inline-flex items-center gap-2 bg-primary text-background h-14 px-8 text-[15px] font-medium hover:opacity-90 transition-all shrink-0"
            >
              Book Free Consultation
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer gradient divider */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #01fe93 0%, #5f79ff 33%, #c8ff00 66%, #0a0a0a 100%)" }} />

      {/* ───────────── FOOTER ───────────── */}
      <footer ref={footerRef} className="px-6 py-12">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 grid place-items-center bg-primary text-background font-mono text-[11px] font-bold">
              {"<>"}
            </div>
            <span className="text-[13px] font-semibold tracking-tight">
              Dev<span className="text-muted-foreground">·</span>Consultancy
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {["Services", "Work", "Process", "Pricing", "Privacy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          <p className="text-[12px] text-muted-foreground font-mono">
            © 2024 Dev Consultancy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating book a call widget */}
      <a
        href="#contact"
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
        ↗ Book a Call
      </a>
    </div>
  );
};

export default Landing;