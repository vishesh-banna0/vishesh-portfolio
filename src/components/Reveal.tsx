'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealFrom = 'up' | 'down' | 'left' | 'right' | 'scale';

const HIDDEN_TRANSFORM: Record<RevealFrom, string> = {
  up: 'translateY(16px)',
  down: 'translateY(-16px)',
  left: 'translateX(-24px)',
  right: 'translateX(24px)',
  scale: 'scale(0.96)',
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  /** Direction the element eases in from. Defaults to a gentle upward rise. */
  from?: RevealFrom;
}

/**
 * Reveals its children on scroll into view (fade + rise). Progressive
 * enhancement: honors reduced motion, and a safety timer guarantees content
 * becomes visible even if the observer never fires — content is never trapped
 * at opacity:0. Animates only transform/opacity.
 */
export function Reveal({ children, className = '', delay = 0, from = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);

    // Safety net: never leave content hidden if the observer misses.
    const fallback = setTimeout(() => setShown(true), 1400);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : HIDDEN_TRANSFORM[from],
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
