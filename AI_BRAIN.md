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

## 5. Important File Map
| Section | Files |
| :--- | :--- |
| Core Layout & Global Styles | `src/app/layout.tsx`, `src/app/globals.css` |
| Hero / About | `src/components/Hero.*`, `src/components/About.*` or `src/modules/` |
| Projects / Work | `src/components/Projects.*`, `src/modules/projects/` |
| Skills / Experience | `src/components/Skills.*`, `src/components/Experience.*` |
| Contact Form | `src/components/Contact.*` |
| Config & Dependencies | `package.json`, `next.config.ts`, `tsconfig.json` |

## 6. Current Task Context
- Current task: Initialized AI Brain architecture for token optimization.
- Relevant files: `AI_BRAIN.md`, `AGENTS.md`, `AI_RULES.md`, `SESSION_MEMORY.md`, `.agents/rules/token_efficient_memory.md`

## 7. Last Session Summary
- Portfolio AI Brain initialized successfully with token-efficient architecture.
