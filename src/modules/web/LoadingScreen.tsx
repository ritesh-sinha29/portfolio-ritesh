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

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Check if device is low-power or low-bandwidth (save-data / 2g / low CPU)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const nav = navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };

      const isDataSaver = nav.connection?.saveData === true;
      const isSlowNetwork = nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g";
      const isLowHardware = (nav.deviceMemory && nav.deviceMemory < 2) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2);

      if (isDataSaver || isSlowNetwork || isLowHardware) {
        setVideoFailed(true);
      }
    }
  }, []);

  // Fast typewriter effect
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

  // Ensure video plays smoothly on mount without getting stuck on iOS/mobile
  useEffect(() => {
    if (videoFailed) return;

    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
          })
          .catch(() => {
            // Autoplay blocked (low power mode). Listen for first gesture
            const handleFirstTouch = () => {
              vid.play()
                .then(() => setVideoLoaded(true))
                .catch(() => setVideoFailed(true));
              window.removeEventListener("touchstart", handleFirstTouch);
              window.removeEventListener("pointerdown", handleFirstTouch);
            };
            window.addEventListener("touchstart", handleFirstTouch, { passive: true, once: true });
            window.addEventListener("pointerdown", handleFirstTouch, { passive: true, once: true });
          });
      }

      // Safety timeout: If video hasn't loaded within 2.2s on slow devices, fallback gracefully
      const timer = setTimeout(() => {
        if (!vid.readyState || vid.readyState < 2) {
          setVideoFailed(true);
        }
      }, 2200);

      return () => clearTimeout(timer);
    }

    // Warm browser memory cache for critical assets ahead of time
    const criticalImages = [
      "/ritesh standing.svg",
      "/ritesh mic.svg",
      "/wekraft.webp",
      "/clarioo.webp",
      "/looma.webp",
      "/podium_rites_bg.webp",
      "/footer.mp4",
    ];

    criticalImages.forEach((src) => {
      if (src.endsWith(".mp4") || src.endsWith(".webm")) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;
      } else {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [videoFailed]);

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
      className={`fixed inset-0 z-50 w-full h-screen flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden text-white ${
        videoFailed ? "bg-[#8f3210]" : "bg-[#0c1319]"
      }`}
      style={{
        willChange: "transform",
        ...(videoFailed
          ? {
              background:
                "radial-gradient(ellipse 95% 85% at 50% 45%, #b5421a 0%, #802a0a 100%)",
            }
          : {}),
      }}
    >
      {/* Fullscreen Video Background with Floating Island Character */}
      {!videoFailed && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#0c1319]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ backgroundColor: "#0c1319" }}
            onCanPlay={() => setVideoLoaded(true)}
            onPlaying={() => setVideoLoaded(true)}
            onError={() => setVideoFailed(true)}
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover object-[center_42%] brightness-[0.92] contrast-[1.04] bg-[#0c1319]"
          >
            <source src="/loading_video.webm" type="video/webm" />
            <source src="/loading_video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65 pointer-events-none" />
        </div>
      )}

      {/* Top Spacer for perfect vertical center balance against the footer */}
      <div className="w-full h-6 sm:h-8 shrink-0 relative z-10" />

      {/* Main Center Stage: Perfectly Centered "Hey I'm Ritesh" */}
      <main
        ref={centerContentRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 w-full"
      >
        <div className="flex items-center justify-center flex-wrap">
          <h1
            className={`font-serif italic text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[9.5rem] tracking-tight leading-none text-white ${
              !videoFailed
                ? "drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
                : "drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
            }`}
          >
            {typedText}
          </h1>

          {/* Typewriter cursor */}
          <span
            className="inline-block w-2.5 xs:w-3 sm:w-3.5 md:w-4 h-10 xs:h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-[#F5C86C] animate-[pulse_0.75s_infinite] ml-2.5 sm:ml-3 shadow-[0_0_24px_rgba(245,200,108,0.7)]"
            style={{ verticalAlign: "middle" }}
          />
        </div>

        {/* Editorial Subtitle */}
        <div className="mt-5 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 select-none">
          <span className="h-[1px] w-8 sm:w-14 bg-white/40 shadow-sm" />
          <p className="font-mono text-xs sm:text-sm md:text-base font-medium tracking-[0.32em] uppercase text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
            AI Engineer &amp; Builder
          </p>
          <span className="h-[1px] w-8 sm:w-14 bg-white/40 shadow-sm" />
        </div>
      </main>

      {/* Bottom Footer: Status on Left, Number in Silkscreen on Right */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full flex justify-between items-end pb-2 sm:pb-0 text-white"
      >
        {/* Status text */}
        <div className="font-sans text-sm sm:text-base md:text-lg font-semibold tracking-widest uppercase text-white/90 drop-shadow-md">
          Loading Experience
        </div>

        {/* Number counter in Silkscreen */}
        <div className="text-right">
          <span
            ref={numberRef}
            className={`font-silkscreen text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight block leading-none text-white ${
              !videoFailed
                ? "drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
                : "drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
            }`}
          >
            0
          </span>
        </div>
      </footer>
    </aside>
  );
}
