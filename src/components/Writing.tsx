import { SectionHeader } from './Section';
import type { WritingEntry } from '@/content/portfolio';

export default function Writing({ writing }: { writing: WritingEntry[] }) {
  return (
    <section id="writing" className="relative py-20 md:py-28">
      <div className="container max-w-[1072px]">
        <SectionHeader eyebrow="blog" />
        <div className="grid gap-4 md:grid-cols-2">
          {writing.map((entry, index) => {
            const content = (
              <>
                <div className="border-b border-border-strong px-2 py-2 text-xs text-muted-foreground">{entry.source}</div>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <h3 className="text-2xl font-medium text-foreground">{entry.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{entry.preview}</p>
                  {entry.url && <span className="btn-primary self-start text-sm">Read &lt;~&gt;</span>}
                </div>
              </>
            );
            return entry.url ? (
              <a key={index} href={entry.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col border border-border-strong text-left transition-colors hover:border-brand">{content}</a>
            ) : (
              <div key={index} className="flex h-full flex-col border border-border-strong">{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
