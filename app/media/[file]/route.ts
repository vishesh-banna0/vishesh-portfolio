import { promises as fs } from 'node:fs';
import path from 'node:path';
import { UPLOAD_DIR } from '@/lib/storage';

const TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

// Serves locally-stored uploads. (In production, a cloud storage adapter would
// serve these directly and this route would be unused.)
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const name = params.file;
  // Reject anything that isn't a plain sanitized filename (no path traversal).
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
    return new Response('Bad request', { status: 400 });
  }
  try {
    const buffer = await fs.readFile(path.join(UPLOAD_DIR, name));
    const type = TYPES[path.extname(name).toLowerCase()] ?? 'application/octet-stream';
    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
