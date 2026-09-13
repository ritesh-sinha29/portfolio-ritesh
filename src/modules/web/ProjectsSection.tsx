"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CoverFlowCarousel, CarouselItem } from "@/components/ui/3-d-coverflow-carousel";

export const portfolioCarouselItems: CarouselItem[] = [
  {
    tag: "#01 AI Systems",
    titleLine1: "WEKRAFT",
    titleLine2: "– EXECUTION PLATFORM",
    desc: "AI-powered project execution platform bridging Devs & PMs with bidirectional GitHub sync and third-party MCP integrations.",
    img: "/wekraft.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#02 Career AI",
    titleLine1: "CLARIOO",
    titleLine2: "– CAREER ACCELERATOR",
    desc: "Personalized career acceleration platform featuring tailored roadmaps and AI-proctored mock interviews.",
    img: "/clarioo.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#03 Collaborative",
    titleLine1: "LOOMA",
    titleLine2: "– REALTIME CANVAS",
    desc: "Real-time collaborative canvas enabling teams to sketch, design, and instantly generate live deployable web applications.",
    img: "/looma.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#04 Productivity",
    titleLine1: "ARIA",
    titleLine2: "– PERSONAL AI OS",
    desc: "Intelligent personal productivity operating system connecting Gmail, Slack, and Discord to turn daily chaos into automated action.",
    img: "/aria.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#05 Enterprise",
    titleLine1: "SALES AGENT",
    titleLine2: "– MULTI-AGENT RAG",
    desc: "Enterprise-grade bilingual sales agent architected with semantic caching, strict guardrails, background jobs, and persistent memory.",
    img: "/pan-agent.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#06 Recruitment",
    titleLine1: "VOCALX",
    titleLine2: "– VOICE AI ENGINE",
    desc: "Next-gen AI recruitment engine that automates JD parsing, question generation, and real-time proctored voice interviews.",
    img: "/vocalx.png",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
];

interface ProjectsSectionProps {
  className?: string;
  items?: CarouselItem[];
  onNavigate?: (section: "HOME" | "WORKS" | "ABOUT") => void;
}

const ProjectsSection = React.forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ className = "", items = portfolioCarouselItems, onNavigate }, forwardedRef) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<"HOME" | "WORKS" | "ABOUT">("WORKS");
    const [quickInfoOpen, setQuickInfoOpen] = useState<boolean>(false);

    // Combine internal ref with forwarded ref
    const setRefs = (node: HTMLDivElement | null) => {
      sectionRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const handleNavClick = (tab: "HOME" | "WORKS" | "ABOUT") => {
      setActiveTab(tab);
      if (onNavigate) {
        onNavigate(tab);
        return;
      }
      if (tab === "HOME") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (tab === "ABOUT") {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    };

    return (
      <section
        ref={setRefs}
        id="projects-section"
        aria-label="Projects Showcase"
        className={`relative w-full min-h-screen bg-[#0c0a09] text-white flex flex-col justify-center items-center select-none z-20 ${className}`}
      >
        {/* CoverFlow Carousel */}
        <CoverFlowCarousel
          items={items}
          sectionLabel="FEATURED PROJECTS"
          autoplay={true}
          autoplayDelay={4500}
          className="w-full"
        />

        {/* Floating Quick Info Tab on Right Screen Edge */}
        <aside
          aria-label="Quick Info"
          onClick={() => setQuickInfoOpen((prev) => !prev)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white/95 backdrop-blur-md border-l border-y border-black/10 py-3.5 px-2 rounded-l-xl shadow-lg flex items-center gap-1.5 cursor-pointer hover:bg-white hover:scale-102 transition-all duration-300 group"
        >
          <span className="w-1.5 h-6 rounded-full bg-[#c5eb35] mr-1" />
          <span
            className="font-sans text-[11px] font-semibold tracking-wider text-neutral-700 group-hover:text-black uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Quick info
          </span>
        </aside>

        {/* Quick Info Drawer Modal */}
        {quickInfoOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setQuickInfoOpen(false)}
          >
            <div
              className="w-full max-w-sm h-full bg-[#eaeae8] p-8 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c5eb35]" />
                    <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-black">
                      Quick Info
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuickInfoOpen(false)}
                    className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 cursor-pointer text-black"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <span className="font-mono text-xs text-neutral-500 uppercase">
                      Role
                    </span>
                    <p className="font-sans font-semibold text-lg text-black mt-1">
                      Full-Stack AI Engineer & Builder
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-neutral-500 uppercase">
                      Core Focus
                    </span>
                    <p className="font-sans text-sm text-neutral-700 mt-1 leading-relaxed">
                      AI/ML, Multi-Agent Architecture, Distributed Systems,
                      Cloud Infrastructure, Interactive Web.
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-neutral-500 uppercase">
                      Availability
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#c5eb35] animate-pulse" />
                      <span className="font-sans text-sm font-medium text-black">
                        Open for Select High-Impact Roles & Projects
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-neutral-500 uppercase">
                      Location
                    </span>
                    <p className="font-sans text-sm font-medium text-black mt-1">
                      Global / Remote
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 pt-4">
                <a
                  href="mailto:riteshsinha4146@gmail.com"
                  className="w-full py-3 rounded-full bg-[#c5eb35] hover:bg-[#b8e528] text-black font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Initiate Contact</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Floating Bottom Navigation Bar */}
        <nav
          aria-label="Main Navigation"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/8 rounded-full p-1.5 flex items-center gap-1 sm:gap-2 transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => handleNavClick("HOME")}
            className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "HOME"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            HOME
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("WORKS")}
            className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "WORKS"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            WORKS
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("ABOUT")}
            className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "ABOUT"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            ABOUT
          </button>
        </nav>
      </section>
    );
  },
);

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
