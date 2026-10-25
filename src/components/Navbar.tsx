'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '@/content/portfolio';
import type { ProfileView } from '@/content/portfolio';
import { Logo } from '@/components/Logo';

const Navbar = ({ profile }: { profile: ProfileView }) => {
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
        scrolled ? 'navbar-blur py-3' : 'bg-background pb-2 pt-8'
      }`}
    >
      <div className="container flex max-w-[1072px] items-center justify-between gap-5">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2"
        >
          <Logo className="h-4 w-4" />
          <span className="text-base font-bold tracking-normal">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-3 md:flex lg:gap-5">
          {nav.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className={`text-xs transition-colors lg:text-sm ${
                  isActive ? 'text-white' : 'text-muted-foreground hover:text-white'
                }`}
              >
                <span className="text-brand">#</span>{link.label.toLowerCase()}
              </button>
            );
          })}
          <a href="/admin/login" className="ml-1 text-xs text-muted-foreground hover:text-white">
            admin ↗
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
              className="py-2 text-left text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="text-brand">#</span>{link.label.toLowerCase()}
            </button>
          ))}
          <a href="/admin/login" className="mt-2 text-sm text-muted-foreground">
            admin
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
