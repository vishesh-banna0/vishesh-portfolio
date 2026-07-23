import { projects, writing, education, roles, stats } from '@/content/portfolio';

const counts = [
  { label: 'Projects', value: projects.length },
  { label: 'Writing', value: writing.length },
  { label: 'Education', value: education.length },
  { label: 'Typewriter roles', value: roles.length },
  { label: 'Stats', value: stats.length },
];

export default function AdminOverview() {
  return (
    <div>
      <span className="eyebrow">Dashboard</span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        You&rsquo;re signed in. Content, theme, and media management arrive in the next phases —
        for now this reflects what&rsquo;s currently on the live site.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {counts.map((c) => (
          <div key={c.label} className="bg-background px-5 py-5">
            <div className="font-display text-2xl font-semibold">{c.value}</div>
            <div className="mono-label mt-1 !text-[0.62rem] leading-tight">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="panel mt-8 p-6">
        <div className="mono-label">Next up</div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Data layer — move this content into Postgres (Prisma).</li>
          <li>· CRUD — edit projects, roles, stats, and more, no code changes.</li>
          <li>· Theme — change the accent and animation, with live preview.</li>
          <li>· Media — upload images, resume, and assets.</li>
        </ul>
      </div>
    </div>
  );
}
