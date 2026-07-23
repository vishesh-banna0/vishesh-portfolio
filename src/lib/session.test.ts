// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import { signSession, verifySession } from './session';

beforeAll(() => {
  process.env.AUTH_SECRET = 'test-secret-at-least-16-characters-long';
});

describe('session tokens', () => {
  it('round-trips a valid session', async () => {
    const token = await signSession({ sub: 'a@b.com', role: 'admin' });
    expect(await verifySession(token)).toEqual({ sub: 'a@b.com', role: 'admin' });
  });

  it('rejects a tampered token', async () => {
    const token = await signSession({ sub: 'a@b.com', role: 'admin' });
    const tampered = token.slice(0, -3) + 'xyz';
    expect(await verifySession(tampered)).toBeNull();
  });

  it('rejects empty or undefined tokens', async () => {
    expect(await verifySession(undefined)).toBeNull();
    expect(await verifySession('')).toBeNull();
  });

  it('rejects a token signed with a different secret', async () => {
    const token = await signSession({ sub: 'a@b.com', role: 'admin' });
    process.env.AUTH_SECRET = 'a-completely-different-secret-key-1234';
    const result = await verifySession(token);
    process.env.AUTH_SECRET = 'test-secret-at-least-16-characters-long';
    expect(result).toBeNull();
  });
});
