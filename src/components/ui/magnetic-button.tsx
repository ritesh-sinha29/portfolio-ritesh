"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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
      magneticStrength = 0.4,
      scaleOnHover = 1.07,
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

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, "x") as number) || 0;
      const currentY = (gsap.getProperty(el, "y") as number) || 0;

      // Calculate the true untransformed center of the button
      const originalCenterX = rect.left - currentX + rect.width / 2;
      const originalCenterY = rect.top - currentY + rect.height / 2;

      const distanceX = e.clientX - originalCenterX;
      const distanceY = e.clientY - originalCenterY;

      const pullX = distanceX * magneticStrength;
      const pullY = distanceY * magneticStrength;

      gsap.to(el, {
        x: pullX,
        y: pullY,
        scale: scaleOnHover,
        rotation: pullX * 0.08,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      if (disabled) return;
      const el = elementRef.current;
      if (!el) return;

      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.35)",
        overwrite: "auto",
      });
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = elementRef.current;
      if (el && squashOnClick) {
        const tl = gsap.timeline();
        tl.to(el, {
          scaleX: 1.2,
          scaleY: 0.8,
          duration: 0.1,
          ease: "power1.out",
        })
          .to(el, {
            scaleX: 0.88,
            scaleY: 1.14,
            duration: 0.12,
            ease: "power1.out",
          })
          .to(el, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: "elastic.out(1.2, 0.35)",
          });
      }

      if (onClick) {
        onClick(e);
      }
    };

    const baseClasses = `will-change-transform transform-gpu inline-flex items-center justify-center cursor-pointer select-none ${className}`;

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
            className={baseClasses}
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
          className={baseClasses}
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
        className={baseClasses}
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
