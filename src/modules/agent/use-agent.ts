// src/modules/agent/use-agent.ts
"use client";

import { useState, useCallback, useRef } from "react";
import { streamAgentChat } from "./agent-stream";

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "tool";
  text: string;
  toolName?: string;
  toolStatus?: "running" | "done";
  toolOutput?: { message?: string; success?: boolean; [key: string]: unknown };
}

export interface AgentToolStatus {
  toolName: string;
  status: "running" | "done";
  output?: { message?: string; success?: boolean; [key: string]: unknown };
}

export function useAgent() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [toolStatus, setToolStatus] = useState<AgentToolStatus | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const assistantIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setToolStatus(null);
  }, []);

  const clear = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setIsStreaming(false);
    setToolStatus(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      // 1. Add user message
      const userMsg: AgentMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // 2. Prepare empty assistant bubble
      const assistantId = `assistant-${++assistantIdRef.current}`;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", text: "" },
      ]);
      setIsStreaming(true);
      setToolStatus(null);

      // 3. Build messages payload
      const allMessages = [...messages, userMsg]
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          id: m.id,
          role: m.role,
          parts: [{ type: "text", text: m.text }],
        }));

      try {
        await streamAgentChat(
          { messages: allMessages },
          {
            onText: (delta: string) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, text: m.text + delta } : m
                )
              );
            },
            onToolStart: (toolName: string) => {
              setToolStatus({ toolName, status: "running" });
              setMessages((prev) => [
                ...prev,
                {
                  id: `tool-${toolName}-${Date.now()}`,
                  role: "tool",
                  text: "",
                  toolName,
                  toolStatus: "running",
                },
              ]);
            },
            onToolDone: (toolName: string, output: unknown) => {
              const formattedOutput =
                typeof output === "object" && output !== null
                  ? (output as { message?: string; success?: boolean; [key: string]: unknown })
                  : { message: String(output) };
              setToolStatus({ toolName, status: "done", output: formattedOutput });
              setMessages((prev) =>
                prev.map((m) =>
                  m.role === "tool" &&
                  m.toolName === toolName &&
                  m.toolStatus === "running"
                    ? { ...m, toolStatus: "done", toolOutput: formattedOutput }
                    : m
                )
              );
            },
            onFinish: () => {
              setIsStreaming(false);
              setToolStatus(null);
              abortControllerRef.current = null;
            },
            onError: (err: unknown) => {
              const errorObj = err instanceof Error ? err : new Error(String(err));
              if (
                errorObj.name !== "AbortError" &&
                errorObj.message !== "The user aborted a request."
              ) {
                console.error("[Agent Chat] Stream error:", errorObj);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? {
                          ...m,
                          text: `⚠️ Notice: ${errorObj.message || "An unexpected error occurred."}`,
                        }
                      : m
                  )
                );
              }
              setIsStreaming(false);
              setToolStatus(null);
              abortControllerRef.current = null;
            },
          },
          controller.signal
        );
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        if (
          errorObj.name !== "AbortError" &&
          errorObj.message !== "The user aborted a request."
        ) {
          console.error("[Agent Chat] Fetch error:", errorObj);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    text: `⚠️ Notice: ${errorObj.message || "Failed to connect to agent server."}`,
                  }
                : m
            )
          );
        }
        setIsStreaming(false);
        setToolStatus(null);
        abortControllerRef.current = null;
      }
    },
    [messages]
  );

  return { messages, toolStatus, isStreaming, sendMessage, stop, clear };
}
