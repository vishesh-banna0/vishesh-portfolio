'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

type UploadResult = { error?: string; ok?: boolean } | void;
type UploadAction = (fd: FormData) => Promise<UploadResult>;

export function Uploader({
  action,
  accept,
  label = 'Upload file',
  hint,
}: {
  action: UploadAction;
  accept: string;
  label?: string;
  hint?: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg('');
    try {
      const fd = new FormData();
      fd.set('file', file);
      const res = await action(fd);
      if (res && 'error' in res && res.error) {
        setMsg(res.error);
      } else {
        setMsg(`Uploaded ${file.name}`);
        router.refresh();
      }
    } catch (err) {
      // Without this, a rejected server action (e.g. a storage failure) would
      // leave the button stuck on "Uploading…" forever.
      setMsg(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="panel flex flex-wrap items-center gap-3 p-5">
      <label className="btn-primary inline-flex cursor-pointer !px-4 !py-2 text-sm">
        <Upload size={16} /> {busy ? 'Uploading…' : label}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onChange}
          disabled={busy}
          className="hidden"
        />
      </label>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      {msg ? <span className="mono-label ml-auto !text-brand">{msg}</span> : null}
    </div>
  );
}
