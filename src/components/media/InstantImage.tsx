"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

// Lightweight SVG blur placeholder
const shimmerSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 475'%3E%3Crect width='700' height='475' fill='%2318181b'/%3E%3C/svg%3E`;

export interface InstantImageProps extends ImageProps {
  containerClassName?: string;
  aspectRatio?: string;
}

export const InstantImage: React.FC<InstantImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "relative w-full h-full overflow-hidden bg-[#18181b]",
  aspectRatio,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  quality = 90,
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
        blurDataURL={shimmerSvg}
        quality={quality}
        onLoad={() => setIsLoaded(true)}
        className={`duration-500 ease-out transition-[opacity,transform] will-change-transform ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        } ${className}`}
        {...props}
      />
    </div>
  );
};
