// Seeds the database from the typed content module (the pre-CMS source of truth).
// Idempotent: clears the seeded tables, then re-inserts. Run via `prisma db seed`
// or `npm run db:seed`.
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import { PrismaClient, ProjectStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  profile,
  roles,
  stats,
  about,
  projects,
  education,
  writing,
} from '../src/content/portfolio';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const statusMap: Record<string, ProjectStatus> = {
  shipped: 'SHIPPED',
  research: 'RESEARCH',
  building: 'BUILDING',
};

async function main() {
  await prisma.$transaction([
    prisma.typewriterRole.deleteMany(),
    prisma.stat.deleteMany(),
    prisma.project.deleteMany(),
    prisma.education.deleteMany(),
    prisma.writingPost.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.about.deleteMany(),
    prisma.themeSetting.deleteMany(),
  ]);

  await prisma.profile.create({
    data: {
      name: profile.name,
      role: profile.role,
      location: profile.location,
      email: profile.email,
      resumeUrl: profile.resumeUrl,
      profileImageUrl: profile.profileImageUrl,
      currently: profile.currently,
      thesis: profile.thesis,
      githubUrl: profile.socials.github,
      linkedinUrl: profile.socials.linkedin,
      githubHandle: profile.githubHandle,
    },
  });

  await prisma.about.create({
    data: {
      lede: about.lede,
      paragraphs: [...about.paragraphs],
      focus: [...about.focus],
      spec: about.spec.map((s) => ({ key: s.k, value: s.v })),
    },
  });

  await prisma.typewriterRole.createMany({
    data: roles.map((text, i) => ({ text, order: i })),
  });

  await prisma.stat.createMany({
    data: stats.map((s, i) => ({ value: s.value, label: s.label, order: i })),
  });

  await prisma.project.createMany({
    data: projects.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      description: p.description,
      stack: [...p.stack],
      githubUrl: p.githubUrl ?? null,
      liveUrl: p.liveUrl ?? null,
      featured: p.featured ?? false,
      status: statusMap[p.status ?? 'shipped'],
      year: p.year ?? null,
      order: i,
    })),
  });

  await prisma.education.createMany({
    data: education.map((e, i) => ({
      degree: e.degree,
      institution: e.institution,
      shortName: e.shortName,
      period: e.period,
      location: e.location,
      cgpa: e.cgpa,
      description: e.description,
      order: i,
    })),
  });

  await prisma.writingPost.createMany({
    data: writing.map((w, i) => ({
      title: w.title,
      preview: w.preview,
      source: w.source,
      url: w.url ?? null,
      order: i,
    })),
  });

  // Theme defaults (single row).
  await prisma.themeSetting.create({ data: {} });

  console.log('✔ Seeded profile, about, roles, stats, projects, education, writing, theme.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
