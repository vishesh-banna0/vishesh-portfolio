import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title?: string;
  intro?: string;
  align?: 'left' | 'center';
}

/** Figma section heading, with optional supporting copy. */
export function SectionHeader({ eyebrow, title, intro, align = 'left' }: SectionHeaderProps) {
  return (
    <header className={align === 'center' ? 'mb-10 text-center' : 'mb-10 w-full'}>
      <Reveal>
        <div className={align === 'center' ? 'flex items-center justify-center gap-4' : 'flex items-center gap-4'}>
          <h2 className="section-title whitespace-nowrap"><span className="text-brand">#</span>{eyebrow.toLowerCase()}</h2>
          {align === 'left' ? <span aria-hidden className="h-px max-w-[340px] flex-1 bg-brand/70" /> : null}
        </div>
      </Reveal>
      {title ? <Reveal delay={70}><p className="mt-3 text-sm text-muted-foreground">{title}</p></Reveal> : null}
      {intro ? (
        <Reveal delay={130}>
          <p
            className={
              align === 'center'
                ? 'mx-auto mt-2 max-w-2xl text-sm leading-7 text-muted-foreground'
                : 'mt-2 max-w-2xl text-sm leading-7 text-muted-foreground'
            }
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
