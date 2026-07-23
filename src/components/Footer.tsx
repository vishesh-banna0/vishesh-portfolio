'use client';

import { nav } from '@/content/portfolio';

const Footer = () => {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded bg-brand font-display text-xs font-bold text-brand-foreground">
            V
          </span>
          <span className="text-sm text-muted-foreground">©2026 Vishesh Shekhawat</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {nav.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="mono-label hover:!text-foreground">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="mono-label !text-[0.62rem]">Built with Next.js · Tailwind</div>
      </div>
    </footer>
  );
};

export default Footer;
