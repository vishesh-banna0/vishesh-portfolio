import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { put, del } from '@vercel/blob';

/**
 * Storage adapter. Local filesystem in dev; Vercel Blob in production — selected
 * by env, not a rewrite. Vercel's own filesystem is read-only, so the local
 * adapter can only work under `next dev` / `next start` on a real disk.
 */
export interface StorageAdapter {
  save(input: { buffer: Buffer; filename: string; mimeType: string }): Promise<{ url: string; key: string }>;
  delete(key: string): Promise<void>;
}

// Private dir (NOT public/) served via app/media/[file]/route.ts, so it works under
// `next dev` and `next start` alike (public/ is snapshotted at build time).
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

class LocalStorageAdapter implements StorageAdapter {
  async save({ buffer, filename }: { buffer: Buffer; filename: string; mimeType: string }) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const safe = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    await fs.writeFile(path.join(UPLOAD_DIR, safe), buffer);
    return { url: `/media/${safe}`, key: safe };
  }

  async delete(key: string) {
    await fs.unlink(path.join(UPLOAD_DIR, key)).catch(() => {});
  }
}

// Vercel Blob: durable, publicly-served object storage. Used whenever a
// read/write token is present (i.e. on Vercel). `put` returns an absolute,
// CDN-backed URL we store as-is; `del` takes that same URL back.
class VercelBlobAdapter implements StorageAdapter {
  async save({ buffer, filename, mimeType }: { buffer: Buffer; filename: string; mimeType: string }) {
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const { url } = await put(safe, buffer, {
      access: 'public',
      contentType: mimeType,
      addRandomSuffix: true, // avoid collisions when re-uploading the same name
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url, key: url };
  }

  async delete(key: string) {
    await del(key, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(() => {});
  }
}

export function getStorage(): StorageAdapter {
  // On Vercel the FS is read-only, so a Blob token means "use Blob". Locally,
  // absent the token, fall back to the on-disk adapter.
  if (process.env.BLOB_READ_WRITE_TOKEN) return new VercelBlobAdapter();
  return new LocalStorageAdapter();
}

/**
 * Derive the delete key from the stored URL. Blob stores an absolute URL that
 * `del` consumes directly; the local adapter stores a `/media/<file>` path
 * whose key is just the filename.
 */
export function keyFromUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return url.split('/').pop() ?? '';
}
