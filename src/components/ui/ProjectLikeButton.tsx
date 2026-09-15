// src/components/ui/ProjectLikeButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { anyApi } from "convex/server";

interface ProjectLikeButtonProps {
  projectId: string;
  initialLikes?: number;
  className?: string;
  size?: "sm" | "md";
}

export function ProjectLikeButton({
  projectId,
  initialLikes = 0,
  className = "",
  size = "sm",
}: ProjectLikeButtonProps) {
  const [localLiked, setLocalLiked] = useState(false);
  const [localCount, setLocalCount] = useState(initialLikes);
  const [isPopping, setIsPopping] = useState(false);

  const hasConvex = !!process.env.NEXT_PUBLIC_CONVEX_URL;

  // Real-time query & mutation from Convex if connected
  let allLikes: Record<string, number> | undefined;
  let likeMutation: ((args: { projectId: string }) => Promise<any>) | undefined;

  try {
    if (hasConvex) {
      allLikes = useQuery((anyApi as any).projects.getLikes);
      likeMutation = useMutation((anyApi as any).projects.likeProject);
    }
  } catch {
    // Convex not initialized yet
  }

  const liveCount = allLikes?.[projectId] ?? localCount;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`liked_${projectId}`);
      if (stored === "true") {
        setLocalLiked(true);
      }
    } catch {
      // ignore
    }
  }, [projectId]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 400);

    setLocalLiked(true);
    setLocalCount((prev) => prev + 1);

    try {
      localStorage.setItem(`liked_${projectId}`, "true");
    } catch {
      // ignore
    }

    if (likeMutation) {
      try {
        await likeMutation({ projectId });
      } catch (err) {
        console.warn("[ProjectLikeButton] Mutation notice:", err);
      }
    }
  };

  const isSmall = size === "sm";

  return (
    <button
      type="button"
      onClick={handleLike}
      aria-label={`Like project ${projectId}`}
      className={`group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#141b16] transition-all duration-150 cursor-pointer select-none shadow-xs active:scale-95 ${
        localLiked
          ? "bg-rose-50 text-rose-600 border-rose-400"
          : "bg-white/90 hover:bg-white text-[#141b16] hover:text-rose-600"
      } ${className}`}
    >
      <Heart
        className={`${
          isSmall ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
        } transition-transform ${
          isPopping ? "scale-130 text-rose-500 fill-rose-500" : ""
        } ${localLiked ? "text-rose-500 fill-rose-500" : "group-hover:scale-110"}`}
      />
      <span
        className={`font-mono font-bold ${
          isSmall ? "text-[9px] sm:text-[10px]" : "text-[10.5px] sm:text-xs"
        }`}
      >
        {liveCount > 0 ? liveCount : ""}
      </span>
    </button>
  );
}
