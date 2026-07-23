'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Download, Upload, RotateCcw } from 'lucide-react';
import { saveTheme } from '@/lib/admin-actions';
import type { ThemeView } from '@/lib/queries';

const DEFAULTS: ThemeView = { brandH: 38, brandS: 96, brandL: 56, hueCycle: true, radius: 0.5 };

const PRESETS = [
  { name: 'Gold', h: 38, s: 96, l: 56 },
  { name: 'Orange', h: 24, s: 95, l: 55 },
  { name: 'Red', h: 2, s: 85, l: 58 },
  { name: 'Pink', h: 330, s: 85, l: 62 },
  { name: 'Purple', h: 270, s: 80, l: 62 },
  { name: 'Blue', h: 216, s: 95, l: 60 },
  { name: 'Cyan', h: 190, s: 90, l: 52 },
  { name: 'Emerald', h: 155, s: 72, l: 48 },
];

function applyToRoot(t: ThemeView) {
  const r = document.documentElement;
  r.style.setProperty('--brand-h-base', String(t.brandH));
  r.style.setProperty('--brand-s', `${t.brandS}%`);
  r.style.setProperty('--brand-l', `${t.brandL}%`);
  r.style.setProperty('--radius', `${t.radius}rem`);
  r.classList.toggle('hue-cycle', t.hueCycle);
}

export function ThemeCustomizer({ initial }: { initial: ThemeView }) {
  const [t, setT] = useState<ThemeView>(initial);
  const [saved, setSaved] = useState<ThemeView>(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRef = useRef(saved);
  savedRef.current = saved;

  // Live preview: reflect changes across the whole admin immediately.
  useEffect(() => {
    applyToRoot(t);
  }, [t]);

  // On leaving, restore whatever is currently saved (revert an unsaved preview).
  useEffect(() => {
    return () => applyToRoot(savedRef.current);
  }, []);

  const dirty = JSON.stringify(t) !== JSON.stringify(saved);
  const set = (patch: Partial<ThemeView>) => setT((cur) => ({ ...cur, ...patch }));

  async function onSave() {
    setStatus('saving');
    await saveTheme(t);
    setSaved(t);
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 1600);
  }

  function onExport() {
    const blob = new Blob([JSON.stringify(t, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        const j = JSON.parse(txt);
        setT({
          brandH: Number(j.brandH ?? DEFAULTS.brandH),
          brandS: Number(j.brandS ?? DEFAULTS.brandS),
          brandL: Number(j.brandL ?? DEFAULTS.brandL),
          hueCycle: Boolean(j.hueCycle),
          radius: Number(j.radius ?? DEFAULTS.radius),
        });
      } catch {
        /* ignore malformed */
      }
    });
    e.target.value = '';
  }

  const swatch = (h: number, s: number, l: number) => `hsl(${h} ${s}% ${l}%)`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Controls */}
      <div className="space-y-6">
        {/* Presets */}
        <div>
          <div className="mono-label mb-3">Accent presets</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = t.brandH === p.h && t.brandS === p.s && t.brandL === p.l;
              return (
                <button
                  key={p.name}
                  onClick={() => set({ brandH: p.h, brandS: p.s, brandL: p.l })}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                    active ? 'border-brand text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full" style={{ background: swatch(p.h, p.s, p.l) }} />
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders */}
        <div className="panel space-y-5 p-5">
          <Slider
            label="Hue"
            value={t.brandH}
            min={0}
            max={360}
            step={1}
            suffix="°"
            disabled={t.hueCycle}
            hint={t.hueCycle ? 'drifts automatically while hue-cycle is on' : undefined}
            onChange={(v) => set({ brandH: v })}
          />
          <Slider label="Saturation" value={t.brandS} min={0} max={100} step={1} suffix="%" onChange={(v) => set({ brandS: v })} />
          <Slider label="Lightness" value={t.brandL} min={20} max={80} step={1} suffix="%" onChange={(v) => set({ brandL: v })} />
          <Slider label="Corner radius" value={t.radius} min={0} max={1.5} step={0.05} suffix="rem" onChange={(v) => set({ radius: v })} />

          <label className="flex items-center justify-between">
            <span className="text-sm">
              Hue cycle
              <span className="mono-label ml-2 !text-[0.6rem]">amber → violet drift</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={t.hueCycle}
              onClick={() => set({ hueCycle: !t.hueCycle })}
              className={`relative h-6 w-11 rounded-full transition-colors ${t.hueCycle ? 'bg-brand' : 'bg-surface-2 border border-border'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${t.hueCycle ? 'translate-x-5' : 'translate-x-0.5'}`}
              />
            </button>
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={onSave} disabled={!dirty || status === 'saving'} className="btn-primary !px-4 !py-2 text-sm disabled:opacity-50">
            {status === 'saved' ? (
              <>
                <Check size={16} /> Saved
              </>
            ) : status === 'saving' ? (
              'Saving…'
            ) : (
              'Save & publish'
            )}
          </button>
          <button onClick={() => set(DEFAULTS)} className="btn-secondary !px-4 !py-2 text-sm">
            <RotateCcw size={15} /> Reset
          </button>
          <button onClick={onExport} className="btn-secondary !px-4 !py-2 text-sm">
            <Download size={15} /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} className="btn-secondary !px-4 !py-2 text-sm">
            <Upload size={15} /> Import
          </button>
          <input ref={fileRef} type="file" accept="application/json" onChange={onImport} className="hidden" />
          {dirty ? <span className="mono-label !text-brand">unsaved changes</span> : null}
        </div>
      </div>

      {/* Preview + compare */}
      <div className="space-y-4">
        <div className="panel overflow-hidden">
          <div className="border-b border-border px-4 py-2.5">
            <span className="mono-label">Live preview</span>
          </div>
          <div className="space-y-4 p-5">
            <div className="font-display text-2xl font-semibold tracking-tight">
              <span className="gradient-text">Vishesh Shekhawat</span>
            </div>
            <div className="mono-label !text-brand">ML / AI Systems Engineer</div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary !px-3 !py-1.5 text-xs">Primary</span>
              <span className="btn-secondary !px-3 !py-1.5 text-xs">Secondary</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['PyTorch', 'FastAPI', 'Diffusion'].map((x) => (
                <span key={x} className="tag">
                  {x}
                </span>
              ))}
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="font-display text-xl font-semibold text-brand">143</div>
              <div className="mono-label mt-1 !text-[0.6rem]">Global rank</div>
            </div>
          </div>
        </div>

        <div className="panel flex items-center justify-between p-4">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 rounded-full" style={{ background: swatch(saved.brandH, saved.brandS, saved.brandL) }} />
            <div className="mono-label mt-2 !text-[0.6rem]">Saved</div>
          </div>
          <div className="mono-label">→</div>
          <div className="text-center">
            <div className="mx-auto h-8 w-8 rounded-full" style={{ background: swatch(t.brandH, t.brandS, t.brandL) }} />
            <div className="mono-label mt-2 !text-[0.6rem]">Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  disabled,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  disabled?: boolean;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className={disabled ? 'opacity-50' : ''}>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="mono-label">{label}</span>
        <span className="font-mono text-xs text-foreground">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand"
      />
      {hint ? <div className="mt-1 text-xs text-faint">{hint}</div> : null}
    </div>
  );
}
