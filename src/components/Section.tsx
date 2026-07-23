import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
}

/** Consistent section header: mono eyebrow → display title → optional intro. */
export function SectionHeader({ eyebrow, title, intro, align = 'left' }: SectionHeaderProps) {
  return (
    <header className={align === 'center' ? 'mb-12 text-center md:mb-16' : 'mb-12 md:mb-16'}>
      <Reveal>
        <span className={align === 'center' ? 'eyebrow justify-center' : 'eyebrow'}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="section-title mt-4">{title}</h2>
      </Reveal>
      {intro ? (
        <Reveal delay={130}>
          <p
            className={
              align === 'center'
                ? 'mx-auto mt-4 max-w-2xl text-muted-foreground'
                : 'mt-4 max-w-2xl text-muted-foreground'
            }
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
