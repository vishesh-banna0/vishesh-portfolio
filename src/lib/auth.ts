/**
 * Credential verification for the single admin. Reads the expected email and a
 * bcrypt password *hash* from env (never a plaintext password). Node-only
 * (bcryptjs) — do not import from edge middleware.
 */
import bcrypt from 'bcryptjs';

/** Constant-time-ish string compare to avoid leaking match length/position. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !hash) return false;

  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());
  // Always run bcrypt (even on email mismatch) to keep timing uniform.
  const passOk = await bcrypt.compare(password, hash).catch(() => false);
  return emailOk && passOk;
}
