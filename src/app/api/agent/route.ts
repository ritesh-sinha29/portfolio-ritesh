// src/app/api/agent/route.ts

import { NextRequest } from "next/server";
import { AGENT_SYSTEM_PROMPT, RITESH_PROFILE } from "@/lib/agent/knowledge";
import { contactRitesh, sendRiteshDetails } from "@/lib/agent/tools";

export const runtime = "nodejs";

// ============================================================================
// RATE LIMITER: Max 10 requests per IP per minute
// ============================================================================
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const ipRequestMap = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "127.0.0.1"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequestMap.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfter) };
  }

  timestamps.push(now);
  ipRequestMap.set(ip, timestamps);

  if (ipRequestMap.size > 2000) {
    for (const [key, list] of ipRequestMap.entries()) {
      const valid = list.filter((t) => t > windowStart);
      if (valid.length === 0) ipRequestMap.delete(key);
      else ipRequestMap.set(key, valid);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

// ============================================================================
// EMAIL EXTRACTION HELPER
// ============================================================================
function extractEmail(text: string): string | null {
  const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1] : null;
}

// ============================================================================
// EMBEDDED KNOWLEDGE FALLBACK ENGINE
// ============================================================================
async function processFallbackOrTool(
  userMessage: string
): Promise<{ text: string; toolExecution?: { name: string; output: any } }> {
  const query = userMessage.toLowerCase();
  const emailInQuery = extractEmail(userMessage);

  // Check 1: User requested resume / dossier to be sent to their email
  if (
    emailInQuery &&
    (query.includes("resume") ||
      query.includes("send") ||
      query.includes("detail") ||
      query.includes("dossier") ||
      query.includes("cv") ||
      query.includes("pdf"))
  ) {
    const toolRes = await sendRiteshDetails({
      recipientEmail: emailInQuery,
    });
    return {
      text: toolRes.message,
      toolExecution: {
        name: "sendRiteshDetails",
        output: toolRes,
      },
    };
  }

  // Check 2: User wants to leave a message / contact Ritesh with their email
  if (
    emailInQuery &&
    (query.includes("message") ||
      query.includes("hire") ||
      query.includes("inquiry") ||
      query.includes("project") ||
      query.includes("contact") ||
      query.includes("call"))
  ) {
    const toolRes = await contactRitesh({
      visitorEmail: emailInQuery,
      message: userMessage,
    });
    return {
      text: toolRes.message,
      toolExecution: {
        name: "contactRitesh",
        output: toolRes,
      },
    };
  }

  // 1. Projects Query
  if (
    query.includes("project") ||
    query.includes("wekraft") ||
    query.includes("clarioo") ||
    query.includes("looma") ||
    query.includes("aria") ||
    query.includes("vocalx") ||
    query.includes("work")
  ) {
    return {
      text: `Here are **Ritesh Sinha's top featured projects**:

1. 🚀 **WEKRAFT** ([Live Demo](https://www.wekraft.xyz) | [GitHub](https://github.com/ritesh-sinha29/wekraft))
   - *AI-Powered Project Execution & Dev Coordination Platform*
   - Bridges Devs & PMs with bidirectional GitHub issue sync, multi-agent MCP tool integrations, and real-time task dependency visualization via Ably & Inngest.
   - **Stack**: LangGraph, MCP, Ably, Inngest, AWS, Next.js.

2. 🎙️ **CLARIOO** ([Live Demo](https://www.clarioo.live) | [GitHub](https://github.com/ritesh-sinha29/clarioo))
   - *Career Acceleration & Real-Time Voice Mock AI Engine*
   - Sub-400ms ultra-low latency voice conversational interviews with personalized career roadmap generation via React Flow.
   - **Stack**: Next.js, Vapi, Supabase, Unsloth, React Flow, TypeScript.

3. 🎨 **LOOMA** ([Live Demo](https://looma-sketch-collaborate-deploy.vercel.app/) | [GitHub](https://github.com/ritesh-sinha29/looma))
   - *Real-Time Collaborative Infinite Canvas to Code Generator*
   - Multiplayer cursor & object canvas sync (Liveblocks) with one-click wireframe-to-React generation.
   - **Stack**: Vercel AI SDK, Firecrawl, Liveblocks, tldraw, Convex.

4. ⚡ **ARIA** ([Live Demo](https://aria-hackathon-topaz.vercel.app/) | [GitHub](https://github.com/ritesh-sinha29/aria))
   - *Autonomous Personal Productivity Operating System*
   - Connects Gmail, Slack, and Discord to automate daily tasks with semantic priority scoring.
   - **Stack**: LangGraph, FastAPI, Composio, Python, Redis.

5. 💼 **Enterprise Sales Agent** ([Live Demo](https://pan-sales.vercel.app) | [GitHub](https://github.com/ritesh-sinha29/pan-sales))
   - Bilingual multi-agent conversational sales system with sub-200ms semantic caching via Qdrant/Redis and Temporal.io durable execution.

6. 🎯 **VOCALX** ([Live Demo](https://www.vocalx.xyz) | [GitHub](https://github.com/ritesh-sinha29/vocalx))
   - Next-gen voice recruitment & automated JD rubric candidate scoring engine.`,
    };
  }

  // 2. VRSA Analytics / Founder Query
  if (query.includes("vrsa") || query.includes("company") || query.includes("founder") || query.includes("revenue")) {
    return {
      text: `**VRSA Analytics** is an engineering and AI system design firm founded by **Ritesh Sinha**.

- **What Ritesh Does as Founder**:
  - Owns end-to-end product architecture and technical execution for e-commerce, B2B, and B2C platforms.
  - Shipped production inventory platforms, intelligent AI chatbots, and multi-tenant SaaS products.
  - Generated **₹3.5L+ in client revenue** with clean CI/CD, layered guardrails, and cost-efficient LLM token utilization.`,
    };
  }

  // 3. Tech Stack Query
  if (
    query.includes("stack") ||
    query.includes("technology") ||
    query.includes("skills") ||
    query.includes("langgraph") ||
    query.includes("next") ||
    query.includes("python")
  ) {
    return {
      text: `Here is **Ritesh Sinha's Core Technical Stack**:

- **Multi-Agent & AI Systems**: LangGraph (Supervisor & StateGraph patterns), Model Context Protocol (MCP), Vercel AI SDK, Hybrid RAG, Semantic Caching.
- **Voice AI & Real-time**: Vapi (sub-400ms voice pipelines), Ably, Liveblocks, WebSockets.
- **Full-Stack & Frontend**: Next.js 16 (App Router, Server Actions, SSE Streaming), React 19, TypeScript, Tailwind CSS v4, GSAP, Motion.
- **Backend & Cloud**: Python, FastAPI, Node.js, Temporal.io durable workflows, Inngest, Redis, Qdrant vector store.
- **Databases**: PostgreSQL, Supabase, Convex.`,
    };
  }

  // 4. Contact / Hire Query
  if (
    query.includes("hire") ||
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("touch") ||
    query.includes("call")
  ) {
    return {
      text: `You can connect with **Ritesh Sinha** directly through any of the following channels:

- 📧 **Direct Email**: [${RITESH_PROFILE.email}](mailto:${RITESH_PROFILE.email})
- 💻 **GitHub**: [github.com/ritesh-sinha29](${RITESH_PROFILE.socials.github})
- 💼 **LinkedIn**: [LinkedIn Profile](${RITESH_PROFILE.socials.linkedin})
- 📄 **Resume PDF**: [Download Official Resume](${RITESH_PROFILE.socials.resume})

Ritesh is currently open for select high-impact engineering roles, founding engineer opportunities, and AI architecture consulting!`,
    };
  }

  // 5. Default Bio / Overview
  return {
    text: `**Ritesh Sinha** is a **Full-Stack AI Engineer** and the **Founder of VRSA Analytics**.

- **Specialization**: Designing and shipping production-grade multi-agent architectures (LangGraph), durable workflow orchestrations (Temporal.io), real-time collaborative canvases (Liveblocks), and ultra-low latency voice AI engines (Vapi).
- **Track Record**: Has shipped systems generating ₹3.5L+ in client revenue across multi-tenant SaaS, inventory platforms, and automated developer tools.
- **Engineering Philosophy**: *"Deep requirement discovery followed by simple surface interfaces backed by resilient, observable internals."*

Feel free to ask about his **featured projects**, **technical stack**, or **how to collaborate**!`,
  };
}

// ============================================================================
// MAIN POST HANDLER
// ============================================================================
export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: `Rate limit reached: Max 10 requests allowed per minute. Please try again in ${retryAfterSeconds}s.`,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON payload", { status: 400 });
    }

    const { messages } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("messages array is required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt =
      lastMessage?.parts?.[0]?.text || lastMessage?.text || "Tell me about Ritesh Sinha";

    // Format chat history for LLM
    const formattedMessages = [
      { role: "system", content: AGENT_SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.parts?.[0]?.text || m.text || "",
      })),
    ];

    // ========================================================================
    // TIER 1: Check Local Ollama (e.g. http://localhost:11434)
    // ========================================================================
    try {
      const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
      const ollamaRes = await fetch(`${ollamaBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || "qwen3.6:27b",
          messages: formattedMessages,
          stream: true,
        }),
        signal: AbortSignal.timeout(2500), // Quick check
      });

      if (ollamaRes.ok && ollamaRes.body) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const reader = ollamaRes.body.getReader();

        const stream = new ReadableStream({
          async start(controller) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "start" })}\n\n`)
            );
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "text-start", id: "stream-0" })}\n\n`
              )
            );

            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                  if (!line.trim()) continue;
                  try {
                    const parsed = JSON.parse(line);
                    const chunk = parsed.message?.content || "";
                    if (chunk) {
                      controller.enqueue(
                        encoder.encode(
                          `data: ${JSON.stringify({
                            type: "text-delta",
                            id: "stream-0",
                            delta: chunk,
                          })}\n\n`
                        )
                      );
                    }
                  } catch {
                    // ignore
                  }
                }
              }
            } catch (err) {
              console.error("[Ollama Stream Error]", err);
            } finally {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "text-end", id: "stream-0" })}\n\n`
                )
              );
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "finish", finishReason: "stop" })}\n\n`
                )
              );
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      }
    } catch {
      // Local Ollama offline or timed out, gracefully continue to Tier 2 / 3
    }

    // ========================================================================
    // TIER 2: Check Cloud API (e.g. OpenAI / Groq / OpenRouter)
    // ========================================================================
    const cloudApiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
    if (cloudApiKey) {
      try {
        const isGroq = !!process.env.GROQ_API_KEY;
        const endpoint = isGroq
          ? "https://api.groq.com/openai/v1/chat/completions"
          : "https://api.openai.com/v1/chat/completions";
        const modelName = isGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

        const cloudRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cloudApiKey}`,
          },
          body: JSON.stringify({
            model: modelName,
            messages: formattedMessages,
            stream: true,
          }),
        });

        if (cloudRes.ok && cloudRes.body) {
          const encoder = new TextEncoder();
          const decoder = new TextDecoder();
          const reader = cloudRes.body.getReader();

          const stream = new ReadableStream({
            async start(controller) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "start" })}\n\n`)
              );
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "text-start", id: "stream-0" })}\n\n`
                )
              );

              let buffer = "";
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  buffer += decoder.decode(value, { stream: true });
                  const lines = buffer.split("\n");
                  buffer = lines.pop() ?? "";

                  for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const raw = line.slice("data: ".length).trim();
                    if (raw === "[DONE]") break;
                    try {
                      const parsed = JSON.parse(raw);
                      const delta = parsed.choices?.[0]?.delta?.content || "";
                      if (delta) {
                        controller.enqueue(
                          encoder.encode(
                            `data: ${JSON.stringify({
                              type: "text-delta",
                              id: "stream-0",
                              delta,
                            })}\n\n`
                          )
                        );
                      }
                    } catch {
                      // ignore
                    }
                  }
                }
              } catch (err) {
                console.error("[Cloud API Stream Error]", err);
              } finally {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text-end", id: "stream-0" })}\n\n`
                  )
                );
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "finish", finishReason: "stop" })}\n\n`
                  )
                );
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            },
          });
        }
      } catch {
        // Cloud API failed, gracefully continue to Tier 3
      }
    }

    // ========================================================================
    // TIER 3: High-Intelligence Built-in Knowledge Engine (100% Uptime Fallback)
    // ========================================================================
    const fallbackResult = await processFallbackOrTool(userPrompt);
    const fallbackText = fallbackResult.text;
    const toolExec = fallbackResult.toolExecution;
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "start" })}\n\n`)
        );

        if (toolExec) {
          const toolCallId = `tool-call-${Date.now()}`;
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "tool-input-start",
                toolCallId,
                toolName: toolExec.name,
              })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "tool-output-available",
                toolCallId,
                output: toolExec.output,
              })}\n\n`
            )
          );
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "text-start", id: "stream-0" })}\n\n`
          )
        );

        // Stream word-by-word with realistic micro-delays for natural feel
        const words = fallbackText.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "text-delta",
                id: "stream-0",
                delta: chunk,
              })}\n\n`
            )
          );
          // 12ms micro-delay for smooth typewriter visual
          await new Promise((resolve) => setTimeout(resolve, 12));
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "text-end", id: "stream-0" })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "finish", finishReason: "stop" })}\n\n`
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("[Agent API Route Error]:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
