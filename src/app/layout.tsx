import type { Metadata } from "next";
import "./globals.css";
import { Inter, Instrument_Serif, Fira_Code, Silkscreen } from "next/font/google";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import ChatWidget from "@/modules/agent/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
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
        inter.variable,
        instrumentSerif.variable,
        firaCode.variable,
        silkscreen.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=Silkscreen:wght@400;700&family=Almarai:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/ritesh standing.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/ritesh mic.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <LoadingProvider>
          <SmoothScroll>
            <SmoothCursor />
            {children}
            <ChatWidget />
          </SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  );
}
