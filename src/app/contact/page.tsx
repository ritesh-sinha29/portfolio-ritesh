// src/app/contact/page.tsx
"use client";

import React, { useState } from "react";
import { CheckCircle2, Copy, Loader2, Send } from "lucide-react";
import Header from "@/modules/web/Header";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const contactEmail = "riteshsinha4146@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message");
      }

      setStatus("success");
      setEmail("");
      setName("");
      setMessage("");
    } catch (err: unknown) {
      console.error("[Contact Error]:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#f6f6f4] text-[#141b16] selection:bg-primary selection:text-primary-foreground flex flex-col justify-between overflow-x-hidden">
      {/* Film grain overlay */}
      <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-0" />

      {/* Fixed Top Header */}
      <Header activeTab="contact" />

      {/* Center Stage: Minimalist Neo-Brutalist Contact Form */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto pt-28 sm:pt-36 pb-20 px-4 sm:px-6 flex flex-col items-center">
        {/* Editorial Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 text-[#5a625b] text-[11px] font-mono uppercase tracking-[0.15em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Get In Touch
          </div>
          <h1
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl leading-[1.08] font-normal tracking-tight text-[#141b16]"
          >
            Let&apos;s build something <em className="italic font-normal">extraordinary.</em>
          </h1>
          <p className="mt-3.5 text-xs sm:text-sm text-[#616862] max-w-md mx-auto leading-relaxed font-sans">
            Drop your email and project details below. Your message lands straight in Ritesh&apos;s inbox.
          </p>

          {/* Quick Direct Email Pill */}
          <div className="mt-4.5 inline-flex items-center gap-2 p-1 sm:p-1.5 rounded-full bg-white border border-black/10 shadow-xs">
            <a
              href={`mailto:${contactEmail}`}
              className="px-3 py-1 text-xs font-mono font-bold text-[#141b16] hover:text-primary transition-colors truncate"
            >
              {contactEmail}
            </a>
            <MagneticButton
              onClick={handleCopyEmail}
              magneticStrength={0.3}
              scaleOnHover={1.08}
              ariaLabel="Copy email address"
              className="px-2.5 py-1 rounded-full bg-[#c5eb35] text-[#141b16] font-sans font-bold text-[11px] flex items-center gap-1 border border-[#141b16] shadow-xs"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 stroke-[2.2]" />
                  <span>Copy</span>
                </>
              )}
            </MagneticButton>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[4px_4px_0px_#141b16] border-2 border-[#141b16]">
          {status === "success" ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#c5eb35] border-2 border-[#141b16] flex items-center justify-center text-[#141b16] shadow-[2px_2px_0px_#141b16]">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-[#141b16] tracking-tight">
                Message Dispatched!
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed">
                Thank you for reaching out. Ritesh has received your message and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-[#141b16] text-[#141b16] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1.5"
                >
                  Your Name <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1.5"
                >
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1.5"
                >
                  Message / Project Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, architecture needs, or collaboration idea..."
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all resize-none"
                />
              </div>

              {/* Error Alert */}
              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <MagneticButton
                  magneticStrength={0.2}
                  scaleOnHover={1.02}
                  className="w-full"
                >
                  <button
                    type="submit"
                    disabled={status === "loading" || !email.trim() || !message.trim()}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#141b16] shadow-[3px_3px_0px_#141b16] hover:shadow-[4.5px_4.5px_0px_#141b16] transition-all duration-150 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending to Ritesh...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
