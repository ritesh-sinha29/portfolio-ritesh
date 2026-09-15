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
- Standardized the `/about` page top header navigation:
  - Centered Magnetic Dock (`HOME`, `ABOUT`, `SKILLS`, `WORKS`) with active route styling.
  - Converted the GitHub profile button to a clean, non-filled outline pill (`bg-white border border-black/10 text-[#141b16]`) removing the solid filled orange background.
  - Updated GitHub Contribution Graph and legend to use official authentic GitHub green colors (`#ebedf0`, `#9be9a8`, `#40c463`, `#30a14e`, `#216e39`) and authentic dark tooltip style (`#24292f`).
  - Reduced the size and padding of the Tech Stack & Skills category filter dock to a compact, sleek pill layout (`text-[10px] sm:text-[11px]`, `px-3 sm:px-3.5 py-1 sm:py-1.5`).
  - Replaced the yellow Zap icon in the `Bounce` button with a clean monochrome `Activity` vector stroke icon (`stroke-[2] text-[#141b16]`) to remove the emoji appearance.
  - Positioned the simple, minimalist `Bounce` and `Drop Again` pills in the top right of the header bar aligned with the navigation.
  - Added frosted glass backdrop (`bg-white/80 backdrop-blur-md`) so buttons remain clearly visible and legible over both light sections and dark footer imagery.
  - Removed left brand avatar on `/about` to keep the layout clean and balanced.
  - Linked physics impulse methods (`handleNudgeAll` and `handleResetDrop`) cleanly via `useImperativeHandle`.
  - Updated portrait container in `KnowMeBetterSection` to `aspect-[3/4]` with `object-cover object-bottom` to match `/2.svg`.

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
- Set up typography and font variables to match rox-portfolio: `Instrument Serif` (`--font-serif`), `Inter` (`--font-sans`), `Fira Code` (`--font-mono`), and `Silkscreen` (`--font-silkscreen`).
- Preserved full editorial headline size (`text-[44px] sm:text-[66px] md:text-[80px] lg:text-[92px]`) on the About page.
- Configured centered magnetic navigation dock on `/about` (`[HOME, ABOUT, SKILLS, WORKS]`) and hid the left logo and right Contact pill on the About page as requested.

## 7. Last Session Summary
- Fixed loader triggers across header button navigations.
- Ported and integrated complete rox-portfolio About architecture into `portfolio-ritesh`.
- Configured font system and centered magnetic dock for `/about`.
