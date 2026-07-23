# PROGRESS

Newest entries at the top. One short entry per phase. Read this first in any new session.

## Phase 4 — Auth (done)

Env-based single-admin login exactly as the user asked — no public registration.

- **Split by runtime:** `src/lib/session.ts` (JWT via `jose`, edge-safe — imported by
  middleware) vs `src/lib/auth.ts` (bcrypt credential check via `bcryptjs`, node-only).
- **Flow:** `POST /api/auth/login` verifies `ADMIN_EMAIL` + `bcrypt.compare` against
  `ADMIN_PASSWORD_HASH`, issues a signed JWT in an httpOnly/secure/sameSite cookie;
  `middleware.ts` gates `/admin/*` (and bounces logged-in users off `/admin/login`);
  `POST /api/auth/logout` clears it. Basic in-memory rate limit on login.
- **UI:** styled login page + protected dashboard shell (`AdminShell`) with sign-out;
  whole `/admin` area is `noindex`. Dashboard layout re-checks the session (defense depth).
- **DX:** `npm run hash-password` prints the bcrypt hash (raw + a `.env`-escaped line).
  `.env.example` documents the vars; `.env` is gitignored.
- **Tests:** `session.test.ts` + `auth.test.ts` (10 pass; run in node env via
  `// @vitest-environment node`; fixed `setup.ts` to guard `window`).
- **Verified end to end** with curl: redirect when unauthenticated, 401 on bad password,
  200 + cookie on success, dashboard reachable, logout works. Login + dashboard
  screenshotted.

**Gotcha found & handled:** bcrypt hashes contain `$`, which Next's `.env` loader expands
as variables — a local `.env` must escape them as `\$` (Vercel's env UI takes the raw hash).
The hash-password script and `.env.example` now spell this out.

## Phase 3 — Portfolio redesign (done)

Rebuilt every section with a distinct layout on the "Signal from noise" system, verified
at mobile/tablet/desktop via Playwright screenshots.

- **Content centralized** into `src/content/portfolio.ts` (typed) — the CMS seam. Roles +
  stats live here as the editable lists the admin will manage.
- **Hero:** denoising canvas signature (noise → structure on load; "signal" dots pick up
  the live drifting hue; reduced-motion-safe), name in Space Grotesk, typewriter, thesis,
  CTAs, a profile "instrument panel," and a 6-up mono stat readout.
- **About:** editorial narrative + a mono "datasheet" (spec + focus tags) — not a card grid.
- **Work:** technical project index — featured Prospera.ai panel + a 2-col grid, mono tech
  tags, restyled detail modal. Dropped the hotlinked stock images (link-rot + LCP win).
- **Timeline:** a proper rail timeline with nodes (was image-cover cards).
- **Writing:** a clean essay index. **Contact:** centered CTA + mono channel grid.
- New Navbar (scrollspy + résumé), Footer (colophon). Section order now leads with work.
- **Robust reveals:** `Reveal` guarantees visibility via a safety timer (never trapped at
  opacity:0) and honors reduced motion. Removed Education/Blogs/AnimatedProfileFrame/
  VSMonogram/useScrollAnimation. Build + typecheck green.

**Placeholder to confirm:** `metadataBase` domain in `app/layout.tsx` is a guess — set the
real production URL in the SEO/deploy phase. Contact is channels + mailto for now; the
working form arrives with the data layer.

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
