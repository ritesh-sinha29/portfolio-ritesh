"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface PageTransitionItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface PageTransitionProps {
  items: PageTransitionItem[];
  className?: string;
  scrollerId?: string;
  showNav?: boolean;
  onActiveChange?: (activeId: string, index: number) => void;
}

export default function PageTransition({
  items,
  className = "",
  scrollerId,
  showNav = true,
  onActiveChange,
}: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!scrollSectionRef.current || items.length === 0) return;

      const totalPanels = items.length;

      // Set initial states for all panels and their inner contents
      gsap.set(".transition-panel-0", {
        y: "0vh",
        scale: 1,
        rotateX: 0,
        autoAlpha: 1,
      });

      for (let i = 1; i < totalPanels; i++) {
        gsap.set(`.transition-panel-${i}`, {
          y: "100vh",
          scale: 1,
          rotateX: 0,
          autoAlpha: 0,
        });
        gsap.set(`.transition-panel-${i}-content`, { y: "15vh" });
      }

      const scroller = scrollerId
        ? (containerRef.current?.closest(`#${scrollerId}`) as HTMLElement) ||
          undefined
        : undefined;

      const totalScroll = Math.max(2400, (totalPanels - 1) * 1100);

      // Master timeline linked to vertical scroll pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          scroller: scroller,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: `+=${totalScroll}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * (totalPanels - 1) + 0.5),
              totalPanels - 1,
            );
            const activeItem = items[index];

            if (onActiveChange && activeItem) {
              onActiveChange(activeItem.id, index);
            }

            // High performance DOM updates for sidebar buttons
            items.forEach((item, idx) => {
              const el = containerRef.current?.querySelector(
                `#page-nav-${item.id}`,
              ) as HTMLElement | null;
              if (el) {
                if (idx === index) {
                  el.classList.add(
                    "shadow-[3px_3px_0px_#141b16]",
                    "scale-105",
                    "!rotate-[-2deg]",
                    "bg-[#c5eb35]",
                    "text-[#141b16]",
                    "opacity-100",
                  );
                  el.classList.remove(
                    "opacity-60",
                    "rotate-[2deg]",
                    "bg-white",
                  );
                } else {
                  el.classList.remove(
                    "shadow-[3px_3px_0px_#141b16]",
                    "scale-105",
                    "!rotate-[-2deg]",
                    "bg-[#c5eb35]",
                    "text-[#141b16]",
                    "opacity-100",
                  );
                  el.classList.add("opacity-60", "rotate-[2deg]", "bg-white");
                }
              }
            });
          },
        },
      });

      tlRef.current = tl;

      // Initial hold so user reads the first panel
      tl.addLabel(items[0].id, 0);
      tl.to({}, { duration: 0.1 });

      /*
       * PREMIUM 3D STACKED + PARALLAX TRANSITIONS:
       *
       *  INCOMING  ─ slides up from y:100vh → y:0 over 1.4s (power3.out).
       *              its inner content container slides up from y:15vh → y:0 in sync to create
       *              a beautiful 3D parallax depth effect.
       *  OUTGOING  ─ scales down slightly to 0.85, tilts back (rotateX: 12), and dims (opacity: 0.4)
       *              over the same 1.4s (power3.out). This preserves it as a background stacked layer
       *              until the incoming card completely slides over and covers it.
       *  CLEANUP   ─ the card that is 2 steps back fades out completely (autoAlpha: 0) to save GPU memory.
       */
      for (let i = 1; i < totalPanels; i++) {
        const incoming = `.transition-panel-${i}`;
        const incomingContent = `.transition-panel-${i}-content`;
        const outgoing = `.transition-panel-${i - 1}`;
        const cleanup = i >= 2 ? `.transition-panel-${i - 2}` : null;

        tl.set(incoming, {
          y: "100vh",
          rotateX: 0,
          scale: 1,
          autoAlpha: 1,
        });
        tl.set(incomingContent, { y: "15vh" });

        tl.to(incoming, {
          y: "0vh",
          duration: 1.4,
          ease: "power3.out",
        });

        tl.to(
          incomingContent,
          {
            y: "0vh",
            duration: 1.4,
            ease: "power3.out",
          },
          "<",
        );

        tl.to(
          outgoing,
          {
            scale: 0.85,
            y: "-8vh",
            rotateX: 12,
            opacity: 0.4,
            transformOrigin: "center 30%",
            duration: 1.4,
            ease: "power3.out",
          },
          "<",
        );

        if (cleanup) {
          tl.to(
            cleanup,
            {
              autoAlpha: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "<",
          );
        }

        tl.addLabel(items[i].id);
        tl.to({}, { duration: 0.1 });
      }
    },
    { scope: containerRef, dependencies: [items] },
  );

  const handleNavClick = (label: string) => {
    const tl = tlRef.current;
    if (tl?.scrollTrigger) {
      const scrollPos = tl.scrollTrigger.labelToScroll(label);
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
    >
      {/* Main Pinned Scroll Section Container — perspective + preserve-3d enables rotateX fall-back */}
      <div
        ref={scrollSectionRef}
        className="scroll-viewport h-screen w-full relative overflow-hidden"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 40%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating Right Navigator — inside pinned section so it stays visible */}
        {showNav && items.length > 1 && (
          <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            {items.map((item, idx) => (
              <button
                key={item.id}
                id={`page-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-28 text-left border-2 border-[#141b16] px-3 py-1.5 font-mono font-bold text-[10px] uppercase rounded-lg shadow-[2px_2px_0px_#141b16] cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  idx === 0
                    ? "bg-[#c5eb35] text-[#141b16] shadow-[3px_3px_0px_#141b16] scale-105 rotate-[-2deg] opacity-100"
                    : "bg-white text-[#141b16] opacity-60 rotate-[2deg] hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Panels Render */}
        {items.map((item, index) => {
          const isFirst = index === 0;
          const zIndex = 10 + index * 2;

          return (
            <section
              key={item.id}
              className={`transition-panel-${index} absolute inset-0 w-full h-full overflow-hidden will-change-transform`}
              style={{ zIndex }}
            >
              {isFirst ? (
                <div className="w-full h-full">{item.content}</div>
              ) : (
                <div
                  className={`transition-panel-${index}-content w-full h-full will-change-transform origin-bottom-left`}
                >
                  {item.content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
