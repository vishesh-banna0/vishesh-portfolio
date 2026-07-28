'use client';

import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import type { AboutView } from '@/content/portfolio';

const About = ({ about }: { about: AboutView }) => {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="From the paper to production."
          intro={about.lede}
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Narrative */}
          <Reveal from="left" className="space-y-5 leading-relaxed text-muted-foreground md:text-[1.05rem]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          {/* Datasheet */}
          <Reveal from="right" delay={120}>
            <div className="panel p-6">
              <div className="mono-label">Datasheet</div>
              <dl className="mt-4 divide-y divide-border">
                {about.spec.map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="mono-label">{row.k}</dt>
                    <dd className="text-right text-sm text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mono-label mt-6">Focus</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {about.focus.map((f) => (
                  <span key={f} className="tag">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
