"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { MagneticButton } from "@/components/ui/magnetic-button";

export interface ProjectCardItem {
  id: string;
  number: string;
  title: string;
  phase: string;
  badge: string;
  accentClass: string;
  imageUrl: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

export const featuredProjects: ProjectCardItem[] = [
  {
    id: "wekraft",
    number: "01",
    title: "WEKRAFT",
    phase: "PHASE 01",
    badge: "AI DEV PLATFORM",
    accentClass: "bg-primary text-primary-foreground",
    imageUrl: "/wekraft.webp",
    description:
      "AI-powered project execution platform bridging Devs & PMs with bidirectional GitHub sync & third-party MCP integrations.",
    tech: ["LangGraph", "MCP", "Ably"],
    liveUrl: "https://wekraft.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/wekraft",
  },
  {
    id: "clarioo",
    number: "02",
    title: "CLARIOO",
    phase: "PHASE 02",
    badge: "CAREER AI ENGINE",
    accentClass: "bg-secondary text-secondary-foreground",
    imageUrl: "/clarioo.webp",
    description:
      "Personalized career acceleration platform featuring tailored roadmaps and AI-proctored real-time voice mock interviews.",
    tech: ["Next.js", "Vapi", "Supabase"],
    liveUrl: "https://clarioo.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/clarioo",
  },
  {
    id: "looma",
    number: "03",
    title: "LOOMA",
    phase: "PHASE 03",
    badge: "COLLAB CANVAS",
    accentClass: "bg-accent text-accent-foreground",
    imageUrl: "/looma.webp",
    description:
      "Real-time collaborative canvas enabling teams to sketch, design, and instantly generate live deployable web applications.",
    tech: ["Vercel AI", "Firecrawl", "Liveblocks"],
    liveUrl: "https://looma.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/looma",
  },
];

interface ProjectsSectionProps {
  className?: string;
  projects?: ProjectCardItem[];
}

const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ className = "", projects = featuredProjects }, ref) => {
    // 3D Mouse Tilt on Project Cards
    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.35,
        overwrite: "auto",
      });
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.5,
        overwrite: "auto",
      });
    };

    return (
      <div
        ref={ref}
        className={`w-full h-full flex flex-col justify-center items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-8 md:px-12 ${className}`}
      >
        {/* Center Content: Header & 3 Projects Cards */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center my-auto min-h-0 py-1 sm:py-2">
          {/* Heading */}
          <div className="projects-header text-center mb-3 sm:mb-5 md:mb-6 will-change-transform">
            <h2 className="font-sans font-extrabold tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#141b16] leading-tight">
              Featured Projects
            </h2>
            <p className="font-sans text-[11px] sm:text-xs md:text-[13px] font-medium text-[#141b16]/65 mt-1 sm:mt-2">
              Top Loved Works • Interactive 3D Showcase
            </p>
          </div>

          {/* 3 Featured Cards Grid */}
          <div className="w-full flex flex-nowrap items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-6 pointer-events-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`project-card-item project-card-item-${index} w-[108px] xs:w-[124px] sm:w-[240px] md:w-[265px] lg:w-[285px] h-[255px] xs:h-[280px] sm:h-[350px] md:h-[370px] lg:h-[380px] max-h-[64vh] flex-1 relative transform-gpu rounded-xl sm:rounded-2xl border-[1.5px] sm:border-[2.5px] border-[#141b16] shadow-[2.5px_2.5px_0px_#141b16] sm:shadow-[4px_4px_0px_#141b16] p-2 xs:p-2.5 sm:p-4 bg-white text-[#141b16] flex flex-col justify-between cursor-pointer select-none transition-shadow hover:shadow-[5px_5px_0px_#141b16] will-change-transform`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                }}
              >
                {/* Top Badge Row */}
                <div className="flex justify-between items-center pb-0.5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-bold text-neutral-400">
                    [{project.phase}]
                  </span>
                  <span
                    className={`inline-block border border-[#141b16] shadow-[1px_1px_0px_#141b16] px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold uppercase ${project.accentClass}`}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Image Frame */}
                <div className="w-full h-[78px] xs:h-[95px] sm:h-[125px] md:h-[135px] border sm:border-2 border-[#141b16] relative overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 my-1 sm:my-1.5 shadow-[1px_1px_0px_#141b16] sm:shadow-[2px_2px_0px_#141b16]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 640px) 33vw, 285px"
                    className="object-cover object-top select-none"
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1 flex flex-col justify-between py-0.5 sm:py-1">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-sans font-bold text-[10px] xs:text-xs sm:text-sm text-[#141b16] truncate">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[8.5px] sm:text-[10px] text-neutral-400 font-bold ml-1">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-[7.5px] xs:text-[9px] sm:text-[11px] font-sans text-neutral-700 leading-tight sm:leading-snug line-clamp-2 mt-0.5 sm:mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-1 sm:px-1.5 py-0.5 rounded bg-neutral-100 border border-black/10 text-[7px] xs:text-[7.5px] sm:text-[8.5px] font-mono text-neutral-800 font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full pt-2 sm:pt-2.5 border-t border-neutral-200">
                  <div className="flex items-center justify-between gap-1">
                    <MagneticButton
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      magneticStrength={0.45}
                      scaleOnHover={1.06}
                      className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white hover:bg-neutral-50 text-primary font-sans font-bold text-[7.5px] xs:text-[8.5px] sm:text-[10.5px] border border-[#141b16] shadow-xs uppercase tracking-wider transition-colors duration-150"
                      title={`Visit ${project.title} Live`}
                    >
                      <span>Check Live</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5] text-primary" />
                    </MagneticButton>

                    <MagneticButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      magneticStrength={0.45}
                      scaleOnHover={1.06}
                      className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full text-[#141b16] hover:bg-neutral-100 font-sans font-bold text-[7.5px] xs:text-[8.5px] sm:text-[10.5px] transition-colors duration-150"
                      title={`View ${project.title} on GitHub`}
                    >
                      <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Works CTA */}
          <div className="projects-cta mt-4 sm:mt-6 md:mt-7 flex justify-center will-change-transform">
            <MagneticButton
              href="/work"
              magneticStrength={0.35}
              scaleOnHover={1.06}
              className="group px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-primary text-primary-foreground border-[1.5px] sm:border-2 border-[#141b16] shadow-[2.5px_2.5px_0px_#141b16] hover:shadow-[4px_4px_0px_#141b16] font-sans font-extrabold text-[11px] sm:text-xs md:text-[13px] flex items-center gap-2 uppercase tracking-wider transition-all duration-200"
            >
              <span>View All Projects</span>
              <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-black/25 transition-all duration-200">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-primary-foreground" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>
    );
  },
);

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
