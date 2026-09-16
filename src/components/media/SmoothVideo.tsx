"use client";

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

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
      poster,
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

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = internalRef.current;
      const container = containerRef.current;
      if (!video) return;

      // Force muted attribute to ensure autoplay permission on mobile devices
      video.muted = true;
      video.defaultMuted = true;

      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsLoaded(true))
            .catch(() => {
              // Low-power mode or autoplay policy blocked playback.
              // Setup fallback listener on first user interaction.
              const handleFirstInteraction = () => {
                video.play()
                  .then(() => setIsLoaded(true))
                  .catch(() => setHasError(true));
                window.removeEventListener("touchstart", handleFirstInteraction);
                window.removeEventListener("pointerdown", handleFirstInteraction);
                window.removeEventListener("scroll", handleFirstInteraction);
              };
              window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
              window.addEventListener("pointerdown", handleFirstInteraction, { passive: true, once: true });
              window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });
            });
        }
      };

      if (!autoPlayOnVisible) {
        if (autoPlay) attemptPlay();
        return;
      }

      // IntersectionObserver to pause offscreen and resume when near viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              attemptPlay();
            } else {
              video.pause();
            }
          });
        },
        {
          rootMargin: "250px 0px", // Pre-warm 250px before entering viewport
          threshold: 0.05,
        }
      );

      if (container) {
        observer.observe(container);
      }

      return () => {
        observer.disconnect();
      };
    }, [autoPlay, autoPlayOnVisible]);

    return (
      <div ref={containerRef} className={containerClassName}>
        {!hasError && (
          <video
            ref={internalRef}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={preload}
            poster={poster}
            onCanPlay={() => setIsLoaded(true)}
            onPlaying={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            disablePictureInPicture
            disableRemotePlayback
            className={`transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            {...props}
          >
            {webmSrc && <source src={webmSrc} type="video/webm" />}
            <source src={mp4Src} type="video/mp4" />
            {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
          </video>
        )}
      </div>
    );
  }
);

SmoothVideo.displayName = "SmoothVideo";
