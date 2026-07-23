import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession, SESSION_COOKIE } from './session';

/** Guard for admin server actions and data reads. Redirects to login if unauthenticated. */
export async function requireAdmin() {
  const session = await verifySession(cookies().get(SESSION_COOKIE)?.value);
  if (!session) redirect('/admin/login');
  return session;
}
