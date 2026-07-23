import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, Textarea, Field, SaveButton } from '@/components/admin/controls';
import { updateProfile } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function HeroPage() {
  await requireAdmin();
  const p = await prisma.profile.findFirst();

  return (
    <div className="max-w-2xl">
      <PageTitle eyebrow="Content" title="Hero / Profile" />
      <p className="mb-6 text-sm text-muted-foreground">
        Your name, one-line thesis, and the links used across the site.
      </p>

      <form action={updateProfile} className="panel space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input name="name" defaultValue={p?.name ?? ''} required />
          </Field>
          <Field label="Role">
            <Input name="role" defaultValue={p?.role ?? ''} />
          </Field>
          <Field label="Currently">
            <Input name="currently" defaultValue={p?.currently ?? ''} />
          </Field>
          <Field label="Location">
            <Input name="location" defaultValue={p?.location ?? ''} />
          </Field>
        </div>
        <Field label="Thesis" hint="the line under the typewriter">
          <Textarea name="thesis" defaultValue={p?.thesis ?? ''} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <Input name="email" type="email" defaultValue={p?.email ?? ''} />
          </Field>
          <Field label="Résumé URL">
            <Input name="resumeUrl" defaultValue={p?.resumeUrl ?? ''} />
          </Field>
          <Field label="GitHub URL">
            <Input name="githubUrl" defaultValue={p?.githubUrl ?? ''} />
          </Field>
          <Field label="GitHub handle">
            <Input name="githubHandle" defaultValue={p?.githubHandle ?? ''} />
          </Field>
          <Field label="LinkedIn URL">
            <Input name="linkedinUrl" defaultValue={p?.linkedinUrl ?? ''} />
          </Field>
        </div>
        <SaveButton>Save profile</SaveButton>
      </form>
    </div>
  );
}
