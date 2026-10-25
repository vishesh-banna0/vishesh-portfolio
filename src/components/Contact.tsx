'use client';

import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeader } from './Section';
import type { ProfileView } from '@/content/portfolio';

export default function Contact({ profile }: { profile: ProfileView }) {
  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="container max-w-[1072px]">
        <SectionHeader eyebrow="contacts" />
        <div className="grid gap-10 md:grid-cols-[1fr_290px] md:items-start">
          <Reveal>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              I’m open to AI and ML engineering roles and thoughtful collaborations. Email is the easiest way to reach me.
            </p>
            <a href={`mailto:${profile.email}`} className="btn-primary mt-6 text-sm">Send a message →</a>
          </Reveal>
          <Reveal delay={90}>
            <div className="border border-border-strong p-4">
              <h3 className="text-sm font-semibold">Message me here</h3>
              <div className="mt-5 space-y-3 text-xs text-muted-foreground">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-brand"><Mail size={18} />{profile.email}</a>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand"><Github size={18} />@{profile.githubHandle}</a>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand"><Linkedin size={18} />LinkedIn</a>
                <div className="flex items-center gap-3"><MapPin size={18} />{profile.location}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
