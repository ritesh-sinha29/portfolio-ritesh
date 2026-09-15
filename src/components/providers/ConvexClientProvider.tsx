// src/components/providers/ConvexClientProvider.tsx
"use client";

import React, { ReactNode, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder-portfolio.convex.cloud";

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = useMemo(() => {
    try {
      return new ConvexReactClient(convexUrl);
    } catch {
      return new ConvexReactClient("https://placeholder-portfolio.convex.cloud");
    }
  }, []);

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
