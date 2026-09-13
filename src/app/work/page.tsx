"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import { InstantImage } from "@/components/media/InstantImage";

interface DetailedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "all" | "ai-systems" | "voice-ai" | "fullstack";
  categoryLabel: string;
  badge: string;
  accentClass: string;
  accentHex: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const projectsData: DetailedProject[] = [
  {
    id: "wekraft",
    number: "01",
    title: "WEKRAFT",
    subtitle: "AI-Powered Project Execution & Dev Coordination Platform",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "AI DEV PLATFORM",
    accentClass: "bg-[#c5eb35] text-[#141b16]",
    accentHex: "#c5eb35",
    imageUrl: "/wekraft.webp",
    description:
      "A comprehensive project execution platform designed to bridge the gap between engineering and product management. Features automated task decomposition, bidirectional GitHub synchronization, and deep third-party MCP tool calling.",
    highlights: [
      "Bidirectional GitHub issues & PR workflow sync",
      "Multi-Agent MCP tool integration for automated research",
      "Real-time task dependency visualization",
      "Sub-second collaborative state synchronization",
    ],
    tech: ["Next.js 15", "LangGraph", "MCP", "FastAPI", "Ably", "Tailwind CSS"],
    liveUrl: "https://wekraft.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/wekraft",
  },
  {
    id: "clarioo",
    number: "02",
    title: "CLARIOO",
    subtitle: "Personalized Career Acceleration & Real-Time Voice Mock AI",
    category: "voice-ai",
    categoryLabel: "Voice AI & Intelligence",
    badge: "CAREER AI ENGINE",
    accentClass: "bg-[#F5C86C] text-[#141b16]",
    accentHex: "#F5C86C",
    imageUrl: "/clarioo.webp",
    description:
      "Career intelligence and interview readiness platform. Synthesizes personalized learning roadmaps based on resume gap analysis and conducts realistic voice mock interviews with real-time feedback and latency under 400ms.",
    highlights: [
      "Sub-400ms ultra-low latency voice conversational AI",
      "Dynamic career path and milestone graph generation",
      "Granular scoring across technical accuracy & communication",
      "Custom interview scenarios tailored to candidate target roles",
    ],
    tech: ["Next.js", "Vapi", "OpenAI Whisper", "Supabase", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://clarioo.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/clarioo",
  },
  {
    id: "looma",
    number: "03",
    title: "LOOMA",
    subtitle: "Real-Time Collaborative Infinite Canvas to Code Generator",
    category: "fullstack",
    categoryLabel: "Interactive & Full-Stack",
    badge: "COLLAB CANVAS",
    accentClass: "bg-[#123826] text-[#c5eb35]",
    accentHex: "#123826",
    imageUrl: "/looma.webp",
    description:
      "An infinite multiplayer design and engineering canvas that allows distributed teams to sketch interface wireframes, annotate logic flows, and convert ideas directly into live deployable web applications.",
    highlights: [
      "Multiplayer cursor & object canvas sync via Liveblocks",
      "One-click wireframe-to-React code generation with Vercel AI SDK",
      "Instant live sandboxed component preview iframe",
      "Firecrawl integration for automated design asset scraping",
    ],
    tech: ["React", "Liveblocks", "Vercel AI SDK", "Firecrawl", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://looma.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/looma",
  },
  {
    id: "aria",
    number: "04",
    title: "ARIA",
    subtitle: "Autonomous Personal Productivity Operating System",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "PERSONAL AI OS",
    accentClass: "bg-[#c5eb35] text-[#141b16]",
    accentHex: "#c5eb35",
    imageUrl: "/aria.webp",
    description:
      "Personal intelligence operating system connecting Slack, Discord, and Gmail. Automatically parses unread message threads, highlights critical action items, and drafts contextual replies on demand.",
    highlights: [
      "Multi-channel webhook integration with asynchronous job workers",
      "Semantic priority scoring to eliminate notification overload",
      "Proactive daily briefings with calendar conflict detection",
      "Local-first vector storage ensuring maximum user privacy",
    ],
    tech: ["Next.js", "Python", "LangChain", "Redis", "Tailwind CSS", "OAuth2"],
    liveUrl: "https://aria-os.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/aria",
  },
  {
    id: "pan-agent",
    number: "05",
    title: "SALES AGENT",
    subtitle: "Enterprise Multi-Agent RAG with Semantic Caching",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "MULTI-AGENT RAG",
    accentClass: "bg-[#F5C86C] text-[#141b16]",
    accentHex: "#F5C86C",
    imageUrl: "/pan-agent.webp",
    description:
      "High-throughput enterprise sales copilot with strict hallucination guardrails, bilingual support (English/Spanish), semantic cache hit optimization, and persistent memory for lead qualification.",
    highlights: [
      "Semantic caching layer reducing LLM query costs by >60%",
      "Strict factual guardrails preventing hallucinated pricing or claims",
      "Automated lead qualification and instant CRM synchronization",
      "Sub-second vector search across thousands of product SKUs",
    ],
    tech: ["Python", "FastAPI", "Qdrant", "LangGraph", "Next.js", "Redis"],
    liveUrl: "https://pan-sales-agent.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/sales-agent",
  },
  {
    id: "vocalx",
    number: "06",
    title: "VOCALX",
    subtitle: "Voice AI Recruitment Engine & Anti-Cheat Screener",
    category: "voice-ai",
    categoryLabel: "Voice AI & Intelligence",
    badge: "VOICE AI ENGINE",
    accentClass: "bg-[#123826] text-[#c5eb35]",
    accentHex: "#123826",
    imageUrl: "/vocalx.webp",
    description:
      "Next-generation voice screening platform that automates candidate initial rounds. Parses job descriptions, formulates structured interview criteria, conducts real-time proctored voice interviews, and outputs scorecard reports.",
    highlights: [
      "Automated job description parsing and dynamic question generation",
      "Proctored voice evaluation with voice biometric anti-cheat analysis",
      "Comprehensive candidate scorecard generation with audio highlights",
      "Seamless ATS integration for recruiter pipeline updates",
    ],
    tech: ["Next.js", "Deepgram", "Vapi", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://vocalx.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/vocalx",
  },
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "ai-systems" | "voice-ai" | "fullstack"
  >("all");
  const [copied, setCopied] = useState(false);
  const email = "riteshsinha4146@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <main className="relative min-h-screen w-full bg-[#eaeae8] text-[#141b16] selection:bg-[#c5eb35] selection:text-black select-none">
      {/* Universal Tactile Dot Matrix Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#141b16 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Film grain noise overlay */}
      <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-0" />

      {/* Top Universal Header Bar */}
      <header className="relative z-30 w-full flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
        {/* Left: Name / Brand */}
        <Link
          href="/"
          className="font-sans font-semibold text-lg sm:text-xl tracking-tight text-[#141b16] hover:opacity-80 transition-opacity"
        >
          RITESH SINHA
        </Link>

        {/* Right: Contact Pill Button */}
        <a
          href={`mailto:${email}`}
          className="group bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(197,235,53,0.3)] hover:shadow-[0_6px_20px_rgba(197,235,53,0.45)] hover:scale-105 active:scale-95 cursor-pointer border border-[#c5eb35]/20"
        >
          <span>Contact</span>
          <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#141b16] transition-all">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#141b16] group-hover:text-[#c5eb35] transition-colors" />
          </span>
        </a>
      </header>

      {/* Universal Floating Top Navigation Pill */}
      <nav
        aria-label="Main Navigation"
        className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/8 rounded-full p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 transition-all duration-300 select-none"
      >
        <Link
          href="/"
          className="px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
        >
          HOME
        </Link>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
        >
          WORKS
        </button>

        <Link
          href="/#about-section"
          className="px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
        >
          ABOUT
        </Link>
      </nav>

      {/* Hero Header Area */}
      <section className="relative z-10 pt-14 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 shadow-xs mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-[#c5eb35] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-[#5a625b] font-bold tracking-wider uppercase">
            6+ Production Applications &amp; AI Systems
          </span>
        </div>

        {/* Big Headline */}
        <h1 className="font-serif italic font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#141b16] leading-none">
          Selected <span className="font-sans font-bold not-italic text-[#141b16]">Works.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-[#5a625b] font-medium max-w-2xl mx-auto mt-3.5 sm:mt-5 leading-relaxed px-2">
          Intelligent AI agents, real-time collaborative canvases, distributed architectures, and voice engines built with production-grade performance.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-6 sm:mt-10 p-1.5 rounded-full bg-white border border-black/10 shadow-sm max-w-full">
          {[
            { id: "all", label: "All Works" },
            { id: "ai-systems", label: "AI Systems & Agents" },
            { id: "voice-ai", label: "Voice AI" },
            { id: "fullstack", label: "Interactive & Full-Stack" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-sans font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-[#c5eb35] text-[#141b16] shadow-xs scale-102"
                  : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid Section (3 Columns on Large Screens) */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-2xl sm:rounded-3xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[4px_4px_0px_#141b16] hover:shadow-[6px_6px_0px_#141b16] overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
            >
              {/* Image Preview Banner */}
              <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[210px] bg-neutral-100 overflow-hidden border-b-2 border-[#141b16]">
                <InstantImage
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                  containerClassName="absolute inset-0 w-full h-full"
                />

                {/* Badge Pills */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                  <span className="font-mono text-[9.5px] sm:text-[11px] font-bold text-[#141b16] bg-white border border-[#141b16] shadow-[1.5px_1.5px_0px_#141b16] px-2.5 py-0.5 rounded-full">
                    #{project.number}
                  </span>
                  <span
                    className={`font-mono text-[9px] sm:text-[10.5px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[#141b16] shadow-[1.5px_1.5px_0px_#141b16] ${project.accentClass}`}
                  >
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 lg:p-5.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-[#141b16] tracking-tight">
                        {project.title}
                      </h2>
                      <p className="font-sans text-[11px] sm:text-xs text-[#5a625b] mt-0.5 font-semibold line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-neutral-700 mt-2.5 leading-relaxed font-normal line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mt-3 space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-1.5 text-[11px] sm:text-xs text-neutral-800 font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141b16] mt-1 shrink-0" />
                        <span className="font-medium truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mt-3.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-neutral-100 border border-black/10 text-[9.5px] sm:text-[10px] font-mono font-bold text-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-neutral-200">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-full bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-bold text-xs border border-[#141b16] shadow-[2px_2px_0px_#141b16] hover:shadow-[3px_3px_0px_#141b16] transition-all duration-200 hover:scale-101 active:scale-98"
                  >
                    <span>Launch App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-2 rounded-full bg-white hover:bg-neutral-50 border border-[#141b16] shadow-[2px_2px_0px_#141b16] text-[#141b16] font-sans font-bold text-xs transition-all duration-200 hover:scale-101 active:scale-98"
                    title={`View ${project.title} GitHub Source Code`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Source</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Conversion / Contact Callout */}
      <section className="relative z-10 px-4 sm:px-8 pb-16 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[6px_6px_0px_#141b16] flex flex-col items-center">
          <h3 className="font-serif italic font-light text-3xl sm:text-5xl text-[#141b16]">
            Have an ambitious project in mind?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#5a625b] font-medium max-w-lg mt-2.5 leading-relaxed">
            Open for select high-impact engineering roles, AI system architecture consulting, and founding engineering opportunities.
          </p>

          <div className="flex items-center gap-3 mt-6 px-4 py-2 rounded-full bg-[#eaeae8] border border-black/15 shadow-inner">
            <a
              href={`mailto:${email}`}
              className="font-sans font-bold text-xs sm:text-base text-[#141b16] hover:text-emerald-700 transition-colors"
            >
              {email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="w-7 h-7 rounded-full bg-[#c5eb35] border border-[#141b16] text-[#141b16] flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
