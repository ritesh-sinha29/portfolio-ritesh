"use client";

import Link from "next/link";
import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Footer from "./Footer";
import { SmoothVideo } from "@/components/media/SmoothVideo";
import { InstantImage } from "@/components/media/InstantImage";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
  imageUrl: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
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
    accentClass: "bg-[#F5C86C] text-[#141b16]",
    accentHex: "#F5C86C",
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
    accentClass: "bg-[#123826] text-[#c5eb35]",
    accentHex: "#123826",
    imageUrl: "/looma.webp",
    description:
      "Real-time collaborative canvas enabling teams to sketch, design, and instantly generate live deployable web applications.",
    tech: ["Vercel AI", "Firecrawl", "Liveblocks"],
    liveUrl: "https://looma.vercel.app",
    githubUrl: "https://github.com/ritesh-sinha29/looma",
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

    // Ensure video plays muted, loops smoothly, and plays only when in view to save resources
    useEffect(() => {
      const vid = videoRef.current;
      if (!vid) return;

      vid.muted = true;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          });
        },
        { rootMargin: "200px" }
      );

      observer.observe(vid);
      return () => observer.disconnect();
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

    // 2. GSAP animation: Butter-Smooth Tweenlabs FlipCards transition in Projects Stage + Curtain Lift
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

        // Set initial states with full contrast dark text
        gsap.set(bg, { backgroundColor: "#eaeae8" });
        gsap.set(title, { color: "#141b16" });
        gsap.set(subtitle, { color: "#5a625b" });
        gsap.set(panel, { yPercent: 0 });

        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          const innerCard = stage.querySelector(`${cardId} .flip-card-inner`);
          gsap.set(cardId, {
            opacity: 0,
            yPercent: -120,
            scale: 0.35,
            xPercent: index === 0 ? 70 : index === 1 ? 0 : -70,
            rotationZ: index === 0 ? -6 : index === 1 ? 0 : 6,
            transformPerspective: 1200,
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

        // Master pinned scrubbed timeline with smooth momentum
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=3200",
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 2: Smooth card drop-in & scaling
        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          masterTl.to(
            cardId,
            {
              opacity: 1,
              yPercent: 0,
              scale: 0.85,
              duration: 1.3,
              ease: "power2.out",
            },
            `start+=${0.2 + index * 0.15}`,
          );
        });

        // Phase 3: Fan out cards to full width
        featuredFlipProjects.forEach((_, index) => {
          const cardId = `#flip-card-${index}`;
          masterTl.to(
            cardId,
            {
              xPercent: 0,
              rotationZ: 0,
              scale: 1,
              duration: 1.1,
              ease: "power2.inOut",
            },
            `fan+=${index * 0.1}`,
          );
        });

        // Phase 4: Cascading 3D 180° Flip reveal
        featuredFlipProjects.forEach((_, index) => {
          const innerCard = stage.querySelector(
            `#flip-card-${index} .flip-card-inner`,
          );
          if (innerCard) {
            masterTl.to(
              innerCard,
              {
                rotationY: 180,
                duration: 1.4,
                ease: "power2.inOut",
              },
              `flip+=${index * 0.22}`,
            );
          }
        });

        // Phase 5: Smooth reading hold
        masterTl.to({}, { duration: 0.7 });

        // Phase 6: Smooth curtain lift reveal of footer
        masterTl.to(
          panel,
          {
            yPercent: -100,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "curtain",
        );

        ScrollTrigger.refresh();
      },
      { scope: sectionRef },
    );

    // Smooth Mouse tilt on cards when pointer hovers
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        duration: 0.4,
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.6,
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
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-14 sm:pt-16 md:pt-18">
            {/* Top Category Badge */}
            <div className="overlay-kicker flex items-center gap-2 px-8 py-1.5 rounded-full bg-white/25 border border-white/10 backdrop-blur-sm mb-5 sm:mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Center Bold Big About Me */}
            <h1 className="font-sans font-normal tracking-tight text-xl xs:text-2xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.6rem] leading-[1.18] sm:leading-[1.16] text-center max-w-5xl mx-auto flex flex-col items-center px-1">
              <span className="overlay-headline-line block transition-colors duration-300">
                I am Ritesh Sinha, an experienced
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
            <p className="overlay-subtext font-sans text-xs xs:text-[13px] sm:text-sm md:text-[15px] lg:text-base text-neutral-300 font-normal max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-12 px-2 sm:px-4">
              I work across AI/ML, LLMs, RAG, multi-agent systems, MCP,
              distributed architectures, cloud infrastructure, and full-stack
              engineering — turning ambitious ideas into production-grade
              systems built to scale.
            </p>
          </div>

          {/* Bottom: Wide Video Capsule */}
          <div className="relative z-10 w-full flex flex-col items-center mt-auto pt-8 sm:pt-18 md:pt-22 pb-2 sm:pb-4">
            <div className="overlay-video-capsule-wrapper w-full flex justify-center px-2 sm:px-4">
              <button
                type="button"
                onClick={onVideoClick}
                aria-label="Know more about me reel"
                className="group relative cursor-pointer block rounded-full p-[2px] hover:from-white/60 hover:via-white/30 hover:to-white/60 transition-all duration-500 w-full max-w-[720px] sm:max-w-[880px] md:max-w-[1020px] lg:max-w-[900px]"
              >
                <div className="relative w-full h-[70px] xs:h-[90px] sm:h-[135px] md:h-[200px] lg:h-[245px] rounded-full overflow-hidden flex items-center justify-center bg-[#141b16]">
                  <SmoothVideo
                    ref={videoRef}
                    webmSrc="/about me.webm"
                    mp4Src="/about me.mp4"
                    fallbackSrc="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_202655_a7f5aca0-2f80-4bc9-bcb5-96ac95662003.mp4"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] group-hover:scale-106 transition-transform duration-700 ease-out"
                    containerClassName="absolute inset-0 w-full h-full overflow-hidden"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 pointer-events-none select-none">
                    <span className="font-serif font-semibold text-white text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.10em] sm:tracking-[0.16em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-102">
                      Know more about me
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* STAGE 2 & 3 PINNED CONTAINER: TWEENLABS FLIPCARDS + CURTAIN LIFT     */}
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
            {/* Stage Background: #eaeae8 canvas */}
            <div
              ref={stageBgRef}
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: "#eaeae8" }}
            />

            {/* Tactile dot matrix background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(#141b16 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Film grain noise overlay */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

            {/* Header: Centered "Projects" & "Top Loved Works" */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center pt-14 xs:pt-16 sm:pt-20 md:pt-20 pb-1 sm:pb-2 px-4 text-center shrink-0">
              <h2
                ref={projectsTitleRef}
                className="font-sans font-extrabold tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight text-[#141b16]"
              >
                Projects
              </h2>
              <p
                ref={projectsSubtitleRef}
                className="font-sans text-[11px] sm:text-sm font-medium tracking-tight mt-0.5 sm:mt-1 text-[#5a625b]"
              >
                Top Loved Works • Scroll to Flip &amp; Explore
              </p>
            </div>

            {/* Tweenlabs FlipCards 3D Showcase Container */}
            <div
              ref={cardsContainerRef}
              className="relative z-20 w-full max-w-5xl mx-auto flex-1 flex items-center justify-center px-2 sm:px-6 py-1 sm:py-2 min-h-0"
            >
              <div className="w-full flex flex-nowrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 pointer-events-auto">
                {featuredFlipProjects.map((stage, index) => (
                  <div
                    key={stage.id}
                    id={`flip-card-${index}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="card w-[108px] xs:w-[124px] sm:w-[260px] md:w-[280px] lg:w-[295px] h-[260px] xs:h-[295px] sm:h-[385px] md:h-[405px] max-h-[75vh] sm:max-h-[80vh] flex-1 relative transform-gpu"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                    }}
                  >
                    <div className="card-wrapper w-full h-full transform-gpu">
                      <div
                        className="flip-card-inner w-full h-full relative"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front Side Face */}
                        <div
                          className="flip-card-front absolute inset-0 border-[1.5px] sm:border-[2.5px] border-[#141b16] shadow-[2px_2px_0px_#141b16] sm:shadow-[4px_4px_0px_#141b16] p-2 xs:p-2.5 sm:p-4 bg-white text-[#141b16] rounded-xl sm:rounded-2xl flex flex-col justify-between cursor-pointer select-none"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[8px] sm:text-[10px] font-bold text-neutral-400">
                              [{stage.phase}]
                            </span>
                            <span
                              className={`inline-block border border-[#141b16] px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold uppercase ${stage.accentClass}`}
                            >
                              {stage.badge}
                            </span>
                          </div>

                          <div className="inner-img-frame w-full h-[85px] xs:h-[105px] sm:h-[135px] md:h-[150px] border sm:border-2 border-[#141b16] relative overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 my-1 sm:my-1.5 shadow-[1px_1px_0px_#141b16] sm:shadow-[2px_2px_0px_#141b16]">
                            <InstantImage
                              src={stage.imageUrl}
                              alt={stage.title}
                              fill
                              className="object-cover object-top"
                              containerClassName="absolute inset-0 w-full h-full"
                            />
                          </div>

                          <div className="flex justify-between items-center border-t border-neutral-200 pt-1.5 sm:pt-2">
                            <h3 className="font-sans font-bold text-[10px] xs:text-xs sm:text-sm text-[#141b16] truncate">
                              {stage.title}
                            </h3>
                            <span className="font-mono text-[9px] sm:text-[11px] text-neutral-400 font-bold ml-1">
                              0{index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Back Side Face (Scroll-revealed) */}
                        <div
                          className="flip-card-back absolute inset-0 border-[1.5px] sm:border-[2.5px] border-[#141b16] shadow-[2px_2px_0px_#141b16] sm:shadow-[4px_4px_0px_#141b16] p-2 xs:p-2.5 sm:p-4 bg-white text-[#141b16] rounded-xl sm:rounded-2xl flex flex-col justify-between cursor-pointer select-none"
                          style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          <div className="w-full flex justify-between font-mono font-bold text-[8px] sm:text-[10px] uppercase border-b border-neutral-200 pb-1 sm:pb-1.5 items-center">
                            <span className="text-[#141b16] font-bold tracking-tight truncate">
                              0{index + 1} // {stage.title}
                            </span>
                            <span
                              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full border border-black shrink-0 ${stage.accentClass}`}
                            />
                          </div>

                          <div className="inner-img-frame w-full h-[65px] xs:h-[80px] sm:h-[110px] md:h-[120px] border sm:border-2 border-[#141b16] relative overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 my-0.5 sm:my-1 shadow-[1px_1px_0px_#141b16] sm:shadow-[2px_2px_0px_#141b16]">
                            <InstantImage
                              src={stage.imageUrl}
                              alt={stage.title}
                              fill
                              className="object-cover object-top"
                              containerClassName="absolute inset-0 w-full h-full"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-center py-0.5 sm:py-1">
                            <p className="text-[8px] xs:text-[9.5px] sm:text-[11.5px] font-sans text-neutral-700 leading-tight sm:leading-snug line-clamp-2 sm:line-clamp-3">
                              {stage.description}
                            </p>
                            <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                              {stage.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-1 sm:px-1.5 py-0.5 rounded bg-neutral-100 border border-black/10 text-[7px] xs:text-[8px] sm:text-[8.5px] font-mono text-neutral-800 font-semibold"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-neutral-200 pt-1.5 sm:pt-2 gap-1">
                            {/* Live Link Button */}
                            <MagneticButton
                              href={stage.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-bold text-[8px] xs:text-[9px] sm:text-[11px] shadow-xs"
                              title={`Visit ${stage.title} Live`}
                            >
                              <span>Check Live Website</span>
                              <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                            </MagneticButton>

                            {/* GitHub Button */}
                            <MagneticButton
                              href={stage.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#141b16] font-sans font-bold text-[8px] xs:text-[9px] sm:text-[11px] border border-black/10 shadow-xs"
                              title={`View ${stage.title} on GitHub`}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom "Explore All Works" Navigation Bar */}
            <div className="relative z-20 pb-5 sm:pb-6 md:pb-7 pt-1 flex justify-center shrink-0">
              <MagneticButton
                href="/work"
                className="group px-6 py-2.5 rounded-full bg-[#c5eb35] hover:bg-[#b4db26] text-[#141b16] font-sans font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(197,235,53,0.3)] hover:shadow-[0_6px_22px_rgba(197,235,53,0.45)] border border-[#c5eb35]/40"
              >
                <span>View All 6+ Production Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Overlay.displayName = "Overlay";

export default Overlay;
