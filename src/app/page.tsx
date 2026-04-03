"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Satellite,
  CircuitBoard,
  Github,
  Linkedin,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react";

/* ---------------------- Types & Data ---------------------- */
type TagKey = "aerospace" | "blockchain" | "ai" | "systems" | "research";
type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tags: TagKey[];
  highlights?: string[];
  links?: { label: string; href: string }[];
  year?: string;
  icon?: React.ReactNode;
};

const TAGS: { key: "all" | TagKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "aerospace", label: "Aerospace" },
  { key: "blockchain", label: "Blockchain" },
  { key: "ai", label: "AI" },
  { key: "systems", label: "Systems" },
  { key: "research", label: "Research" },
];

const PROJECTS: Project[] = [
  {
    title: "Satellite Tasking Marketplace (Verifiable SLAs)",
    subtitle: "Solidity · Attestations/Oracles · IPFS · Go/Next.js",
    description:
      "On-chain marketplace for satellite imaging/capture tasks with verifiable SLAs; escrow, dispute resolution, and operator reputation.",
    tags: ["aerospace", "blockchain", "systems"],
    highlights: ["Escrow + dispute", "Verifiable SLA proofs", "Operator reputation & slashing"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "On-chain Telemetry Attestations & Anomaly Bounties",
    subtitle: "Solidity · Off-chain Agents · Stream Processing · ML Anomaly Detection",
    description:
      "Signed telemetry anchored on-chain as attestations; anomaly reports earn bounties with AI-assisted triage and evaluator scoring.",
    tags: ["aerospace", "blockchain", "ai", "research"],
    highlights: ["Signed telemetry → on-chain", "Anomaly bounty marketplace", "ML triage + evaluator"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Cross-Venue DeFi Router & Risk Engine",
    subtitle: "Rust/Go · CEX/DEX Aggregation · MEV-aware Routing · Risk Limits",
    description:
      "Latency/slippage-aware pathing across venues with pre-trade risk checks, position/netting, and circuit-breakers; backtests on historical flows.",
    tags: ["blockchain", "systems", "research"],
    highlights: ["Slippage + latency scoring", "Pre-trade risk & circuit-breakers", "Historical backtests"],
    links: [{ label: "Repo", href: "#" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Cost/SLO-Aware LLM Inference Router",
    subtitle: "Go · AWS Gateway/Lambda/ECS · SQS · DynamoDB · Bedrock/OpenAI · OTel",
    description:
      "Policy-based routing with canary + auto-rollback; sustained 520 QPS, p95 880 ms; 30% lower cost vs single-model baseline; OTel + Grafana dashboards.",
    tags: ["ai", "systems"],
    highlights: ["Canary + rollback", "520 QPS · p95 880 ms", "−30% cost vs baseline"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/llm-router" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "AI Code Search Engine v2",
    subtitle: "Python/Go · PostgreSQL · Faiss/HNSW · Redis · gRPC · AWS",
    description:
      "Indexes 5.2M LOC / 62M tokens with 48 s incremental updates; cache hit 99.2%; search p95 150 ms at 500 QPS.",
    tags: ["ai", "systems", "research"],
    highlights: ["5.2M LOC indexed", "p95 150 ms @ 500 QPS", "99.2% cache hit"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/code-search-v2" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Limit Order Book & Matching Engine",
    subtitle: "C++20 · price–time priority · ITCH replay",
    description:
      "O(1) cancel/replace; arena allocator + cache-friendly queues. Bench: 4.2M orders/s, p50 2.1 µs, p99 10.8 µs (50M events).",
    tags: ["systems"],
    highlights: ["4.2M orders/s", "p50 2.1 µs · p99 10.8 µs", "Arena allocators · SPSC ring"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/lob-engine" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "On-chain Achievement NFTs",
    subtitle: "Solidity · Foundry · Dynamic SVG metadata",
    description:
      "ERC-721 badges that update as milestones are hit; frontend renders live SVG from on-chain state.",
    tags: ["blockchain", "systems"],
    highlights: ["ERC-721", "Dynamic metadata", "Data-URI SVG"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/achievement-nft" }],
    year: "2024",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Aero GNC Sandbox",
    subtitle: "Python/Rust · EKF · Lambert targeting",
    description:
      "State estimation and orbital transfer targeting; ascent/attitude profiles visualization.",
    tags: ["aerospace", "research"],
    highlights: ["EKF fusion", "Lambert solver", "Ascent/attitude viz"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/aero-gnc-sandbox" }],
    year: "2025",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Wind Tunnel Lift Data Analysis",
    subtitle: "MATLAB · error propagation · Monte Carlo",
    description:
      "Processed experimental data to compute lift; added uncertainty analysis via Monte Carlo.",
    tags: ["aerospace", "research"],
    highlights: ["Experimental pipeline", "Uncertainty quant", "Report + plots"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/Wind-Tunnel-Lift-Data-Analysis" }],
    year: "2024",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Virtual Pilot Coaster Simulator",
    subtitle: "MATLAB · loops · banked turns · zero-G",
    description:
      "Roller-coaster simulator modeling pilot G-forces and dynamic loads with banked turns and zero-G parabola.",
    tags: ["aerospace", "research"],
    highlights: ["G-force modeling", "Banked turns", "Zero-G parabola"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/Virtual-Pilot-Coaster-Simulator" }],
    year: "2024",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Differential Equation Integration Comparison",
    subtitle: "MATLAB · Euler vs RK4",
    description:
      "Compared Euler and RK4 ODE solutions against analytics; step-wise RMSE analysis and plots.",
    tags: ["aerospace", "research"],
    highlights: ["Euler vs RK4", "RMSE analysis", "Visualization"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/Differential-Equation-Integration-Comparison" }],
    year: "2024",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    title: "Dynamic Locomotive Crank Simulation",
    subtitle: "MATLAB · dynamics",
    description:
      "Simulated and analyzed locomotive crank dynamics with parameter sweeps.",
    tags: ["research", "aerospace"],
    highlights: ["Rigid-body dynamics", "Param sweeps", "Plots + analysis"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/Dynamic-Locomotive-Crank-Simulation" }],
    year: "2024",
    icon: <CircuitBoard className="h-5 w-5" />,
  }
];

/* ---------------------- Minimal UI helpers ---------------------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs text-white ${className}`}>
      {children}
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  newTab,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md";
  newTab?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const sizes = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variants =
    variant === "outline"
      ? "border border-white/20 bg-transparent hover:bg-white/10"
      : variant === "ghost"
      ? "bg-transparent hover:bg-white/10"
      : "bg-indigo-600 hover:bg-indigo-500";
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={`${base} ${sizes} ${variants} ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------------------- Background ---------------------- */
const Starfield = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050608]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(76,29,149,0.12),transparent_28%),radial-gradient(circle_at_52%_78%,rgba(24,24,27,0.78),transparent_42%)]" />
    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
    <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(2px_2px_at_18%_24%,rgba(255,255,255,0.18),transparent),radial-gradient(1.5px_1.5px_at_72%_18%,rgba(255,255,255,0.12),transparent),radial-gradient(1.5px_1.5px_at_44%_72%,rgba(255,255,255,0.14),transparent),radial-gradient(2px_2px_at_84%_62%,rgba(255,255,255,0.1),transparent)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.16),rgba(5,6,8,0.84))]" />
  </div>
);

const SYSTEM_NODES = [
  { x: "18%", y: "24%", delay: 0.2, size: "h-2 w-2" },
  { x: "66%", y: "18%", delay: 0.55, size: "h-2.5 w-2.5" },
  { x: "74%", y: "56%", delay: 0.9, size: "h-2 w-2" },
  { x: "34%", y: "72%", delay: 1.2, size: "h-3 w-3" },
  { x: "52%", y: "46%", delay: 1.5, size: "h-1.5 w-1.5" },
];

function SystemField() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[420px]"
      aria-hidden
    >
      <div className="absolute inset-10 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-white/[0.02]" />
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.22),transparent_36%),radial-gradient(circle_at_78%_24%,rgba(129,140,248,0.16),transparent_32%),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:auto,auto,48px_48px,48px_48px] bg-[position:0_0,0_0,-1px_-1px,-1px_-1px]" />
      <div className="absolute inset-4 rounded-[28px] border border-white/5" />

      <motion.div
        animate={{ opacity: [0.25, 0.65, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[15%] top-[24%] h-px w-[44%] origin-left rotate-[16deg] bg-gradient-to-r from-indigo-300/75 via-indigo-200/20 to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
        className="absolute left-[35%] top-[46%] h-px w-[38%] origin-left -rotate-[18deg] bg-gradient-to-r from-white/40 via-indigo-200/20 to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.18, 0.45, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
        className="absolute left-[34%] top-[72%] h-px w-[24%] origin-left -rotate-[46deg] bg-gradient-to-r from-indigo-300/60 via-indigo-200/15 to-transparent"
      />

      <motion.div
        animate={{ x: ["10%", "76%", "10%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-y-10 w-px bg-gradient-to-b from-transparent via-indigo-200/35 to-transparent"
      />

      {SYSTEM_NODES.map((node) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          style={{ left: node.x, top: node.y }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200 shadow-[0_0_24px_rgba(129,140,248,0.55)] ${node.size}`}
          animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.28, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        >
          <span className="absolute inset-[-6px] rounded-full border border-indigo-300/20" />
        </motion.span>
      ))}

      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/35">
        <span>reliability</span>
        <span>latency</span>
        <span>control</span>
      </div>
    </motion.div>
  );
}

/* ---------------------- Small pieces ---------------------- */
function InfoTile({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card>
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
            {icon}
          </span>
          <div className="text-base font-medium">{title}</div>
        </div>
        <Pill className="text-xs">
          <Globe className="mr-1 h-3 w-3" />
        </Pill>
      </div>
      <div className="px-4 pb-4">
        <p className="text-sm text-white/70">{body}</p>
      </div>
    </Card>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
      <Card className="h-full hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10">
        <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-4">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-500/15 p-2 text-indigo-400">{p.icon ?? <CircuitBoard className="h-5 w-5" />}</span>
            <div>
              <div className="text-lg font-semibold">{p.title}</div>
              {p.subtitle && <div className="text-xs text-white/60">{p.subtitle}</div>}
            </div>
          </div>
          {p.year && <Pill className="bg-white/5">{p.year}</Pill>}
        </div>
        <div className="px-4 pb-4">
          <p className="mb-3 text-sm text-white/70">{p.description}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Pill key={t} className="capitalize">
                {t}
              </Pill>
            ))}
          </div>
          {p.highlights && (
            <ul className="mb-4 list-disc pl-5 text-sm text-white/70">
              {p.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
          {p.links && p.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {p.links.map((l, i) => (
                <ButtonLink key={i} href={l.href} variant="outline" size="sm" newTab>
                  {l.label} <ExternalLink className="h-3.5 w-3.5" />
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

/* ---------------------- Page ---------------------- */
export default function Page() {
  const [activeTag, setActiveTag] = useState<(typeof TAGS)[number]["key"]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const tagOk = activeTag === "all" ? true : p.tags.includes(activeTag as "aerospace" | "blockchain" | "ai" | "systems" | "research");
      const text = `${p.title} ${p.subtitle ?? ""} ${p.description} ${p.highlights?.join(" ") ?? ""}`.toLowerCase();
      return tagOk && (q.length === 0 || text.includes(q));
    });
  }, [activeTag, query]);

  return (
    <div className="min-h-screen text-white">
      <Starfield />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mx-auto grid min-h-[88svh] max-w-6xl items-center gap-14 px-4 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl"
          >
            <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/45">
              <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.7)]" />
              Boulder, Colorado
            </div>

            <h1 className="text-6xl font-semibold tracking-[-0.07em] text-white sm:text-7xl md:text-[5.5rem]">Ratna</h1>

            <p className="mt-5 max-w-xl text-base text-indigo-100/82 sm:text-lg">
              Systems engineer across aerospace, AI, and resilient infrastructure.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/64 sm:text-base">
              I build for constraint-heavy environments where latency, reliability, and operator clarity matter. Quiet on the surface,
              precise underneath.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#projects" className="bg-indigo-500 text-white hover:bg-indigo-400">
                View Work <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="https://github.com/ratnathegod"
                variant="outline"
                newTab
                className="border-white/15 bg-white/[0.02] hover:border-white/25"
              >
                GitHub <Github className="h-4 w-4" />
              </ButtonLink>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-start lg:justify-end">
            <SystemField />
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Ratnakaru Yalagathala
              </motion.h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Aerospace × Blockchain × AI — pioneering systems that are fast, intelligent, and built to last.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ButtonLink href="https://github.com/canvas-ai-labs" variant="outline" newTab>
                <Github className="h-4 w-4" /> GitHub
              </ButtonLink>
              <ButtonLink href="https://www.linkedin.com" variant="outline" newTab>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </ButtonLink>
              <ButtonLink href="mailto:ratnakaru@example.com">
                <Mail className="h-4 w-4" /> Contact
              </ButtonLink>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <InfoTile
              icon={<Rocket className="h-5 w-5" />}
              title="Aerospace"
              body="GNC, orbital mechanics, MPC — simulation-first thinking with reliability and constraints in mind."
            />
            <InfoTile
              icon={<CircuitBoard className="h-5 w-5" />}
              title="Systems & AI"
              body="Agentic workflows, GraphRAG, low-latency services, and structured evals/guardrails."
            />
            <InfoTile
              icon={<Satellite className="h-5 w-5" />}
              title="Blockchain"
              body="Smart contracts, on-chain data, and verifiable program state for trust-minimized apps."
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Projects</h3>
              <p className="text-sm text-white/70">Filter by domain or search by keyword.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Tag pills */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTag(t.key)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      activeTag === t.key ? "bg-indigo-600" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {/* Search */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full min-w-56 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none ring-indigo-500 placeholder:text-white/50 focus:ring-2 sm:w-72"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-sm text-white/70">No projects match your filters yet.</div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <h3 className="mb-2 text-2xl font-semibold tracking-tight">About</h3>
              <p className="text-sm text-white/70">
                I’m an Aerospace & Computer Science major at the University of Colorado Boulder, driven to explore the intersection of
                advanced computing, quantitative engineering, and aerospace innovation. I focus on building resilient agentic systems,
                ultra-fast backends, and flight-grade simulations that bridge digital and physical frontiers.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "CrewAI",
                  "LangGraph",
                  "DSPy",
                  "Neo4j",
                  "Pinecone",
                  "Solidity",
                  "Foundry",
                  "C++20",
                  "Rust",
                  "Python",
                  "Kubernetes",
                ].map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
            <div className="sm:col-span-3">
              <Card>
                <div className="px-4 pb-2 pt-4 text-base font-medium">Highlights</div>
                <div className="px-4 pb-4">
                  <ul className="grid list-disc gap-2 pl-5 text-sm text-white/70">
                    <li>CBRE “AI in SDLC” intern: designed multi-agent triage with evals, retries, and guardrails.</li>
                    <li>Canvas AI Agent: GraphRAG + Neo4j schema with tool-use policies, DSPy tuning.</li>
                    <li>Limit Order Book: micro-benchmarks with multi-million orders/sec throughput.</li>
                    <li>Aero GNC sandbox: EKF state estimation and Lambert targeting prototypes.</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Ratnakaru Yalagathala. Built with Next.js, Tailwind, and Framer Motion.
            </p>
            <div className="flex items-center gap-2">
              <ButtonLink href="mailto:ratnakaru@example.com" variant="ghost" size="sm">
                <Mail className="h-4 w-4" /> Email
              </ButtonLink>
              <ButtonLink href="https://github.com/canvas-ai-labs" variant="ghost" size="sm" newTab>
                <Github className="h-4 w-4" /> GitHub
              </ButtonLink>
              <ButtonLink href="https://www.linkedin.com" variant="ghost" size="sm" newTab>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </ButtonLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
