'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

const inputClass =
  'mt-1.5 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand/60';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-brand text-brand-foreground">
            <Lock size={20} />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">Admin access</h1>
          <p className="mono-label mt-2">Vishesh Shekhawat · CMS</p>
        </div>

        <form onSubmit={onSubmit} className="panel space-y-4 p-6">
          <div>
            <label htmlFor="email" className="mono-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mono-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <a href="/" className="mono-label hover:!text-brand">
            ← Back to site
          </a>
        </p>
      </div>
    </main>
  );
}
