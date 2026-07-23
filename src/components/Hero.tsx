'use client';

import Image from 'next/image';
import { Download, Mail, Github, Linkedin, ArrowDown } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { DenoiseField } from './DenoiseField';
import type { ProfileView, StatView } from '@/content/portfolio';

interface HeroProps {
  profile: ProfileView;
  roles: string[];
  stats: StatView[];
}

const Hero = ({ profile, roles, stats }: HeroProps) => {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      <DenoiseField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left — the statement */}
          <div>
            <span className="eyebrow animate-fade-in-up">ML / AI Systems Engineer</span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.75rem]">
              Vishesh
              <br />
              <span className="gradient-text">Shekhawat</span>
            </h1>
            <div className="mt-5 h-7 font-mono text-base text-brand sm:text-lg">
              <TypewriterText texts={roles} />
            </div>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{profile.thesis}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={profile.resumeUrl} download className="btn-primary">
                <Download size={18} /> Download CV
              </a>
              <a href="#contact" className="btn-secondary">
                <Mail size={18} /> Get in touch
              </a>
              <div className="ml-1 flex items-center gap-1.5">
                <a
                  aria-label="GitHub"
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Github size={18} />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — profile as an instrument panel */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="mono-label">profile.jpeg</span>
                <span className="mono-label flex items-center gap-1.5 !text-brand">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" /> live
                </span>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/profile.jpeg"
                  alt="Vishesh Shekhawat"
                  fill
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brand/10" />
              </div>
              <div className="border-t border-border px-4 py-3">
                <div className="mono-label !text-brand">{profile.role}</div>
                <div className="mt-1 text-sm text-muted-foreground">{profile.currently}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instrument readout — headline stats */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-4 py-4">
              <div className="font-display text-2xl font-semibold tracking-tight">{s.value}</div>
              <div className="mono-label mt-1 !text-[0.6rem] leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="animate-float absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
