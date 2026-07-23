'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { uploadMedia } from '@/lib/admin-actions';

export function Uploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg('');
    const fd = new FormData();
    fd.set('file', file);
    const res = await uploadMedia(fd);
    setBusy(false);
    if (res && 'error' in res && res.error) {
      setMsg(res.error);
    } else {
      setMsg(`Uploaded ${file.name}`);
      router.refresh();
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="panel flex flex-wrap items-center gap-3 p-5">
      <label className="btn-primary inline-flex cursor-pointer !px-4 !py-2 text-sm">
        <Upload size={16} /> {busy ? 'Uploading…' : 'Upload file'}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf"
          onChange={onChange}
          disabled={busy}
          className="hidden"
        />
      </label>
      <span className="text-xs text-muted-foreground">Images or PDF, up to 8 MB</span>
      {msg ? <span className="mono-label ml-auto !text-brand">{msg}</span> : null}
    </div>
  );
}
