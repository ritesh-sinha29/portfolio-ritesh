"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "@/modules/web/Hero";
import Overlay from "@/modules/web/Overlay";
import LoadingScreen from "@/modules/web/LoadingScreen";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("home");

  useGSAP(() => {
    if (!heroContentRef.current || !overlayRef.current) return;

    // Hero gently glides down as the overlay scrolls up over it
    gsap.to(heroContentRef.current, {
      y: 75,
      ease: "none",
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    ScrollTrigger.refresh();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "works") {
      const el = document.getElementById("works-section") || overlayRef.current;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (sectionId === "about") {
      const el = document.getElementById("about-section") || document.getElementById("footer-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative w-full bg-[#eaeae8] text-black">
      {/* Lemon / Lime Green Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Sticky Hero Page */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-10 bg-[#eaeae8]">
        <div
          ref={heroContentRef}
          className="w-full h-full will-change-transform"
        >
          <Hero isLoaded={!isLoading} />
        </div>
      </div>

      {/* Extended Overlay Section */}
      <Overlay
        ref={overlayRef}
        className="relative z-20"
      />

      {/* Floating Bottom Navigation Pill */}
      {!isLoading && (
        <nav
          aria-label="Main Navigation"
          className="fixed bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-black/8 rounded-full p-1.5 flex items-center gap-1 sm:gap-1.5 transition-all duration-300 select-none"
        >
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "home"
                ? "bg-[#c5eb35] text-[#141b16] shadow-xs scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            HOME
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("works")}
            className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "works"
                ? "bg-[#c5eb35] text-[#141b16] shadow-xs scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            WORKS
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "about"
                ? "bg-[#c5eb35] text-[#141b16] shadow-xs scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            ABOUT
          </button>
        </nav>
      )}
    </main>
  );
}
