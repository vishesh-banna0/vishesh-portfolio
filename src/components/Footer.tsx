import { Github, Linkedin, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import type { ProfileView } from '@/content/portfolio';

export default function Footer({ profile }: { profile: ProfileView }) {
  return (
    <footer className="border-t border-border-strong pb-8 pt-9">
      <div className="container flex max-w-[1072px] flex-col justify-between gap-10 md:flex-row">
        <div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-foreground"><Logo className="h-4 w-4" />{profile.name}</a>
            <a href={`mailto:${profile.email}`} className="text-sm text-muted-foreground hover:text-brand">{profile.email}</a>
          </div>
          <p className="mt-4 text-sm text-foreground">{profile.role}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Media</h2>
          <div className="mt-3 flex items-center gap-3 text-muted-foreground">
            <a href={profile.socials.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-brand"><Github size={24} /></a>
            <a href={profile.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-brand"><Linkedin size={24} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-brand"><Mail size={24} /></a>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
