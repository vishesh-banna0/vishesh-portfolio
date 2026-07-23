import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, Textarea, Field, SaveButton, ActionButton } from '@/components/admin/controls';
import {
  createEducation,
  updateEducation,
  deleteEducation,
  moveEducation,
} from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

const fields = (
  <>
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Degree">
        <Input name="degree" required />
      </Field>
      <Field label="Institution">
        <Input name="institution" required />
      </Field>
      <Field label="Short name">
        <Input name="shortName" />
      </Field>
      <Field label="Period">
        <Input name="period" placeholder="2025 — Present" />
      </Field>
      <Field label="Location">
        <Input name="location" />
      </Field>
      <Field label="CGPA">
        <Input name="cgpa" placeholder="8.78 / 10" />
      </Field>
    </div>
    <Field label="Description">
      <Textarea name="description" />
    </Field>
  </>
);

export default async function EducationPage() {
  await requireAdmin();
  const items = await prisma.education.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-3xl">
      <PageTitle eyebrow="Content" title="Education / Timeline" />

      <div className="space-y-4">
        {items.map((e) => (
          <div key={e.id} className="panel p-4">
            <form action={updateEducation.bind(null, e.id)} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Degree">
                  <Input name="degree" defaultValue={e.degree} required />
                </Field>
                <Field label="Institution">
                  <Input name="institution" defaultValue={e.institution} required />
                </Field>
                <Field label="Short name">
                  <Input name="shortName" defaultValue={e.shortName} />
                </Field>
                <Field label="Period">
                  <Input name="period" defaultValue={e.period} />
                </Field>
                <Field label="Location">
                  <Input name="location" defaultValue={e.location} />
                </Field>
                <Field label="CGPA">
                  <Input name="cgpa" defaultValue={e.cgpa} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea name="description" defaultValue={e.description} />
              </Field>
              <div className="flex items-center gap-2">
                <SaveButton />
                <div className="ml-auto flex gap-1">
                  <ActionButton action={moveEducation.bind(null, e.id, 'up')} label="Move up">
                    <ArrowUp size={15} />
                  </ActionButton>
                  <ActionButton action={moveEducation.bind(null, e.id, 'down')} label="Move down">
                    <ArrowDown size={15} />
                  </ActionButton>
                  <ActionButton action={deleteEducation.bind(null, e.id)} label="Delete" danger>
                    <Trash2 size={15} />
                  </ActionButton>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>

      <form action={createEducation} className="panel mt-4 space-y-3 p-4">
        <div className="mono-label">Add an entry</div>
        {fields}
        <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">Add entry</button>
      </form>
    </div>
  );
}
