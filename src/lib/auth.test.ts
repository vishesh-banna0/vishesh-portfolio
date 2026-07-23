// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import bcrypt from 'bcryptjs';
import { verifyCredentials } from './auth';

beforeAll(() => {
  process.env.ADMIN_EMAIL = 'admin@example.com';
  process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync('correct horse battery', 10);
});

describe('verifyCredentials', () => {
  it('accepts the correct email and password', async () => {
    expect(await verifyCredentials('admin@example.com', 'correct horse battery')).toBe(true);
  });

  it('treats email case-insensitively', async () => {
    expect(await verifyCredentials('ADMIN@Example.com', 'correct horse battery')).toBe(true);
  });

  it('rejects a wrong password', async () => {
    expect(await verifyCredentials('admin@example.com', 'wrong')).toBe(false);
  });

  it('rejects a wrong email', async () => {
    expect(await verifyCredentials('someone@else.com', 'correct horse battery')).toBe(false);
  });

  it('rejects when env is not configured', async () => {
    const prev = process.env.ADMIN_PASSWORD_HASH;
    delete process.env.ADMIN_PASSWORD_HASH;
    expect(await verifyCredentials('admin@example.com', 'correct horse battery')).toBe(false);
    process.env.ADMIN_PASSWORD_HASH = prev;
  });
});
