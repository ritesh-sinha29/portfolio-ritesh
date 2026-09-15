"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  hasLoaded: boolean;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  hasLoaded: false,
  finishLoading: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Disable browser scroll restoration so page reload lands at the top Hero stage
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    setHasLoaded(true);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoaded, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
