// src/components/ui/DesktopRecommendationModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Laptop, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function DesktopRecommendationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDismissed = sessionStorage.getItem("ritesh_mobile_notice_dismissed");
    if (!isDismissed && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("ritesh_mobile_notice_dismissed", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 pointer-events-none md:hidden">
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-white text-[#141b16] rounded-3xl p-5 shadow-[4px_4px_0px_#141b16] border-2 border-[#141b16] pointer-events-auto flex flex-col mb-4 sm:mb-0"
          >
            {/* Top Close Button (Cross Icon) */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close notification"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Header with Icon Badge */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c5eb35] border border-[#141b16] flex items-center justify-center text-[#141b16] shadow-xs shrink-0">
                <Laptop className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="pr-6">
                <h3 className="font-sans font-bold text-sm text-[#141b16] tracking-tight flex items-center gap-1.5">
                  Best on Desktop
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                </h3>
                <p className="font-sans text-[11px] text-[#5a625b]">
                  PC / Laptop Recommended
                </p>
              </div>
            </div>

            {/* Body Description */}
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-4">
              For the best interactive experience with rich physics, 3D animations, and smooth gestures, viewing on a{" "}
              <strong className="text-[#141b16] font-semibold">
                PC or Laptop screen
              </strong>{" "}
              is recommended.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2.5 px-4 rounded-full bg-[#141b16] text-white hover:bg-neutral-800 font-sans font-semibold text-xs transition-all active:scale-98 cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <span>Continue on Mobile</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
