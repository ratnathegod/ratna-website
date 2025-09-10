"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Satellite,
  CircuitBoard,
  Github,
  Linkedin,
  Mail,
  Globe,
  ExternalLink,
  Filter,
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
  <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,.10),transparent_35%),radial-gradient(circle_at_40%_80%,rgba(34,197,94,.08),transparent_35%)]">
    <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(2px_2px_at_20px_30px,rgba(255,255,255,.35),transparent),radial-gradient(1px_1px_at_120px_80px,rgba(255,255,255,.25),transparent),radial-gradient(1px_1px_at_220px_140px,rgba(255,255,255,.2),transparent),radial-gradient(2px_2px_at_420px_240px,rgba(255,255,255,.3),transparent)] [background-size:200px_200px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.0)_60%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

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
          <Globe className="mr-1 h-3 w-3" /> Focus
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
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pb-16 sm:pt-24">
          <div className="grid items-center gap-8 sm:grid-cols-2">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-balance text-4xl font-bold leading-tight sm:text-5xl"
              >
                Building at the edge of <span className="text-indigo-400">space</span> &{" "}
                <span className="text-indigo-400">cryptography</span>
              </motion.h2>
              <p className="mt-4 text-sm text-white/70">
                I’m Ratna — an aerospace major & CS minor at CU Boulder. I ship production-grade agentic systems, flight-adjacent sims, and
                high-performance services. Here are the projects I’m most proud of.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#projects">
                  <Filter className="h-4 w-4" /> Explore Projects
                </ButtonLink>
                <ButtonLink href="/Ratnakaru_Yalagathala_Resume.pdf" variant="outline" newTab>
                  Resume
                </ButtonLink>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-56 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 sm:h-64"
            >
              <div className="absolute right-4 top-4 flex items-center gap-2 text-xs text-white/70">
                <Rocket className="h-4 w-4" /> GNC • MPC • Orbital
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/70">
                <CircuitBoard className="h-4 w-4" /> CrewAI • GraphRAG • Solidity
              </div>
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-[radial-gradient(100px_60px_at_70%_30%,rgba(99,102,241,.25),transparent),radial-gradient(120px_80px_at_30%_70%,rgba(168,85,247,.2),transparent)]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Ratnakaru Yalagathala
              </motion.h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Aerospace × Blockchain × AI — building reliable agentic systems, high-performance backends, and flight-adjacent tooling.
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
              title="Aerospace Focus"
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
                I’m a CU Boulder student (Aerospace major, CS minor) aiming at FAANG, quant, and aerospace roles. I enjoy building reliable
                agents, performance-first backends, and flight-adjacent tooling.
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
