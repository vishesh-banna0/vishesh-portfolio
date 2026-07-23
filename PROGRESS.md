# PROGRESS

Newest entries at the top. One short entry per phase. Read this first in any new session.

## Phase 2 — Design-token foundation (done)

Replaced the templated cyan/purple glass system with **"Signal from noise"**: deep cool
graphite base + a **single amber brand accent** that everything derives from. All accent
color now flows from one hue triplet (`--brand-h/s/l`) — the theme customizer (Phase 7)
will only need to change that. Registered `--brand-h` as a typed `@property` and added a
slow, reduced-motion-safe **hue drift (amber → violet)** — the user's "dark+orange to
dark+violet" ask — gated behind `.hue-cycle` on `<html>` so it can be frozen later.
New type system: **Space Grotesk** (display) + **IBM Plex Sans** (body) + **IBM Plex
Mono** (instrument-style labels/data), via `next/font`. New utility primitives
(`.eyebrow`, `.panel`, `.mono-label`, `.tag`, `.hairline`) and a global
`prefers-reduced-motion` floor + keyboard focus-visible floor. Tailwind exposes brand /
surface tokens with alpha slots. Builds clean.

**Note (for Phase 5/6):** typewriter roles + stats (ranks, DSA count) confirmed as
admin-CRUD content — model Hero with an editable roles list + stats list. In Phase 3 the
hardcoded content moves into a typed `src/content/` module to create a clean seam for the
DB later.

**Deferred to Phase 3:** the section markup still uses the old layouts; a few inline
cyan literals remain in Hero/monogram/card glows and get removed when those components
are rewritten.

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
