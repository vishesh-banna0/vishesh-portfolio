# Deploying to Vercel

This moves the site from static content to a **Postgres-backed CMS**, so it's not a
from-scratch deploy — the main new work is the production database and env vars. The app is
already build-verified locally; Vercel auto-detects Next.js and runs `prisma generate` via
the `postinstall` script.

> **Migrations run on deploy.** `npm run build` is
> `prisma migrate deploy && next build`, so a new migration reaches the production DB as part
> of the build. Adding a column to `schema.prisma` **without** committing its migration will
> now fail the build instead of 500-ing at runtime — that's deliberate.

## 1. Production database

You already have a **Neon** project (used in dev). For production you can reuse it, or
create a separate Neon project / branch for clean separation (recommended long-term).

- **Reusing the current Neon DB:** the schema + seed are already applied, so nothing to run.
- **New prod DB:** set its URL locally and run:
  ```bash
  npx prisma migrate deploy    # applies migrations (no dev prompts)
  npm run db:seed              # optional: seed starter content
  ```

Grab **both** connection strings from Neon:
- **Pooled** (host has `-pooler`) → `DATABASE_URL` (runtime, serverless-friendly).
- **Direct** (no `-pooler`) → `DIRECT_URL` (migrations).

## 2. Vercel environment variables

In the Vercel project → **Settings → Environment Variables**, add these for
**Production** (and Preview if you want preview deploys to work):

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DIRECT_URL` | Neon **direct** connection string |
| `AUTH_SECRET` | a fresh long random string — `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"` |
| `ADMIN_EMAIL` | your admin email |
| `ADMIN_PASSWORD_HASH` | the **raw** bcrypt hash from `npm run hash-password` — **no `\$` escaping** (the Vercel UI does not expand `$`) |
| `SITE_URL` | your production URL, e.g. `https://visheshshekhawat.com` |

> The `\$` escaping only applies to a local `.env` file. In the Vercel dashboard, paste the
> raw hash.

## 3. Media storage (needed for uploads in production)

The local storage adapter writes to disk, which **won't work on Vercel** (read-only
filesystem). Everything else works without this; only media *uploads* need it. To enable:

1. `npm i @vercel/blob` and enable Blob storage in the Vercel dashboard (gives you a
   `BLOB_READ_WRITE_TOKEN`, auto-added to env).
2. Add a Blob adapter in `src/lib/storage.ts` and return it from `getStorage()` when
   `process.env.BLOB_READ_WRITE_TOKEN` is set:
   ```ts
   import { put, del } from '@vercel/blob';
   class BlobStorageAdapter implements StorageAdapter {
     async save({ buffer, filename, mimeType }) {
       const safe = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
       const res = await put(safe, buffer, { access: 'public', contentType: mimeType });
       return { url: res.url, key: res.url };
     }
     async delete(key) { await del(key); }
   }
   export function getStorage() {
     return process.env.BLOB_READ_WRITE_TOKEN ? new BlobStorageAdapter() : new LocalStorageAdapter();
   }
   ```
   (Blob returns absolute URLs, so `app/media/[file]` is only used by the local adapter.)

## 4. Deploy

Vercel deploys your **production branch** (usually `main`). This branch is `redesign-cms`
with 10 commits ahead of `main`.

- **Recommended:** open a PR `redesign-cms → main`, review the diff, merge → Vercel builds
  and deploys production.
- Or push `redesign-cms` first to get a **preview deploy** (set the env vars for Preview too),
  verify, then merge to `main`.

## 5. Post-deploy checks

- Visit `/` — content loads from the DB; accent + hue-drift work.
- `/admin/login` — sign in with your admin creds; edit a stat and confirm it publishes.
- `/robots.txt`, `/sitemap.xml` resolve; `/opengraph-image` renders.
- Run **Lighthouse** (Chrome DevTools) on the deployed URL and address anything under 95.
