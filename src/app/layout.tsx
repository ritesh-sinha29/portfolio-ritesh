import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Merriweather, Fira_Code, Silkscreen } from "next/font/google";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import SmoothScroll from "@/components/providers/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ritesh Sinha - AI Engineer & Builder",
  description:
    "AI Engineer & Builder architecting intelligent systems and shipping scalable AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        outfit.variable,
        merriweather.variable,
        firaCode.variable,
        silkscreen.variable
      )}
    >
      <head>
        <link rel="preload" href="/ritesh standing.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/ritesh mic.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <SmoothScroll>
          <SmoothCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
