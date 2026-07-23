import type { MetadataRoute } from 'next';

const BASE = process.env.SITE_URL || 'https://visheshshekhawat.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
