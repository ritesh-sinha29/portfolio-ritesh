"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

// Lightweight shimmer / low-contrast SVG data URL to prevent blank flashing
const defaultShimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#141416" offset="20%" />
      <stop stop-color="#242428" offset="50%" />
      <stop stop-color="#141416" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#141416" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export interface InstantImageProps extends ImageProps {
  containerClassName?: string;
  aspectRatio?: string;
}

export const InstantImage: React.FC<InstantImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "relative w-full h-full overflow-hidden bg-[#121214]",
  aspectRatio,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={containerClassName}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(defaultShimmer(700, 475))}`}
        onLoad={() => setIsLoaded(true)}
        className={`duration-500 ease-out transition-[opacity,transform,filter] ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
        } ${className}`}
        {...props}
      />
    </div>
  );
};
