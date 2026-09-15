"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "@/modules/web/Hero";
import Overlay from "@/modules/web/Overlay_about-me";
import LoadingScreen from "@/modules/web/LoadingScreen";
import Header from "@/modules/web/Header";
import { useLoading } from "@/components/providers/LoadingProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { isLoading, finishLoading } = useLoading();
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
    finishLoading();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === "about") {
      router.push("/about");
      return;
    }
    if (sectionId === "works") {
      router.push("/work");
      return;
    }

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
      if (sectionId === "skills") return top + 1000;
      if (sectionId === "projects") return top + 1850;
      if (sectionId === "contact") return top + 2600;
      return top;
    };

    const targetPos = getTargetPos();

    if (lenis) {
      lenis.scrollTo(targetPos, {
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    }
  }, [router]);

  // When arriving from another route with a target section query param (e.g. /?section=skills)
  useEffect(() => {
    if (!sectionParam) return;
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToSection(sectionParam);
      // Clean query parameter from URL without page reload
      window.history.replaceState({}, "", window.location.pathname);
    }, 120);

    return () => clearTimeout(timer);
  }, [sectionParam, scrollToSection]);

  return (
    <main className="relative w-full bg-background text-foreground">
      {/* Universal Fixed Header */}
      <Header
        activeTab={activeTab}
        onTabClick={scrollToSection}
        isLoading={isLoading}
      />

      {/* Loading Screen: Rendered ONLY during initial session load */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

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

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
