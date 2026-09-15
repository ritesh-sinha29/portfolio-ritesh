// src/modules/agent/ChatWidget.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  LucideBrain,
  MessageSquare,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAgent } from "./use-agent";

export const STARTER_SUGGESTIONS = [
  {
    label: "Who is Ritesh & what does he do?",
    prompt: "Who is Ritesh Sinha and what is his engineering background?",
  },
  {
    label: "What are Ritesh's top projects?",
    prompt: "Tell me about Ritesh's featured projects (WEKRAFT, CLARIOO, LOOMA, ARIA, VOCALX) and what tech stack he used.",
  },
  {
    label: "What is Ritesh's core tech stack?",
    prompt: "What is Ritesh's core technical stack across multi-agent systems, Next.js, and AI?",
  },
  {
    label: "Tell me about VRSA Analytics",
    prompt: "What is VRSA Analytics and what systems has Ritesh shipped as founder?",
  },
  {
    label: "How can I contact or hire Ritesh?",
    prompt: "How can I get in touch with Ritesh Sinha for engineering opportunities, consulting, or project collaborations?",
  },
];

interface ChatWidgetProps {
  positionClass?: string;
}

export default function ChatWidget({
  positionClass = "fixed right-0 top-1/2 -translate-y-1/2 z-40",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { messages, toolStatus, isStreaming, sendMessage, clear } = useAgent();

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, toolStatus, isStreaming]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;

    const text = inputValue.trim();
    setInputValue("");
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Right Edge Vertical Tab Launcher */}
      <button
        type="button"
        aria-label="Open AI Assistant"
        onClick={() => setIsOpen(true)}
        className={`${positionClass} bg-white/95 backdrop-blur-md border-l-2 border-y-2 border-[#141b16] py-3 sm:py-4 px-1.5 sm:px-2 rounded-l-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group hover:-translate-x-1 select-none pointer-events-auto`}
      >
        <div
          className="flex items-center gap-1.5 sm:gap-2"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-[#141b16] shrink-0">
            <Image
              src="/ritesh circle.svg"
              alt="Ritesh Sinha"
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-sans text-[9px] sm:text-[11px] font-extrabold tracking-wider text-[#141b16] uppercase whitespace-nowrap">
            Ask anything
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </button>

      {/* Slide-In Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-50 pointer-events-auto"
            />

            {/* Right-Side Drawer Panel */}
            <motion.aside
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 sm:top-1/2 sm:-translate-y-1/2 z-50 w-full sm:w-[420px] md:w-[460px] h-full sm:h-[640px] max-h-full sm:max-h-[88vh] bg-[#faf8f5] text-[#141b16] sm:rounded-l-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-l-2 sm:border-y-2 border-[#141b16] flex flex-col overflow-hidden pointer-events-auto"
            >
              {/* Top Header */}
              <div className="p-3.5 sm:p-4 border-b-2 border-[#141b16] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#141b16] shadow-xs shrink-0">
                    <Image
                      src="/ritesh circle.svg"
                      alt="Ritesh Sinha"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-sm sm:text-base text-[#141b16] tracking-tight flex items-center gap-2">
                      Ritesh AI Assistant
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </h3>
                    <p className="text-[11px] text-[#5a625b] font-medium font-sans">
                      Founder @ VRSA Analytics • AI Engineer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={clear}
                      className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="Clear chat history"
                      aria-label="Clear chat history"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Thread / Suggestions */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm font-sans"
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col gap-3 py-2">
                    <div className="px-1 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#141b16]">
                      <LucideBrain className="w-4 h-4 text-primary" />
                      <span>Quick Suggestions</span>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      {STARTER_SUGGESTIONS.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(item.prompt)}
                          className="w-full text-left p-3 rounded-xl border border-black/8 bg-white hover:bg-[#c5eb35]/25 hover:border-[#141b16] transition-all duration-200 group flex items-center justify-between gap-2 cursor-pointer shadow-xs"
                        >
                          <span className="text-xs text-neutral-800 group-hover:text-black font-semibold">
                            {item.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, i) => (
                      <React.Fragment key={msg.id || i}>
                        {msg.role === "user" && (
                          <div className="flex justify-end">
                            <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-xs leading-relaxed bg-[#c5eb35] text-[#141b16] font-semibold text-xs sm:text-sm shadow-xs border border-[#141b16]/20">
                              {msg.text}
                            </div>
                          </div>
                        )}

                        {msg.role === "assistant" && (
                          <div className="flex justify-start">
                            <div className="max-w-[90%] px-4 py-3 rounded-2xl rounded-bl-xs leading-relaxed bg-white text-[#141b16] border border-black/8 text-xs sm:text-[13px] shadow-xs">
                              {msg.text ? (
                                <div className="prose prose-xs max-w-none text-[#141b16] [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:pl-4 [&>ul]:list-disc [&>ul]:mb-2 [&>li]:mb-1 [&>ol]:pl-4 [&>ol]:list-decimal [&>strong]:font-bold [&>a]:text-emerald-700 [&>a]:font-bold [&>a]:underline hover:[&>a]:text-emerald-800">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.text}
                                  </ReactMarkdown>
                                </div>
                              ) : isStreaming ? (
                                <div className="flex items-center gap-1.5 py-1 text-neutral-500">
                                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.15s]" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.3s]" />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}

                        {msg.role === "tool" && (
                          <div className="w-full my-1">
                            {msg.toolStatus === "running" ? (
                              <div className="rounded-xl border border-amber-300 bg-amber-50 p-2.5 flex items-center gap-2 text-amber-900 text-xs">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600 shrink-0" />
                                <span className="font-medium">
                                  Processing request...
                                </span>
                              </div>
                            ) : (
                              <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 flex items-start gap-2 text-emerald-900 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="leading-relaxed font-normal">
                                  {msg.toolOutput?.message ||
                                    "Action completed successfully."}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>

              {/* Bottom Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t-2 border-[#141b16] bg-white flex items-center gap-2"
              >
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about projects, stack, experience..."
                    disabled={isStreaming}
                    className="w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-black/15 rounded-full focus:outline-hidden focus:border-[#141b16] focus:ring-1 focus:ring-[#141b16] transition-all text-[#141b16] placeholder:text-neutral-400 disabled:opacity-60 font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue(
                        "Tell me about Ritesh's projects and architecture expertise!",
                      );
                    }}
                    className="absolute right-2.5 p-1 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                    title="Insert sample prompt"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isStreaming}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#c5eb35] hover:bg-[#b5e024] disabled:opacity-50 disabled:cursor-not-allowed text-[#141b16] border border-[#141b16] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 font-bold"
                  aria-label="Send message"
                >
                  {isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#141b16]" />
                  ) : (
                    <Send className="w-4 h-4 stroke-[2.2]" />
                  )}
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
