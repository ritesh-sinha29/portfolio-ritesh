"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/modules/web/Header";
import PlayfulPhysicsCanvas from "@/modules/about/PlayfulPhysicsCanvas";
import KnowMeBetterSection from "@/modules/about/KnowMeBetterSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutPage() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Entrance animations for hero texts
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
    })
      .from(
        headlineRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        subRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

    // Parallax glide down as the "Know me better" overlay scrolls over it
    if (heroContentRef.current && overlayRef.current) {
      gsap.to(heroContentRef.current, {
        y: 85,
        ease: "none",
        scrollTrigger: {
          trigger: overlayRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    }
  });

  return (
    <main className="relative w-full bg-[#fafafa] text-[#141b16] selection:bg-primary selection:text-primary-foreground">
      {/* Universal Fixed Header */}
      <Header activeTab="about" />

      {/* Sticky Hero Section with Interactive Physics Badges */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-10 bg-[#fafafa]">
        {/* Hero Content Section (Behind the physics canvas: z-10) */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-3xl mx-auto pointer-events-none will-change-transform pt-16 sm:pt-20 pb-24 sm:pb-28"
        >
          {/* Profile / Avatar Greeting Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3 sm:mb-4 pointer-events-auto hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-black/10 shrink-0">
              <Image
                src="/ritesh circle.svg"
                alt="Avatar"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#404741] tracking-tight">
              Hello 👋 <span className="font-semibold text-[#141b16]">I&apos;m Ritesh Sinha</span>
            </span>
          </div>

          {/* Big Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-serif italic text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] leading-[1.12] tracking-tight text-[#141b16] font-normal max-w-2xl sm:max-w-3xl"
          >
            I design products that <span className="not-italic font-bold">feel</span>{" "}
            simple, even when they&apos;re not.
          </h1>

          {/* Editorial Subtitle */}
          <p
            ref={subRef}
            className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#616862] max-w-lg sm:max-w-xl leading-relaxed tracking-tight font-sans"
          >
            Currently architecting{" "}
            <strong className="font-bold text-[#141b16]">
              complex AI workflows
            </strong>{" "}
            and autonomous multi-agent{" "}
            <strong className="font-bold text-[#141b16]">
              design &amp; engineering systems
            </strong>
            .
          </p>
        </div>

        {/* Interactive 2D Rigid-Body Physics Simulation (On Top of Text: z-20) */}
        <PlayfulPhysicsCanvas className="z-20" />
      </div>

      {/* "Know me better" Overlay Section that glides over the hero */}
      <KnowMeBetterSection ref={overlayRef} className="relative z-20" />
    </main>
  );
}
