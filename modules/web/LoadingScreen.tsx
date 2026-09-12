"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live real clock for authentic studio feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // Initial state
      gsap.set(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 120, opacity: 0 }
      );
      gsap.set([topMetaRef.current, bottomMetaRef.current], { opacity: 0 });

      // 1. Fade in meta headers & reveal editorial title
      tl.to([topMetaRef.current, bottomMetaRef.current], {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          [titleLine1Ref.current, titleLine2Ref.current],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // 2. High-precision counter animation
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: 100,
          duration: 2.2,
          ease: "power3.inOut",
          onUpdate: () => {
            const current = Math.floor(counter.val);
            if (numberRef.current) {
              numberRef.current.textContent =
                current < 10 ? `00${current}` : current < 100 ? `0${current}` : "100";
            }
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${counter.val / 100})`;
            }
          },
        },
        "-=0.5"
      );

      // 3. Subtle editorial exit of typography
      tl.to([titleLine1Ref.current, titleLine2Ref.current], {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.in",
      })
        .to(
          [topMetaRef.current, bottomMetaRef.current],
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.3"
        )
        // 4. Cinematic Dual-Shutter Curtain Split
        .to(
          shutterTopRef.current,
          {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "-=0.1"
        )
        .to(
          shutterBottomRef.current,
          {
            yPercent: 100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading Experience"
      className="fixed inset-0 z-50 w-full h-screen pointer-events-none select-none overflow-hidden"
    >
      {/* Top Shutter Half */}
      <div
        ref={shutterTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#121413] border-b border-white/[0.06] will-change-transform z-10"
      />

      {/* Bottom Shutter Half */}
      <div
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#121413] border-t border-white/[0.06] will-change-transform z-10"
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 text-[#edece8]">
        {/* Top Meta Details */}
        <header
          ref={topMetaRef}
          className="w-full flex justify-between items-center text-[11px] sm:text-xs font-mono tracking-widest uppercase text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5eb35]" />
            <span className="font-semibold text-neutral-200">RITESH SINHA</span>
            <span className="text-neutral-600 hidden sm:inline">—</span>
            <span className="hidden sm:inline text-neutral-400">PORTFOLIO</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">{localTime || "00:00:00"}</span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">INDEX [ '26 ]</span>
          </div>
        </header>

        {/* Centerpiece: Clean Editorial Monogram / Statement */}
        <main className="my-auto flex flex-col items-center justify-center text-center px-4">
          <div className="overflow-hidden pb-1">
            <h1
              ref={titleLine1Ref}
              className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none"
            >
              Creative Engineering
            </h1>
          </div>

          <div className="overflow-hidden pt-2">
            <h2
              ref={titleLine2Ref}
              className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#c5eb35] opacity-90"
            >
              &amp; Digital Architecture
            </h2>
          </div>
        </main>

        {/* Bottom Bar: Swiss Minimal Precision Counter & Progress Line */}
        <footer ref={bottomMetaRef} className="w-full flex flex-col gap-4">
          {/* Subtle Hairline Progress Indicator */}
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div
              ref={progressLineRef}
              className="absolute left-0 top-0 h-full w-full bg-[#c5eb35] origin-left will-change-transform scale-x-0 transition-transform duration-75"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-neutral-400 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] sm:text-[11px]">
                LOADING SELECTED WORKS
              </span>
            </div>

            {/* Precision 3-digit Counter */}
            <div className="flex items-baseline gap-1">
              <span
                ref={numberRef}
                className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter"
              >
                000
              </span>
              <span className="text-xs text-[#c5eb35] font-bold">%</span>
            </div>
          </div>
        </footer>
      </div>
    </aside>
  );
}
