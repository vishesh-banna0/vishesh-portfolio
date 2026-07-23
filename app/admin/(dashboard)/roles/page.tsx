import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, SaveButton, ActionButton } from '@/components/admin/controls';
import { createRole, updateRole, deleteRole, moveRole } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
  await requireAdmin();
  const roles = await prisma.typewriterRole.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow="Content" title="Typewriter roles" />
      <p className="mb-6 text-sm text-muted-foreground">
        The rotating lines under your name in the hero. Edit, reorder, or remove — the site updates immediately.
      </p>

      <div className="space-y-2">
        {roles.map((r) => (
          <div key={r.id} className="panel flex items-center gap-2 p-2">
            <form action={updateRole.bind(null, r.id)} className="flex flex-1 items-center gap-2">
              <Input name="text" defaultValue={r.text} />
              <SaveButton />
            </form>
            <ActionButton action={moveRole.bind(null, r.id, 'up')} label="Move up">
              <ArrowUp size={15} />
            </ActionButton>
            <ActionButton action={moveRole.bind(null, r.id, 'down')} label="Move down">
              <ArrowDown size={15} />
            </ActionButton>
            <ActionButton action={deleteRole.bind(null, r.id)} label="Delete" danger>
              <Trash2 size={15} />
            </ActionButton>
          </div>
        ))}
      </div>

      <form action={createRole} className="panel mt-4 flex items-center gap-2 p-2">
        <Input name="text" placeholder="Add a new role…" required />
        <button type="submit" className="btn-secondary whitespace-nowrap !px-4 !py-2 text-sm">
          Add role
        </button>
      </form>
    </div>
  );
}
