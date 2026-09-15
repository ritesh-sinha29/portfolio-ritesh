"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  hasLoaded: boolean;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  hasLoaded: true,
  finishLoading: () => {},
});

const STORAGE_KEY = "portfolio_intro_loaded";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Start with false to avoid hydration mismatch; verify sessionStorage in useEffect
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(true);

  useEffect(() => {
    try {
      const alreadyLoaded = sessionStorage.getItem(STORAGE_KEY);
      if (alreadyLoaded === "true") {
        setIsLoading(false);
        setHasLoaded(true);
      } else {
        setIsLoading(true);
        setHasLoaded(false);
      }
    } catch {
      // If sessionStorage is unavailable (e.g. private mode restrictions), fallback gracefully
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    setHasLoaded(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoaded, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
