"use client";

import React, { useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { InstantImage } from "@/components/media/InstantImage";
import Header from "@/modules/web/Header";
import Footer from "@/modules/web/Footer";
import MagneticDock from "@/components/tweenlabs/MagneticDock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProjectLikeButton } from "@/components/ui/ProjectLikeButton";

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
    title: "wekraft",
    subtitle: "AI-Powered Project Execution & Dev Coordination Platform",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "AI DEV PLATFORM",
    accentClass: "bg-primary text-primary-foreground",
    accentHex: "#c5eb35",
    imageUrl: "/wekraft.webp",
    description:
      "AI-powered project execution platform bridging Devs & PMs with bidirectional GitHub sync and third-party MCP integrations.",
    highlights: [
      "Bidirectional GitHub issues & PR workflow sync",
      "Multi-Agent MCP tool integration for automated research",
      "Real-time task dependency visualization via Ably",
      "Event-driven orchestration with Inngest & AWS",
    ],
    tech: ["LangGraph", "MCP", "Ably", "Inngest", "AWS", "Next.js"],
    liveUrl: "https://www.wekraft.xyz",
    githubUrl: "https://github.com/ritesh-sinha29/wekraft",
  },
  {
    id: "clarioo",
    number: "02",
    title: "clarioo",
    subtitle: "Personalized Career Acceleration & Real-Time Voice Mock AI",
    category: "voice-ai",
    categoryLabel: "Voice AI & Intelligence",
    badge: "CAREER AI ENGINE",
    accentClass: "bg-secondary text-secondary-foreground",
    accentHex: "#F5C86C",
    imageUrl: "/clarioo.webp",
    description:
      "Personalized career acceleration platform for students & professionals, featuring tailored roadmaps and AI-proctored mock interviews.",
    highlights: [
      "Sub-400ms ultra-low latency voice conversational AI",
      "Dynamic career path and milestone graph generation via React Flow",
      "Granular scoring across technical accuracy & communication",
      "Fine-tuned domain evaluation models with Unsloth & Supabase",
    ],
    tech: ["Next.js", "Vapi", "Supabase", "Unsloth", "React Flow", "TypeScript"],
    liveUrl: "https://www.clarioo.live",
    githubUrl: "https://github.com/ritesh-sinha29/clarioo",
  },
  {
    id: "looma",
    number: "03",
    title: "looma",
    subtitle: "Real-Time Collaborative Infinite Canvas to Code Generator",
    category: "fullstack",
    categoryLabel: "Interactive & Full-Stack",
    badge: "COLLAB CANVAS",
    accentClass: "bg-accent text-accent-foreground",
    accentHex: "#123826",
    imageUrl: "/looma.webp",
    description:
      "Real-time collaborative canvas enabling teams to sketch, design, and instantly generate live deployable web applications.",
    highlights: [
      "Multiplayer cursor & object canvas sync via Liveblocks",
      "One-click wireframe-to-React code generation with Vercel AI SDK",
      "Instant live sandboxed component preview iframe",
      "Firecrawl integration for automated design asset scraping",
    ],
    tech: ["Vercel AI", "Firecrawl", "Liveblocks", "tldraw", "Convex", "TypeScript"],
    liveUrl: "https://looma-sketch-collaborate-deploy.vercel.app/",
    githubUrl: "https://github.com/ritesh-sinha29/looma",
  },
  {
    id: "aria",
    number: "04",
    title: "Aria",
    subtitle: "Autonomous Personal Productivity Operating System",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "PERSONAL AI OS",
    accentClass: "bg-primary text-primary-foreground",
    accentHex: "#c5eb35",
    imageUrl: "/aria.webp",
    description:
      "Intelligent personal productivity operating system connecting Gmail, Slack, and Discord to turn daily chaos into automated action.",
    highlights: [
      "Multi-channel webhook integration with asynchronous job workers",
      "Semantic priority scoring to eliminate notification overload",
      "Proactive daily briefings with calendar conflict detection",
      "Local-first vector storage ensuring maximum user privacy",
    ],
    tech: ["LangGraph", "FastAPI", "Composio", "Python", "Redis", "Next.js"],
    liveUrl: "https://aria-hackathon-topaz.vercel.app/",
    githubUrl: "https://github.com/ritesh-sinha29/aria",
  },
  {
    id: "pan-sales",
    number: "05",
    title: "Enterprise sales agent",
    subtitle: "Bilingual Multi-Agent RAG with Semantic Caching & Memory",
    category: "ai-systems",
    categoryLabel: "AI Systems & Agents",
    badge: "MULTI-AGENT RAG",
    accentClass: "bg-secondary text-secondary-foreground",
    accentHex: "#F5C86C",
    imageUrl: "/pan-agent.webp",
    description:
      "Enterprise-grade bilingual sales agent architected with semantic caching, strict guardrails, background jobs, and persistent memory.",
    highlights: [
      "Sub-200ms cached semantic retrieval via Qdrant & Redis",
      "Strict zero-hallucination guardrails and output verification",
      "Bilingual real-time translation & context preservation",
      "Asynchronous CRM sync & automated calendar booking with Temporal.io",
    ],
    tech: ["LangGraph", "Hybrid RAG", "Temporal.io", "Guardrails", "Cohere", "FastAPI"],
    liveUrl: "https://pan-sales.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/pan-sales",
  },
  {
    id: "vocalx",
    number: "06",
    title: "vocalx",
    subtitle: "Automated Voice AI Recruitment & Candidate Evaluation Engine",
    category: "voice-ai",
    categoryLabel: "Voice AI & Intelligence",
    badge: "VOICE AI ENGINE",
    accentClass: "bg-accent text-accent-foreground",
    accentHex: "#123826",
    imageUrl: "/vocalx.webp",
    description:
      "Next-gen AI recruitment engine that automates JD parsing, question generation, and real-time proctored voice interviews with analytics.",
    highlights: [
      "Instant JD-to-rubric breakdown in 15 seconds",
      "Real-time speech interruption handling with Vapi WebSocket bridge",
      "Comprehensive scoring matrix across 5 dimensions",
      "Automated candidate summary report dispatched to hiring manager",
    ],
    tech: ["Vapi", "Next.js 16", "React 19", "Tailwind CSS", "Supabase", "FastAPI"],
    liveUrl: "https://www.vocalx.xyz",
    githubUrl: "https://github.com/ritesh-sinha29/vocalx",
  },
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "ai-systems" | "voice-ai" | "fullstack"
  >("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <main className="relative w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground select-none">
      {/* Universal Fixed Header */}
      <Header activeTab="works" />

      {/* Main Content Stage (Curtain): sits on top of sticky footer */}
      <div className="relative z-20 w-full bg-background min-h-screen shadow-[0_25px_50px_rgba(0,0,0,0.25)] border-b border-black/10">
        {/* Film grain noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-0" />

        {/* Hero Header Area: Dedicated Full First Dome */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 max-w-5xl mx-auto pt-20 pb-16">
          
          {/* Big Headline */}
          <h1
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="font-normal not-italic text-6xl xs:text-7xl sm:text-8xl md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] tracking-tight text-foreground leading-[1.02]"
          >
            Top Loved Works
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-[#5a625b] font-normal max-w-md mx-auto mt-3.5 sm:mt-4 leading-relaxed px-4">
            A curated collection of autonomous multi-agent systems, real-time voice engines, and full-stack AI platforms built for production.
          </p>

          {/* Scroll Down Cue */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 select-none">
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
              scroll down to see work <span className="animate-bounce">↓</span>
            </span>
          </div>
        </section>

        {/* Projects Stage Section: Filter Tabs Dock + 3-Column Cards Grid */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24 sm:pb-32 max-w-[1160px] mx-auto">
          {/* Filter Tabs (MagneticDock) */}
          <div className="mb-10 sm:mb-14 flex justify-center max-w-full">
            <MagneticDock
              variant="inline"
              activeId={selectedCategory}
              onItemClick={(id) => setSelectedCategory(id as "all" | "ai-systems" | "voice-ai" | "fullstack")}
              items={[
                { id: "all", label: "All Works" },
                { id: "ai-systems", label: "AI Systems & Agents" },
                { id: "voice-ai", label: "Voice AI" },
                { id: "fullstack", label: "Interactive & Full-Stack" },
              ]}
            />
          </div>

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
                    <div className="flex-1 min-w-0">
                      <h2 className="font-sans font-extrabold text-lg sm:text-xl text-[#141b16] tracking-tight">
                        {project.title}
                      </h2>
                      <p className="font-sans text-[10.5px] sm:text-[11px] text-[#5a625b] mt-0.5 font-semibold line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <ProjectLikeButton projectId={project.id} />
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
      </div>

      {/* Sticky Curtain Reveal Alpine Footer: sits underneath z-20 content */}
      <div className="sticky bottom-0 z-10 h-screen w-full overflow-hidden">
        <Footer />
      </div>
    </main>
  );
}
