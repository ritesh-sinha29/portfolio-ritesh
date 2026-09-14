"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(useGSAP);

export interface SkillTag {
  text: string;
  color: string;
  xStart: number;
  yStart: number;
  rotate: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  tabColor: string;
  tags: SkillTag[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI / AGENTIC",
    tabColor: "bg-[#e55b3c] text-white",
    tags: [
      { text: "LANGGRAPH", color: "bg-[#e55b3c] text-white", xStart: -320, yStart: -160, rotate: -12 },
      { text: "LANGCHAIN", color: "bg-[#0c9367] text-white", xStart: 320, yStart: 200, rotate: 10 },
      { text: "GOOGLE ADK", color: "bg-[#3b82f6] text-white", xStart: -240, yStart: 240, rotate: -8 },
      { text: "MCP PROTOCOL", color: "bg-[#141b16] text-white", xStart: 400, yStart: -120, rotate: 14 },
      { text: "LLAMACLOUD", color: "bg-[#6758a5] text-white", xStart: -380, yStart: 90, rotate: -10 },
      { text: "LANGFUSE", color: "bg-[#f1b333] text-black", xStart: 250, yStart: -240, rotate: 8 },
      { text: "CONTEXT ENGINEERING", color: "bg-[#c53b3a] text-white", xStart: 460, yStart: 280, rotate: -6 },
    ],
  },
  {
    id: "languages",
    label: "LANGUAGES",
    tabColor: "bg-[#141b16] text-white",
    tags: [
      { text: "PYTHON", color: "bg-[#141b16] text-white", xStart: -360, yStart: -180, rotate: -12 },
      { text: "TYPESCRIPT", color: "bg-[#3b82f6] text-white", xStart: 340, yStart: 180, rotate: 10 },
      { text: "C++", color: "bg-[#e55b3c] text-white", xStart: -270, yStart: 220, rotate: -8 },
      { text: "JAVA", color: "bg-[#f1b333] text-black", xStart: 350, yStart: -200, rotate: 14 },
      { text: "JAVASCRIPT", color: "bg-[#f59e0b] text-black", xStart: -400, yStart: -80, rotate: 6 },
      { text: "SQL", color: "bg-[#0c9367] text-white", xStart: 290, yStart: 250, rotate: -10 },
    ],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    tabColor: "bg-[#3b82f6] text-white",
    tags: [
      { text: "NEXT.JS", color: "bg-[#141b16] text-white", xStart: -380, yStart: -140, rotate: -14 },
      { text: "REACT", color: "bg-[#3b82f6] text-white", xStart: 360, yStart: 170, rotate: 10 },
      { text: "TANSTACK", color: "bg-[#e55b3c] text-white", xStart: -290, yStart: 210, rotate: -7 },
      { text: "NODE.JS", color: "bg-[#0c9367] text-white", xStart: 410, yStart: -110, rotate: 12 },
      { text: "EXPRESS", color: "bg-white text-black", xStart: -220, yStart: -240, rotate: -9 },
      { text: "FASTAPI", color: "bg-[#10b981] text-white", xStart: 270, yStart: 270, rotate: 8 },
    ],
  },
  {
    id: "databases",
    label: "DATABASES",
    tabColor: "bg-[#f1b333] text-black",
    tags: [
      { text: "POSTGRESQL", color: "bg-[#2563eb] text-white", xStart: -360, yStart: -180, rotate: -11 },
      { text: "MONGODB", color: "bg-[#0c9367] text-white", xStart: 380, yStart: 160, rotate: 9 },
      { text: "CONVEX", color: "bg-[#f1b333] text-black", xStart: -250, yStart: 240, rotate: -6 },
      { text: "REDIS", color: "bg-[#c53b3a] text-white", xStart: 420, yStart: -130, rotate: 14 },
      { text: "NEO4J", color: "bg-[#0284c7] text-white", xStart: -400, yStart: 60, rotate: -12 },
      { text: "PINECONE", color: "bg-[#141b16] text-white", xStart: 300, yStart: -250, rotate: 7 },
      { text: "CHROMADB", color: "bg-[#e55b3c] text-white", xStart: 210, yStart: 290, rotate: -9 },
    ],
  },
  {
    id: "ml",
    label: "ML / DL",
    tabColor: "bg-[#84cc16] text-black",
    tags: [
      { text: "PYTORCH", color: "bg-[#e55b3c] text-white", xStart: -380, yStart: -190, rotate: -14 },
      { text: "SCIKIT-LEARN", color: "bg-[#f59e0b] text-black", xStart: 390, yStart: 140, rotate: 10 },
      { text: "HUGGING FACE", color: "bg-[#f1b333] text-black", xStart: -290, yStart: 220, rotate: -7 },
      { text: "UNSLOTH", color: "bg-[#141b16] text-white", xStart: 330, yStart: -170, rotate: 13 },
      { text: "VLLM", color: "bg-[#0c9367] text-white", xStart: -420, yStart: 90, rotate: -11 },
      { text: "MLOPS", color: "bg-[#6758a5] text-white", xStart: 270, yStart: 270, rotate: 9 },
    ],
  },
  {
    id: "cloud",
    label: "CLOUD & DEVOPS",
    tabColor: "bg-[#0c9367] text-white",
    tags: [
      { text: "AWS", color: "bg-[#f59e0b] text-black", xStart: -430, yStart: -170, rotate: -12 },
      { text: "GCP", color: "bg-[#3b82f6] text-white", xStart: 400, yStart: 140, rotate: 11 },
      { text: "DOCKER", color: "bg-[#0284c7] text-white", xStart: -300, yStart: 200, rotate: -8 },
      { text: "CI/CD", color: "bg-[#141b16] text-white", xStart: 370, yStart: -190, rotate: 14 },
      { text: "JENKINS", color: "bg-[#c53b3a] text-white", xStart: -350, yStart: -110, rotate: -10 },
      { text: "APACHE AIRFLOW", color: "bg-[#0c9367] text-white", xStart: 280, yStart: 250, rotate: 7 },
      { text: "TEMPORAL.IO", color: "bg-[#141b16] text-white", xStart: -220, yStart: 280, rotate: -13 },
      { text: "RABBITMQ", color: "bg-[#e55b3c] text-white", xStart: 450, yStart: -80, rotate: 9 },
      { text: "GRAFANA", color: "bg-[#f59e0b] text-black", xStart: -480, yStart: 90, rotate: -7 },
      { text: "K6", color: "bg-[#6758a5] text-white", xStart: 340, yStart: 220, rotate: 12 },
    ],
  },
  {
    id: "soft",
    label: "SOFT SKILLS",
    tabColor: "bg-white text-black",
    tags: [
      { text: "LEADERSHIP", color: "bg-[#e55b3c] text-white", xStart: -370, yStart: -160, rotate: -11 },
      { text: "PROBLEM-SOLVING", color: "bg-[#0c9367] text-white", xStart: 360, yStart: 170, rotate: 10 },
      { text: "CLIENT COMMUNICATION", color: "bg-[#3b82f6] text-white", xStart: -280, yStart: 220, rotate: -8 },
      { text: "CROSS-FUNCTIONAL COLLABORATION", color: "bg-[#6758a5] text-white", xStart: 410, yStart: -140, rotate: 12 },
      { text: "TEAM MENTORSHIP", color: "bg-[#141b16] text-white", xStart: -200, yStart: -250, rotate: -7 },
    ],
  },
];

export const MagneticSkillTag: React.FC<{ tag: SkillTag }> = ({ tag }) => {
  const tagRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = tagRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const currentX = (gsap.getProperty(el, "x") as number) || 0;
    const currentY = (gsap.getProperty(el, "y") as number) || 0;

    const centerX = rect.left - currentX + rect.width / 2;
    const centerY = rect.top - currentY + rect.height / 2;

    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;

    gsap.to(el, {
      x: pullX,
      y: pullY,
      rotation: tag.rotate + pullX * 0.08,
      scale: 1.08,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = tagRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      rotation: tag.rotate,
      scale: 1,
      duration: 0.65,
      ease: "elastic.out(1.2, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <span
      ref={tagRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`assembler-tag px-2.5 xs:px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 border-[1.5px] sm:border-2 border-[#141b16] rounded-md sm:rounded-lg font-mono font-black text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] shadow-[2px_2px_0px_#141b16] sm:shadow-[2.5px_2.5px_0px_#141b16] transform will-change-transform cursor-pointer select-none uppercase tracking-wider transition-shadow hover:shadow-[3.5px_3.5px_0px_#141b16] ${tag.color}`}
      data-xs={tag.xStart}
      data-ys={tag.yStart}
      data-rot={tag.rotate}
    >
      {tag.text}
    </span>
  );
};

interface SkillsSectionProps {
  className?: string;
}

const SkillsSection = forwardRef<HTMLDivElement, SkillsSectionProps>(
  ({ className = "" }, ref) => {
    const [activeTabId, setActiveTabId] = useState<string>("ai");
    const boardRef = useRef<HTMLDivElement>(null);

    const currentCategory =
      skillCategories.find((c) => c.id === activeTabId) || skillCategories[0];

    // Fly-in assembler animation triggered on tab click
    useGSAP(
      () => {
        if (!boardRef.current) return;

        const tags = Array.from(
          boardRef.current.querySelectorAll<HTMLElement>(".assembler-tag") ?? [],
        );
        if (!tags.length) return;

        gsap.killTweensOf(tags);

        const tl = gsap.timeline();

        tags.forEach((tag, idx) => {
          const xStart = Number(tag.getAttribute("data-xs") || 0);
          const yStart = Number(tag.getAttribute("data-ys") || 0);
          const rotate = Number(tag.getAttribute("data-rot") || 0);

          tl.fromTo(
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
              duration: 0.6,
              ease: "power2.out",
            },
            idx * 0.06,
          );
        });
      },
      { dependencies: [activeTabId], scope: boardRef },
    );

    return (
      <div
        ref={ref}
        className={`w-full h-full flex flex-col justify-center items-center p-6 sm:p-10 md:p-14 ${className}`}
      >
        {/* Center Skills Box */}
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 my-auto py-2">
          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <h2 className="font-sans font-extrabold tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#141b16] leading-tight">
              Skills &amp; Technologies
            </h2>
            <p className="font-sans text-[10.5px] sm:text-xs font-medium text-[#141b16]/65 mt-0.5 sm:mt-1 text-center max-w-md">
              Click any category tab below to explore the dedicated toolset &amp; technical stack
            </p>
          </div>

          {/* Interactive Category Tabs Bar */}
          <div className="w-full max-w-3xl flex flex-nowrap items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 px-1">
            {skillCategories.map((category) => {
              const isActive = category.id === activeTabId;
              return (
                <MagneticButton
                  key={category.id}
                  onClick={() => setActiveTabId(category.id)}
                  magneticStrength={0.2}
                  scaleOnHover={1.04}
                  className={`whitespace-nowrap shrink-0 px-2 xs:px-2.5 sm:px-3 py-1 rounded-md sm:rounded-lg font-mono font-bold text-[8.5px] xs:text-[9.5px] sm:text-[11px] border-[1.5px] border-[#141b16] transition-all duration-150 cursor-pointer uppercase tracking-wider ${
                    isActive
                      ? `${category.tabColor} shadow-[2px_2px_0px_#141b16] scale-105 z-10`
                      : "bg-white text-[#141b16]/70 hover:text-[#141b16] hover:bg-zinc-50 shadow-[1px_1px_0px_#141b16]"
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
            className="w-full max-w-3xl min-h-[175px] xs:min-h-[195px] sm:min-h-[220px] md:min-h-[240px] border-2 sm:border-[2.5px] border-[#141b16] rounded-[16px] sm:rounded-[22px] bg-white p-4 sm:p-6 md:p-7 flex flex-wrap gap-2 sm:gap-3 md:gap-3.5 items-center justify-center relative overflow-hidden shadow-[inset_3px_3px_8px_rgba(0,0,0,0.03)]"
          >
            {currentCategory.tags.map((tag) => (
              <MagneticSkillTag key={tag.text} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
