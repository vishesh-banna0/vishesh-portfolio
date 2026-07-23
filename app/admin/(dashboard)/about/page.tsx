import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, Input, Textarea, Field, SaveButton } from '@/components/admin/controls';
import { updateAbout } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await requireAdmin();
  const a = await prisma.about.findFirst();
  const spec = Array.isArray(a?.spec) ? (a!.spec as { key: string; value: string }[]) : [];

  return (
    <div className="max-w-2xl">
      <PageTitle eyebrow="Content" title="About" />
      <p className="mb-6 text-sm text-muted-foreground">
        The narrative and the datasheet. Lists are one item per line.
      </p>

      <form action={updateAbout} className="panel space-y-4 p-6">
        <Field label="Lede" hint="the intro line">
          <Textarea name="lede" defaultValue={a?.lede ?? ''} />
        </Field>
        <Field label="Paragraphs" hint="one paragraph per line">
          <Textarea name="paragraphs" defaultValue={(a?.paragraphs ?? []).join('\n')} className="min-h-[160px]" />
        </Field>
        <Field label="Focus areas" hint="one per line">
          <Textarea name="focus" defaultValue={(a?.focus ?? []).join('\n')} />
        </Field>
        <Field label="Datasheet" hint="one per line, format: Key | Value">
          <Textarea
            name="spec"
            defaultValue={spec.map((s) => `${s.key} | ${s.value}`).join('\n')}
            className="min-h-[120px]"
          />
        </Field>
        <SaveButton>Save about</SaveButton>
      </form>
    </div>
  );
}
