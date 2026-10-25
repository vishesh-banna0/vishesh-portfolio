'use client';

import { useEffect } from 'react';

/**
 * Keeps the browser-tab favicon in sync with the theme's brand color. The
 * favicon lives outside the page DOM, so it can't inherit CSS vars like the
 * in-page <Logo/> — instead we read the *computed* --brand-h/s/l and rewrite
 * the same mark as an inline SVG. When the hue-cycle is on we redraw on an interval
 * so the tab icon drifts along with the site (browsers throttle favicon swaps,
 * so this is a coarse ~1s approximation, not a smooth animation).
 */
export function FaviconSync() {
  useEffect(() => {
    const root = document.documentElement;

    let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    const draw = () => {
      const cs = getComputedStyle(root);
      const h = cs.getPropertyValue('--brand-h').trim() || '287';
      const s = cs.getPropertyValue('--brand-s').trim() || '61%';
      const l = cs.getPropertyValue('--brand-l').trim() || '67%';
      const brand = `hsl(${h} ${s} ${l})`;
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">` +
        `<path d="M12 0H8V4H4H0V8V12V16H4H8V12H12H16V8V4V0H12ZM4 12H8V8H12V4H8V8H4V12Z" fill="${brand}" fill-rule="evenodd" clip-rule="evenodd"/>` +
        `</svg>`;

      link!.type = 'image/svg+xml';
      link!.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    };

    draw();

    const cycling = root.classList.contains('hue-cycle');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!cycling || reduce) return;

    const id = window.setInterval(draw, 1000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
