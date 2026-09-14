"use client";

import React, { forwardRef, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bot, Cpu, Layers, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  badge: string;
  badgeClass: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai-agents",
    number: "01",
    title: "AI & Multi-Agent Architecture",
    badge: "AGENTIC AI",
    badgeClass: "bg-primary text-primary-foreground",
    description:
      "Autonomous multi-agent orchestration, tool calling, recursive planning, semantic memory, and deterministic guardrail pipelines.",
    icon: Bot,
    skills: [
      "LangGraph",
      "Model Context Protocol (MCP)",
      "LangChain",
      "OpenAI & Anthropic APIs",
      "LlamaIndex",
      "Semantic Caching",
      "Zero-Hallucination Guardrails",
      "Agentic RAG Workflows",
    ],
  },
  {
    id: "voice-ai",
    number: "02",
    title: "Real-Time & Voice AI Intelligence",
    badge: "VOICE & STREAMING",
    badgeClass: "bg-secondary text-secondary-foreground",
    description:
      "Sub-400ms ultra-low latency conversational voice engines, real-time speech synthesis, and AI proctored interview systems.",
    icon: Zap,
    skills: [
      "Vapi",
      "WebRTC & WebSockets",
      "LiveKit",
      "OpenAI Whisper (STT)",
      "Streaming TTS (Cartesia / ElevenLabs)",
      "Ably Realtime",
      "Interruption Handling",
      "Audio Stream Processing",
    ],
  },
  {
    id: "fullstack-ui",
    number: "03",
    title: "Full-Stack & Interactive Web",
    badge: "FRONTEND & UI/UX",
    badgeClass: "bg-accent text-accent-foreground",
    description:
      "Fluid, responsive web applications, buttery 60fps GSAP timelines, multiplayer canvas engines, and pixel-perfect design systems.",
    icon: Layers,
    skills: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "GSAP & ScrollTrigger",
      "Three.js & 3D Shaders",
      "HTML5 Canvas & Liveblocks",
      "TanStack Query",
    ],
  },
  {
    id: "cloud-systems",
    number: "04",
    title: "Distributed Systems, Cloud & Data",
    badge: "BACKEND & CLOUD",
    badgeClass: "bg-primary text-primary-foreground",
    description:
      "High-throughput microservices, vector search indexing, asynchronous worker queues, and automated CI/CD cloud deployments.",
    icon: Cpu,
    skills: [
      "Python & FastAPI",
      "Node.js & Express",
      "PostgreSQL & Prisma",
      "Supabase",
      "Redis & Upstash Caching",
      "Qdrant & Pinecone (Vectors)",
      "Docker & Containers",
      "AWS & Vercel Edge",
    ],
  },
];

interface SkillsSectionProps {
  className?: string;
}

const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>(
  ({ className = "" }, ref) => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
      () => {
        if (!containerRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>(
          ".skill-card",
          containerRef.current,
        );

        gsap.set(cards, {
          y: 40,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 78%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      },
      { scope: containerRef },
    );

    return (
      <section
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        id="skills-section"
        aria-label="Technical Skills & Capabilities"
        className={`relative w-full py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 bg-background text-foreground select-none overflow-hidden ${className}`}
      >
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                03 // TECHNICAL STACK
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-light tracking-tight text-foreground leading-none">
              Skills <span className="font-sans font-extrabold not-italic text-foreground">&amp; Toolkit.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-3.5 sm:mt-4 leading-relaxed max-w-lg mx-auto">
              A breakdown of production technologies I use to architect intelligent autonomous agents, low-latency voice pipelines, and scalable web ecosystems.
            </p>
          </div>

          {/* 4 Categorized Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="skill-card group relative rounded-2xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[3.5px_3.5px_0px_#141b16] hover:shadow-[5px_5px_0px_#141b16] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-[#141b16] flex items-center justify-center text-[#141b16] shadow-[1.5px_1.5px_0px_#141b16]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          #{cat.number}
                        </span>
                      </div>

                      <span
                        className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[#141b16] shadow-[1.5px_1.5px_0px_#141b16] ${cat.badgeClass}`}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#141b16] tracking-tight mt-4">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-neutral-600 mt-1.5 leading-relaxed font-normal">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skill Badge Chips */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <MagneticButton
                        key={skill}
                        magneticStrength={0.25}
                        scaleOnHover={1.06}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 border border-[#141b16]/20 text-[10px] sm:text-xs font-mono font-bold text-[#141b16] transition-colors duration-150"
                      >
                        {skill}
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  },
);

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
