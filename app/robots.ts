import type { MetadataRoute } from 'next';

const BASE = process.env.SITE_URL || 'https://visheshshekhawat.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
