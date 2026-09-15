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
  const centerContentRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const fullText = "Hey I'm Ritesh";

  // Typewriter effect in center - fast and snappy
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Ensure video plays smoothly on mount without getting stuck
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.play().catch(() => {});
    }

    // Warm browser memory cache for critical assets ahead of time
    const criticalImages = [
      "/ritesh mic.svg",
      "/ritesh standing.svg",
      "/wekraft.webp",
      "/clarioo.webp",
      "/looma.webp",
      "/podium_rites_bg.webp",
    ];

    criticalImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      const counter = { val: 0 };

      // 1. Number counter counting smoothly from 0 to 99 over 2.6s
      tl.to(counter, {
        val: 99,
        duration: 2.6,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(counter.val).toString();
          }
        },
      })
        // 2. Hit 100
        .to(counter, {
          val: 100,
          duration: 0.2,
          ease: "none",
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = "100";
            }
          },
        })
        // 3. Meaningful hold at 100 so user can comfortably read all loader text
        .to({}, { duration: 0.9 })
        // 4. Center content lift before swipe
        .to(
          [centerContentRef.current, footerRef.current],
          {
            y: -25,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.05"
        )
        // 5. Swipe up smoothly
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading Screen"
      className="fixed inset-0 z-50 w-full h-screen text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden bg-[#0c1319]"
      style={{ willChange: "transform" }}
    >
      {/* Fullscreen Video Background with Floating Island Character */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#0c1319]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover brightness-[0.92] contrast-[1.04]"
        >
          <source src="/loading_video.webm" type="video/webm" />
          <source src="/loading_video.mp4" type="video/mp4" />
        </video>

        {/* Subtle cinematic gradient overlay for high contrast at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65 pointer-events-none" />
      </div>

      {/* Top Section: "Hey I'm Ritesh" placed elegantly in the upper cloudscape */}
      <main
        ref={centerContentRef}
        className="relative z-10 mt-6 xs:mt-10 sm:mt-14 md:mt-16 mb-auto flex flex-col items-center justify-start text-center px-4"
      >
        <div className="flex items-center justify-center flex-wrap">
          <h1 className="font-serif italic text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[9.5rem] tracking-tight text-white leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            {typedText}
          </h1>

          {/* Typewriter cursor */}
          <span
            className="inline-block w-2.5 xs:w-3 sm:w-3.5 md:w-4 h-10 xs:h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-[#F5C86C] animate-[pulse_0.75s_infinite] ml-2.5 shadow-[0_0_20px_#F5C86C]"
            style={{ verticalAlign: "middle" }}
          />
        </div>

        {/* Clean, Sleek & Professional Editorial Subtitle */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 select-none">
          <span className="h-[1px] w-6 sm:w-12 bg-white/40 shadow-sm" />
          <p className="font-mono text-xs sm:text-sm md:text-base font-medium tracking-[0.32em] uppercase text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            AI Engineer &amp; Builder
          </p>
          <span className="h-[1px] w-6 sm:w-12 bg-white/40 shadow-sm" />
        </div>
      </main>

      {/* Bottom Footer: Status on Left, Number in Silkscreen on Right */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full flex justify-between items-end pb-2 sm:pb-0"
      >
        {/* Status text */}
        <div className="font-sans text-sm sm:text-base md:text-lg font-semibold tracking-widest uppercase text-white/90 drop-shadow-md">
          Loading Experience
        </div>

        {/* Number counter in Silkscreen */}
        <div className="text-right">
          <span
            ref={numberRef}
            className="font-silkscreen text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold tracking-tight block leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          >
            0
          </span>
        </div>
      </footer>
    </aside>
  );
}
