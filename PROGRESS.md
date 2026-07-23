# PROGRESS

Newest entries at the top. One short entry per phase. Read this first in any new session.

## Phase 10 — Redeploy (prepared — awaiting user deploy actions)

The app is **deploy-ready** (production build verified; `postinstall: prisma generate` for
Vercel; DB reads fall back so the build never needs a live DB). Wrote **`DEPLOY.md`** with
the full checklist. Remaining steps are user-driven (their Vercel account + secrets):

1. Production Postgres — reuse the current Neon DB (schema+seed already applied) or a new
   one (`prisma migrate deploy` + `db:seed`).
2. Set Vercel env vars: `DATABASE_URL` (pooled), `DIRECT_URL` (direct), `AUTH_SECRET`,
   `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (**raw** hash on Vercel), `SITE_URL`.
3. **Media in prod:** swap `getStorage()` to a Vercel Blob adapter (code in DEPLOY.md) —
   local FS is dev-only. Everything except uploads works without it.
4. Merge `redesign-cms → main` (10 commits) → Vercel deploys production.
5. Post-deploy: verify site + admin, run Lighthouse.

## Phase 9 — Polish (SEO + a11y) (done)

- **SEO:** `app/robots.ts` (allow /, disallow /admin + /api) + `app/sitemap.ts`;
  `generateMetadata` on the homepage derives title/description **from the DB profile**
  (so editing the profile updates SEO — no separate settings model needed) + canonical;
  JSON-LD `Person` schema; dynamic OG image (`app/opengraph-image.tsx`, rendered
  on-request to dodge a @vercel/og Windows-build issue). `SITE_URL` env drives absolute
  URLs. Removed the stale Vite `robots.txt` + `placeholder.svg`.
- **a11y:** skip-to-content link; global focus-visible outline + reduced-motion floor
  (from Phase 2); nav/contact ARIA labels; denoise canvas `aria-hidden`; `<html lang>`.
- **Verified:** robots.txt/sitemap.xml serve correctly; homepage carries JSON-LD +
  canonical + OG tags; final responsive pass at mobile/tablet/desktop shows no regressions.

**Deferred/notes:** Lighthouse not run here (no Chrome+CLI in this env) — fundamentals are
in place (semantic HTML, next/font, next/image hero, lazy reveals, minimal JS); run
Lighthouse post-deploy. Public pages are `force-dynamic` for CMS freshness — could add ISR
+ on-demand revalidation later for higher scores. A dedicated SEO-settings model (custom
OG image, per-field overrides) is a future enhancement.

## Phase 8 — Media manager (done)

Upload / list / delete / copy-URL behind a **storage-adapter interface**
(`src/lib/storage.ts`) so cloud storage is a config swap, not a rewrite.

- `uploadMedia` / `deleteMedia` server actions (guarded); records in the `Media` table.
- `/admin/media`: client `Uploader` (validates type + 8 MB), thumbnail grid, `CopyButton`,
  delete. Nav updated.
- **Local adapter writes to a private `uploads/` dir** (gitignored) served via
  `app/media/[file]/route.ts` — works under both `next dev` and `next start` (unlike
  `public/`, which Next snapshots at build). Path-traversal guarded.
- **Verified:** uploaded an image via the admin → appeared in the grid → `GET /media/…`
  returns 200. Cleaned up the test asset.

**Important for production:** the local FS adapter is dev-only — Vercel's filesystem is
read-only. Swap `getStorage()` to a cloud adapter (Vercel Blob / S3) for production; the
`Media.url` + route indirection means stored records keep working. Flagged for Phase 10.

## Phase 7 — Theme customizer (done)

Admin-controlled accent + motion, applied site-wide with no redeploy.

- `ThemeSetting` row read in the root layout, injected as `:root` CSS vars +
  conditional `hue-cycle` class. `getTheme()` with default fallback; `saveTheme`
  server action (`revalidatePath('/', 'layout')`).
- `/admin/theme` → `ThemeCustomizer` (client): 8 accent presets, hue/sat/lightness/
  radius sliders, hue-cycle toggle, **live preview** across the whole admin, a
  saved→preview compare, **Save / Reset / Export / Import (JSON)**.
- **Refactored the drift to be relative to the chosen accent** (`--brand-h =
  --brand-h-base + animated offset`), so presets anchor the hue even with cycle on;
  the default amber→violet drift is unchanged.
- **Verified:** set Purple + cycle-off → live homepage computed `--brand-h: 270`
  (fixed); Reset → back to amber (~38) with drift on. Restored default; build green.

## Phase 6b — Admin CMS core (done)

CRUD for all visible content, built on **Next.js server actions** (each guarded by
`requireAdmin()`, then `revalidatePath('/')` so edits publish immediately).

- `src/lib/admin-actions.ts` — create/update/delete/reorder for Roles, Stats, Education,
  Writing, Projects; single-row save for Hero/Profile and About. Generic `reorder` helper.
- Admin pages under `app/admin/(dashboard)/{hero,about,projects,education,writing,roles,
  stats}` — server components with inline forms; shared controls in
  `src/components/admin/controls.tsx`. Sidebar nav updated.
- **Loop verified with Playwright:** logged in, added a stat in the admin, and the public
  homepage rendered it (`stat on homepage: true`); screenshotted the Stats + Projects
  editors; cleaned up the test row. Build + typecheck green.

**Deferred/notes:** the "add" forms keep their typed values after submit (uncontrolled
inputs) — cosmetic, fix in polish. Experience & Skills models exist but have no site
section/CRUD yet (schema-ready). Rich-text editor for long fields is plain textarea for now.

## Phase 6a — Public site reads from DB (done)

Added `src/lib/queries.ts` (server-only) with one query per content type, each returning
the same shape the content module exports and **falling back to that module** if the DB is
empty/unreachable (site never breaks). `app/page.tsx` is now an async Server Component
(`force-dynamic`) that fetches everything and passes it to the sections as props; the seven
section components were refactored from importing content to receiving props (render logic
unchanged). Verified: homepage 200, renders identically from Neon at all breakpoints.
Next (6b): admin CRUD to edit this content.

## Phase 5 — Data layer (done)

Postgres (Neon) + **Prisma 7** with the **pg driver adapter** (engine-free — the WASM
query compiler works in this restricted-install environment where native engines don't).

- **Schema** (`prisma/schema.prisma`): User (schema-ready), Profile, TypewriterRole, Stat,
  About (paragraphs/focus/spec inline), Project (+ ProjectStatus enum), Education,
  Experience, Skill, WritingPost, ThemeSetting, Media, ContactMessage.
- **Prisma 7 specifics:** connection URL lives in `prisma.config.ts` (not the schema);
  runtime client uses `PrismaPg` in `src/lib/prisma.ts`. Config uses `DIRECT_URL ??
  DATABASE_URL` because migrations need a non-pooled connection.
- **Seed** (`prisma/seed.ts`, run via `tsx`) loads the typed content module into the DB;
  idempotent (clears then inserts). `db:generate/migrate/seed/studio` npm scripts added;
  `postinstall: prisma generate` so Vercel regenerates the client.
- **Verified against Neon:** migration applied, seed produced
  `profile:1, roles:7, stats:6, projects:6, education:2, writing:2, theme:1, about:1`;
  featured project = Prospera.ai. Typecheck clean. `.env` (real connection string) is
  gitignored; migration history is committed.

**Gotchas handled:** Prisma 7 moved the datasource URL out of the schema and requires a
driver adapter; `env()` in the config throws on unset vars (load `.env` first, use
`process.env`); the seed's `@next/env` needs a *named* import under tsx; tsx compiles to
CJS so no top-level await in scripts.

**Deferred/notes:** pg warns that `sslmode=require` is treated as `verify-full` (future pg
v9 change) — fine for now. Components still read from the content module; Phase 6 switches
them to the DB. Neon URL here is the direct endpoint; production will use the pooled one.

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
