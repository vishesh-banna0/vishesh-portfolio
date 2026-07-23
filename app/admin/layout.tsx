import type { Metadata } from 'next';

// Keep the whole admin area out of search indexes.
export const metadata: Metadata = {
  title: 'Admin · Vishesh Shekhawat',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
