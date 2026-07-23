'use client';

import { useEffect } from 'react';
import { X, Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="animate-fade-in-up absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div
        className="panel animate-scale-in relative max-h-[88vh] w-full max-w-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="mono-label !text-brand">{project.status}</span>
            <span className="mono-label">{project.year}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="mono-label mt-6">Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1"
              >
                <Github size={18} /> Repository
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                <ArrowUpRight size={18} /> Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
