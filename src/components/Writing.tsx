'use client';

import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import { writing } from '@/content/portfolio';

const Writing = () => {
  return (
    <section id="writing" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Writing"
          title="Notes & essays"
          intro="Occasional writing on the math and engineering behind machine learning."
        />

        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {writing.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-4 flex items-center gap-6 rounded px-4 py-6 transition-colors hover:bg-surface/50"
              >
                <div className="flex-1">
                  <div className="mono-label">{w.source}</div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.preview}</p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
