"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  scaleOnHover?: number;
  squashOnClick?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  (
    {
      children,
      className = "",
      magneticStrength = 0.35,
      scaleOnHover = 1.05,
      squashOnClick = true,
      href,
      target,
      rel,
      onClick,
      type = "button",
      disabled = false,
      ariaLabel,
      title,
      id,
      style,
    },
    ref,
  ) => {
    const elementRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(ref, () => elementRef.current as HTMLElement);

    const { contextSafe } = useGSAP({ scope: elementRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = elementRef.current;
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
          scale: scaleOnHover,
          rotation: pullX * 0.04,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      })();
    };

    const handleMouseLeave = () => {
      if (disabled) return;
      const el = elementRef.current;
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

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = elementRef.current;
      if (el && squashOnClick) {
        contextSafe(() => {
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

      if (onClick) {
        onClick(e);
      }
    };

    const combinedClasses = `will-change-transform inline-flex items-center justify-center cursor-pointer select-none ${className}`;

    if (href) {
      const isExternal =
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        target === "_blank";

      if (isExternal) {
        return (
          <a
            ref={(el) => {
              elementRef.current = el;
            }}
            href={href}
            target={target}
            rel={rel || (target === "_blank" ? "noreferrer" : undefined)}
            className={combinedClasses}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            aria-label={ariaLabel}
            title={title}
            id={id}
            style={style}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={(el) => {
            elementRef.current = el as HTMLElement;
          }}
          href={href}
          className={combinedClasses}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-label={ariaLabel}
          title={title}
          id={id}
          style={style}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={(el) => {
          elementRef.current = el;
        }}
        type={type}
        disabled={disabled}
        className={combinedClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label={ariaLabel}
        title={title}
        id={id}
        style={style}
      >
        {children}
      </button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
