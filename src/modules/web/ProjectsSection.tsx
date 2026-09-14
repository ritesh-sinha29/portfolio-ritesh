"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CoverFlowCarousel, CarouselItem } from "@/components/ui/3-d-coverflow-carousel";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MagneticDock } from "@/components/tweenlabs/MagneticDock";

export const portfolioCarouselItems: CarouselItem[] = [
  {
    tag: "#01 AI Systems",
    titleLine1: "WEKRAFT",
    titleLine2: "– EXECUTION PLATFORM",
    desc: "AI-powered project execution platform bridging Devs & PMs with bidirectional GitHub sync and third-party MCP integrations.",
    img: "/wekraft.webp",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#02 Career AI",
    titleLine1: "CLARIOO",
    titleLine2: "– CAREER ACCELERATOR",
    desc: "Personalized career acceleration platform featuring tailored roadmaps and AI-proctored mock interviews.",
    img: "/clarioo.webp",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#03 Collaborative",
    titleLine1: "LOOMA",
    titleLine2: "– REALTIME CANVAS",
    desc: "Real-time collaborative canvas enabling teams to sketch, design, and instantly generate live deployable web applications.",
    img: "/looma.webp",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#04 Productivity",
    titleLine1: "ARIA",
    titleLine2: "– PERSONAL AI OS",
    desc: "Intelligent personal productivity operating system connecting Gmail, Slack, and Discord to turn daily chaos into automated action.",
    img: "/aria.webp",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#05 Enterprise",
    titleLine1: "SALES AGENT",
    titleLine2: "– MULTI-AGENT RAG",
    desc: "Enterprise-grade bilingual sales agent architected with semantic caching, strict guardrails, background jobs, and persistent memory.",
    img: "/pan-agent.webp",
    ctaText: "Explore Project",
    ctaUrl: "/work",
  },
  {
    tag: "#06 Recruitment",
    titleLine1: "VOCALX",
    titleLine2: "– VOICE AI ENGINE",
    desc: "Next-gen AI recruitment engine that automates JD parsing, question generation, and real-time proctored voice interviews.",
    img: "/vocalx.webp",
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-card/95 backdrop-blur-md border-l border-y border-border py-3.5 px-2 rounded-l-xl shadow-lg flex items-center gap-1.5 cursor-pointer hover:bg-card hover:scale-102 transition-all duration-300 group"
        >
          <span className="w-1.5 h-6 rounded-full bg-primary mr-1" />
          <span
            className="font-sans text-[11px] font-semibold tracking-wider text-muted-foreground group-hover:text-foreground uppercase whitespace-nowrap"
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
              className="w-full max-w-sm h-full bg-card text-card-foreground p-8 shadow-2xl flex flex-col justify-between border-l border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-foreground">
                      Quick Info
                    </h4>
                  </div>
                  <MagneticButton
                    onClick={() => setQuickInfoOpen(false)}
                    className="text-xs font-semibold uppercase px-3.5 py-1.5 rounded-full bg-muted hover:bg-accent text-foreground transition-colors"
                  >
                    Close
                  </MagneticButton>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      Role
                    </span>
                    <p className="font-sans font-semibold text-lg text-foreground mt-1">
                      Full-Stack AI Engineer & Builder
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      Core Focus
                    </span>
                    <p className="font-sans text-sm text-muted-foreground mt-1 leading-relaxed">
                      AI/ML, Multi-Agent Architecture, Distributed Systems,
                      Cloud Infrastructure, Interactive Web.
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      Availability
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-sans text-sm font-medium text-foreground">
                        Open for Select High-Impact Roles & Projects
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      Location
                    </span>
                    <p className="font-sans text-sm font-medium text-foreground mt-1">
                      Global / Remote
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-center">
                <div className="w-full p-1 rounded-full bg-card border border-border shadow-xs flex items-center">
                  <MagneticButton
                    href="mailto:riteshsinha4146@gmail.com"
                    className="w-full py-2.5 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-opacity duration-150 uppercase tracking-wider"
                  >
                    <span>Initiate Contact</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Bottom Navigation Bar with Magnetic Dock physics */}
        <MagneticDock
          activeId={activeTab.toLowerCase()}
          onItemClick={(id) => handleNavClick(id.toUpperCase() as any)}
          items={[
            { id: "home", label: "HOME", onClick: () => handleNavClick("HOME") },
            { id: "works", label: "WORKS", onClick: () => handleNavClick("WORKS") },
            { id: "about", label: "ABOUT", onClick: () => handleNavClick("ABOUT") },
          ]}
          className="!fixed !bottom-6 !top-auto"
        />
      </section>
    );
  },
);

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
