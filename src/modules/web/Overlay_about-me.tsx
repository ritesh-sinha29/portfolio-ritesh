"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import Footer from "./Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface OverlayProps {
  className?: string;
  onVideoClick?: () => void;
}

const navStages = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
];

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className = "" }, ref) => {
    const stageContainerRef = useRef<HTMLDivElement>(null);
    const scrollStageRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Combine forwarded ref and internal ref
    const setRefs = (node: HTMLDivElement | null) => {
      stageContainerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Master Timeline:
    // 1. 3D Stacked Card Parallax Transition: About -> Skills -> Projects
    // 2. Curtain Lift: Projects Stage slides up (yPercent: -100) to reveal Footer underneath
    useGSAP(
      () => {
        if (!stageContainerRef.current || !scrollStageRef.current) return;

        const stage = stageContainerRef.current;
        const scrollStage = scrollStageRef.current;

        // Set initial states for panels, parallax content, and inner elements
        gsap.set(".panel-0", {
          y: "0vh",
          scale: 1,
          rotateX: 0,
          autoAlpha: 1,
        });

        gsap.set(".about-title", { y: -25, autoAlpha: 0 });
        gsap.set(".about-headline-line", { y: 35, autoAlpha: 0 });
        gsap.set(".about-subtext", { y: 25, autoAlpha: 0 });
        gsap.set(".about-image", { y: 80, scale: 0.95, autoAlpha: 0 });

        gsap.set(".panel-1, .panel-2", {
          y: "100vh",
          scale: 1,
          rotateX: 0,
          autoAlpha: 0,
        });

        gsap.set(".panel-1-content, .panel-2-content", {
          y: "12vh",
        });

        gsap.set(".skills-header", { y: 35, autoAlpha: 0 });
        gsap.set(".skills-tabs", { y: 25, scale: 0.95, autoAlpha: 0 });
        gsap.set(".skills-board", { y: 40, scale: 0.96, autoAlpha: 0 });
        gsap.set(".projects-header", { y: -30, autoAlpha: 0 });
        gsap.set(".project-card-item-0", {
          y: -100,
          x: 60,
          rotate: -6,
          scale: 0.75,
          autoAlpha: 0,
        });
        gsap.set(".project-card-item-1", {
          y: -130,
          x: 0,
          rotate: 0,
          scale: 0.75,
          autoAlpha: 0,
        });
        gsap.set(".project-card-item-2", {
          y: -100,
          x: -60,
          rotate: 6,
          scale: 0.75,
          autoAlpha: 0,
        });
        gsap.set(".projects-cta", { y: 30, scale: 0.85, autoAlpha: 0 });

        gsap.set(scrollStage, { yPercent: 0 });

        // Entrance animation for Panel 0 (About) as Overlay enters from Hero
        const aboutEntranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 80%",
            end: "top top",
            scrub: 0.4,
          },
        });

        aboutEntranceTl
          .to(".about-title", {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          }, 0)
          .to(".about-headline-line", {
            y: 0,
            autoAlpha: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: "power3.out",
          }, 0.1)
          .to(".about-subtext", {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power2.out",
          }, 0.25)
          .to(".about-image", {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power2.out",
          }, 0.15);

        // Master pinned scroll timeline with smooth, responsive scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              // Map progress across the 3 stages before curtain
              const stageIdx = Math.min(
                Math.floor(progress * 3.2),
                navStages.length - 1,
              );

              navStages.forEach((item, idx) => {
                const el = stage.querySelector(
                  `#nav-${item.id}`,
                ) as HTMLElement | null;
                if (el) {
                  if (idx === stageIdx) {
                    el.classList.add(
                      "shadow-[3px_3px_0px_#141b16]",
                      "scale-105",
                      "!rotate-[-2deg]",
                      "bg-[#c5eb35]",
                      "text-[#141b16]",
                      "opacity-100",
                    );
                    el.classList.remove(
                      "opacity-60",
                      "rotate-[2deg]",
                      "bg-white",
                    );
                  } else {
                    el.classList.remove(
                      "shadow-[3px_3px_0px_#141b16]",
                      "scale-105",
                      "!rotate-[-2deg]",
                      "bg-[#c5eb35]",
                      "text-[#141b16]",
                      "opacity-100",
                    );
                    el.classList.add(
                      "opacity-60",
                      "rotate-[2deg]",
                      "bg-white",
                    );
                  }
                }
              });
            },
          },
        });

        tlRef.current = tl;

        // Label 0: ABOUT (Hold for initial reading)
        tl.addLabel("about", 0);
        tl.to({}, { duration: 0.05 });

        /*
         * PREMIUM 3D STACKED + PARALLAX TRANSITIONS:
         *
         *  TRANSITION 1: ABOUT (Panel 0) → SKILLS (Panel 1)
         *  - Panel 1 slides up from y: 100vh → 0vh (power2.out)
         *  - Panel 1 inner content glides up from y: 12vh → 0vh in sync
         *  - Skills inner elements reveal with choreographed stagger
         *  - Panel 0 tilts back (rotateX: 12), scales down to 0.85, and dims (opacity: 0.4)
         */
        tl.set(".panel-1", {
          y: "100vh",
          rotateX: 0,
          scale: 1,
          autoAlpha: 1,
        });
        tl.set(".panel-1-content", { y: "12vh" });

        tl.to(".panel-1", {
          y: "0vh",
          duration: 1.0,
          ease: "power2.out",
        });

        tl.to(
          ".panel-1-content",
          {
            y: "0vh",
            duration: 1.0,
            ease: "power2.out",
          },
          "<",
        );

        tl.to(
          ".skills-header",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power2.out",
          },
          "<0.1",
        );

        tl.to(
          ".skills-tabs",
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.85,
            ease: "back.out(1.2)",
          },
          "<0.1",
        );

        tl.to(
          ".skills-board",
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power2.out",
          },
          "<0.1",
        );

        tl.to(
          ".panel-0",
          {
            scale: 0.85,
            y: "-8vh",
            rotateX: 12,
            opacity: 0.4,
            transformOrigin: "center 30%",
            duration: 1.0,
            ease: "power2.out",
          },
          "<",
        );

        tl.addLabel("skills");
        tl.to({}, { duration: 0.05 });

        /*
         *  TRANSITION 2: SKILLS (Panel 1) → PROJECTS (Panel 2)
         *  - Panel 2 slides up from y: 100vh → 0vh (power2.out)
         *  - Panel 2 inner content glides up from y: 12vh → 0vh in sync
         *  - Projects elements reveal with choreographed stagger (header, 3 cards, cta)
         *  - Panel 1 tilts back (rotateX: 12), scales down to 0.85, and dims (opacity: 0.4)
         *  - Panel 0 fades out completely (autoAlpha: 0)
         */
        tl.set(".panel-2", {
          y: "100vh",
          rotateX: 0,
          scale: 1,
          autoAlpha: 1,
        });
        tl.set(".panel-2-content", { y: "12vh" });

        tl.to(".panel-2", {
          y: "0vh",
          duration: 1.0,
          ease: "power2.out",
        });

        tl.to(
          ".panel-2-content",
          {
            y: "0vh",
            duration: 1.0,
            ease: "power2.out",
          },
          "<",
        );

        tl.to(
          ".projects-header",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power2.out",
          },
          "<0.1",
        );

        tl.to(
          [".project-card-item-0", ".project-card-item-1", ".project-card-item-2"],
          {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: "power2.out",
          },
          "<0.1",
        );

        tl.to(
          ".projects-cta",
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "<0.15",
        );

        tl.to(
          ".panel-1",
          {
            scale: 0.85,
            y: "-8vh",
            rotateX: 12,
            opacity: 0.4,
            transformOrigin: "center 30%",
            duration: 1.0,
            ease: "power2.out",
          },
          "<",
        );

        tl.to(
          ".panel-0",
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "<",
        );

        tl.addLabel("projects");

        /*
         *  TRANSITION 3: AFTER PROJECTS → CURTAIN LIFT REVEAL OF FOOTER
         *  The stacked stage slides upward (yPercent: -100) to reveal the underlying Footer
         */
        tl.to(
          scrollStage,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power1.inOut",
          },
          "+=0.04",
        );

        ScrollTrigger.refresh();
      },
      { scope: stageContainerRef },
    );

    // Smooth Navigation Click for Right Floating Indicator
    const handleNavClick = (label: string) => {
      const tl = tlRef.current;
      if (tl?.scrollTrigger) {
        const scrollPos = tl.scrollTrigger.labelToScroll(label);
        const lenis = (
          window as unknown as {
            lenis?: {
              scrollTo: (
                target: number | string | HTMLElement,
                options?: Record<string, unknown>,
              ) => void;
            };
          }
        ).lenis;

        if (lenis) {
          lenis.scrollTo(scrollPos, {
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({
            top: scrollPos,
            behavior: "smooth",
          });
        }
      }
    };

    return (
      <section
        ref={setRefs}
        id="about-section"
        aria-label="Portfolio Flow — About, Skills, Projects & Footer"
        className={`relative w-full h-screen overflow-hidden select-none ${className}`}
      >
        {/* Layer 0 (Underneath): Footer Section */}
        <div className="absolute inset-0 w-full h-full z-10">
          <Footer />
        </div>

        {/* Layer 1 (On Top): Pinned 3D Viewport — Slides upward on curtain lift */}
        <div
          ref={scrollStageRef}
          className="scroll-viewport absolute inset-0 w-full h-full z-20 overflow-hidden will-change-transform bg-background"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 40%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Tactile Noise Overlay */}
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-40" />

          {/* Floating Right Indicator — inside pinned viewport */}
          <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            {navStages.map((item, idx) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-28 text-left border-2 border-[#141b16] px-3 py-1.5 font-mono font-bold text-[10px] uppercase rounded-lg shadow-[2px_2px_0px_#141b16] cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  idx === 0
                    ? "bg-[#c5eb35] text-[#141b16] shadow-[3px_3px_0px_#141b16] scale-105 rotate-[-2deg] opacity-100"
                    : "bg-white text-[#141b16] opacity-60 rotate-[2deg] hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ================================================================== */}
          {/* PANEL 0: ABOUT ME SECTION                                          */}
          {/* ================================================================== */}
          <section className="panel-item panel-0 absolute inset-0 w-full h-full bg-[#eae7e1] text-[#141b16] flex flex-col justify-between p-6 sm:p-10 md:p-14 z-10 select-none overflow-hidden will-change-transform">
            {/* Warm Ambient Lighting */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 85% 75%, rgba(235,94,40,0.06) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 20% 25%, rgba(245,200,108,0.08) 0%, transparent 60%)",
              }}
            />

            {/* Top Center Title */}
            <div className="about-title relative z-20 w-full flex justify-center items-center pt-8 sm:pt-12 md:pt-14 will-change-transform">
              <h2 className="font-sans font-extrabold tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#141b16] leading-tight text-center">
                About Me
              </h2>
            </div>

            {/* Center Stage: Hero-Style Typography & Content (Left Quadrant) */}
            <div className="relative w-full flex-1 max-w-6xl mx-auto z-20 flex flex-col justify-center my-auto py-2 sm:py-4">
              <div className="max-w-xl lg:max-w-2xl">
                {/* Big About Me Headline */}
                <h1 className="font-sans font-normal tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] leading-[1.2] text-[#141b16]">
                  <span className="about-headline-line block will-change-transform">
                    I am Ritesh Sinha, an experienced
                  </span>
                  <span className="about-headline-line block will-change-transform">
                    <span className="font-serif italic font-normal text-inherit tracking-normal">
                      Full-Stack AI Engineer
                    </span>{" "}
                    who
                  </span>
                  <span className="about-headline-line block will-change-transform">
                    architects intelligent systems,
                  </span>
                  <span className="about-headline-line block will-change-transform">
                    builds at scale, ships relentlessly,
                  </span>
                  <span className="about-headline-line block will-change-transform">
                    breaks boundaries, and builds again.
                  </span>
                </h1>

                {/* Subtext */}
                <p className="about-subtext font-sans text-xs sm:text-sm md:text-[14px] text-[#141b16]/75 font-normal max-w-lg leading-relaxed mt-3.5 sm:mt-5 will-change-transform">
                  I work across AI/ML, LLMs, RAG, multi-agent systems, MCP,
                  distributed architectures, cloud infrastructure, and full-stack
                  engineering — turning ambitious ideas into production-grade
                  systems built to scale.
                </p>
              </div>
            </div>

            {/* Right Side Grounded Character Image */}
            <div className="about-image absolute bottom-0 right-0 sm:right-[2%] md:right-[4%] lg:right-[6%] z-10 w-[60vw] sm:w-[38vw] md:w-[34vw] max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] h-[55vh] sm:h-[68vh] md:h-[74vh] lg:h-[78vh] flex items-end justify-center pointer-events-none will-change-transform">
              <div className="relative w-full h-full">
                <Image
                  src="/ritesh mic.svg"
                  alt="Ritesh Sinha"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 38vw, 460px"
                  className="object-contain object-bottom select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PANEL 1: SKILLS & TECHNOLOGIES SECTION                             */}
          {/* ================================================================== */}
          <section
            id="skills-section"
            className="panel-item panel-1 absolute inset-0 w-full h-full bg-[#faf8f5] text-[#141b16] z-[12] select-none overflow-hidden will-change-transform"
          >
            <div className="panel-1-content h-full w-full will-change-transform origin-bottom-left">
              <SkillsSection />
            </div>
          </section>

          {/* ================================================================== */}
          {/* PANEL 2: FEATURED PROJECTS SECTION                                 */}
          {/* ================================================================== */}
          <section
            id="works-stage"
            className="panel-item panel-2 absolute inset-0 w-full h-full bg-[#eae7e1] text-[#141b16] z-[14] select-none overflow-hidden will-change-transform"
          >
            <div className="panel-2-content h-full w-full will-change-transform origin-bottom-left">
              <ProjectsSection />
            </div>
          </section>
        </div>
      </section>
    );
  },
);

Overlay.displayName = "Overlay";

export default Overlay;
