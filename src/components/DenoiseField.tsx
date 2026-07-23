'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero signature. A grid of dots that begins as random noise and, on load,
 * resolves ("denoises") into a smooth structured field — a nod to the diffusion
 * models this portfolio is built around. Dots above a threshold are drawn as the
 * live brand color ("signal"); the rest are faint foreground dots ("noise").
 *
 * - Honors reduced motion: renders the resolved field immediately, no animation.
 * - Animates once on load, then idles with a cheap ~1.2s redraw so the field
 *   keeps up with the drifting accent hue (no perpetual rAF — kind to Lighthouse).
 */
export function DenoiseField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = 26;

    type Dot = { x: number; y: number; target: number; current: number; signal: boolean };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let idle: ReturnType<typeof setInterval> | undefined;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    // Smooth low-frequency "structure" the noise resolves into.
    const field = (x: number, y: number) => {
      const a = Math.sin(x * 0.9 + 0.6) * Math.cos(y * 0.7);
      const b = Math.sin((x + y) * 0.5 + 1.2);
      return Math.max(0, Math.min(1, 0.5 + 0.32 * a + 0.18 * b));
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const t = field(c * 0.5, r * 0.5);
          dots.push({
            x: c * cell,
            y: r * cell,
            target: t,
            current: reduced ? t : Math.random(),
            signal: t > 0.66,
          });
        }
      }
    };

    const colors = () => {
      const root = getComputedStyle(document.documentElement);
      // --brand-h is a registered @property, so this reads the live (drifting) hue.
      const h = root.getPropertyValue('--brand-h').trim() || '38';
      const s = root.getPropertyValue('--brand-s').trim() || '96%';
      const l = root.getPropertyValue('--brand-l').trim() || '56%';
      const fg = root.getPropertyValue('--foreground').trim() || '210 22% 96%';
      const [fh, fs, fl] = fg.split(/\s+/);
      return {
        signal: (a: number) => `hsla(${h}, ${s}, ${l}, ${a})`,
        noise: (a: number) => `hsla(${fh}, ${fs}, ${fl}, ${a})`,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { signal, noise } = colors();
      for (const d of dots) {
        const v = d.current;
        if (v < 0.04) continue;
        if (d.signal) {
          ctx.fillStyle = signal(v * 0.55);
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = noise(v * 0.16);
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const start = performance.now();
    const duration = 1900;
    const animate = (now: number) => {
      const t = easeOut(Math.min(1, (now - start) / duration));
      for (const d of dots) {
        d.current = d.current + (d.target - d.current) * (0.06 + 0.14 * t);
      }
      draw();
      if (now - start < duration) {
        raf = requestAnimationFrame(animate);
      } else {
        for (const d of dots) d.current = d.target;
        draw();
        idle = setInterval(draw, 1200); // follow the accent drift, cheaply
      }
    };

    build();
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(animate);
    }

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      if (idle) clearInterval(idle);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        maskImage: 'radial-gradient(90% 80% at 82% 22%, #000 0%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(90% 80% at 82% 22%, #000 0%, transparent 72%)',
      }}
    />
  );
}
