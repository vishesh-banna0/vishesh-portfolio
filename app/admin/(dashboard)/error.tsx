'use client';

// Without this, any failure in an admin page renders Next's bare "Application
// error: a server-side exception has occurred" with nothing but a digest. Schema
// drift (a migration that never reached the DB) is the usual cause, so say so.
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">Error</span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
        This page couldn&rsquo;t load
      </h1>
      <p className="mt-2 text-muted-foreground">
        Something failed on the server. If this started right after a deploy, the database is
        probably behind the Prisma schema — run <code className="mono-label">prisma migrate deploy</code>{' '}
        against the production database.
      </p>

      <div className="panel mt-6 p-5">
        <div className="mono-label">Details</div>
        <p className="mt-2 break-words text-sm text-muted-foreground">
          {error.message || 'No message available.'}
        </p>
        {error.digest ? (
          <p className="mono-label mt-2 !text-[0.62rem]">Digest: {error.digest}</p>
        ) : null}
      </div>

      <button onClick={reset} className="btn-primary mt-6 !px-4 !py-2 text-sm">
        Try again
      </button>
    </div>
  );
}
