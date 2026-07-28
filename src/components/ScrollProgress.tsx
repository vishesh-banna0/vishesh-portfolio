'use client';

import { useEffect, useState } from 'react';

/**
 * Thin brand-gradient bar at the top edge that tracks how far the page is
 * scrolled. rAF-throttled; sits above the navbar. Purely reflective of scroll
 * position, so it's safe under reduced-motion (no autonomous animation).
 */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        className="h-full origin-left"
        style={{
          width: `${pct}%`,
          background: 'var(--gradient-brand)',
          boxShadow: '0 0 12px hsl(var(--brand) / 0.55)',
        }}
      />
    </div>
  );
}
