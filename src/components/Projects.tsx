'use client';

import { useState } from 'react';
import { SectionHeader } from './Section';
import ProjectModal from './ProjectModal';
import type { Project } from '@/content/portfolio';

function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="group flex h-full w-full flex-col border border-border-strong text-left transition-colors hover:border-brand">
      <div data-cover={project.slug} className="project-cover relative flex h-[201px] w-full items-center justify-center overflow-hidden border-b border-border-strong">
        <div aria-hidden className="absolute -left-8 top-7 h-36 w-36 rotate-12 border border-brand/50" />
        <div aria-hidden className="absolute -right-8 bottom-0 h-36 w-36 -rotate-12 border border-brand/40" />
        <div aria-hidden className="figma-dots absolute right-6 top-5 h-16 w-16 opacity-70" />
        <div className="relative z-10 border border-border-strong bg-background/90 px-5 py-4 text-center shadow-xl">
          <span className="block text-[11px] text-brand">Academic project{project.year ? ` / ${project.year}` : ''}</span>
          <span className="mt-2 block text-xl font-semibold text-foreground">{project.title}</span>
        </div>
      </div>
      <div className="flex min-h-10 w-full flex-wrap items-center gap-x-2 border-b border-border-strong px-2 py-2 text-xs text-muted-foreground">
        {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="text-2xl font-medium text-foreground">{project.title}</h3>
        <p className="flex-1 text-sm leading-6 text-muted-foreground">{project.summary}</p>
        <span className="btn-primary self-start text-sm">Details &lt;~&gt;</span>
      </div>
    </button>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const ordered = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const visible = showAll ? ordered : ordered.slice(0, 6);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container max-w-[1072px]">
        <div className="flex items-start justify-between gap-5">
          <SectionHeader eyebrow="projects" />
          {ordered.length > 6 && (
            <button onClick={() => setShowAll((value) => !value)} className="mt-2 shrink-0 text-sm text-foreground hover:text-brand">
              {showAll ? 'Show less ←' : `View all (${ordered.length}) ~~>`}
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} onSelect={() => setSelected(project)} />
          ))}
        </div>
      </div>
      <ProjectModal project={selected} isOpen={Boolean(selected)} onClose={() => setSelected(null)} />
    </section>
  );
}
