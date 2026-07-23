'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import type { ProjectStatus } from '@prisma/client';

// Refresh the public site and the admin page after any change.
function refresh(adminPath: string) {
  revalidatePath('/');
  revalidatePath(adminPath);
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();
const lines = (s: string) =>
  s
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
const csv = (s: string) =>
  s
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

/** Swap an item's `order` with its neighbor. `delegate` is a Prisma model delegate. */
async function reorder(delegate: any, id: string, dir: 'up' | 'down') {
  const item = await delegate.findUnique({ where: { id } });
  if (!item) return;
  const neighbor = await delegate.findFirst({
    where: dir === 'up' ? { order: { lt: item.order } } : { order: { gt: item.order } },
    orderBy: { order: dir === 'up' ? 'desc' : 'asc' },
  });
  if (!neighbor) return;
  await prisma.$transaction([
    delegate.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    delegate.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ]);
}

async function nextOrder(delegate: any) {
  const max = await delegate.aggregate({ _max: { order: true } });
  return (max._max.order ?? -1) + 1;
}

// ── Typewriter roles ──────────────────────────────────────────────
export async function createRole(fd: FormData) {
  await requireAdmin();
  const text = str(fd, 'text');
  if (!text) return;
  await prisma.typewriterRole.create({ data: { text, order: await nextOrder(prisma.typewriterRole) } });
  refresh('/admin/roles');
}
export async function updateRole(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.typewriterRole.update({ where: { id }, data: { text: str(fd, 'text') } });
  refresh('/admin/roles');
}
export async function deleteRole(id: string) {
  await requireAdmin();
  await prisma.typewriterRole.delete({ where: { id } });
  refresh('/admin/roles');
}
export async function moveRole(id: string, dir: 'up' | 'down') {
  await requireAdmin();
  await reorder(prisma.typewriterRole, id, dir);
  refresh('/admin/roles');
}

// ── Stats ─────────────────────────────────────────────────────────
export async function createStat(fd: FormData) {
  await requireAdmin();
  const value = str(fd, 'value');
  const label = str(fd, 'label');
  if (!value || !label) return;
  await prisma.stat.create({ data: { value, label, order: await nextOrder(prisma.stat) } });
  refresh('/admin/stats');
}
export async function updateStat(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.stat.update({ where: { id }, data: { value: str(fd, 'value'), label: str(fd, 'label') } });
  refresh('/admin/stats');
}
export async function deleteStat(id: string) {
  await requireAdmin();
  await prisma.stat.delete({ where: { id } });
  refresh('/admin/stats');
}
export async function moveStat(id: string, dir: 'up' | 'down') {
  await requireAdmin();
  await reorder(prisma.stat, id, dir);
  refresh('/admin/stats');
}

// ── Education ─────────────────────────────────────────────────────
export async function createEducation(fd: FormData) {
  await requireAdmin();
  await prisma.education.create({
    data: {
      degree: str(fd, 'degree'),
      institution: str(fd, 'institution'),
      shortName: str(fd, 'shortName'),
      period: str(fd, 'period'),
      location: str(fd, 'location'),
      cgpa: str(fd, 'cgpa'),
      description: str(fd, 'description'),
      order: await nextOrder(prisma.education),
    },
  });
  refresh('/admin/education');
}
export async function updateEducation(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.education.update({
    where: { id },
    data: {
      degree: str(fd, 'degree'),
      institution: str(fd, 'institution'),
      shortName: str(fd, 'shortName'),
      period: str(fd, 'period'),
      location: str(fd, 'location'),
      cgpa: str(fd, 'cgpa'),
      description: str(fd, 'description'),
    },
  });
  refresh('/admin/education');
}
export async function deleteEducation(id: string) {
  await requireAdmin();
  await prisma.education.delete({ where: { id } });
  refresh('/admin/education');
}
export async function moveEducation(id: string, dir: 'up' | 'down') {
  await requireAdmin();
  await reorder(prisma.education, id, dir);
  refresh('/admin/education');
}

// ── Writing ───────────────────────────────────────────────────────
export async function createWriting(fd: FormData) {
  await requireAdmin();
  await prisma.writingPost.create({
    data: {
      title: str(fd, 'title'),
      preview: str(fd, 'preview'),
      source: str(fd, 'source'),
      url: str(fd, 'url') || null,
      order: await nextOrder(prisma.writingPost),
    },
  });
  refresh('/admin/writing');
}
export async function updateWriting(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.writingPost.update({
    where: { id },
    data: {
      title: str(fd, 'title'),
      preview: str(fd, 'preview'),
      source: str(fd, 'source'),
      url: str(fd, 'url') || null,
    },
  });
  refresh('/admin/writing');
}
export async function deleteWriting(id: string) {
  await requireAdmin();
  await prisma.writingPost.delete({ where: { id } });
  refresh('/admin/writing');
}
export async function moveWriting(id: string, dir: 'up' | 'down') {
  await requireAdmin();
  await reorder(prisma.writingPost, id, dir);
  refresh('/admin/writing');
}

// ── Projects ──────────────────────────────────────────────────────
function projectData(fd: FormData) {
  return {
    slug: str(fd, 'slug'),
    title: str(fd, 'title'),
    summary: str(fd, 'summary'),
    description: str(fd, 'description'),
    stack: csv(str(fd, 'stack')),
    githubUrl: str(fd, 'githubUrl') || null,
    liveUrl: str(fd, 'liveUrl') || null,
    featured: fd.get('featured') === 'on',
    status: (str(fd, 'status') || 'SHIPPED') as ProjectStatus,
    year: str(fd, 'year') || null,
  };
}
export async function createProject(fd: FormData) {
  await requireAdmin();
  await prisma.project.create({ data: { ...projectData(fd), order: await nextOrder(prisma.project) } });
  refresh('/admin/projects');
}
export async function updateProject(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: projectData(fd) });
  refresh('/admin/projects');
}
export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  refresh('/admin/projects');
}
export async function moveProject(id: string, dir: 'up' | 'down') {
  await requireAdmin();
  await reorder(prisma.project, id, dir);
  refresh('/admin/projects');
}

// ── Theme ─────────────────────────────────────────────────────────
const clamp = (n: number, lo: number, hi: number, d: number) =>
  Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;

export async function saveTheme(input: {
  brandH: number;
  brandS: number;
  brandL: number;
  hueCycle: boolean;
  radius: number;
}) {
  await requireAdmin();
  const data = {
    brandH: clamp(input.brandH, 0, 360, 38),
    brandS: Math.round(clamp(input.brandS, 0, 100, 96)),
    brandL: Math.round(clamp(input.brandL, 20, 80, 56)),
    hueCycle: Boolean(input.hueCycle),
    radius: clamp(input.radius, 0, 1.5, 0.5),
  };
  const existing = await prisma.themeSetting.findFirst();
  if (existing) await prisma.themeSetting.update({ where: { id: existing.id }, data });
  else await prisma.themeSetting.create({ data });
  // Theme lives in the root layout — revalidate the whole tree.
  revalidatePath('/', 'layout');
}

// ── Hero / Profile (single row) ───────────────────────────────────
export async function updateProfile(fd: FormData) {
  await requireAdmin();
  const data = {
    name: str(fd, 'name'),
    role: str(fd, 'role'),
    location: str(fd, 'location'),
    email: str(fd, 'email'),
    resumeUrl: str(fd, 'resumeUrl'),
    currently: str(fd, 'currently'),
    thesis: str(fd, 'thesis'),
    githubUrl: str(fd, 'githubUrl'),
    linkedinUrl: str(fd, 'linkedinUrl'),
    githubHandle: str(fd, 'githubHandle'),
  };
  const existing = await prisma.profile.findFirst();
  if (existing) await prisma.profile.update({ where: { id: existing.id }, data });
  else await prisma.profile.create({ data });
  refresh('/admin/hero');
}

// ── About (single row) ────────────────────────────────────────────
export async function updateAbout(fd: FormData) {
  await requireAdmin();
  const spec = lines(str(fd, 'spec')).map((line) => {
    const [key, ...rest] = line.split('|');
    return { key: (key ?? '').trim(), value: rest.join('|').trim() };
  });
  const data = {
    lede: str(fd, 'lede'),
    paragraphs: lines(str(fd, 'paragraphs')),
    focus: lines(str(fd, 'focus')),
    spec,
  };
  const existing = await prisma.about.findFirst();
  if (existing) await prisma.about.update({ where: { id: existing.id }, data });
  else await prisma.about.create({ data });
  refresh('/admin/about');
}
