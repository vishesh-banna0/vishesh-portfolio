import path from 'node:path';
import { defineConfig } from 'prisma/config';
import nextEnv from '@next/env';

// Prisma doesn't auto-load .env for the config file, so do it here.
nextEnv.loadEnvConfig(process.cwd());

// Prisma 7 keeps the connection URL out of schema.prisma; migrate/introspect read
// it from here. The runtime client uses the pg adapter in src/lib/prisma.ts.
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    // Migrations need a DIRECT (non-pooled) connection; fall back to DATABASE_URL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
