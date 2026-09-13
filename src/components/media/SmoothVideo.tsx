"use client";

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

export interface SmoothVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  webmSrc?: string;
  mp4Src: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  autoPlayOnVisible?: boolean;
}

export const SmoothVideo = forwardRef<HTMLVideoElement, SmoothVideoProps>(
  (
    {
      webmSrc,
      mp4Src,
      fallbackSrc,
      className = "w-full h-full object-cover",
      containerClassName = "relative w-full h-full overflow-hidden",
      autoPlayOnVisible = true,
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      preload = "auto",
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = internalRef.current;
      const container = containerRef.current;
      if (!video || !container || !autoPlayOnVisible) return;

      // IntersectionObserver to pause offscreen and resume when near viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Ignore autoplay policy or power saver rejections
                });
              }
            } else {
              video.pause();
            }
          });
        },
        {
          rootMargin: "200px 0px", // Pre-warm 200px before entering viewport
          threshold: 0.05,
        }
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, [autoPlayOnVisible]);

    return (
      <div ref={containerRef} className={containerClassName}>
        <video
          ref={internalRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          disablePictureInPicture
          disableRemotePlayback
          className={className}
          {...props}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
          {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
        </video>
      </div>
    );
  }
);

SmoothVideo.displayName = "SmoothVideo";
