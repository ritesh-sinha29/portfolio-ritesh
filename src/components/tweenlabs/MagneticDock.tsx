"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export interface DockItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface MagneticDockProps {
  items?: DockItem[];
  activeId?: string;
  onItemClick?: (id: string, item?: DockItem) => void;
  className?: string;
  magneticStrength?: number;
}

const defaultDockItems: DockItem[] = [
  { id: "home", label: "HOME" },
  { id: "works", label: "WORKS" },
  { id: "about", label: "ABOUT" },
];

export function MagneticDock({
  items = defaultDockItems,
  activeId,
  onItemClick,
  className = "",
  magneticStrength = 0.35,
}: MagneticDockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    const el = itemRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const pullX = distanceX * magneticStrength;
    const pullY = distanceY * magneticStrength;

    contextSafe(() => {
      gsap.to(el, {
        x: pullX,
        y: pullY,
        scale: 1.05,
        rotation: pullX * 0.05,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    })();
  };

  const handleMouseLeave = (index: number) => {
    const el = itemRefs.current[index];
    if (!el) return;

    contextSafe(() => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto",
      });
    })();
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLElement>,
    item: DockItem,
    index: number,
  ) => {
    const el = itemRefs.current[index];
    if (el) {
      contextSafe(() => {
        // Tactile squash and stretch spring click feedback
        const tl = gsap.timeline();
        tl.to(el, {
          scaleX: 1.15,
          scaleY: 0.85,
          duration: 0.1,
          ease: "power1.out",
        })
          .to(el, {
            scaleX: 0.92,
            scaleY: 1.08,
            duration: 0.12,
            ease: "power1.out",
          })
          .to(el, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            ease: "elastic.out(1.2, 0.35)",
          });
      })();
    }

    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item.id, item);
    }
  };

  return (
    <nav
      ref={containerRef}
      aria-label="Main Navigation"
      className={`fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/8 rounded-full p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 transition-all duration-300 select-none ${className}`}
    >
      {items.map((item, idx) => {
        const isCurrentActive =
          activeId !== undefined ? activeId === item.id : Boolean(item.isActive);

        const buttonClasses = `relative px-3.5 sm:px-4.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer will-change-transform inline-flex items-center justify-center ${
          isCurrentActive
            ? "bg-[#c5eb35] text-[#141b16] shadow-xs"
            : "text-[#5a625b] hover:text-[#141b16] hover:bg-black/5"
        }`;

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={(e) => handleItemClick(e, item, idx)}
              className={buttonClasses}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            onClick={(e) => handleItemClick(e, item, idx)}
            className={buttonClasses}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export default MagneticDock;
