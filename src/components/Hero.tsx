'use client';

import { Github, Linkedin } from 'lucide-react';
import { FigmaDots } from './FigmaDots';
import TypewriterText from './TypewriterText';
import { heroQuote } from '@/content/portfolio';
import type { ProfileView } from '@/content/portfolio';

export default function Hero({ profile, roles }: { profile: ProfileView; roles: string[] }) {
  return (
    <section id="home" className="relative pt-[123px]">
      <div className="container max-w-[1072px]">
        <div className="grid items-start gap-10 lg:grid-cols-[1.145fr_1fr] lg:gap-[18px]">
          <div className="lg:pt-[74px]">
            <h1 className="max-w-[537px] text-[32px] font-semibold leading-[1.33] tracking-normal">
              Hi, I’m <span className="text-brand">{profile.name.split(' ')[0]}.</span><br />
              I build AI systems people can use.
            </h1>
            <p className="mt-7 max-w-[463px] text-base leading-[25px] text-muted-foreground">{profile.thesis}</p>
            <a href="#contact" className="btn-primary mt-7 text-base">Contact me</a>
          </div>

          <div className="relative mx-auto w-full max-w-[469px]">
            <img
              src="/figma/outline-logo.svg"
              alt=""
              width={53}
              height={53}
              aria-hidden="true"
              className="absolute left-0 top-[84px] origin-top-left scale-[2.9245]"
            />
            <div className="relative ml-3 h-[386px] overflow-hidden pt-2">
              <img
                src={profile.profileImageUrl}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <FigmaDots className="absolute right-4 top-[246px] z-10" />
            <div className="relative ml-[31px] mr-[36px] flex min-h-[37px] items-center gap-[10px] border border-border-strong bg-background p-2 text-sm text-muted-foreground">
              <span aria-hidden="true" className="h-4 w-4 shrink-0 bg-brand" />
              <strong className="min-w-0 font-semibold text-foreground">{roles.length ? <TypewriterText texts={roles} /> : profile.currently}</strong>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-20 mt-28 max-w-[800px]">
          <blockquote className="relative border border-border-strong p-8 text-[24px] font-medium leading-normal text-foreground">
            <span className="absolute -top-[15px] left-[6px] bg-background px-1"><img src="/figma/quote.svg" alt="" className="block" /></span>
            {heroQuote}
            <span className="absolute bottom-2 right-[11.5px] bg-background px-1"><img src="/figma/quote.svg" alt="" className="block" /></span>
          </blockquote>
          <div className="-mt-2 ml-auto w-fit border border-border-strong p-4 text-base text-foreground">- {profile.name}</div>
        </div>
      </div>
      <aside aria-label="Social links" className="fixed left-6 top-0 z-40 hidden w-8 flex-col items-center gap-2 text-muted-foreground xl:flex">
        <span className="h-[191px] w-px bg-muted-foreground" />
        <a href={profile.socials.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-brand"><Github size={20} /></a>
        <a href={profile.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-brand"><Linkedin size={20} /></a>
      </aside>
    </section>
  );
}
