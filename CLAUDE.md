# CLAUDE.md — Project conventions & decisions

Working doc for anyone (human or Claude) picking this repo up. Read `PROGRESS.md` first
for where things stand, then this for *how* the project is built and *why*.

## What this is

Personal portfolio for **Vishesh Shekhawat** — an ML/AI systems engineer (M.Tech AI @ NIT
Jalandhar). Being rebuilt from a static Vite/React SPA into a **Next.js App Router site
backed by an admin CMS**, so content is DB-driven and the theme is admin-configurable
without a redeploy.

## Tech stack (decided)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Migrated off Vite in Phase 1. One deploy target, SSR/SSG for SEO, route handlers for the API. |
| UI | React 18 + TypeScript + Tailwind 3 + shadcn/ui (Radix) | Kept from the original scaffold. |
| Data fetching | React Query (client) + Server Components / route handlers | |
| Motion | CSS keyframes now; Framer Motion planned in the redesign phase | All motion must respect `prefers-reduced-motion`. |
| DB | PostgreSQL + **Prisma** | Added in the data-layer phase. |
| Auth | Auth.js (NextAuth) or lightweight JWT — decided in the auth phase | Single admin, but the user model carries a `role`. |
| Storage | Local FS in dev behind a storage-adapter interface | Swap to S3/Cloudinary later via config, not a rewrite. |
| Hosting | Vercel (site already lives there) | |

## Folder conventions

- `app/` — Next.js App Router. Routes, layouts, route handlers (`app/api/**`).
  - `app/layout.tsx` — root layout: `<html>`, fonts (next/font), metadata, `<Providers>`.
  - `app/page.tsx` — the public portfolio (Server Component composing the sections).
  - `app/providers.tsx` — **client** wrapper for React Query / Tooltip / theme / toasters.
  - `app/globals.css` — the design system (was `src/index.css`).
- `src/components/` — feature/section components (`Hero`, `About`, …) + `src/components/ui/` (shadcn).
- `src/content/portfolio.ts` — **single source of truth for all site content** (profile,
  typewriter roles, stats, about, projects, education, writing, nav). Components read from
  here; nothing is hardcoded in JSX. This is the seam the CMS plugs into: Phase 5 seeds the
  DB from these shapes, Phase 6 swaps components to read from the DB.
- `src/hooks/`, `src/lib/` — shared hooks and utilities.
- `scripts/screenshot.mjs` — Playwright breakpoint capture for visual QA (run the app, then
  `node scripts/screenshot.mjs <outDir>`).
- Path alias: `@/*` → `src/*` (set in `tsconfig.json`).

## Naming & code conventions

- Components: `PascalCase.tsx`, one component per file, default export for section
  components (matches the existing code — don't churn this).
- Any component using state/effects/refs/browser APIs/event handlers needs `"use client"`
  at the top. Server Components are the default; keep them server-only where possible.
- Match the surrounding code's style (comment density, Tailwind-first styling). Comments
  only where the *why* isn't obvious.

## "Don't touch" / gotchas

- **`src/components/ui/*`** are shadcn-generated. Prefer regenerating via the CLI over
  hand-editing; the interactive ones carry `"use client"`.
- **Design tokens are not yet real tokens.** `app/globals.css` still hardcodes the literal
  accent `hsl(195 100% 50%)` (cyan) / `hsl(270 80% 60%)` (purple) in many places, and a few
  components inline the same literals. The Foundation phase replaces these with a single
  configurable `--accent`. Until then, don't add new hardcoded accent literals.
- `next build` has ESLint disabled (`eslint.ignoreDuringBuilds`) because the repo still
  uses the flat-config ESLint from the Vite era. Run `npm run lint` manually.
- Tests run on **Vitest** (not Next's runner). `@vitejs/plugin-react-swc` + `vite` are kept
  in devDeps solely for the Vitest toolchain.

## Commands

- `npm run dev` — Next dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — Vitest once; `npm run test:watch` — watch mode
