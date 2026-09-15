# AI BRAIN — PRIMARY MEMORY
> Read this file first before doing any task.
> Do NOT scan the full project unless more context is needed.

## 1. Project Identity
- Project Name: Portfolio Ritesh
- Project Type: Frontend / Web Application (Portfolio)
- Primary Goal: Showcase projects, skills, experience, and contact details with high-end responsive UI.

## 2. Current Tech Stack
- Frontend: Next.js 16 (App Router) / React 19 / TypeScript
- Styling & Animations: Tailwind CSS v4, Lucide Icons, GSAP (@gsap/react), Lenis Smooth Scroll, Motion / Framer Motion
- Package Manager: pnpm

## 3. Project Structure Summary
```text
portfolio-ritesh/
├── .agents/rules/     -> Antigravity AI rules
├── AGENTS.md          -> Universal agent protocol
├── AI_BRAIN.md        -> Persistent project memory
├── AI_RULES.md        -> File reading constraints
├── SESSION_MEMORY.md  -> Temporary task notes
├── public/            -> Static assets & images
└── src/
    ├── app/           -> Next.js App Router (pages, layout, globals.css)
    ├── components/    -> UI components & building blocks
    ├── lib/           -> Utilities & helpers
    └── modules/       -> Feature modules
```

## 4. Important Decisions & Conventions
- Premium design with smooth micro-animations and responsive layout across mobile and desktop.
- Keep components modular and avoid duplicate styling utilities.
- Source code is ground truth: if memory conflicts with code, update the brain to match the code.

## Recent Changes
- Redesigned the **"KNOW MORE"** CTA button in [Overlay_about-me.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/Overlay_about-me.tsx) to a refined, non-filled tactile neo-brutalist pill:
  - White surface (`bg-white hover:bg-[#faf8f5]`) with obsidian typography (`text-[#141b16]`), crisp border (`border-[#141b16]`), and tactile offset shadow (`shadow-[2.5px_2.5px_0px_#141b16] hover:shadow-[4.5px_4.5px_0px_#141b16]`).
  - Dark contrasting arrow badge (`bg-[#141b16] text-white`) that dynamically illuminates to primary terracotta on hover (`group-hover:bg-primary group-hover:text-primary-foreground`) with micro-hover translation.
- Harmonized the vertical rhythm and structure across all interactive panels (About Me, Skills, Featured Projects):
  - In [Overlay_about-me.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/Overlay_about-me.tsx), restructured Panel 0 (About Me) with clean top clearance (`pt-16 sm:pt-20 md:pt-24`), balanced heading margins (`mb-2 sm:mb-4 md:mb-6`), refined headline line-height and typography scale (`leading-[1.18]`), ensuring the "KNOW MORE" CTA stays comfortably in view above the fold on all desktop and laptop resolutions.
  - In [SkillsSection.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/SkillsSection.tsx), unified top container padding and heading margins to match Panel 0 and Panel 2.
  - In [ProjectsSection.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/ProjectsSection.tsx), provided clear distance from top header dock and optimized card viewport scaling.
- Standardized the `/about` page top header navigation:
  - Centered Magnetic Dock (`HOME`, `ABOUT`, `SKILLS`, `WORKS`) with active route styling.
  - Enhanced the GitHub Contribution Activity section:
    - Expanded graph width to `lg:col-span-8` giving contribution cells larger size and greater visual prominence.
    - Compressed the 4 stat cards on the right into a tight, compact 2x2 grid (`lg:col-span-4`) with refined typography and padding.
    - Implemented a floating white popover tooltip with caret pointing directly to the hovered contribution square showing `{X} commits on {Month} {DD}, {YYYY}`, matching GitHub's authentic interaction.
    - Added mutual exclusivity between custom cursor and tooltip: custom cursor seamlessly disappears whenever hovering over contribution squares (`data-hide-cursor` / `dataset.cursorHidden`), ensuring only 1 of the two is visible at a time without overlap.

- Increased typography and cursor scale in [LoadingScreen.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/LoadingScreen.tsx):
  - Scaled typewriter headline ("Hey I'm Ritesh") up to `text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[9.5rem]` with proportional cursor thickness and height.
  - Scaled subtitle badge ("AI Engineer & Builder") up to `text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl`.
  - Scaled footer status text ("Loading Experience") up to `text-sm sm:text-base md:text-lg` and number counter up to `text-5xl sm:text-7xl md:text-8xl lg:text-9xl`.

- Implemented and integrated the **Ritesh AI Chatbot Assistant & Automated Resend Email Tools**:
  - [knowledge.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/lib/agent/knowledge.ts): Complete persona knowledge graph, VRSA Analytics details, all 6 projects, tech stack, and system prompt.
  - [tools.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/lib/agent/tools.ts): Resend email dispatch tools (`contactRitesh` to send visitor inquiries straight to `riteshsinha4146@gmail.com`, and `sendRiteshDetails` to dispatch resume PDF and dossier).
  - [agent-stream.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/agent/agent-stream.ts): SSE stream decoder handling text-delta, tool calls, and finish states.
  - [use-agent.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/agent/use-agent.ts): React state hook for message streaming, abort controller, tool status events, and conversation clearing.
  - [ChatWidget.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/agent/ChatWidget.tsx): Tactile neo-brutalist right-edge `"Ask anything"` launcher with circular avatar, live pulse indicator, animated slide-in drawer, starter suggestions, markdown rendering, and tool execution status feedback.
  - [route.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/app/api/agent/route.ts): Multi-tier streaming endpoint (Local Ollama `http://localhost:11434` -> Cloud API -> Smart Knowledge Fallback Engine + Resend tool triggers for 100% uptime).
  - [layout.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/app/layout.tsx): Globally mounted across all routes (`/`, `/about`, `/work`, `/contact`).

- Built dedicated **Contact Page & Email Delivery Pipeline**:
  - [page.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/app/contact/page.tsx): Editorial contact form with copy email pill, quick info chips, name/email/message inputs with tactile neo-brutalist styling, and responsive validation.
  - [route.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/app/api/contact/route.ts): Dedicated API route with Zod schema validation and Resend email delivery.

- Built **Mobile Desktop Recommendation Modal**:
  - [DesktopRecommendationModal.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/components/ui/DesktopRecommendationModal.tsx): Subtle neo-brutalist banner popup for small screens (< 768px) with `sessionStorage` dismissal persistence.

- Implemented **Convex Real-Time Backend & Project Like / Upvote System**:
  - [schema.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/convex/schema.ts): Real-time schema for `messages`, `projectLikes`, and `guestbook`.
  - [projects.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/convex/projects.ts), [messages.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/convex/messages.ts), [guestbook.ts](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/convex/guestbook.ts): Queries and mutations.
  - [ConvexClientProvider.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/components/providers/ConvexClientProvider.tsx): Resilient Convex provider with graceful fallback when `NEXT_PUBLIC_CONVEX_URL` is unconfigured.
  - [ProjectLikeButton.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/components/ui/ProjectLikeButton.tsx): Tactile upvote / like button with optimistic state and real-time synchronization, integrated in both [ProjectsSection.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/modules/web/ProjectsSection.tsx) and [page.tsx](file:///e:/Users/Ritesh%20Sinha/Desktop/portfolio-ritesh/src/app/work/page.tsx).

## 5. Important File Map
| Section | Files |
| :--- | :--- |
| Core Layout & Global Providers | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/providers/LoadingProvider.tsx`, `src/components/providers/ConvexClientProvider.tsx`, `src/components/ui/DesktopRecommendationModal.tsx`, `src/modules/web/LoadingScreen.tsx` |
| AI Chatbot Assistant & Tools | `src/modules/agent/ChatWidget.tsx`, `src/modules/agent/use-agent.ts`, `src/modules/agent/agent-stream.ts`, `src/lib/agent/knowledge.ts`, `src/lib/agent/tools.ts`, `src/app/api/agent/route.ts` |
| Convex Backend & Mutations | `convex/schema.ts`, `convex/projects.ts`, `convex/messages.ts`, `convex/guestbook.ts`, `src/components/ui/ProjectLikeButton.tsx` |
| Navigation Header & Dock | `src/modules/web/Header.tsx`, `src/components/tweenlabs/MagneticDock.tsx` |
| Home Page & Overlay | `src/app/page.tsx`, `src/modules/web/Hero.tsx`, `src/modules/web/Overlay_about-me.tsx` |
| Dedicated About Page | `src/app/about/page.tsx`, `src/modules/about/PlayfulPhysicsCanvas.tsx`, `src/modules/about/KnowMeBetterSection.tsx`, `src/modules/about/TechStackSkills.tsx`, `src/modules/about/GitHubActivitySection.tsx` |
| Selected Works Page | `src/app/work/page.tsx`, `src/modules/web/ProjectsSection.tsx` |
| Contact Page & Email API | `src/app/contact/page.tsx`, `src/app/api/contact/route.ts` |
| Footer & Contact | `src/modules/web/Footer.tsx` |
| Config & Dependencies | `package.json`, `next.config.ts`, `tsconfig.json`, `.env.example` |

## 6. Current Task Context
- All requested features from rox-portfolio ported, adapted, and integrated into Ritesh's portfolio with full Convex real-time support.

## 7. Last Session Summary
- Verified TypeScript compilation (`pnpm tsc --noEmit` -> 0 errors).
- Built Convex backend, Project Upvotes, Mobile Desktop Recommendation Modal, Contact Page with Resend email API, and AI Agent Chatbot.
