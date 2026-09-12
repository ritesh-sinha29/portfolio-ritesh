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

  const fullText = "Hey I'm Ritesh";

  // Typewriter effect in center
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 110);

    return () => clearInterval(interval);
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

      // 1. Number loading smoothly from 0 to 99
      tl.to(counter, {
        val: 99,
        duration: 2.6,
        ease: "power1.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(counter.val).toString();
          }
        },
      })
        // 2. Hit 100 right after 99
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
        // 3. Brief micro-pause at 100
        .to({}, { duration: 0.25 })
        // 4. Center content lift before swipe
        .to(
          [centerContentRef.current, footerRef.current],
          {
            y: -25,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
          },
          "-=0.1"
        )
        // 5. Swipe up smoothly
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "-=0.15"
        );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading Screen"
      className="fixed inset-0 z-50 w-full h-screen text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden bg-black"
      style={{ willChange: "transform" }}
    >
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle cinematic gradient overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/50 pointer-events-none" />
      </div>

      {/* Top spacer */}
      <div className="w-full h-8 relative z-10" />

      {/* Center Section: "Hey I'm Ritesh" */}
      <main
        ref={centerContentRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4"
      >
        <div className="flex items-center justify-center flex-wrap">
          <h1 className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight text-white leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
            {typedText}
          </h1>

          {/* Typewriter cursor */}
          <span
            className="inline-block w-2.5 h-12 sm:w-3.5 sm:h-16 md:w-4 sm:h-20 lg:w-5 lg:h-24 bg-[#c5eb35] animate-[pulse_0.75s_infinite] ml-2 shadow-[0_0_15px_#c5eb35]"
            style={{ verticalAlign: "middle" }}
          />
        </div>

        {/* Subtitle */}
        <p className="font-sans font-semibold text-xs sm:text-sm md:text-base text-[#c5eb35] mt-6 tracking-[0.25em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          AI Engineer &amp; Builder
        </p>
      </main>

      {/* Bottom Footer: Status on Left, Number in Silkscreen on Right */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full flex justify-between items-end"
      >
        {/* Status text */}
        <div className="font-sans text-xs sm:text-sm font-medium tracking-wider text-white/90 drop-shadow-md">
          Loading Experience
        </div>

        {/* Number counter in Silkscreen */}
        <div className="text-right">
          <span
            ref={numberRef}
            className="font-silkscreen text-4xl sm:text-6xl md:text-7xl text-white font-bold tracking-tight block leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
          >
            0
          </span>
        </div>
      </footer>
    </aside>
  );
}
