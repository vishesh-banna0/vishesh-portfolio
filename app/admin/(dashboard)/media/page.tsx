import { Trash2 } from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { PageTitle, ActionButton } from '@/components/admin/controls';
import { Uploader } from '@/components/admin/Uploader';
import { CopyButton } from '@/components/admin/CopyButton';
import { deleteMedia } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  await requireAdmin();
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="max-w-4xl">
      <PageTitle eyebrow="Assets" title="Media" />
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Upload images, the résumé PDF, or certificates. Copy a URL to paste it into any field —
        for example, the résumé link on the Hero page.
      </p>

      <Uploader />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((m) => (
          <div key={m.id} className="panel overflow-hidden">
            <div className="grid aspect-video place-items-center bg-surface-2">
              {m.mimeType.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.alt ?? m.filename} className="h-full w-full object-cover" />
              ) : (
                <span className="mono-label">{m.mimeType.split('/')[1]?.toUpperCase() ?? 'FILE'}</span>
              )}
            </div>
            <div className="p-3">
              <div className="truncate text-sm" title={m.filename}>
                {m.filename}
              </div>
              <div className="mono-label mt-1 !text-[0.6rem]">{(m.size / 1024).toFixed(0)} KB</div>
              <div className="mt-2 flex items-center gap-1.5">
                <CopyButton text={m.url} />
                <ActionButton action={deleteMedia.bind(null, m.id)} label="Delete" danger>
                  <Trash2 size={14} />
                </ActionButton>
              </div>
            </div>
          </div>
        ))}
        {media.length === 0 ? (
          <p className="col-span-full text-sm text-muted-foreground">
            No media yet. Upload your first asset above.
          </p>
        ) : null}
      </div>
    </div>
  );
}
