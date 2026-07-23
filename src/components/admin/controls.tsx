import type { ReactNode } from 'react';

export const inputCls =
  'w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand/60';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${className}`} />;
}

export function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} min-h-[80px] resize-y ${className}`} />;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mono-label">{label}</span>
      {hint ? <span className="ml-2 text-xs text-faint">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">{title}</h1>
    </div>
  );
}

export function SaveButton({ children = 'Save' }: { children?: ReactNode }) {
  return (
    <button type="submit" className="btn-primary !px-4 !py-2 text-sm">
      {children}
    </button>
  );
}

/** A single-button form bound to a no-arg server action (delete / move). */
export function ActionButton({
  action,
  label,
  danger,
  children,
}: {
  action: () => Promise<void>;
  label: string;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        aria-label={label}
        className={`grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground ${
          danger ? 'hover:!border-destructive/50 hover:!text-destructive' : 'hover:border-brand/50'
        }`}
      >
        {children}
      </button>
    </form>
  );
}
