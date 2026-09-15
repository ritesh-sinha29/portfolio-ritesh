// src/app/contact/page.tsx
"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Copy, Loader2, Mail, Send } from "lucide-react";
import Header from "@/modules/web/Header";
import Footer from "@/modules/web/Footer";
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
    <main className="relative w-full bg-[#f6f6f4] text-[#141b16] selection:bg-primary selection:text-primary-foreground flex flex-col overflow-x-hidden">
      {/* Fixed Top Header */}
      <Header activeTab="contact" />

      {/* Main Content Stage (Curtain): sits on top of sticky footer */}
      <div className="relative z-20 w-full bg-[#f6f6f4] min-h-screen flex flex-col justify-center shadow-[0_25px_50px_rgba(0,0,0,0.25)] border-b border-black/10">
        {/* Film grain overlay */}
        <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-0" />

        {/* Center Stage: Balanced 2-Column Responsive Layout */}
        <div className="relative z-10 w-full max-w-6xl mx-auto pt-24 sm:pt-32 lg:pt-24 pb-16 sm:pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* LEFT COLUMN: Editorial Text, Grand Heading, Direct Email */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 text-[#5a625b] text-xs font-mono uppercase tracking-[0.18em]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Get In Touch
              </div>

              {/* Title */}
              <h1
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[4.5rem] leading-[1.02] font-normal tracking-tight text-[#141b16]"
              >
                Let&apos;s build something <em className="italic font-normal">extraordinary.</em>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-[#5a625b] max-w-lg leading-relaxed font-sans">
                Have an ambitious AI project, scalable architecture, or full-stack system in mind? Drop your note or reach out directly.
              </p>

              {/* Quick Status Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5a625b] bg-black/[0.03] px-3.5 py-1.5 rounded-full border border-black/6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>Available for Select Collaborations & Advisory</span>
              </div>

              {/* Quick Direct Email Pill */}
              <div className="pt-2 inline-flex items-center gap-2 p-1.5 rounded-full bg-white border-1.5 border-[#141b16] shadow-[3px_3px_0px_#141b16]">
                <div className="pl-2.5 text-neutral-400">
                  <Mail className="w-4 h-4 text-[#141b16]" />
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="px-2 py-1 text-xs sm:text-sm font-mono font-bold text-[#141b16] hover:text-primary transition-colors truncate"
                >
                  {contactEmail}
                </a>
                <MagneticButton
                  onClick={handleCopyEmail}
                  magneticStrength={0.3}
                  scaleOnHover={1.08}
                  ariaLabel="Copy email address"
                  className="px-3.5 py-1.5 rounded-full bg-[#c5eb35] text-[#141b16] font-sans font-bold text-xs flex items-center gap-1.5 border border-[#141b16] shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>Copy</span>
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form Card */}
            <div className="lg:col-span-5 w-full">
              <div className="w-full bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-[5px_5px_0px_#141b16] border-2 border-[#141b16]">
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
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <div className="pb-2 border-b border-black/5 mb-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#141b16]">
                        Send A Direct Message
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5a625b]">
                        <Clock className="w-3 h-3 text-primary" />
                        ~24h reply
                      </span>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-sans text-xs font-bold uppercase tracking-wider text-[#141b16] mb-1"
                      >
                        Message / Project Scope <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={3.5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project, architecture needs, or collaboration idea..."
                        disabled={status === "loading"}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-1.5 border-[#141b16] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-primary text-sm font-sans text-[#141b16] placeholder:text-neutral-400 disabled:opacity-50 transition-all resize-none"
                      />
                    </div>

                    {/* Error Alert */}
                    {status === "error" && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-1.5">
                      <MagneticButton
                        type="submit"
                        disabled={status === "loading" || !email.trim() || !message.trim()}
                        magneticStrength={0.2}
                        scaleOnHover={1.02}
                        className="w-full py-3.5 px-6 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#141b16] shadow-[3px_3px_0px_#141b16] hover:shadow-[4.5px_4.5px_0px_#141b16] transition-all duration-150 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Curtain Reveal Alpine Footer: sits underneath z-20 content */}
      <div className="sticky bottom-0 z-10 h-screen w-full overflow-hidden">
        <Footer />
      </div>
    </main>
  );
}
