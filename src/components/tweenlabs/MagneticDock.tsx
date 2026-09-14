"use client";

import React from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
  variant?: "fixed" | "inline";
}

const defaultDockItems: DockItem[] = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "works", label: "WORKS" },
  { id: "contact", label: "CONTACT" },
];

export function MagneticDock({
  items = defaultDockItems,
  activeId,
  onItemClick,
  className = "",
  magneticStrength = 0.4,
  variant = "fixed",
}: MagneticDockProps) {
  const containerClasses =
    variant === "inline"
      ? `relative z-10 bg-card/95 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-border rounded-full p-1 sm:p-1.5 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 select-none ${className}`
      : `fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-card/95 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.08)] border border-border rounded-full p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 select-none ${className}`;

  return (
    <nav
      aria-label="Navigation Dock"
      className={containerClasses}
    >
      {items.map((item) => {
        const isCurrentActive =
          activeId !== undefined ? activeId === item.id : Boolean(item.isActive);

        const buttonClasses = `relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
          isCurrentActive
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-foreground hover:text-foreground hover:bg-muted"
        }`;

        return (
          <MagneticButton
            key={item.id}
            href={item.href}
            magneticStrength={magneticStrength}
            scaleOnHover={1.08}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              }
              if (onItemClick) {
                onItemClick(item.id, item);
              }
            }}
            className={buttonClasses}
          >
            {item.label}
          </MagneticButton>
        );
      })}
    </nav>
  );
}

export default MagneticDock;
