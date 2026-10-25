import { SectionHeader } from './Section';
import { FigmaDots } from './FigmaDots';
import TypewriterText from './TypewriterText';
import type { AboutView, StatView } from '@/content/portfolio';

export default function Skills({ about, stats, roles }: { about: AboutView; stats: StatView[]; roles: string[] }) {
  const groups = [
    { title: 'AI & models', items: about.focus.slice(0, 2) },
    { title: 'Retrieval', items: about.focus.slice(2, 3) },
    { title: 'Systems', items: about.focus.slice(3, 5) },
    { title: 'Tools', items: about.focus.slice(5) },
  ].filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="container max-w-[1072px]">
        <SectionHeader eyebrow="skills" />
        <div className="grid gap-10 md:grid-cols-[1fr_2.15fr]">
          <div aria-hidden className="relative hidden min-h-[190px] md:block">
            <FigmaDots className="absolute left-4 top-5" />
            <div className="absolute left-24 top-10 h-20 w-20 border border-border-strong" />
            <div className="absolute bottom-3 left-3 h-14 w-14 border border-brand/70" />
            <div className="absolute bottom-9 left-10 h-14 w-14 border border-brand/70" />
          </div>
          <div className="grid items-start gap-4 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title} className="border border-border-strong text-sm">
                <h3 className="border-b border-border-strong px-2 py-2 font-semibold text-foreground">{group.title}</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-2 px-2 py-3 leading-6 text-muted-foreground">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
            {roles.length > 0 && (
              <div className="border border-border-strong text-sm">
                <h3 className="border-b border-border-strong px-2 py-2 font-semibold text-foreground">Roles</h3>
                <div className="min-h-16 px-2 py-3 leading-6 text-muted-foreground"><TypewriterText texts={roles} /></div>
              </div>
            )}
          </div>
        </div>
        {stats.length > 0 && (
          <div className="mt-16">
            <SectionHeader eyebrow="highlights" />
            <div className="flex flex-wrap gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-border-strong px-3 py-2 text-sm text-muted-foreground">
                  <strong className="font-medium text-foreground">{stat.value}</strong> {stat.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
