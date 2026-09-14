"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "@/modules/web/Hero";
import Overlay from "@/modules/web/Overlay_about-me";
import LoadingScreen from "@/modules/web/LoadingScreen";
import Header from "@/modules/web/Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("home");

  useGSAP(() => {
    if (!heroContentRef.current || !overlayRef.current) return;

    // Hero gently scales and fades into depth as the About overlay glides up over it
    gsap.to(heroContentRef.current, {
      y: 90,
      scale: 0.95,
      opacity: 0.35,
      ease: "power1.out",
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
      },
    });

    // Highly reliable ScrollSpy tracking across standard and pinned stages
    const updateSpy = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const aboutEl = document.getElementById("about-section");
      if (!aboutEl) return;

      const pinSpacer = aboutEl.closest(".pin-spacer") as HTMLElement | null;
      const pinNode = pinSpacer || aboutEl;
      const stageTop = pinNode.getBoundingClientRect().top + scrollY;

      if (scrollY < stageTop - vh * 0.4) {
        setActiveTab("home");
      } else if (scrollY < stageTop + 650) {
        setActiveTab("about");
      } else if (scrollY < stageTop + 1450) {
        setActiveTab("skills");
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

    const getTargetPos = () => {
      if (sectionId === "home") return 0;
      const el = document.getElementById("about-section");
      if (!el) return 0;
      const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
      const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;

      if (sectionId === "about") return top + 2;
      if (sectionId === "skills") return top + 900;
      if (sectionId === "works") return top + 1750;
      if (sectionId === "contact") return top + 2590;
      return top;
    };

    if (sectionId === "works") {
      window.location.href = "/work";
      return;
    }

    const targetPos = getTargetPos();

    if (lenis) {
      lenis.scrollTo(targetPos, {
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full bg-background text-foreground">
      {/* Universal Fixed Header */}
      <Header
        activeTab={activeTab}
        onTabClick={scrollToSection}
        isLoading={isLoading}
      />

      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Sticky Hero Page */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-10 bg-background">
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
    </main>
  );
}
