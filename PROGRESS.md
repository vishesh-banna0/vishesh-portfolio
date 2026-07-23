# PROGRESS

Newest entries at the top. One short entry per phase. Read this first in any new session.

## Phase 1 — Next.js migration (done)

Migrated the Vite + React Router SPA to **Next.js 14 App Router** with no visual/content
change. Added `app/` (layout with next/font Inter + JetBrains Mono, metadata from the old
`index.html`, `page.tsx` composing the sections, `not-found.tsx`, `providers.tsx` for
React Query / Tooltip / theme / toasters); `app/globals.css` = the old design system.
Marked interactive components `"use client"`. Removed Vite, react-router-dom,
lovable-tagger, `index.html`, `main.tsx`, `App.tsx`, `App.css`, `src/pages/*`, dead
`NavLink.tsx`. Switched PostCSS config to `.mjs` (Next couldn't read the ESM `.js` under
`"type":"module"`). Pinned Node via `.nvmrc` + `engines`.

**Verified:** `next build` compiles + type-checks clean; both routes prerender static;
`npm test` green (1/1); prod server renders all section content server-side (Hero, About,
Education, Projects, Contact) — an SEO gain over the old client-only render. Auth decision
locked: single-admin env-based login (`ADMIN_EMAIL` + bcrypt `ADMIN_PASSWORD_HASH` +
`AUTH_SECRET`), JWT in an httpOnly cookie, `.env` gitignored — see Phase 4.

**Deferred:** automated Playwright breakpoint screenshots (browser binary install is
sandbox-restricted here) — revisit at the redesign phase; for now verified via build +
SSR render. Converting remote `<img>` to `next/image` deferred to the redesign.

## Phase 0 — Discovery & plan (done)

Audited the repo: Lovable-generated **Vite + React 18 + TS + Tailwind 3 + shadcn/ui** SPA,
`react-router-dom`, all content hardcoded in component arrays, dark-only cyan/purple glass
design system with the accent baked in as literals (not real tokens). Confirmed the brief's
**Next.js App Router + Prisma/Postgres + CMS** direction; the audit supports the migration
rather than contradicting it. Decisions locked with the user: **migrate to Next.js first,
then redesign**, and target the **lean launch (phases 0–7 + 10)** — defer the drag-and-drop
section builder, full analytics, and blog. Phase plan finalized in the session and mirrored
in the todo list. `CLAUDE.md` created.
