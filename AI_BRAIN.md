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
| Core Layout & Global Styles | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/providers/LoadingProvider.tsx` |
| Navigation Header & Dock | `src/modules/web/Header.tsx`, `src/components/tweenlabs/MagneticDock.tsx` |
| Home Page & Overlay | `src/app/page.tsx`, `src/modules/web/Hero.tsx`, `src/modules/web/Overlay_about-me.tsx` |
| Dedicated About Page | `src/app/about/page.tsx`, `src/modules/about/PlayfulPhysicsCanvas.tsx`, `src/modules/about/KnowMeBetterSection.tsx`, `src/modules/about/TechStackSkills.tsx`, `src/modules/about/GitHubActivitySection.tsx` |
| Selected Works Page | `src/app/work/page.tsx`, `src/modules/web/ProjectsSection.tsx` |
| Footer & Contact | `src/modules/web/Footer.tsx` |
| Config & Dependencies | `package.json`, `next.config.ts`, `tsconfig.json` |

## 6. Current Task Context
- Completed seamless header navigation with session-level `LoadingProvider` to eliminate re-triggering the loader.
- Added "Know More" button in the Home About section linking to `/about`.
- Created and ported complete `/about` page featuring Matter.js 2D rigid-body interactive physics simulation (`PlayfulPhysicsCanvas`), expandable story cards (`KnowMeBetterSection`), technical arsenal (`TechStackSkills`), and real-time live GitHub contributions & pinned repos (`GitHubActivitySection`).
- Configured universal Header routing so clicking "ABOUT" seamlessly navigates to `/about`.

## 7. Last Session Summary
- Fixed loader triggers across header button navigations.
- Ported and integrated complete rox-portfolio About architecture into `portfolio-ritesh`.
