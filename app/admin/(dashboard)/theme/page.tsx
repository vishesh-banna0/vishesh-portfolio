import { requireAdmin } from '@/lib/admin-auth';
import { getTheme } from '@/lib/queries';
import { PageTitle } from '@/components/admin/controls';
import { ThemeCustomizer } from '@/components/admin/ThemeCustomizer';

export const dynamic = 'force-dynamic';

export default async function ThemePage() {
  await requireAdmin();
  const theme = await getTheme();

  return (
    <div className="max-w-5xl">
      <PageTitle eyebrow="Appearance" title="Theme" />
      <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
        Change the accent color and motion. Everything derives from one hue, so the whole site
        recolors together. Preview live, then save to publish — no redeploy.
      </p>
      <ThemeCustomizer initial={theme} />
    </div>
  );
}
