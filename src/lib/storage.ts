import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Storage adapter. Local filesystem in dev; swap `getStorage()` for an S3 /
 * Vercel Blob implementation in production — a config change, not a rewrite.
 * (Vercel's filesystem is read-only, so the local adapter is dev-only.)
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

export function getStorage(): StorageAdapter {
  // e.g. switch on process.env.STORAGE_DRIVER === 's3' | 'blob' here.
  return new LocalStorageAdapter();
}

/** Local adapter stores the filename as the key; derive it from the served URL. */
export function keyFromUrl(url: string): string {
  return url.split('/').pop() ?? '';
}
