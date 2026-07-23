import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === '/admin/login';

  // Already signed in? Skip the login page.
  if (isLogin) {
    return session ? NextResponse.redirect(new URL('/admin', req.url)) : NextResponse.next();
  }

  // Everything else under /admin requires a valid session.
  if (!session) {
    const url = new URL('/admin/login', req.url);
    if (pathname !== '/admin') url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
