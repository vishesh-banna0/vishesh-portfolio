'use client';

import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import type { EducationEntry } from '@/content/portfolio';

const Timeline = ({ education }: { education: EducationEntry[] }) => {
  return (
    <section id="timeline" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Timeline"
          title="Education"
          intro="The academic track behind the systems work."
        />

        <ol className="relative ml-2 space-y-10 border-l border-border">
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
