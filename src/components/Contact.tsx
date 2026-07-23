'use client';

import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import type { ProfileView } from '@/content/portfolio';

const Contact = ({ profile }: { profile: ProfileView }) => {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: 'GitHub', value: `@${profile.githubHandle}`, href: profile.socials.github, icon: Github },
    { label: 'LinkedIn', value: 'vishesh-shekhawat', href: profile.socials.linkedin, icon: Linkedin },
    { label: 'Location', value: profile.location, href: undefined, icon: MapPin },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">Contact</span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="section-title mt-4 text-3xl md:text-5xl">Let&rsquo;s build something that lasts.</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Open to research and engineering roles, collaborations, and genuinely hard problems.
              The fastest way to reach me is email.
            </p>
          </Reveal>
          <Reveal delay={190}>
            <a href={`mailto:${profile.email}`} className="btn-primary mt-8 inline-flex">
              <Mail size={18} /> {profile.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => {
              const Icon = c.icon;
              const content = (
                <>
                  <Icon size={18} className="text-brand" />
                  <div className="mono-label mt-3">{c.label}</div>
                  <div className="mt-1 truncate text-sm text-foreground transition-colors group-hover:text-brand">
                    {c.value}
                  </div>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group bg-background px-5 py-5 transition-colors hover:bg-surface/60"
                >
                  {content}
                </a>
              ) : (
                <div key={c.label} className="group bg-background px-5 py-5">
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
