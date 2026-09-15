// src/components/ui/ProjectLikeButton.tsx
"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

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
  const [localLiked, setLocalLiked] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(`liked_${projectId}`) === "true";
    } catch {
      return false;
    }
  });

  const [localCount, setLocalCount] = useState(initialLikes);
  const [isPopping, setIsPopping] = useState(false);

  // Unconditional Convex hooks
  const allLikes = useQuery(api.projects.getLikes);
  const likeMutation = useMutation(api.projects.likeProject);

  const liveCount = (allLikes as Record<string, number> | undefined)?.[projectId] ?? localCount;

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

    try {
      await likeMutation({ projectId });
    } catch {
      // Graceful fallback if backend offline
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
          isSmall ? "text-[8px] sm:text-[9.5px]" : "text-[9.5px] sm:text-[11px]"
        }`}
      >
        {liveCount}
      </span>
    </button>
  );
}
