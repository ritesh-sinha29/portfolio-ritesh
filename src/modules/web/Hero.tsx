"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Download } from "lucide-react";
import { SpinningText } from "@/components/ui/spinning-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bottomArrowRef = useRef<HTMLDivElement>(null);
  const bottomSocialsRef = useRef<HTMLDivElement>(null);

  // Set initial states for clean GSAP entrance
  useGSAP(
    () => {
      const safeSet = (
        targets: (Element | null | undefined)[] | Element | null | undefined,
        vars: gsap.TweenVars,
      ) => {
        const valid = Array.isArray(targets)
          ? targets.filter((el): el is Element => Boolean(el))
          : targets
            ? [targets]
            : [];
        if (valid.length > 0) {
          gsap.set(valid, vars);
        }
      };

      safeSet([title1Ref.current, title2Ref.current], { autoAlpha: 0, y: 55 });
      safeSet(taglineRef.current, { autoAlpha: 0, y: 30 });
      safeSet(imageRef.current, { autoAlpha: 0, y: 110, scale: 0.95 });
      safeSet(
        [
          bottomArrowRef.current,
          bottomSocialsRef.current,
        ],
        {
          autoAlpha: 0,
          scale: 0.85,
        },
      );
    },
    { scope: containerRef },
  );

  // Trigger smooth entrance animation as soon as the loading screen finishes
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // 1. Large Serif Italic Titles rise into place slowly
    const titles = [title1Ref.current, title2Ref.current].filter(
      (el): el is HTMLHeadingElement => Boolean(el),
    );
    if (titles.length > 0) {
      tl.to(
        titles,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          stagger: 0.18,
          ease: "power3.out",
        },
        0.1,
      );
    }

    // 3. User image rises into place from bottom with smooth fade
    if (imageRef.current) {
      tl.to(
        imageRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0.15,
      );
    }

    // 4. Tagline & buttons fade in
    if (taglineRef.current) {
      tl.to(
        taglineRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        0.35,
      );
    }

    // 5. Left circular arrow and right socials appear
    const bottomControls = [
      bottomArrowRef.current,
      bottomSocialsRef.current,
    ].filter((el): el is HTMLDivElement => Boolean(el));

    if (bottomControls.length > 0) {
      tl.to(
        bottomControls,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        0.5,
      );
    }
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-background text-foreground overflow-hidden flex flex-col justify-between p-4 sm:px-6 sm:py-6 select-none"
    >
      {/* Top Spacer for Fixed Header */}
      <div className="w-full h-12 sm:h-14" />

      {/* Main Center Stage */}
      <div className="relative w-full flex-1 max-w-7xl mx-auto z-20 pointer-events-none">
        {/* Top Headline: AI ENGINEER (Positioned cleanly below the mobile floating nav pill) */}
        <h1
          ref={title1Ref}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[92px] xl:text-[108px] font-serif tracking-tight sm:tracking-wider italic font-light absolute top-14 sm:top-8 md:top-12 lg:top-14 left-1/2 sm:left-[48%] md:left-[50%] lg:left-[52%] -translate-x-1/2 will-change-transform whitespace-nowrap select-none text-center sm:text-left text-foreground"
        >
          AI ENGINEER
        </h1>

        {/* Flanking Text Block: & BUILDER + Bio + CTAs (Flanks right side of silhouette) */}
        <div
          ref={taglineRef}
          className="absolute top-[28%] sm:top-[28%] md:top-[33%] lg:top-[35%] right-3 sm:right-auto sm:left-[46%] md:left-[48%] lg:left-[50%] w-[42%] sm:w-auto max-w-[180px] sm:max-w-md lg:max-w-lg will-change-transform pointer-events-auto z-20"
        >
          <h2
            ref={title2Ref}
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-sans leading-none sm:leading-tight tracking-tight font-extrabold sm:font-semibold text-foreground"
          >
            &amp; BUILDER
          </h2>
          <p className="mt-2 sm:mt-5 md:mt-6 max-w-md lg:max-w-lg">
            <span className="text-[11px] sm:text-base md:text-lg tracking-tight leading-snug sm:leading-relaxed font-sans font-medium text-muted-foreground line-clamp-3 sm:line-clamp-none">
              Architecting intelligent distributed systems, high-performance web applications, and real-time AI agents.
            </span>
          </p>

          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-[0_6px_24px_rgba(0,0,0,0.06)] gap-1 mt-3.5 sm:mt-6 max-w-full">
            <MagneticButton
              magneticStrength={0.45}
              scaleOnHover={1.06}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold text-foreground hover:bg-muted flex items-center justify-center gap-2 transition-colors duration-150"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
              <span>Download CV</span>
            </MagneticButton>

            <MagneticButton
              href="/work"
              magneticStrength={0.45}
              scaleOnHover={1.06}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold bg-white hover:bg-neutral-50 text-primary border border-border shadow-xs flex items-center justify-center gap-2 transition-colors duration-150"
            >
              <span>Explore Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary stroke-[2.5]" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* User Image: Grounded at bottom, enlarged and centered on left quadrant without clipping */}
      <div
        ref={imageRef}
        className="absolute bottom-0 left-[-6vw] sm:left-[22%] md:left-[24%] xl:left-[25%] sm:-translate-x-1/2 z-10 w-[88vw] sm:w-[90vw] max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] h-[72vh] sm:h-[80vh] md:h-[84vh] lg:h-[88vh] xl:h-[92vh] flex items-end justify-center pointer-events-none will-change-transform"
      >
        <div className="relative w-full h-full">
          <Image
            src="/1.svg"
            alt="Ritesh Sinha"
            fill
            priority
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 640px"
            className="object-contain object-bottom select-none"
          />
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto flex justify-between items-center mt-2 sm:mt-4">
        {/* Bottom Left: Spinning Text Scroll Indicator */}
        <div ref={bottomArrowRef}>
          <MagneticButton
            onClick={() => {
              const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void } }).lenis;
              if (lenis) {
                lenis.scrollTo(window.innerHeight, { duration: 1.2 });
              } else {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }
            }}
            className="relative flex items-center justify-center select-none group w-14 h-14 sm:w-16 sm:h-16 rounded-full"
            ariaLabel="Scroll down"
          >
            <SpinningText
              radius={4.2}
              duration={12}
              className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-foreground opacity-80 group-hover:opacity-100 transition-opacity"
            >
              • SCROLL DOWN • DISCOVER MORE
            </SpinningText>
            <div className="w-2 h-2 rounded-full bg-foreground/40 group-hover:bg-foreground group-hover:scale-125 transition-all duration-300" />
          </MagneticButton>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Right: Clean Floating Social Icons (GitHub, LinkedIn, X) */}
        <div
          ref={bottomSocialsRef}
          className="flex items-center gap-3.5 sm:gap-4.5 text-[#141b16]"
        >
          {/* GitHub */}
          <MagneticButton
            href="https://github.com/ritesh-sinha29"
            target="_blank"
            rel="noreferrer"
            ariaLabel="GitHub"
            magneticStrength={0.4}
            scaleOnHover={1.15}
            className="text-[#141b16] hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </MagneticButton>

          {/* LinkedIn */}
          <MagneticButton
            href="https://www.linkedin.com/in/ritesh-sinha-rk/"
            target="_blank"
            rel="noreferrer"
            ariaLabel="LinkedIn"
            magneticStrength={0.4}
            scaleOnHover={1.15}
            className="text-[#141b16] hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74V9.97H5.06v8.53h2.8z" />
            </svg>
          </MagneticButton>

          {/* X / Twitter */}
          <MagneticButton
            href="https://x.com/ritesh_sinha29"
            target="_blank"
            rel="noreferrer"
            ariaLabel="X"
            magneticStrength={0.4}
            scaleOnHover={1.15}
            className="text-[#141b16] hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </section>
  );
}
