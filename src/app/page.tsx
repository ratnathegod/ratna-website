"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

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
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/llm-router" }],
    year: "2025",
  },
  {
    title: "AI Code Search Engine v2",
    subtitle: "Python/Go · PostgreSQL · Faiss/HNSW · Redis",
    description:
      "High-scale semantic code search with fast incremental indexing, cache-heavy retrieval, and low-latency query serving.",
    tags: ["ai", "systems", "research"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/code-search-v2" }],
    year: "2025",
  },
  {
    title: "Limit Order Book Engine",
    subtitle: "C++20 · Price-Time Priority · ITCH Replay",
    description:
      "Matching engine optimized for throughput and low tail latency with arena allocation and cache-friendly queues.",
    tags: ["systems"],
    links: [{ label: "Repo", href: "https://github.com/ratnathegod/lob-engine" }],
    year: "2025",
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    org: "CBRE",
    role: "AI in SDLC Intern",
    summary: "Designed multi-agent triage flows with evals, retries, and guardrails inside the engineering loop.",
    period: "Recent",
  },
  {
    org: "Canvas AI",
    role: "Agent Systems",
    summary: "Built GraphRAG workflows with Neo4j structure, retrieval policy design, and DSPy tuning.",
    period: "Systems",
  },
  {
    org: "Aerospace Research",
    role: "GNC Sandbox",
    summary: "Prototyped EKF state estimation and Lambert targeting under simulation-heavy operational constraints.",
    period: "Research",
  },
];

const FEATURED_PROJECTS = PROJECTS.slice(0, 4);
const ARCHIVE_PROJECTS = PROJECTS.slice(4);

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06070a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(129,140,248,0.18),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.12),transparent_26%),radial-gradient(circle_at_80%_16%,rgba(91,33,182,0.10),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-56 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.14)_0.8px,transparent_0.8px)] [background-size:10px_10px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.05),rgba(6,7,10,0.84)_28%,rgba(6,7,10,1))]" />
    </div>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/38">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">{description}</p>
    </div>
  );
}

function ProjectItem({ project, featured = false }: { project: Project; featured?: boolean }) {
  const liveLinks = project.links?.filter((link) => link.href !== "#") ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35 }}
      className={`group relative border-b border-white/8 py-5 transition ${featured ? "sm:py-6" : "sm:py-5"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-medium tracking-[-0.02em] text-white transition group-hover:text-indigo-100">
              {project.title}
            </h3>
            {project.year && (
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-white/42">
                {project.year}
              </span>
            )}
          </div>
          {project.subtitle && <p className="mt-2 text-sm text-white/42">{project.subtitle}</p>}
          <p className="mt-3 text-sm leading-7 text-white/60">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-white/42"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {liveLinks.length > 0 && (
          <div className="flex shrink-0 items-center gap-3 sm:pt-1">
            {liveLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/54 transition hover:text-white"
              >
                {link.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function ExperienceItemRow({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative border-b border-white/8 py-5 transition sm:py-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/34">{item.org}</div>
          <h3 className="mt-2 text-lg font-medium tracking-[-0.02em] text-white transition group-hover:text-indigo-100">
            {item.role}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/60">{item.summary}</p>
        </div>
        <div className="shrink-0 text-sm text-white/38 sm:pt-1">{item.period}</div>
      </div>
    </motion.article>
  );
}

function FooterLink({
  href,
  children,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 text-sm text-white/46 transition hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <Backdrop />

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <section id="projects">
          <SectionIntro
            eyebrow="Selected Work"
            title="Projects"
            description="Systems-heavy builds across infrastructure, aerospace-adjacent research, and AI tooling. Clean surfaces, complicated internals."
          />

          <div>
            {FEATURED_PROJECTS.map((project) => (
              <ProjectItem key={project.title} project={project} featured />
            ))}
          </div>

          {ARCHIVE_PROJECTS.length > 0 && (
            <div className="mt-12">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/34">Archive</p>
              <div>
                {ARCHIVE_PROJECTS.map((project) => (
                  <ProjectItem key={project.title} project={project} />
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="experience" className="mt-16 sm:mt-20">
          <SectionIntro
            eyebrow="Engineering Work"
            title="Experience"
            description="A concise view of the work behind the projects: production workflows, retrieval systems, and control-oriented research."
          />

          <div>
            {EXPERIENCE.map((item, index) => (
              <ExperienceItemRow key={`${item.org}-${item.role}`} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="text-white/34">University of Colorado Boulder</div>
          <div className="flex flex-wrap items-center gap-5">
            <FooterLink href="mailto:placeholder@example.com">
              <Mail className="h-4 w-4" /> Contact
            </FooterLink>
            <FooterLink href="https://github.com/ratnathegod" newTab>
              <Github className="h-4 w-4" /> GitHub
            </FooterLink>
            <FooterLink href="https://www.linkedin.com" newTab>
              <Linkedin className="h-4 w-4" /> LinkedIn
            </FooterLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
