"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import MagneticDock from "@/components/tweenlabs/MagneticDock";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ExperienceItem {
  id: string;
  number: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  metricBadge: string;
  description: string;
  highlights: string[];
  skills: string[];
}

interface CertificationItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  badgeClass: string;
  skillsCovered: string[];
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    number: "01",
    role: "Full-Stack AI Engineer & Architect",
    company: "Autonomous AI Labs & Client Engagements",
    type: "Lead Builder",
    period: "2024 — PRESENT",
    location: "Global / Remote",
    metricBadge: "Sub-400ms Real-Time AI",
    description:
      "Architecting enterprise-grade agentic platforms, real-time voice intelligence engines, and high-throughput web applications.",
    highlights: [
      "Engineered multi-agent systems with LangGraph and Model Context Protocol (MCP) for autonomous task decomposition.",
      "Developed sub-400ms conversational voice AI systems with Vapi and WebSockets for real-time candidate screening.",
      "Designed multiplayer canvas engines with Liveblocks and Vercel AI SDK for instant wireframe-to-code generation.",
    ],
    skills: ["LangGraph", "MCP", "Next.js 15", "Vapi", "FastAPI", "Supabase", "TypeScript"],
  },
  {
    id: "exp-2",
    number: "02",
    role: "Founding AI Engineer",
    company: "Venture Product Studio",
    type: "Founding Team",
    period: "2023 — 2024",
    location: "Remote",
    metricBadge: "48% Token Savings",
    description:
      "Spearheaded multi-agent RAG architecture, semantic caching layers, and bidirectional cloud sync workflows.",
    highlights: [
      "Architected semantic caching layer with Redis & Qdrant vector database, reducing LLM token costs by 48%.",
      "Implemented strict zero-hallucination verification guardrails for enterprise customer onboarding pipelines.",
      "Built automated bidirectional GitHub integration syncing issues, pull requests, and real-time execution status.",
    ],
    skills: ["Python", "Qdrant", "Redis", "LangChain", "OpenAI", "PostgreSQL", "Docker"],
  },
  {
    id: "exp-3",
    number: "03",
    role: "Full-Stack Web Developer",
    company: "Interactive Digital Systems",
    type: "Software Engineer",
    period: "2022 — 2023",
    location: "Remote",
    metricBadge: "99+ Lighthouse Score",
    description:
      "Developed micro-animated reactive interfaces, scalable REST/GraphQL APIs, and resilient data pipelines.",
    highlights: [
      "Built interactive web applications with React, TypeScript, GSAP, and Tailwind CSS with 99+ Google Lighthouse scores.",
      "Integrated real-time notification systems and asynchronous background worker queues using Redis and WebSockets.",
      "Implemented OAuth2 authentication and end-to-end type safety across client and server layers.",
    ],
    skills: ["React", "TypeScript", "GSAP", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
];

const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    number: "01",
    title: "Multi-Agent Systems & LangGraph Architecture",
    issuer: "LangChain AI",
    date: "2024",
    badge: "VERIFIED ARCHITECT",
    badgeClass: "bg-primary text-primary-foreground",
    skillsCovered: ["LangGraph", "MCP", "Cyclic Workflows", "Stateful Memory"],
    description:
      "Advanced mastery in stateful graph orchestration, cyclical multi-agent workflows, human-in-the-loop validation, and MCP tools.",
  },
  {
    id: "cert-2",
    number: "02",
    title: "Deep Learning & Large Language Models Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    badge: "AI SPECIALIST",
    badgeClass: "bg-secondary text-secondary-foreground",
    skillsCovered: ["Transformers", "Attention", "Fine-Tuning", "Vector Search"],
    description:
      "Comprehensive specialization covering transformer architectures, attention mechanisms, fine-tuning, and embedding search.",
  },
  {
    id: "cert-3",
    number: "03",
    title: "AWS Cloud Architecture & Distributed Systems",
    issuer: "Amazon Web Services",
    date: "2023",
    badge: "CLOUD ARCHITECT",
    badgeClass: "bg-accent text-accent-foreground",
    skillsCovered: ["AWS Lambda", "ECS", "S3", "API Gateway"],
    description:
      "Expertise in serverless microservices, ECS container orchestration, S3, API Gateway, and resilient distributed systems.",
  },
  {
    id: "cert-4",
    number: "04",
    title: "Modern Full-Stack Architecture & Reactive Systems",
    issuer: "Meta / Vercel Ecosystem",
    date: "2023",
    badge: "WEB SPECIALIST",
    badgeClass: "bg-primary text-primary-foreground",
    skillsCovered: ["Next.js App Router", "React 19", "SSR/SSG", "Web Vitals"],
    description:
      "Advanced Next.js App Router patterns, React 19 server components, dynamic caching paradigms, and Web Vitals optimization.",
  },
];

interface ExperienceCertificationsSectionProps {
  className?: string;
}

const ExperienceCertificationsSection = forwardRef<
  HTMLElement,
  ExperienceCertificationsSectionProps
>(({ className = "" }, ref) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "experience" | "certifications">("all");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".track-card",
        containerRef.current,
      );

      gsap.set(cards, {
        y: 35,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 78%",
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef, dependencies: [activeFilter] },
  );

  return (
    <section
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="experience-section"
      aria-label="Experience and Certifications"
      className={`relative w-full py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 bg-background text-foreground select-none overflow-hidden ${className}`}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
              04 // BACKGROUND &amp; CREDENTIALS
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-light tracking-tight text-foreground leading-none">
            Experience <span className="font-sans font-extrabold not-italic text-foreground">&amp; Certifications.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-3.5 sm:mt-4 leading-relaxed max-w-lg mx-auto">
            A track record of engineering leadership, building intelligent systems from zero to production, and verified industry credentials.
          </p>

          {/* Interactive Filter Pill Dock */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <MagneticDock
              variant="inline"
              activeId={activeFilter}
              onItemClick={(id) => setActiveFilter(id as any)}
              items={[
                { id: "all", label: "All Overview" },
                { id: "experience", label: "Work History (3)" },
                { id: "certifications", label: "Certifications (4)" },
              ]}
            />
          </div>
        </div>

        {/* 1. Work Experience Section */}
        {(activeFilter === "all" || activeFilter === "experience") && (
          <div className="w-full mb-10 sm:mb-14">
            <div className="flex items-center justify-between pb-3 mb-5 sm:mb-6 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center text-foreground shadow-xs">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-foreground tracking-tight">
                  Work History &amp; Impact
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-muted-foreground">
                3 Production Roles
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {experiences.map((exp) => (
                <article
                  key={exp.id}
                  className="track-card group relative rounded-2xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[3.5px_3.5px_0px_#141b16] hover:shadow-[5px_5px_0px_#141b16] p-5 sm:p-6 text-[#141b16] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-neutral-200">
                      <div>
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase">
                          #{exp.number} • {exp.period}
                        </span>
                        <h4 className="font-sans font-extrabold text-base sm:text-lg text-[#141b16] tracking-tight mt-0.5 leading-snug">
                          {exp.role}
                        </h4>
                        <p className="font-sans text-xs font-semibold text-neutral-600 mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <span className="font-mono text-[8.5px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#141b16] bg-primary/20 text-[#141b16] shadow-[1px_1px_0px_#141b16] shrink-0">
                        {exp.metricBadge}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-[13px] text-neutral-700 mt-3 leading-relaxed font-normal">
                      {exp.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-3.5 space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-[11px] sm:text-[12px] text-neutral-800 font-sans"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#141b16] mt-1.5 shrink-0" />
                          <span className="leading-snug font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-100 flex flex-wrap gap-1">
                    {exp.skills.map((skill) => (
                      <MagneticButton
                        key={skill}
                        magneticStrength={0.2}
                        scaleOnHover={1.06}
                        className="px-2 py-0.5 rounded bg-neutral-100 border border-[#141b16]/20 text-[9px] sm:text-[10px] font-mono font-bold text-[#141b16]"
                      >
                        {skill}
                      </MagneticButton>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 2. Verified Certifications Section */}
        {(activeFilter === "all" || activeFilter === "certifications") && (
          <div className="w-full">
            <div className="flex items-center justify-between pb-3 mb-5 sm:mb-6 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center text-foreground shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-foreground tracking-tight">
                  Verified Credentials &amp; Certifications
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-muted-foreground">
                4 Verified Accreditations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {certifications.map((cert) => (
                <article
                  key={cert.id}
                  className="track-card group rounded-2xl bg-white border-2 sm:border-[2.5px] border-[#141b16] shadow-[3.5px_3.5px_0px_#141b16] hover:shadow-[5px_5px_0px_#141b16] p-4.5 sm:p-5 text-[#141b16] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-200">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                          #{cert.number} • {cert.issuer}
                        </span>
                        <h4 className="font-sans font-extrabold text-sm sm:text-base text-[#141b16] tracking-tight mt-0.5 leading-tight">
                          {cert.title}
                        </h4>
                      </div>

                      <span
                        className={`font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#141b16] shadow-[1px_1px_0px_#141b16] shrink-0 ${cert.badgeClass}`}
                      >
                        {cert.badge}
                      </span>
                    </div>

                    <p className="font-sans text-[11.5px] sm:text-xs text-neutral-600 mt-2.5 leading-relaxed font-normal">
                      {cert.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {cert.skillsCovered.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 rounded bg-neutral-100 text-[8.5px] sm:text-[9px] font-mono font-bold text-neutral-700 border border-neutral-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[9.5px] font-mono font-bold text-neutral-500">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Verified</span>
                    </div>
                    <span>{cert.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ExperienceCertificationsSection.displayName = "ExperienceCertificationsSection";

export default ExperienceCertificationsSection;
