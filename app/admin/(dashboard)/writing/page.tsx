import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, Textarea, Field, SaveButton, ActionButton } from '@/components/admin/controls';
import { createWriting, updateWriting, deleteWriting, moveWriting } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function WritingPage() {
  await requireAdmin();
  const posts = await prisma.writingPost.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow="Content" title="Writing" />
      <p className="mb-6 text-sm text-muted-foreground">Essays and notes shown in the Writing section.</p>

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="panel p-4">
            <form action={updateWriting.bind(null, p.id)} className="space-y-3">
              <Field label="Title">
                <Input name="title" defaultValue={p.title} required />
              </Field>
              <Field label="Preview">
                <Textarea name="preview" defaultValue={p.preview} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Source">
                  <Input name="source" defaultValue={p.source} placeholder="Medium, Blogspot…" />
                </Field>
                <Field label="URL">
                  <Input name="url" defaultValue={p.url ?? ''} placeholder="https://…" />
                </Field>
              </div>
              <div className="flex items-center gap-2">
                <SaveButton />
                <div className="ml-auto flex gap-1">
                  <ActionButton action={moveWriting.bind(null, p.id, 'up')} label="Move up">
                    <ArrowUp size={15} />
                  </ActionButton>
                  <ActionButton action={moveWriting.bind(null, p.id, 'down')} label="Move down">
                    <ArrowDown size={15} />
                  </ActionButton>
                  <ActionButton action={deleteWriting.bind(null, p.id)} label="Delete" danger>
                    <Trash2 size={15} />
                  </ActionButton>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>

      <form action={createWriting} className="panel mt-4 space-y-3 p-4">
        <div className="mono-label">Add a post</div>
        <Field label="Title">
          <Input name="title" required />
        </Field>
        <Field label="Preview">
          <Textarea name="preview" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Source">
            <Input name="source" placeholder="Medium, Blogspot…" />
          </Field>
          <Field label="URL">
            <Input name="url" placeholder="https://…" />
          </Field>
        </div>
        <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">Add post</button>
      </form>
    </div>
  );
}
