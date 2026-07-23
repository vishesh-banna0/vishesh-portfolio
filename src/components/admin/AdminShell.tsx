'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  ExternalLink,
  User,
  FileText,
  FolderGit2,
  GraduationCap,
  PenLine,
  Type,
  BarChart3,
  Palette,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/hero', label: 'Hero / Profile', icon: User },
  { href: '/admin/about', label: 'About', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/education', label: 'Timeline', icon: GraduationCap },
  { href: '/admin/writing', label: 'Writing', icon: PenLine },
  { href: '/admin/roles', label: 'Roles', icon: Type },
  { href: '/admin/stats', label: 'Stats', icon: BarChart3 },
  { href: '/admin/theme', label: 'Theme', icon: Palette },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-border md:min-h-screen md:border-b-0 md:border-r">
        <div className="flex items-center gap-2.5 p-5">
          <span className="grid h-7 w-7 place-items-center rounded bg-brand font-display text-sm font-bold text-brand-foreground">
            V
          </span>
          <div>
            <div className="font-display text-sm font-semibold leading-tight">Admin</div>
            <div className="mono-label !text-[0.6rem]">Content · Theme · Media</div>
          </div>
        </div>
        <nav className="px-3 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                }`}
              >
                <Icon size={16} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <span className="mono-label truncate">{email}</span>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-3 !py-1.5 text-xs"
            >
              <ExternalLink size={14} /> View site
            </a>
            <button onClick={logout} className="btn-secondary !px-3 !py-1.5 text-xs">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
