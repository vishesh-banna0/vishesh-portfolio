import 'server-only';
import { prisma } from './prisma';
import * as content from '@/content/portfolio';

/**
 * Read-side data access for the public site (Server Components).
 *
 * Every query falls back to the typed content module if the DB is empty or
 * unreachable, so the site keeps rendering during first setup or an outage.
 * Each returns the SAME shape the content module exports, so section components
 * needed no rewrite — only their data source changed (props instead of import).
 */

export async function getProfile() {
  try {
    const p = await prisma.profile.findFirst();
    if (p) {
      return {
        name: p.name,
        githubHandle: p.githubHandle,
        role: p.role,
        location: p.location,
        email: p.email,
        resumeUrl: p.resumeUrl,
        currently: p.currently,
        thesis: p.thesis,
        socials: { github: p.githubUrl, linkedin: p.linkedinUrl },
      };
    }
  } catch {
    /* fall through */
  }
  return content.profile;
}

export async function getRoles(): Promise<string[]> {
  try {
    const rows = await prisma.typewriterRole.findMany({ orderBy: { order: 'asc' } });
    if (rows.length) return rows.map((r) => r.text);
  } catch {
    /* fall through */
  }
  return [...content.roles];
}

export async function getStats() {
  try {
    const rows = await prisma.stat.findMany({ orderBy: { order: 'asc' } });
    if (rows.length) return rows.map((r) => ({ value: r.value, label: r.label }));
  } catch {
    /* fall through */
  }
  return [...content.stats];
}

export async function getAbout() {
  try {
    const a = await prisma.about.findFirst();
    if (a) {
      const spec = Array.isArray(a.spec)
        ? (a.spec as { key: string; value: string }[]).map((s) => ({ k: s.key, v: s.value }))
        : [];
      return { lede: a.lede, paragraphs: a.paragraphs, focus: a.focus, spec };
    }
  } catch {
    /* fall through */
  }
  return content.about;
}

export async function getProjects() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { order: 'asc' } });
    if (rows.length) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        summary: r.summary,
        description: r.description,
        stack: r.stack,
        githubUrl: r.githubUrl ?? undefined,
        liveUrl: r.liveUrl ?? undefined,
        featured: r.featured,
        status: r.status.toLowerCase() as 'shipped' | 'research' | 'building',
        year: r.year ?? undefined,
      }));
    }
  } catch {
    /* fall through */
  }
  return content.projects;
}

export async function getEducation() {
  try {
    const rows = await prisma.education.findMany({ orderBy: { order: 'asc' } });
    if (rows.length) {
      return rows.map((r) => ({
        degree: r.degree,
        institution: r.institution,
        shortName: r.shortName,
        period: r.period,
        location: r.location,
        cgpa: r.cgpa,
        description: r.description,
      }));
    }
  } catch {
    /* fall through */
  }
  return content.education;
}

export type ThemeView = {
  brandH: number;
  brandS: number;
  brandL: number;
  hueCycle: boolean;
  radius: number;
};

const DEFAULT_THEME: ThemeView = { brandH: 38, brandS: 96, brandL: 56, hueCycle: true, radius: 0.5 };

export async function getTheme(): Promise<ThemeView> {
  try {
    const t = await prisma.themeSetting.findFirst();
    if (t) {
      return {
        brandH: t.brandH,
        brandS: t.brandS,
        brandL: t.brandL,
        hueCycle: t.hueCycle,
        radius: t.radius,
      };
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_THEME;
}

export async function getWriting() {
  try {
    const rows = await prisma.writingPost.findMany({ orderBy: { order: 'asc' } });
    if (rows.length) {
      return rows.map((r) => ({
        title: r.title,
        preview: r.preview,
        source: r.source,
        url: r.url ?? undefined,
      }));
    }
  } catch {
    /* fall through */
  }
  return content.writing;
}
