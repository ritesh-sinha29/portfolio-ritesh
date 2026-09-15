// src/components/providers/ConvexClientProvider.tsx
"use client";

import React, { ReactNode, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = useMemo(() => {
    if (!convexUrl) return null;
    try {
      return new ConvexReactClient(convexUrl);
    } catch (err) {
      console.warn("[ConvexClientProvider] Invalid NEXT_PUBLIC_CONVEX_URL:", err);
      return null;
    }
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
