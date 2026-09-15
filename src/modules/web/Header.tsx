"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import MagneticDock, { DockItem } from "@/components/tweenlabs/MagneticDock";

export interface HeaderProps {
  activeTab?: string;
  onTabClick?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
  showBrand?: boolean;
  showContact?: boolean;
  rightContent?: React.ReactNode;
}

export const defaultNavItems: DockItem[] = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "works", label: "WORKS" },
];

export default function Header({
  activeTab,
  onTabClick,
  isLoading = false,
  className = "",
  showBrand = true,
  showContact = true,
  rightContent,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const currentActiveTab =
    activeTab || (pathname === "/work" ? "works" : pathname === "/about" ? "about" : "home");

  const scrollToHomeSection = (id: string) => {
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
      if (id === "home") return 0;
      const el = document.getElementById("about-section");
      if (!el) return 0;
      const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
      const top = (pinSpacer || el).getBoundingClientRect().top + window.scrollY;

      if (id === "skills") return top + 900;
      if (id === "works" || id === "projects") return top + 1750;
      if (id === "contact") return top + 2600;
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
  };

  const handleTabAction = (id: string) => {
    if (id === "about") {
      if (pathname === "/about") {
        const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        router.push("/about");
      }
      return;
    }

    if (id === "works") {
      if (pathname === "/work") {
        const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        router.push("/work");
      }
      return;
    }

    if (onTabClick && isHomePage) {
      onTabClick(id);
      return;
    }

    if (isHomePage) {
      scrollToHomeSection(id);
    } else {
      // Sub-pages like /work or /about
      if (id === "home") {
        router.push("/");
      } else {
        router.push(`/?section=${id}`);
      }
    }
  };

  const handleContactClick = () => {
    if (isHomePage) {
      handleTabAction("contact");
    } else {
      router.push("/?section=contact");
    }
  };

  if (isLoading) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none w-full transition-opacity duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <div className="flex-1 flex items-center justify-start pointer-events-auto">
          {showBrand && (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isHomePage) {
                  handleTabAction("home");
                } else {
                  router.push("/");
                }
              }}
              className="group flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-card transition-all duration-200"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/ritesh circle.svg"
                  alt="Ritesh Sinha"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover select-none"
                  priority
                />
              </div>
              <span className="font-sans font-bold text-xs sm:text-sm tracking-tight text-foreground pr-2 hidden sm:inline">
                RITESH SINHA
              </span>
            </Link>
          )}
        </div>

        {/* Center: Universal Navigation Pill Dock */}
        <div className="flex items-center justify-center pointer-events-auto">
          <MagneticDock
            variant="inline"
            activeId={currentActiveTab}
            onItemClick={(id) => handleTabAction(id)}
            items={defaultNavItems}
          />
        </div>

        {/* Right: Contact Pill CTA or Custom Right Content */}
        <div className="flex-1 flex items-center justify-end pointer-events-auto">
          {rightContent ? (
            rightContent
          ) : showContact ? (
            <div className="p-1 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] inline-flex items-center">
              <MagneticButton
                onClick={handleContactClick}
                className="group bg-primary hover:opacity-90 text-primary-foreground font-sans font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-150 shadow-xs cursor-pointer"
              >
                <span className="hidden sm:inline">Contact</span>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary-foreground/20 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground group-hover:text-primary-foreground transition-colors stroke-[2.5]" />
                </span>
              </MagneticButton>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
