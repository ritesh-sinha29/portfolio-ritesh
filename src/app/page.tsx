"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
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

    // Highly reliable ScrollSpy tracking across standard and pinned stages
    const updateSpy = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const aboutEl = document.getElementById("about-section");
      const worksEl = document.getElementById("works-stage");

      if (!aboutEl || !worksEl) return;

      const aboutTop = aboutEl.getBoundingClientRect().top + scrollY;
      const pinSpacer = worksEl.closest(".pin-spacer") as HTMLElement | null;
      const worksTop = (pinSpacer || worksEl).getBoundingClientRect().top + scrollY;

      if (scrollY < aboutTop - vh * 0.4) {
        setActiveTab("home");
      } else if (scrollY < worksTop - vh * 0.3) {
        setActiveTab("about");
      } else {
        setActiveTab("works");
      }
    };

    window.addEventListener("scroll", updateSpy, { passive: true });
    updateSpy();

    return () => {
      window.removeEventListener("scroll", updateSpy);
    };
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "about") {
      const el = document.getElementById("about-section");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + 2, behavior: "smooth" });
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

      {/* Floating Top Navigation Pill */}
      {!isLoading && (
        <nav
          aria-label="Main Navigation"
          className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/8 rounded-full p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 transition-all duration-300 select-none"
        >
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className={`px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "home"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            HOME
          </button>

          <Link
            href="/work"
            className={`px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "works"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
                : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
            }`}
          >
            WORKS
          </Link>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className={`px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "about"
                ? "bg-[#c5eb35] text-[#141b16] shadow-sm scale-[1.02]"
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
