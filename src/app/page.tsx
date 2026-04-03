"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Cpu,
  Satellite,
  Blocks,
  Brain,
  FlaskConical,
  Briefcase,
} from "lucide-react";
import { FloatingDock } from "@/components/floating-dock";

/* ─── Types ───────────────────────────────────────────────── */

type TagKey = "aerospace" | "blockchain" | "ai" | "systems" | "research";

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tags: TagKey[];
  links?: { label: string; href: string }[];
  year?: string;
};

type ExperienceItem = {
  org: string;
  role: string;
  summary: string;
  period: string;
};

/* ─── Data ────────────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    title: "Satellite Tasking Marketplace",
    subtitle: "Solidity · Attestations/Oracles · IPFS · Go/Next.js",
    description:
      "On-chain marketplace for satellite capture tasks with verifiable SLAs, escrow, dispute resolution, and operator reputation.",
    tags: ["aerospace", "blockchain", "systems"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
  },
  {
    title: "On-chain Telemetry Attestations",
    subtitle: "Solidity · Stream Processing · ML Anomaly Detection",
    description:
      "Telemetry signatures anchored on-chain with anomaly reports, bounty workflows, and AI-assisted triage.",
    tags: ["aerospace", "blockchain", "ai", "research"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
  },
  {
    title: "Cross-Venue DeFi Router",
    subtitle: "Rust/Go · CEX/DEX Aggregation · Risk Limits",
    description:
      "Latency-aware pathing across venues with pre-trade checks, circuit breakers, and historical flow backtests.",
    tags: ["blockchain", "systems", "research"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
  },
  {
    title: "Cost/SLO-Aware LLM Router",
    subtitle: "Go · AWS · Bedrock/OpenAI · OTel",
    description:
      "Policy-based inference routing with canary rollout, rollback automation, and sustained production throughput.",
    tags: ["ai", "systems"],
    links: [
      { label: "Repo", href: "https://github.com/ratnathegod/llm-router" },
    ],
    year: "2025",
  },
  {
    title: "AI Code Search Engine v2",
    subtitle: "Python/Go · PostgreSQL · Faiss/HNSW · Redis",
    description:
      "High-scale semantic code search with fast incremental indexing, cache-heavy retrieval, and low-latency query serving.",
    tags: ["ai", "systems", "research"],
    links: [
      { label: "Repo", href: "https://github.com/ratnathegod/code-search-v2" },
    ],
    year: "2025",
  },
  {
    title: "Limit Order Book Engine",
    subtitle: "C++20 · Price-Time Priority · ITCH Replay",
    description:
      "Matching engine optimized for throughput and low tail latency with arena allocation and cache-friendly queues.",
    tags: ["systems"],
    links: [
      { label: "Repo", href: "https://github.com/ratnathegod/lob-engine" },
    ],
    year: "2025",
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    org: "CBRE",
    role: "AI in SDLC Intern",
    summary:
      "Designed multi-agent triage flows with evals, retries, and guardrails inside the engineering loop.",
    period: "Recent",
  },
  {
    org: "Canvas AI",
    role: "Agent Systems",
    summary:
      "Built GraphRAG workflows with Neo4j structure, retrieval policy design, and DSPy tuning.",
    period: "Systems",
  },
  {
    org: "Aerospace Research",
    role: "GNC Sandbox",
    summary:
      "Prototyped EKF state estimation and Lambert targeting under simulation-heavy operational constraints.",
    period: "Research",
  },
];

/* ─── Visual Config ───────────────────────────────────────── */

const TAG_VISUAL: Record<TagKey, { gradient: string; iconColor: string }> = {
  aerospace: {
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    iconColor: "text-indigo-400/40",
  },
  blockchain: {
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-400/40",
  },
  ai: {
    gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
    iconColor: "text-amber-400/40",
  },
  systems: {
    gradient: "from-slate-400/20 via-zinc-500/10 to-transparent",
    iconColor: "text-slate-400/40",
  },
  research: {
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-violet-400/40",
  },
};

const TAG_ICON: Record<TagKey, typeof Cpu> = {
  aerospace: Satellite,
  blockchain: Blocks,
  ai: Brain,
  systems: Cpu,
  research: FlaskConical,
};

/* ─── Backdrop ────────────────────────────────────────────── */

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06070a]">
      {/* Radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(129,140,248,0.12),transparent),radial-gradient(ellipse_50%_40%_at_15%_20%,rgba(79,70,229,0.07),transparent),radial-gradient(ellipse_50%_40%_at_85%_20%,rgba(91,33,182,0.05),transparent)]" />

      {/* Dot grid — top area */}
      <div className="absolute inset-x-0 top-0 h-80 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.1)_0.8px,transparent_0.8px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />

      {/* Rule grid — full page subtle */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06070a]" />
    </div>
  );
}

/* ─── Hero Visual (Orbital System) ────────────────────────── */

function OrbitalRing({
  insetPercent,
  duration,
  reverse = false,
  dashed = false,
  children,
}: {
  insetPercent: number;
  duration: number;
  reverse?: boolean;
  dashed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className={`absolute rounded-full ${
        dashed
          ? "border border-dashed border-white/[0.06]"
          : "border border-white/[0.04]"
      }`}
      style={{ inset: `${insetPercent}%` }}
    >
      {children}
    </motion.div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-square w-full max-w-[380px]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/[0.07] via-violet-500/[0.04] to-transparent blur-3xl" />

      {/* Center node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-3 w-3 rounded-full bg-indigo-400/80 shadow-[0_0_16px_rgba(129,140,248,0.4)]"
        />
      </div>
      <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/20" />

      {/* Ring 1 — inner */}
      <OrbitalRing insetPercent={37} duration={25} dashed>
        <div className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-indigo-400/60 shadow-[0_0_8px_rgba(129,140,248,0.3)]" />
      </OrbitalRing>

      {/* Ring 2 */}
      <OrbitalRing insetPercent={25} duration={40} reverse>
        <div className="absolute -top-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400/50 shadow-[0_0_6px_rgba(167,139,250,0.25)]" />
        <div className="absolute -bottom-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-300/35" />
      </OrbitalRing>

      {/* Ring 3 */}
      <OrbitalRing insetPercent={13} duration={55} dashed>
        <div className="absolute -right-[4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-400/35" />
        <div className="absolute -top-[4px] left-[30%] h-1.5 w-1.5 rounded-full bg-violet-400/25" />
      </OrbitalRing>

      {/* Ring 4 — outer */}
      <OrbitalRing insetPercent={3} duration={75} reverse>
        <div className="absolute -top-[3px] left-[70%] h-1.5 w-1.5 rounded-full bg-indigo-400/20" />
        <div className="absolute -left-[3px] top-[40%] h-1.5 w-1.5 rounded-full bg-slate-400/15" />
        <div className="absolute -bottom-[3px] right-[30%] h-1.5 w-1.5 rounded-full bg-violet-300/15" />
      </OrbitalRing>
    </motion.div>
  );
}

/* ─── Section Header ──────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 sm:mb-16"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-indigo-400/70">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
        {description}
      </p>
    </motion.div>
  );
}

/* ─── Project Card ────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const primaryTag = project.tags[0];
  const visual = TAG_VISUAL[primaryTag];
  const TagIcon = TAG_ICON[primaryTag];
  const liveLinks =
    project.links?.filter((l) => l.href !== "#") ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Preview area */}
      <div
        className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${visual.gradient}`}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:20px_20px]" />
        <TagIcon
          className={`h-12 w-12 ${visual.iconColor} transition-transform duration-500 group-hover:scale-110`}
          strokeWidth={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-white/90 transition-colors group-hover:text-white">
            {project.title}
          </h3>
          {project.year && (
            <span className="mt-0.5 shrink-0 rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
              {project.year}
            </span>
          )}
        </div>

        {project.subtitle && (
          <p className="mt-2 text-xs font-medium text-white/25">
            {project.subtitle}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-white/45">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {liveLinks.length > 0 && (
          <div className="mt-5 flex items-center gap-3 border-t border-white/[0.05] pt-4">
            {liveLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/35 transition-colors hover:text-white/80"
              >
                <ExternalLink className="h-3.5 w-3.5" /> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Experience Row ──────────────────────────────────────── */

function ExperienceRow({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex gap-4 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-white/[0.06] hover:bg-white/[0.02] sm:gap-5 sm:p-5"
    >
      {/* Monogram */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-white/30 transition-colors group-hover:border-white/[0.12] group-hover:text-white/50">
        {item.org === "Aerospace Research" ? (
          <Satellite className="h-4 w-4" />
        ) : (
          <Briefcase className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[13px] font-semibold text-white/60">
            {item.org}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20">
            {item.period}
          </span>
        </div>
        <h3 className="mt-1 text-[15px] font-medium text-white/85 transition-colors group-hover:text-white">
          {item.role}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/40">
          {item.summary}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <Backdrop />
      <FloatingDock />

      <main className="mx-auto max-w-5xl px-5 pb-32 sm:px-8 lg:px-12">
        {/* ─── Hero ─── */}
        <section className="flex min-h-[85vh] flex-col items-center justify-center gap-12 py-20 lg:flex-row lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-xl text-center lg:text-left"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-indigo-400/60">
              Systems Engineer · Builder · Researcher
            </p>
            <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Ratna
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/45 sm:text-xl">
              Building high-performance systems across{" "}
              <span className="text-white/70">aerospace</span>,{" "}
              <span className="text-white/70">blockchain</span>, and{" "}
              <span className="text-white/70">AI infrastructure</span>.
              <br className="hidden sm:block" />
              Clean surfaces, complicated internals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:placeholder@example.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          <div className="hidden w-full max-w-sm lg:block">
            <HeroVisual />
          </div>
        </section>

        {/* ─── Projects ─── */}
        <section id="projects" className="scroll-mt-20 pt-8 sm:pt-12">
          <SectionHeader
            eyebrow="Selected Work"
            title="Projects"
            description="Systems-heavy builds across infrastructure, aerospace-adjacent research, and AI tooling."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ─── Experience ─── */}
        <section id="experience" className="mt-24 sm:mt-32">
          <SectionHeader
            eyebrow="Engineering Work"
            title="Experience"
            description="Production workflows, retrieval systems, and control-oriented research."
          />

          <div className="space-y-2">
            {EXPERIENCE.map((item, index) => (
              <ExperienceRow
                key={`${item.org}-${item.role}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left lg:px-12">
          <p className="text-sm text-white/25">
            University of Colorado Boulder
          </p>
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
