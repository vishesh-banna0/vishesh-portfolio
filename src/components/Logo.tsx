/**
 * The "V" emblem, inlined so it inherits the theme. The gradient stops read the
 * live brand variables (`--brand` / `--brand-bright`), so the logo recolors — and
 * drifts through hues with the rest of the site — whenever the theme changes.
 * Must be inline SVG in the DOM: an <img src="logo.svg"> can't inherit CSS vars.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-brand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--brand))" />
          <stop offset="100%" stopColor="hsl(var(--brand-bright))" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" stroke="url(#logo-brand)" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path
        d="M12 12 L20 28 L28 12"
        stroke="url(#logo-brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 14 C16 14 24 10 24 16 C24 22 16 20 16 26 C16 30 24 28 24 28"
        stroke="url(#logo-brand)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
