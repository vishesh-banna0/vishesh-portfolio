import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { inputCls, PageTitle, Input, Textarea, Field, SaveButton, ActionButton } from '@/components/admin/controls';
import { createProject, updateProject, deleteProject, moveProject } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

const STATUSES = ['SHIPPED', 'RESEARCH', 'BUILDING'];

export default async function ProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow="Content" title="Projects" />
      <p className="mb-6 text-sm text-muted-foreground">
        Your work index. Stack is comma- or newline-separated. Mark one as featured for the large card.
      </p>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="panel p-4">
            <form action={updateProject.bind(null, p.id)} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title">
                  <Input name="title" defaultValue={p.title} required />
                </Field>
                <Field label="Slug" hint="unique">
                  <Input name="slug" defaultValue={p.slug} required />
                </Field>
              </div>
              <Field label="Summary">
                <Input name="summary" defaultValue={p.summary} />
              </Field>
              <Field label="Description">
                <Textarea name="description" defaultValue={p.description} />
              </Field>
              <Field label="Stack" hint="comma or newline separated">
                <Textarea name="stack" defaultValue={p.stack.join(', ')} className="min-h-[56px]" />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="GitHub URL">
                  <Input name="githubUrl" defaultValue={p.githubUrl ?? ''} />
                </Field>
                <Field label="Live URL">
                  <Input name="liveUrl" defaultValue={p.liveUrl ?? ''} />
                </Field>
                <Field label="Year">
                  <Input name="year" defaultValue={p.year ?? ''} />
                </Field>
                <Field label="Status">
                  <select name="status" defaultValue={p.status} className={inputCls}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.toLowerCase()}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={p.featured} className="accent-brand" />
                Featured
              </label>
              <div className="flex items-center gap-2">
                <SaveButton />
                <div className="ml-auto flex gap-1">
                  <ActionButton action={moveProject.bind(null, p.id, 'up')} label="Move up">
                    <ArrowUp size={15} />
                  </ActionButton>
                  <ActionButton action={moveProject.bind(null, p.id, 'down')} label="Move down">
                    <ArrowDown size={15} />
                  </ActionButton>
                  <ActionButton action={deleteProject.bind(null, p.id)} label="Delete" danger>
                    <Trash2 size={15} />
                  </ActionButton>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>

      <form action={createProject} className="panel mt-4 space-y-3 p-4">
        <div className="mono-label">Add a project</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Title">
            <Input name="title" required />
          </Field>
          <Field label="Slug" hint="unique">
            <Input name="slug" required />
          </Field>
        </div>
        <Field label="Summary">
          <Input name="summary" />
        </Field>
        <Field label="Description">
          <Textarea name="description" />
        </Field>
        <Field label="Stack" hint="comma or newline separated">
          <Textarea name="stack" className="min-h-[56px]" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="GitHub URL">
            <Input name="githubUrl" />
          </Field>
          <Field label="Live URL">
            <Input name="liveUrl" />
          </Field>
          <Field label="Year">
            <Input name="year" />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue="SHIPPED" className={inputCls}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.toLowerCase()}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" className="accent-brand" />
          Featured
        </label>
        <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">Add project</button>
      </form>
    </div>
  );
}
