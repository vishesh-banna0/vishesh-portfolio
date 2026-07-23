import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, SaveButton, ActionButton } from '@/components/admin/controls';
import { createStat, updateStat, deleteStat, moveStat } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  await requireAdmin();
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow="Content" title="Stats" />
      <p className="mb-6 text-sm text-muted-foreground">
        The readout strip in the hero (ranks, counts). These change often — edit freely.
      </p>

      <div className="space-y-2">
        {stats.map((s) => (
          <div key={s.id} className="panel flex items-center gap-2 p-2">
            <form action={updateStat.bind(null, s.id)} className="flex flex-1 items-center gap-2">
              <Input name="value" defaultValue={s.value} placeholder="Value" className="w-32" />
              <Input name="label" defaultValue={s.label} placeholder="Label" />
              <SaveButton />
            </form>
            <ActionButton action={moveStat.bind(null, s.id, 'up')} label="Move up">
              <ArrowUp size={15} />
            </ActionButton>
            <ActionButton action={moveStat.bind(null, s.id, 'down')} label="Move down">
              <ArrowDown size={15} />
            </ActionButton>
            <ActionButton action={deleteStat.bind(null, s.id)} label="Delete" danger>
              <Trash2 size={15} />
            </ActionButton>
          </div>
        ))}
      </div>

      <form action={createStat} className="panel mt-4 flex items-center gap-2 p-2">
        <input
          name="value"
          placeholder="Value"
          required
          className="w-32 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-brand/60"
        />
        <input
          name="label"
          placeholder="Label"
          required
          className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-brand/60"
        />
        <button type="submit" className="btn-secondary whitespace-nowrap !px-4 !py-2 text-sm">
          Add stat
        </button>
      </form>
    </div>
  );
}
