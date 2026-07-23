'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, profile } from '@/content/portfolio';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy — highlight the section currently in the viewport's middle band.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-blur py-3' : 'py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[5px] bg-brand font-display text-sm font-bold text-brand-foreground">
            V
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">Vishesh Shekhawat</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className={`mono-label rounded px-3 py-2 transition-colors ${
                  isActive ? '!text-brand' : 'hover:!text-foreground'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <a href={profile.resumeUrl} download className="btn-secondary ml-2 !px-4 !py-2 text-sm">
            Résumé
          </a>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="container flex flex-col gap-1 border-t border-border bg-background/95 py-4 backdrop-blur">
          {nav.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="mono-label py-2 text-left hover:!text-foreground"
            >
              {link.label}
            </button>
          ))}
          <a href={profile.resumeUrl} download className="btn-secondary mt-2 justify-center">
            Résumé
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
