/**
 * Session tokens (JWT via jose). Edge-safe — safe to import from middleware.
 * Deliberately free of bcrypt or Node-only APIs.
 */
import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'admin_session';
const ALG = 'HS256';
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error('AUTH_SECRET is missing or too short (set a long random string in .env)');
  }
  return new TextEncoder().encode(s);
}

export type SessionPayload = { sub: string; role: string };

export async function signSession(
  payload: SessionPayload,
  maxAgeSeconds = DEFAULT_MAX_AGE,
): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: ALG })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAgeSeconds)
    .sign(secret());
}

export async function verifySession(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: [ALG] });
    if (!payload.sub) return null;
    return { sub: String(payload.sub), role: String(payload.role ?? 'admin') };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAgeSeconds = DEFAULT_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}
