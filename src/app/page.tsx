"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "@/modules/web/Hero";
import Overlay from "@/modules/web/Overlay";
import LoadingScreen from "@/modules/web/LoadingScreen";
import MagneticDock from "@/components/tweenlabs/MagneticDock";

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
      } else if (scrollY < stageTop + 2150) {
        setActiveTab("works");
      } else {
        setActiveTab("contact");
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
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + 2, behavior: "smooth" });
      }
    } else if (sectionId === "skills") {
      const el = document.getElementById("about-section");
      if (el) {
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + 900, behavior: "smooth" });
      }
    } else if (sectionId === "works") {
      const el = document.getElementById("about-section");
      if (el) {
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + 1750, behavior: "smooth" });
      }
    } else if (sectionId === "contact") {
      const el = document.getElementById("about-section");
      if (el) {
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + 2590, behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative w-full bg-background text-foreground">
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

      {/* Floating Top Navigation Pill with Magnetic Dock physics */}
      {!isLoading && (
        <MagneticDock
          activeId={activeTab}
          onItemClick={(id) => scrollToSection(id)}
          items={[
            {
              id: "home",
              label: "HOME",
              onClick: () => scrollToSection("home"),
            },
            {
              id: "about",
              label: "ABOUT",
              onClick: () => scrollToSection("about"),
            },
            {
              id: "skills",
              label: "SKILLS",
              onClick: () => scrollToSection("skills"),
            },
            {
              id: "works",
              label: "WORKS",
              href: "/work",
            },
            {
              id: "contact",
              label: "CONTACT",
              onClick: () => scrollToSection("contact"),
            },
          ]}
        />
      )}
    </main>
  );
}
