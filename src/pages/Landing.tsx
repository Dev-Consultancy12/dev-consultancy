import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, Rocket, ShieldCheck, Cpu, Cloud, GitBranch } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

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

const Landing = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", ACCENT_HSL);
    root.style.setProperty("--ring", ACCENT_HSL);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background overflow-x-hidden">
      {/* ───────────── NAV ───────────── */}
      <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
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
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium bg-foreground text-background h-9 px-4 hover:bg-primary hover:text-background transition-colors"
          >
            Free Audit
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-border">
        {/* grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="mx-auto max-w-[1280px] relative">
          {/* eyebrow tags ticker */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-10">
            {TAGS.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-primary">•</span>}
                <span>{t}</span>
              </span>
            ))}
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-[1100px]">
            We help startups{" "}
            <span className="italic font-serif font-normal text-primary">automate</span>,
            <br />
            scale and{" "}
            <span className="italic font-serif font-normal">deploy faster.</span>
          </h1>

          <p className="mt-8 text-[17px] leading-[1.55] text-muted-foreground max-w-[560px]">
            Architectural precision meets high-speed execution. Elevating digital
            infrastructure for modern enterprises.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
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

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <b.icon className="h-4 w-4 text-primary" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── METRICS ───────────── */}
      <section id="metrics" className="px-6 py-24 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4">
                ↳ 002 / IMPACT
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                What we improve for{" "}
                <span className="italic font-serif font-normal">your business.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.6] text-muted-foreground">
                Less manual work. Faster releases. Better systems. Cleaner reporting.
                Scalable infrastructure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="border-r border-b border-border p-6 md:p-8 group hover:bg-primary/5 transition-colors"
              >
                <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-foreground group-hover:text-primary transition-colors">
                  {m.value}
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
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground mb-4">
                ↳ 003 / SERVICES
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                Services built for{" "}
                <span className="italic font-serif font-normal">serious</span> business
                growth.
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="text-[16px] leading-[1.6] text-muted-foreground">
                We do not just build websites. We build the technical backbone that
                helps companies operate faster, smarter and more efficiently.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="bg-background p-8 flex flex-col min-h-[420px] group hover:bg-card transition-colors"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                    {s.no}
                  </span>
                  <div className="h-10 w-10 grid place-items-center border border-border group-hover:border-primary group-hover:text-primary transition-colors">
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
                      className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-border px-2 py-1"
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

      {/* ───────────── CTA ───────────── */}
      <section id="contact" className="px-6 py-24 border-b border-border relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, hsl(var(--border)) 0px, hsl(var(--border)) 1px, transparent 1px, transparent 14px)",
          }}
        />
        <div className="mx-auto max-w-[1280px] relative">
          <div className="border border-border bg-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-[640px]">
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary mb-4">
                ↳ FREE AUDIT
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                Let's audit your stack —{" "}
                <span className="italic font-serif font-normal">on the house.</span>
              </h2>
            </div>
            <a
              href="mailto:hello@dev-consultancy.com"
              className="group inline-flex items-center gap-2 bg-primary text-background h-14 px-8 text-[15px] font-medium hover:opacity-90 transition-opacity shrink-0"
            >
              Book Free Consultation
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="px-6 py-12">
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
    </div>
  );
};

export default Landing;