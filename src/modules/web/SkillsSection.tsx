"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(useGSAP);

interface SkillTag {
  text: string;
  color: string;
  xStart: number;
  yStart: number;
  rotate: number;
}

interface CategoryGroup {
  id: string;
  label: string;
  tabColor: string;
  tags: SkillTag[];
}

const skillCategories: CategoryGroup[] = [
  {
    id: "ai",
    label: "AI / AGENTIC",
    tabColor: "bg-[#e55b3c] text-white",
    tags: [
      { text: "LANGGRAPH", color: "bg-[#e55b3c] text-white", xStart: -450, yStart: -220, rotate: -12 },
      { text: "LANGCHAIN", color: "bg-[#0c9367] text-white", xStart: 420, yStart: 260, rotate: 10 },
      { text: "GOOGLE ADK", color: "bg-[#3b82f6] text-white", xStart: -320, yStart: 300, rotate: -8 },
      { text: "MCP PROTOCOL", color: "bg-[#141b16] text-white", xStart: 520, yStart: -160, rotate: 15 },
      { text: "LLAMACLOUD", color: "bg-[#6758a5] text-white", xStart: -520, yStart: 120, rotate: -10 },
      { text: "LANGFUSE", color: "bg-[#f1b333] text-black", xStart: 320, yStart: -320, rotate: 8 },
      { text: "CONTEXT ENGINEERING", color: "bg-[#c53b3a] text-white", xStart: 620, yStart: 380, rotate: -6 },
    ],
  },
  {
    id: "languages",
    label: "LANGUAGES",
    tabColor: "bg-[#141b16] text-white",
    tags: [
      { text: "PYTHON", color: "bg-[#141b16] text-white", xStart: -480, yStart: -240, rotate: -12 },
      { text: "TYPESCRIPT", color: "bg-[#3b82f6] text-white", xStart: 460, yStart: 220, rotate: 10 },
      { text: "C++", color: "bg-[#e55b3c] text-white", xStart: -360, yStart: 280, rotate: -8 },
      { text: "JAVA", color: "bg-[#f1b333] text-black", xStart: 440, yStart: -280, rotate: 14 },
      { text: "JAVASCRIPT", color: "bg-[#f59e0b] text-black", xStart: -540, yStart: -120, rotate: 6 },
      { text: "SQL", color: "bg-[#0c9367] text-white", xStart: 380, yStart: 340, rotate: -10 },
    ],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    tabColor: "bg-[#3b82f6] text-white",
    tags: [
      { text: "NEXT.JS", color: "bg-[#141b16] text-white", xStart: -520, yStart: -200, rotate: -14 },
      { text: "REACT", color: "bg-[#3b82f6] text-white", xStart: 480, yStart: 240, rotate: 10 },
      { text: "TANSTACK", color: "bg-[#e55b3c] text-white", xStart: -390, yStart: 280, rotate: -7 },
      { text: "NODE.JS", color: "bg-[#0c9367] text-white", xStart: 540, yStart: -160, rotate: 12 },
      { text: "EXPRESS", color: "bg-white text-black", xStart: -300, yStart: -320, rotate: -9 },
      { text: "FASTAPI", color: "bg-[#10b981] text-white", xStart: 360, yStart: 360, rotate: 8 },
    ],
  },
  {
    id: "databases",
    label: "DATABASES",
    tabColor: "bg-[#f1b333] text-black",
    tags: [
      { text: "POSTGRESQL", color: "bg-[#2563eb] text-white", xStart: -480, yStart: -250, rotate: -11 },
      { text: "MONGODB", color: "bg-[#0c9367] text-white", xStart: 500, yStart: 220, rotate: 9 },
      { text: "CONVEX", color: "bg-[#f1b333] text-black", xStart: -340, yStart: 320, rotate: -6 },
      { text: "REDIS", color: "bg-[#c53b3a] text-white", xStart: 560, yStart: -190, rotate: 14 },
      { text: "NEO4J", color: "bg-[#0284c7] text-white", xStart: -540, yStart: 90, rotate: -12 },
      { text: "PINECONE", color: "bg-[#141b16] text-white", xStart: 400, yStart: -340, rotate: 7 },
      { text: "CHROMADB", color: "bg-[#e55b3c] text-white", xStart: 280, yStart: 380, rotate: -9 },
    ],
  },
  {
    id: "ml",
    label: "ML / DL",
    tabColor: "bg-[#84cc16] text-black",
    tags: [
      { text: "PYTORCH", color: "bg-[#e55b3c] text-white", xStart: -500, yStart: -260, rotate: -14 },
      { text: "SCIKIT-LEARN", color: "bg-[#f59e0b] text-black", xStart: 520, yStart: 200, rotate: 10 },
      { text: "HUGGING FACE", color: "bg-[#f1b333] text-black", xStart: -380, yStart: 300, rotate: -7 },
      { text: "UNSLOTH", color: "bg-[#141b16] text-white", xStart: 440, yStart: -240, rotate: 13 },
      { text: "VLLM", color: "bg-[#0c9367] text-white", xStart: -560, yStart: 140, rotate: -11 },
      { text: "MLOPS", color: "bg-[#6758a5] text-white", xStart: 360, yStart: 360, rotate: 9 },
    ],
  },
  {
    id: "cloud",
    label: "CLOUD & DEVOPS",
    tabColor: "bg-[#0c9367] text-white",
    tags: [
      { text: "AWS", color: "bg-[#f59e0b] text-black", xStart: -580, yStart: -240, rotate: -12 },
      { text: "GCP", color: "bg-[#3b82f6] text-white", xStart: 540, yStart: 200, rotate: 11 },
      { text: "DOCKER", color: "bg-[#0284c7] text-white", xStart: -400, yStart: 280, rotate: -8 },
      { text: "CI/CD", color: "bg-[#141b16] text-white", xStart: 500, yStart: -260, rotate: 14 },
      { text: "JENKINS", color: "bg-[#c53b3a] text-white", xStart: -480, yStart: -160, rotate: -10 },
      { text: "APACHE AIRFLOW", color: "bg-[#0c9367] text-white", xStart: 380, yStart: 340, rotate: 7 },
      { text: "TEMPORAL.IO", color: "bg-[#141b16] text-white", xStart: -300, yStart: 380, rotate: -13 },
      { text: "RABBITMQ", color: "bg-[#e55b3c] text-white", xStart: 600, yStart: -120, rotate: 9 },
      { text: "GRAFANA", color: "bg-[#f59e0b] text-black", xStart: -640, yStart: 140, rotate: -7 },
      { text: "K6", color: "bg-[#6758a5] text-white", xStart: 460, yStart: 300, rotate: 12 },
    ],
  },
  {
    id: "soft",
    label: "SOFT SKILLS",
    tabColor: "bg-white text-black",
    tags: [
      { text: "LEADERSHIP", color: "bg-[#e55b3c] text-white", xStart: -500, yStart: -220, rotate: -11 },
      { text: "PROBLEM-SOLVING", color: "bg-[#0c9367] text-white", xStart: 480, yStart: 240, rotate: 10 },
      { text: "CLIENT COMMUNICATION", color: "bg-[#3b82f6] text-white", xStart: -380, yStart: 300, rotate: -8 },
      { text: "CROSS-FUNCTIONAL COLLABORATION", color: "bg-[#6758a5] text-white", xStart: 540, yStart: -200, rotate: 12 },
      { text: "TEAM MENTORSHIP", color: "bg-[#141b16] text-white", xStart: -280, yStart: -340, rotate: -7 },
    ],
  },
];

interface SkillsSectionProps {
  className?: string;
}

const SkillsSection = forwardRef<HTMLDivElement, SkillsSectionProps>(
  ({ className = "" }, ref) => {
    const [activeTabId, setActiveTabId] = useState<string>("ai");
    const boardRef = useRef<HTMLDivElement>(null);

    const currentCategory =
      skillCategories.find((c) => c.id === activeTabId) || skillCategories[0];

    // Same appearance fly-in animation as ScrollTags on tab selection / mount
    useGSAP(
      () => {
        if (!boardRef.current) return;

        const tags = Array.from(
          boardRef.current.querySelectorAll<HTMLElement>(".assembler-tag"),
        );
        if (!tags.length) return;

        gsap.killTweensOf(tags);

        tags.forEach((tag, idx) => {
          const xStart = Number(tag.getAttribute("data-xs") || 0);
          const yStart = Number(tag.getAttribute("data-ys") || 0);
          const rotate = Number(tag.getAttribute("data-rot") || 0);

          gsap.fromTo(
            tag,
            {
              x: xStart,
              y: yStart,
              rotation: rotate * 3,
              opacity: 0,
              scale: 0.2,
            },
            {
              x: 0,
              y: 0,
              rotation: rotate,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: idx * 0.05,
            },
          );
        });
      },
      { dependencies: [activeTabId], scope: boardRef },
    );

    return (
      <section
        ref={ref}
        id="skills-section"
        aria-label="Skills & Technologies Section"
        className={`relative w-full select-none bg-[#f5f2ea] text-[#141b16] py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 border-y-2 border-[#141b16]/10 overflow-hidden ${className}`}
      >
        {/* Film grain noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none mix-blend-multiply" />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-3 sm:gap-4">
          {/* Top Heading */}
          <div className="flex flex-col items-center text-center">
            <h2 className="font-sans font-extrabold tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#141b16] leading-tight">
              Skills &amp; Technologies
            </h2>
            <p className="font-sans text-xs sm:text-sm font-medium text-[#141b16]/70 mt-1 sm:mt-1.5 text-center max-w-md">
              Click any category tab below to explore the dedicated toolset &amp; technical stack
            </p>
          </div>

          {/* Interactive Category Tabs Bar */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl">
            {skillCategories.map((category) => {
              const isActive = category.id === activeTabId;
              return (
                <MagneticButton
                  key={category.id}
                  onClick={() => setActiveTabId(category.id)}
                  magneticStrength={0.2}
                  scaleOnHover={1.05}
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg font-mono font-bold text-[10px] sm:text-xs md:text-xs border-[1.5px] sm:border-2 border-[#141b16] transition-all duration-150 cursor-pointer uppercase tracking-wider ${
                    isActive
                      ? `${category.tabColor} shadow-[2.5px_2.5px_0px_#141b16] scale-105 z-10`
                      : "bg-white text-[#141b16]/70 hover:text-[#141b16] hover:bg-zinc-50 shadow-[1.5px_1.5px_0px_#141b16]"
                  }`}
                  ariaLabel={`Switch to ${category.label}`}
                >
                  <span>{category.label}</span>
                </MagneticButton>
              );
            })}
          </div>

          {/* Brutalist DOM Board Collider Box */}
          <div
            ref={boardRef}
            className="w-full max-w-4xl min-h-[260px] sm:min-h-[300px] md:min-h-[320px] border-2 sm:border-[2.5px] border-[#141b16] rounded-[22px] sm:rounded-[28px] bg-white p-6 sm:p-10 md:p-12 flex flex-wrap gap-3 sm:gap-4 md:gap-5 items-center justify-center relative overflow-hidden"
          >
            {currentCategory.tags.map((tag) => (
              <MagneticButton
                key={tag.text}
                magneticStrength={0.25}
                scaleOnHover={1.07}
                className={`assembler-tag px-3 xs:px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 border-[1.5px] sm:border-2 border-[#141b16] rounded-lg sm:rounded-xl font-mono font-black text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-[13px] shadow-[2px_2px_0px_#141b16] sm:shadow-[3px_3px_0px_#141b16] transform will-change-transform cursor-pointer select-none uppercase tracking-wider ${tag.color}`}
                data-xs={tag.xStart}
                data-ys={tag.yStart}
                data-rot={tag.rotate}
              >
                {tag.text}
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
