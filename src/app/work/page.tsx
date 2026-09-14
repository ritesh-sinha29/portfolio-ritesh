"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Copy, Eye, Sparkles } from "lucide-react";
import { InstantImage } from "@/components/media/InstantImage";
import MagneticDock from "@/components/tweenlabs/MagneticDock";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
    accentClass: "bg-primary text-primary-foreground",
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
    accentClass: "bg-secondary text-secondary-foreground",
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
    accentClass: "bg-accent text-accent-foreground",
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
    accentClass: "bg-primary text-primary-foreground",
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
    id: "pan-sales",
    number: "05",
    title: "ENTERPRISE SALES AGENT",
    subtitle: "Bilingual Multi-Agent RAG with Semantic Caching & Memory",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "MULTI-AGENT RAG",
    accentClass: "bg-secondary text-secondary-foreground",
    accentHex: "#F5C86C",
    imageUrl: "/pan-agent.webp",
    description:
      "Enterprise sales automation engine designed to answer complex domain-specific inquiries, qualify leads, and orchestrate customer onboarding. Features semantic caching to reduce token spend by 48%.",
    highlights: [
      "Sub-200ms cached semantic retrieval via Qdrant & Redis",
      "Strict zero-hallucination guardrails and output verification",
      "Bilingual real-time translation & context preservation",
      "Asynchronous CRM sync & automated calendar booking",
    ],
    tech: ["Python", "FastAPI", "Qdrant", "Redis", "OpenAI", "LangGraph"],
    liveUrl: "https://pan-sales.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/pan-sales",
  },
  {
    id: "vocalx",
    number: "06",
    title: "VOCALX",
    subtitle: "Automated Voice AI Recruitment & Candidate Evaluation Engine",
    category: "voice-ai",
    categoryLabel: "Voice AI & Intelligence",
    badge: "VOICE AI ENGINE",
    accentClass: "bg-accent text-accent-foreground",
    accentHex: "#123826",
    imageUrl: "/vocalx.webp",
    description:
      "Autonomous HR recruitment pipeline that parses job descriptions, generates structured technical interview rubrics, and conducts automated phone screening interviews with deep reasoning analysis.",
    highlights: [
      "Instant JD-to-rubric breakdown in 15 seconds",
      "Real-time speech interruption handling with Vapi WebSocket bridge",
      "Comprehensive scoring matrix across 5 dimensions",
      "Automated candidate summary report dispatched to hiring manager",
    ],
    tech: ["Next.js", "Vapi", "Tailwind CSS", "Supabase", "FastAPI", "PostgreSQL"],
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
    <main className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground select-none">
      {/* Universal Tactile Dot Matrix Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
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
          className="font-sans font-semibold text-lg sm:text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          RITESH SINHA
        </Link>

        {/* Right: Contact Pill Button inside dock */}
        <div className="p-1 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-xs inline-flex items-center">
          <MagneticButton
            href={`mailto:${email}`}
            className="group bg-primary hover:opacity-90 text-primary-foreground font-sans font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 transition-all duration-150 shadow-xs"
          >
            <span>Contact</span>
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary-foreground/20 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground group-hover:text-primary-foreground transition-colors stroke-[2.5]" />
            </span>
          </MagneticButton>
        </div>
      </header>

      {/* Universal Floating Top Navigation Pill with Magnetic Dock physics */}
      <MagneticDock
        activeId="works"
        items={[
          {
            id: "home",
            label: "HOME",
            href: "/",
          },
          {
            id: "works",
            label: "WORKS",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          },
          {
            id: "about",
            label: "ABOUT",
            href: "/#about-section",
          },
        ]}
      />

      {/* Hero Header Area */}
      <section className="relative z-10 pt-14 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <MagneticButton
          magneticStrength={0.25}
          scaleOnHover={1.05}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border shadow-xs mb-4 sm:mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground font-bold tracking-wider uppercase">
            6+ Production Applications &amp; AI Systems
          </span>
        </MagneticButton>

        {/* Big Headline */}
        <h1 className="font-serif italic font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-foreground leading-none">
          Selected <span className="font-sans font-bold not-italic text-foreground">Works.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto mt-3.5 sm:mt-5 leading-relaxed px-2">
          Intelligent AI agents, real-time collaborative canvases, distributed architectures, and voice engines built with production-grade performance.
        </p>

        {/* Filter Tabs (MagneticDock) */}
        <div className="mt-6 sm:mt-10 flex justify-center max-w-full">
          <MagneticDock
            variant="inline"
            activeId={selectedCategory}
            onItemClick={(id) => setSelectedCategory(id as any)}
            items={[
              { id: "all", label: "All Works" },
              { id: "ai-systems", label: "AI Systems & Agents" },
              { id: "voice-ai", label: "Voice AI" },
              { id: "fullstack", label: "Interactive & Full-Stack" },
            ]}
          />
        </div>
      </section>

      {/* Projects Grid Section (3 Columns on Large Screens) */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 lg:gap-5.5">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-xl sm:rounded-2xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[3.5px_3.5px_0px_#141b16] hover:shadow-[5px_5px_0px_#141b16] overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
            >
              {/* Image Preview Banner */}
              <div className="relative w-full h-[145px] sm:h-[160px] lg:h-[165px] bg-neutral-100 overflow-hidden border-b-2 border-[#141b16]">
                <InstantImage
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                  containerClassName="absolute inset-0 w-full h-full"
                />

                {/* Badge Pills */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-auto z-10">
                  <MagneticButton
                    magneticStrength={0.2}
                    scaleOnHover={1.08}
                    className="font-mono text-[9px] sm:text-[10px] font-bold text-[#141b16] bg-white border border-[#141b16] shadow-[1.5px_1.5px_0px_#141b16] px-2 py-0.5 rounded-full"
                  >
                    #{project.number}
                  </MagneticButton>
                  <MagneticButton
                    magneticStrength={0.2}
                    scaleOnHover={1.08}
                    className={`font-mono text-[8.5px] sm:text-[9.5px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#141b16] shadow-[1.5px_1.5px_0px_#141b16] ${project.accentClass}`}
                  >
                    {project.badge}
                  </MagneticButton>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 sm:p-4 lg:p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="font-sans font-extrabold text-lg sm:text-xl text-[#141b16] tracking-tight">
                        {project.title}
                      </h2>
                      <p className="font-sans text-[10.5px] sm:text-[11px] text-[#5a625b] mt-0.5 font-semibold line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-[11.5px] sm:text-xs text-neutral-700 mt-2 leading-relaxed font-normal line-clamp-2">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mt-2.5 space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-neutral-800 font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141b16] mt-1 shrink-0" />
                        <span className="font-medium truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {project.tech.map((t) => (
                      <MagneticButton
                        key={t}
                        magneticStrength={0.25}
                        scaleOnHover={1.08}
                        className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 border border-black/10 text-[9px] sm:text-[9.5px] font-mono font-bold text-neutral-800 transition-colors"
                      >
                        {t}
                      </MagneticButton>
                    ))}
                  </div>
                </div>

                {/* Footer Action Pill Buttons */}
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center justify-between gap-1.5">
                  {/* Launch App Button - White background, border-2, and primary colored text */}
                  <MagneticButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    magneticStrength={0.45}
                    scaleOnHover={1.06}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-white hover:bg-neutral-50 text-primary font-sans font-bold text-xs sm:text-[12.5px] border-2 border-[#141b16] transition-colors duration-150"
                  >
                    <span>Launch App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-primary" />
                  </MagneticButton>

                  {/* View Button */}
                  <MagneticButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    magneticStrength={0.45}
                    scaleOnHover={1.06}
                    className="flex items-center justify-center gap-1 py-1.5 sm:py-2 px-3 rounded-full bg-white hover:bg-neutral-100 text-[#141b16] font-sans font-bold text-xs sm:text-[12.5px] border-2 border-[#141b16] transition-colors duration-150"
                    title={`View ${project.title}`}
                  >
                    <Eye className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>View</span>
                  </MagneticButton>

                  {/* Source Button */}
                  <MagneticButton
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    magneticStrength={0.45}
                    scaleOnHover={1.06}
                    className="flex items-center justify-center gap-1 py-1.5 sm:py-2 px-3 rounded-full bg-white hover:bg-neutral-100 text-[#141b16] font-sans font-bold text-xs sm:text-[12.5px] border-2 border-[#141b16] transition-colors duration-150"
                    title={`View ${project.title} GitHub Source Code`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Source</span>
                  </MagneticButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Conversion / Contact Callout */}
      <section className="relative z-10 px-4 sm:px-6 pb-12 max-w-2xl mx-auto text-center">
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#141b16] shadow-[4px_4px_0px_#141b16] flex flex-col items-center">
          <h3 className="font-serif italic font-light text-2xl sm:text-3xl md:text-[2rem] leading-tight text-foreground">
            Have an ambitious project in mind?
          </h3>
          <p className="font-sans text-xs sm:text-[13px] text-muted-foreground font-medium max-w-md mt-2 leading-relaxed">
            Open for select high-impact engineering roles, AI system architecture consulting, and founding engineering opportunities.
          </p>

          {/* Email Dock Bar */}
          <div className="flex items-center gap-1.5 mt-4.5 p-1 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-xs">
            <a
              href={`mailto:${email}`}
              className="px-3.5 py-1.5 font-sans font-bold text-xs sm:text-[13px] text-foreground hover:text-muted-foreground transition-colors truncate"
            >
              {email}
            </a>

            <MagneticButton
              onClick={handleCopyEmail}
              magneticStrength={0.45}
              scaleOnHover={1.06}
              ariaLabel="Copy email address"
              className="px-3 py-1.5 rounded-full border border-border hover:bg-muted text-foreground font-sans font-bold text-xs flex items-center gap-1.5 transition-colors duration-150"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy Email</span>
                </>
              )}
            </MagneticButton>
          </div>

          {/* Bottom Dual Action Pill Dock: Back to Home & Hire Me */}
          <div className="mt-5 inline-flex items-center p-1 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-xs gap-1">
            <MagneticButton
              href="/"
              magneticStrength={0.45}
              scaleOnHover={1.06}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold text-foreground hover:bg-muted flex items-center gap-1.5 transition-colors duration-150 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Home</span>
            </MagneticButton>

            <MagneticButton
              href={`mailto:${email}`}
              magneticStrength={0.45}
              scaleOnHover={1.06}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold bg-primary hover:opacity-90 text-primary-foreground shadow-xs flex items-center gap-1.5 transition-opacity duration-150 uppercase tracking-wider"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
