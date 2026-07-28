'use client';

import { useEffect } from 'react';

/**
 * Keeps the browser-tab favicon in sync with the theme's brand color. The
 * favicon lives outside the page DOM, so it can't inherit CSS vars like the
 * in-page <Logo/> — instead we read the *computed* --brand-h/s/l and rewrite
 * the icon as an inline SVG. When the hue-cycle is on we redraw on an interval
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
      const h = cs.getPropertyValue('--brand-h').trim() || '38';
      const s = cs.getPropertyValue('--brand-s').trim() || '96%';
      const l = cs.getPropertyValue('--brand-l').trim() || '56%';
      const brand = `hsl(${h} ${s} ${l})`;
      const bright = `hsl(${h} ${s} 66%)`; // matches --brand-bright

      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">` +
        `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
        `<stop offset="0%" stop-color="${brand}"/><stop offset="100%" stop-color="${bright}"/>` +
        `</linearGradient></defs>` +
        `<circle cx="20" cy="20" r="18" stroke="url(#g)" stroke-width="2" fill="none" opacity="0.5"/>` +
        `<path d="M12 12 L20 28 L28 12" stroke="url(#g)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
        `<path d="M16 14 C16 14 24 10 24 16 C24 22 16 20 16 26 C16 30 24 28 24 28" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>` +
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
