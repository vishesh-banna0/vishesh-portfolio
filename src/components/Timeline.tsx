'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import type { EducationEntry } from '@/content/portfolio';

const Timeline = ({ education }: { education: EducationEntry[] }) => {
  const olRef = useRef<HTMLOListElement>(null);
  // 0 → 1: how far the viewport's midline has travelled down the timeline. Drives
  // the height of the brand "fill" line so it draws itself as you scroll.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = olRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1); // no scroll-linked motion — show the full line
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const ref = window.innerHeight * 0.5; // viewport midline
      const p = (ref - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));
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
    <section id="timeline" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Timeline"
          title="Education"
          intro="The academic track behind the systems work."
        />

        <ol ref={olRef} className="relative ml-2 space-y-10">
          {/* Static track + brand fill that grows with scroll. */}
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-border" />
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px bg-brand"
            style={{ height: `${progress * 100}%`, boxShadow: '0 0 8px hsl(var(--brand) / 0.6)' }}
          />

          {education.map((edu, i) => (
            <li key={edu.shortName} className="relative pl-8 md:pl-10">
              {/* Node marker lives outside Reveal: its will-change:transform would
                  otherwise become the positioning context and shove the dot onto the text. */}
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-brand bg-background" />
              <Reveal delay={i * 90}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="mono-label !text-brand">{edu.period}</span>
                  <span className="mono-label">{edu.location}</span>
                  <span className="tag ml-auto">CGPA {edu.cgpa}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{edu.degree}</h3>
                <div className="text-sm text-foreground/80">{edu.institution}</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
