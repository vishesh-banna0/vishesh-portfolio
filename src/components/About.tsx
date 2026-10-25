import { SectionHeader } from './Section';
import { FigmaDots } from './FigmaDots';
import type { AboutView, ProfileView } from '@/content/portfolio';

export default function About({ about, profile }: { about: AboutView; profile: ProfileView }) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container max-w-[1072px]">
        <SectionHeader eyebrow="about-me" />
        <div className="grid items-start gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
          <div className="max-w-[560px] space-y-5 text-sm leading-7 text-muted-foreground">
            <p>{about.lede}</p>
            {about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <a href={profile.resumeUrl} download className="btn-primary text-sm">Download CV →</a>
            <dl className="flex flex-wrap gap-2 pt-3">
              {about.spec.map((row) => (
                <div key={row.k} className="border border-border-strong px-2 py-1 text-xs">
                  <dt className="inline text-foreground">{row.k}: </dt>
                  <dd className="inline">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-[340px]">
            <FigmaDots className="absolute -left-8 top-7 z-10" />
            <img src={profile.profileImageUrl} alt={profile.name} className="aspect-[0.82] w-full object-cover object-top" />
            <FigmaDots className="absolute -right-5 bottom-8" />
            <div aria-hidden className="h-px w-full bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
