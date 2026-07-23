'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import ProjectModal from './ProjectModal';
import { projects, type Project } from '@/content/portfolio';

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems, shipped."
          intro="Production systems, agents, and from-scratch paper implementations. Select any for detail."
        />

        {featured ? (
          <Reveal>
            <button
              onClick={() => setSelected(featured)}
              className="panel group block w-full p-6 text-left transition-colors hover:border-brand/40 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="mono-label !text-brand">Featured</span>
                <span className="h-px flex-1 bg-border" />
                <span className="mono-label">{featured.year}</span>
              </div>
              <div className="mt-4 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{featured.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {featured.stack.slice(0, 8).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <button
                onClick={() => setSelected(p)}
                className="panel group flex h-full w-full flex-col p-6 text-left transition-colors hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <span className={`mono-label ${p.status === 'research' ? '' : '!text-brand'}`}>
                    {p.status}
                  </span>
                  <span className="mono-label">{p.year}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                  {p.stack.length > 5 ? <span className="tag">+{p.stack.length - 5}</span> : null}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
