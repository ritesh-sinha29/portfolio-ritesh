import type { Metadata } from "next";
import "./globals.css";
import { Inter, Instrument_Serif, Silkscreen } from "next/font/google";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "ROX - AI Engineer & Builder",
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
        silkscreen.variable
      )}
    >
      <body className="min-h-screen bg-[#eaeae8] text-[#141b16] selection:bg-[#c5eb35] selection:text-black">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
