import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession, SESSION_COOKIE } from '@/lib/session';
import { AdminShell } from '@/components/admin/AdminShell';

// Defense in depth: middleware already gates /admin, but re-check here so a
// dashboard page never renders without a valid session.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) redirect('/admin/login');
  return <AdminShell email={session.sub}>{children}</AdminShell>;
}
