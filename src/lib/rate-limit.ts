/**
 * Minimal in-memory sliding-window rate limiter. Enough at portfolio scale
 * (single admin, low traffic) per the brief. Not shared across serverless
 * instances — swap for a durable store (Redis/Upstash) if volume ever demands.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
