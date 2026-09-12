"use client";

import Link from "next/link";
import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles, Activity, Layers, Terminal } from "lucide-react";
import Footer from "./Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface OverlayProps {
  className?: string;
  onVideoClick?: () => void;
}

interface FlipProjectItem {
  id: string;
  number: string;
  title: string;
  phase: string;
  badge: string;
  accentClass: string;
  accentHex: string;
  metric: string;
  tagline: string;
  imageUrl: string;
  description: string;
  tech: string[];
}

const featuredFlipProjects: FlipProjectItem[] = [
  {
    id: "wekraft",
    number: "01",
    title: "WEKRAFT",
    phase: "PHASE 01",
    badge: "AI DEV PLATFORM",
    accentClass: "bg-[#c5eb35] text-[#141b16]",
    accentHex: "#c5eb35",
    metric: "SUB-80MS TTFT // MCP READY",
    tagline: "AUTONOMOUS SDLC ENGINE",
    imageUrl: "/wekraft.png",
    description:
      "Enterprise project execution engine bridging Devs & PMs with bidirectional GitHub sync, automated workflows, and MCP integrations.",
    tech: ["LangGraph", "MCP", "Ably", "Next.js"],
  },
  {
    id: "clarioo",
    number: "02",
    title: "CLARIOO",
    phase: "PHASE 02",
    badge: "CAREER AI ENGINE",
    accentClass: "bg-[#F5C86C] text-[#141b16]",
    accentHex: "#F5C86C",
    metric: "12K+ ACTIVE INTERVIEWS",
    tagline: "INTELLIGENT UPSKILLING",
    imageUrl: "/clarioo.png",
    description:
      "Personalized career acceleration platform featuring dynamic adaptive roadmaps and AI-proctored real-time voice mock evaluations.",
    tech: ["Next.js", "Vapi AI", "Supabase", "Tailwind"],
  },
  {
    id: "looma",
    number: "03",
    title: "LOOMA",
    phase: "PHASE 03",
    badge: "COLLAB CANVAS",
    accentClass: "bg-[#123826] text-[#c5eb35]",
    accentHex: "#123826",
    metric: "<20MS SYNC LATENCY",
    tagline: "REALTIME GENERATIVE IDE",
    imageUrl: "/looma.png",
    description:
      "Infinite collaborative canvas enabling engineering teams to sketch architectures and instantly generate live deployable cloud apps.",
    tech: ["Vercel AI", "Firecrawl", "Liveblocks", "WebSockets"],
  },
];

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className = "", onVideoClick }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Projects & Curtain Lift elements
    const stageContainerRef = useRef<HTMLDivElement>(null);
    const projectsPanelRef = useRef<HTMLDivElement>(null);
    const stageBgRef = useRef<HTMLDivElement>(null);
    const projectsTitleRef = useRef<HTMLHeadingElement>(null);
    const projectsSubtitleRef = useRef<HTMLParagraphElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    // Footer underlying element
    const footerRef = useRef<HTMLDivElement>(null);

    // Combine forwarded ref and internal ref
    const setRefs = (node: HTMLDivElement | null) => {
      sectionRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Ensure video always plays muted and in a loop
    useEffect(() => {
      const vid = videoRef.current;
      if (vid) {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    }, []);

    // 1. GSAP animation: About Me text highlights line by line
    useGSAP(
      () => {
        if (!sectionRef.current) return;

        const lines = gsap.utils.toArray<HTMLElement>(
          ".overlay-headline-line",
          sectionRef.current,
        );

        // Initial state: dim/translucent text and subtle offsets
        gsap.set(lines, {
          color: "rgba(255, 255, 255, 0.22)",
          opacity: 0.35,
          y: 8,
        });
        gsap.set(".overlay-kicker", { autoAlpha: 0, y: 10 });
        gsap.set(".overlay-subtext", { autoAlpha: 0, y: 16 });
        gsap.set(".overlay-video-capsule-wrapper", {
          autoAlpha: 0,
          scale: 0.95,
          y: 20,
        });

        const textTl = gsap.timeline({ paused: true });

        textTl.to(".overlay-kicker", {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        });

        textTl.to(
          lines,
          {
            color: "#ffffff",
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.28,
            ease: "power2.out",
          },
          "-=0.15",
        );

        textTl.to(
          ".overlay-subtext",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.25",
        );

        textTl.to(
          ".overlay-video-capsule-wrapper",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );

        let hasPlayed = false;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            if (!hasPlayed) {
              hasPlayed = true;
              textTl.play();
            }
          },
          onLeaveBack: () => {
            hasPlayed = false;
            textTl.reverse();
          },
        });

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasPlayed) {
                hasPlayed = true;
                textTl.play();
              }
            });
          },
          { threshold: 0.2 },
        );

        observer.observe(sectionRef.current);

        return () => {
          observer.disconnect();
        };
      },
      { scope: sectionRef },
    );

    // 2. GSAP animation: Premium World-Class 3D FlipCards Scroll Transition
    useGSAP(
      () => {
        if (
          !stageContainerRef.current ||
          !projectsPanelRef.current ||
          !stageBgRef.current
        )
          return;

        const stage = stageContainerRef.current;
        const panel = projectsPanelRef.current;
        const bg = stageBgRef.current;
        const title = projectsTitleRef.current;
        const subtitle = projectsSubtitleRef.current;

        // Set initial GPU states
        gsap.set(bg, { backgroundColor: "#123826" });
        gsap.set(title, { color: "#ffffff", y: -10, opacity: 0.9 });
        gsap.set(subtitle, { color: "rgba(255, 255, 255, 0.7)", opacity: 0.8 });
        gsap.set(panel, { yPercent: 0 });

        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          const innerCard = stage.querySelector(`${cardId} .flip-card-inner`);
          gsap.set(cardId, {
            opacity: 0,
            yPercent: -130,
            scale: 0.35,
            xPercent: index === 0 ? 80 : index === 1 ? 0 : -80,
            rotationZ: index === 0 ? -8 : index === 1 ? 0 : 8,
            transformPerspective: 1400,
            willChange: "transform, opacity",
          });
          if (innerCard) {
            gsap.set(innerCard, {
              rotationY: 0,
              transformStyle: "preserve-3d",
              willChange: "transform",
            });
          }
        });

        // Master scrubbed pinned timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=3600",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: Fluid ambient color transition
        masterTl.to(
          bg,
          {
            backgroundColor: "#eaeae8",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "colorShift",
        );

        masterTl.to(
          title,
          {
            color: "#141b16",
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "colorShift",
        );

        masterTl.to(
          subtitle,
          {
            color: "#4a534c",
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "colorShift",
        );

        // Stage 2: Staggered 3D spatial drop & deceleration
        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          masterTl.to(
            cardId,
            {
              opacity: 1,
              yPercent: 0,
              scale: 0.88,
              duration: 1.4,
              ease: "power2.out",
            },
            `colorShift+=${0.25 + index * 0.16}`,
          );
        });

        // Stage 3: Smooth spatial fan-out to 3-column formation
        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          masterTl.to(
            cardId,
            {
              xPercent: 0,
              rotationZ: 0,
              scale: 1,
              duration: 1.2,
              ease: "power2.inOut",
            },
            `fanOut+=${index * 0.12}`,
          );
        });

        // Stage 4: Cascading Luxurious 3D 180° Flip Reveal
        featuredFlipProjects.forEach((_, index) => {
          const innerCard = stage.querySelector(
            `#flip-card-${index} .flip-card-inner`,
          );
          if (innerCard) {
            masterTl.to(
              innerCard,
              {
                rotationY: 180,
                duration: 1.6,
                ease: "power2.inOut",
              },
              `flipPhase+=${index * 0.26}`,
            );
          }
        });

        // Stage 5: Premium interaction hold
        masterTl.to({}, { duration: 0.8 });

        // Stage 6: Velvet Curtain Lift Reveal
        masterTl.to(
          panel,
          {
            yPercent: -100,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "curtainLift",
        );

        ScrollTrigger.refresh();
      },
      { scope: sectionRef },
    );

    // Responsive 3D Mouse Perspective with Smooth Spring Dampening
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
      const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 7;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1200,
        ease: "power2.out",
        duration: 0.35,
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.7,
        overwrite: "auto",
      });
    };

    return (
      <section
        ref={setRefs}
        aria-label="Overlay Section — About, Projects & Footer"
        className={`relative w-full bg-[#123826] text-white select-none ${className}`}
      >
        {/* ==================================================================== */}
        {/* STAGE 1: ABOUT ME & VIDEO CAPSULE                                    */}
        {/* ==================================================================== */}
        <div
          id="about-section"
          className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 overflow-hidden bg-[#123826] rounded-t-none z-20"
        >
          {/* Subtle radial emerald background ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 45% at 50% 25%, rgba(34, 110, 72, 0.35) 0%, rgba(18, 56, 38, 0) 100%)",
            }}
          />

          {/* Film grain noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none mix-blend-overlay" />

          {/* Top/Center: About Me Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-2 sm:pt-6">
            {/* Top Category Badge */}
            <div className="overlay-kicker flex items-center gap-2 px-8 py-1.5 rounded-full bg-white/25 border border-white/10 backdrop-blur-sm mb-5 sm:mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-sans text-sm tracking-wide">ABOUT ME</span>
            </div>

            {/* Center Bold Big About Me */}
            <h1 className="font-sans font-normal tracking-tight text-2xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.6rem] leading-[1.12] sm:leading-[1.16] text-center max-w-5xl mx-auto flex flex-col items-center">
              <span className="overlay-headline-line block transition-colors duration-300">
                I am ROX, an experienced
              </span>

              <span className="overlay-headline-line block transition-colors duration-300">
                <span className="font-serif italic font-normal text-inherit tracking-normal px-1">
                  Full-Stack AI Engineer
                </span>{" "}
                who
              </span>

              <span className="overlay-headline-line block transition-colors duration-300">
                architects intelligent systems,
              </span>

              <span className="overlay-headline-line block transition-colors duration-300">
                builds at scale, ships relentlessly,
              </span>

              <span className="overlay-headline-line block transition-colors duration-300">
                breaks boundaries, and builds again.
              </span>
            </h1>

            {/* Subtext below it */}
            <p className="overlay-subtext font-sans text-xs sm:text-sm md:text-[15px] lg:text-base text-neutral-300 font-normal max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mt-6 sm:mt-12 px-4">
              I work across AI/ML, LLMs, RAG, multi-agent systems, MCP,
              distributed architectures, cloud infrastructure, and full-stack
              engineering — turning ambitious ideas into production-grade
              systems built to scale.
            </p>
          </div>

          {/* Bottom: Wide Video Capsule */}
          <div className="relative z-10 w-full flex flex-col items-center mt-auto pt-14 sm:pt-18 md:pt-22 pb-2 sm:pb-4">
            <div className="overlay-video-capsule-wrapper w-full flex justify-center px-2 sm:px-4">
              <button
                type="button"
                onClick={onVideoClick}
                aria-label="Know more about me reel"
                className="group relative cursor-pointer block rounded-full p-[2px] hover:from-white/60 hover:via-white/30 hover:to-white/60 transition-all duration-500 w-full max-w-[720px] sm:max-w-[880px] md:max-w-[1020px] lg:max-w-[900px]"
              >
                <div className="relative w-full h-[105px] sm:h-[135px] md:h-[200px] lg:h-[245px] rounded-full overflow-hidden flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] group-hover:scale-106 transition-transform duration-700 ease-out"
                  >
                    <source
                      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_202655_a7f5aca0-2f80-4bc9-bcb5-96ac95662003.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-center gap-3 px-6 pointer-events-none select-none">
                    <span className="font-serif font-semibold text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.10em] sm:tracking-[0.16em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-102">
                      Know more about me
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 2 & 3 PINNED CONTAINER: PREMIUM 3D FLIPCARDS STAGE             */}
        {/* ==================================================================== */}
        <div
          ref={stageContainerRef}
          id="works-stage"
          className="relative w-full h-screen overflow-hidden select-none z-20"
        >
          {/* Layer 0 (Underneath): Footer Section */}
          <Footer ref={footerRef} />

          {/* Layer 1 (On Top): Projects Panel — Slides UPWARD on scroll! */}
          <div
            ref={projectsPanelRef}
            className="absolute inset-0 w-full h-full z-20 overflow-hidden rounded-b-xl sm:rounded-b-2xl will-change-transform flex flex-col justify-between"
          >
            {/* Stage Background: transitions from #123826 to #eaeae8 */}
            <div
              ref={stageBgRef}
              className="absolute inset-0 w-full h-full will-change-[background-color]"
              style={{ backgroundColor: "#123826" }}
            />

            {/* Tactile dot matrix background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: "radial-gradient(#141b16 1.2px, transparent 1.2px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Film grain noise overlay */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

            {/* Header: Centered "Projects" & Subtitle */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center pt-8 sm:pt-11 px-4 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/8 text-[11px] font-mono font-semibold text-[#141b16] uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-[#c5eb35]" />
                <span>Featured Architecture Showcase</span>
              </div>

              <h2
                ref={projectsTitleRef}
                className="font-sans font-medium tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-none will-change-[color]"
              >
                Projects
              </h2>
              <p
                ref={projectsSubtitleRef}
                className="font-sans text-xs sm:text-sm md:text-base font-normal tracking-tight mt-1.5 will-change-[color] text-neutral-600"
              >
                Top Loved Works • Scroll down to flip & inspect system architecture
              </p>
            </div>

            {/* Tweenlabs 3D Spatial FlipCards Container */}
            <div
              ref={cardsContainerRef}
              className="relative z-20 w-full max-w-6xl mx-auto flex-1 flex items-center justify-center px-4 sm:px-6 py-2"
            >
              <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
                {featuredFlipProjects.map((stage, index) => (
                  <div
                    key={stage.id}
                    id={`flip-card-${index}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="card w-[240px] sm:w-[270px] md:w-[305px] lg:w-[335px] aspect-[5/7] max-h-[465px] flex-1 relative transform-gpu cursor-pointer group"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)",
                    }}
                  >
                    <div className="card-wrapper w-full h-full transform-gpu">
                      <div
                        className="flip-card-inner w-full h-full relative"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* ================= FRONT SIDE FACE ================= */}
                        <div
                          className="flip-card-front absolute inset-0 border border-black/12 shadow-[0_20px_50px_rgba(20,27,22,0.12)] p-4 sm:p-5 bg-white text-[#141b16] rounded-3xl flex flex-col justify-between select-none backface-hidden"
                          style={{
                            boxShadow: "0 20px 48px -12px rgba(20,27,22,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
                          }}
                        >
                          {/* Top Header Badge Row */}
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-wider">
                              [{stage.phase}]
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 border border-[#141b16]/15 px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase shadow-xs ${stage.accentClass}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              {stage.badge}
                            </span>
                          </div>

                          {/* Media Preview Frame with specular shadow */}
                          <div className="inner-img-frame w-full h-[145px] sm:h-[165px] md:h-[185px] border border-black/10 relative overflow-hidden rounded-2xl bg-neutral-100 my-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                            <img
                              src={stage.imageUrl}
                              alt={stage.title}
                              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            {/* Subtle glossy sheen */}
                            <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                          </div>

                          {/* Bottom Card Title & Subtitle */}
                          <div className="flex flex-col gap-1 border-t border-neutral-100 pt-2.5">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-sans font-bold text-base sm:text-lg tracking-tight text-[#141b16]">
                                {stage.title}
                              </h3>
                              <span className="font-mono text-xs text-neutral-400 font-bold">
                                0{index + 1}/03
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-neutral-500">
                              <span>{stage.tagline}</span>
                              <span className="text-neutral-400 font-sans text-[10px] flex items-center gap-1">
                                <span>FLIP ↻</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ================= BACK SIDE FACE (SCROLL-REVEALED) ================= */}
                        <div
                          className="flip-card-back absolute inset-0 border border-black/12 shadow-[0_20px_50px_rgba(20,27,22,0.12)] p-4 sm:p-5 bg-white text-[#141b16] rounded-3xl flex flex-col justify-between select-none backface-hidden [transform:rotateY(180deg)]"
                          style={{
                            boxShadow: "0 20px 48px -12px rgba(20,27,22,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
                          }}
                        >
                          {/* Back Header */}
                          <div className="w-full flex justify-between font-mono font-bold text-[10px] sm:text-[11px] uppercase border-b border-neutral-200 pb-2.5 items-center">
                            <span className="text-neutral-500 flex items-center gap-1.5">
                              <Terminal className="w-3 h-3 text-[#141b16]" />
                              0{index + 1} // SPECS & ARCH
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              LIVE PROD
                            </span>
                          </div>

                          {/* Architecture Metrics Chip */}
                          <div className="my-1 px-3 py-1.5 rounded-xl bg-neutral-50 border border-black/6 flex items-center justify-between">
                            <span className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider">
                              SYSTEM METRIC
                            </span>
                            <span className="font-mono font-bold text-[9px] sm:text-[10px] text-[#141b16]">
                              {stage.metric}
                            </span>
                          </div>

                          {/* Description */}
                          <div className="flex-1 flex flex-col justify-center py-1">
                            <p className="text-[11px] sm:text-[12px] font-sans text-neutral-700 leading-relaxed font-normal">
                              {stage.description}
                            </p>
                            
                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {stage.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-0.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/8 text-[9px] sm:text-[10px] font-mono text-neutral-800 font-semibold transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Back Action Row */}
                          <div className="flex justify-between items-center border-t border-neutral-200 pt-2.5 font-mono text-[10px]">
                            <span className="text-neutral-400">ENGINEERED BY ROX</span>
                            <Link
                              href="/work"
                              className="flex items-center gap-1.5 bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-bold px-3 py-1 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all text-xs"
                            >
                              <span>Case Study</span>
                              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom "Explore All Works" Navigation Bar */}
            <div className="relative z-20 pb-8 flex justify-center">
              <Link
                href="/work"
                className="group px-7 py-3 rounded-full bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(197,235,53,0.35)] hover:shadow-[0_8px_28px_rgba(197,235,53,0.5)] hover:scale-105 active:scale-95 border border-[#c5eb35]/30"
              >
                <span>Explore All Production Case Studies</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Overlay.displayName = "Overlay";

export default Overlay;
