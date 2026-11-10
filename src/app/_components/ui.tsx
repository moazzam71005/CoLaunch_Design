"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mascot: a small flat rocket, taken from the rocket in the site logo */
/* ------------------------------------------------------------------ */
export function Mascot({
  size = 72,
  mood = "happy",
  bob = false,
}: {
  size?: number;
  mood?: "happy" | "cheer";
  bob?: boolean;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={(size * 96) / 80}
      viewBox="0 0 80 96"
      className={`shrink-0 ${bob ? "cl-bob" : ""}`}
    >
      <path d="M31 74c1 10 5 16 9 20 4-4 8-10 9-20z" fill="var(--cl-peach)" />
      <path d="M21 50 8 66c-2 3 0 7 4 6l13-4z" fill="var(--cl-brand-press)" />
      <path d="M59 50l13 16c2 3 0 7-4 6l-13-4z" fill="var(--cl-brand-press)" />
      <path
        d="M40 3c13 9 21 25 21 43 0 11-2 21-6 29-1 2-3 3-5 3H30c-2 0-4-1-5-3-4-8-6-18-6-29C19 28 27 12 40 3z"
        fill="var(--cl-cream)"
        stroke="var(--cl-ink)"
        strokeWidth="3"
      />
      <path
        d="M40 3c8 5.500 14 13.500 17.500 23h-35C26 16.500 32 8.500 40 3z"
        fill="var(--cl-brand)"
        stroke="var(--cl-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {mood === "cheer" ? (
        <>
          <path d="M28 44c2-4 7-4 9 0" fill="none" stroke="var(--cl-ink)" strokeWidth="3.500" strokeLinecap="round" />
          <path d="M43 44c2-4 7-4 9 0" fill="none" stroke="var(--cl-ink)" strokeWidth="3.500" strokeLinecap="round" />
          <path d="M31 52c3 9 15 9 18 0z" fill="var(--cl-brand)" stroke="var(--cl-ink)" strokeWidth="2.500" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <circle cx="32" cy="43" r="4" fill="var(--cl-ink)" />
          <circle cx="48" cy="43" r="4" fill="var(--cl-ink)" />
          <circle cx="33.300" cy="41.700" r="1.300" fill="#fff" />
          <circle cx="49.300" cy="41.700" r="1.300" fill="#fff" />
          <path d="M33 53c3 4 11 4 14 0" fill="none" stroke="var(--cl-ink)" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Mascot with a speech bubble. One per page at most: it guides, it does not decorate. */
export function Tip({
  children,
  mood,
  size = 56,
}: {
  children: React.ReactNode;
  mood?: "happy" | "cheer";
  size?: number;
}) {
  return (
    <div className="flex items-end gap-3">
      <Mascot size={size} mood={mood} />
      <div className="relative mb-2 rounded-2xl border-2 border-(--cl-line) bg-(--cl-card) px-4 py-3 text-[15px] leading-snug text-(--cl-ink-2)">
        <span
          aria-hidden
          className="absolute -left-[9px] bottom-4 h-4 w-4 rotate-45 border-b-2 border-l-2 border-(--cl-line) bg-(--cl-card)"
        />
        <span className="relative">{children}</span>
      </div>
    </div>
  );
}

/** Full-card "you did it" moment. */
export function Celebrate({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="cl-card cl-pop flex flex-col items-center px-6 py-12 text-center">
      <Mascot size={92} mood="cheer" bob />
      <h3 className="cl-serif mt-5 text-[36px] leading-tight">{title}</h3>
      {body && <p className="mt-2 max-w-md text-[16px] text-(--cl-ink-2)">{body}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Basics                                                              */
/* ------------------------------------------------------------------ */
const avatarTones = [
  "bg-(--cl-peach-tint) text-(--cl-ink)",
  "bg-(--cl-green-tint) text-(--cl-green-text)",
  "bg-(--cl-amber-tint) text-(--cl-amber-text)",
  "bg-(--cl-sand) text-(--cl-ink-2)",
];

export function Avatar({ name, size = 40, tone = 0 }: { name: string; size?: number; tone?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={`cl-serif inline-flex shrink-0 items-center justify-center rounded-full ${avatarTones[tone % avatarTones.length]}`}
    >
      {initials}
    </span>
  );
}

export type TagTone = "neutral" | "brand" | "green" | "amber";
const tagTones: Record<TagTone, string> = {
  neutral: "bg-(--cl-cream) text-(--cl-ink-2)",
  brand: "bg-(--cl-brand-tint) text-(--cl-brand-press)",
  green: "bg-(--cl-green-tint) text-(--cl-green-text)",
  amber: "bg-(--cl-amber-tint) text-(--cl-amber-text)",
};

export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: TagTone }) {
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[13px] font-semibold ${tagTones[tone]}`}>
      {children}
    </span>
  );
}

export function Progress({
  value,
  tone = "brand",
  height = 12,
  label,
}: {
  value: number;
  tone?: "brand" | "green";
  height?: number;
  label: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height }}
      className="w-full overflow-hidden rounded-full bg-(--cl-sand)"
    >
      <div
        style={{ width: `${pct}%` }}
        className={`h-full rounded-full transition-[width] duration-300 ${
          tone === "green" ? "bg-(--cl-green)" : "bg-(--cl-brand)"
        }`}
      />
    </div>
  );
}

export function Ring({
  value,
  max,
  size = 96,
  children,
  label,
}: {
  value: number;
  max: number;
  size?: number;
  children?: React.ReactNode;
  label: string;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--cl-sand)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={pct >= 1 ? "var(--cl-green)" : "var(--cl-brand)"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 300ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export type Step = { name: string; detail?: string; state: "done" | "current" | "todo" };

/** Horizontal step path: done is filled, current is ringed, upcoming is hollow. */
export function StepPath({ steps, compact = false }: { steps: Step[]; compact?: boolean }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.name} className={`relative flex flex-col items-center ${last ? "" : "flex-1"}`}>
            <div className="flex w-full items-center">
              <span
                className={`relative z-10 flex shrink-0 items-center justify-center rounded-full ${
                  compact ? "h-7 w-7" : "h-11 w-11"
                } ${
                  s.state === "done"
                    ? "bg-(--cl-green) text-white"
                    : s.state === "current"
                      ? "border-[3px] border-(--cl-brand) bg-(--cl-card) text-(--cl-brand)"
                      : "border-[3px] border-(--cl-line-strong) bg-(--cl-card) text-(--cl-muted)"
                }`}
              >
                {s.state === "done" ? (
                  <Check className={compact ? "h-3.5 w-3.5" : "h-5 w-5"} strokeWidth={3} />
                ) : (
                  <span className={`cl-num font-bold ${compact ? "text-xs" : "text-[15px]"}`}>{i + 1}</span>
                )}
              </span>
              {!last && (
                <span
                  aria-hidden
                  className={`mx-1.5 h-1 flex-1 rounded-full ${s.state === "done" ? "bg-(--cl-green)" : "bg-(--cl-line)"}`}
                />
              )}
            </div>
            {compact && (
              <div
                className={`mt-1.5 flex w-full whitespace-nowrap text-[13px] font-semibold ${last && i > 0 ? "justify-end" : ""} ${
                  s.state === "todo" ? "text-(--cl-muted)" : "text-(--cl-ink-2)"
                }`}
              >
                {s.name}
              </div>
            )}
            {!compact && (
              <div className="mt-2.5 w-full pr-3">
                <div className={`text-sm font-bold ${s.state === "todo" ? "text-(--cl-muted)" : "text-(--cl-ink)"}`}>
                  {s.name}
                </div>
                {s.detail && <div className="mt-0.5 text-[13px] text-(--cl-muted)">{s.detail}</div>}
              </div>
            )}
            <span className="sr-only">
              {s.state === "done" ? "completed" : s.state === "current" ? "current step" : "not started"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function PageHead({
  title,
  sub,
  actions,
}: {
  title: string;
  sub?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="cl-serif text-[44px] leading-[1.05] md:text-[52px]">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-[17px] leading-snug text-(--cl-ink-2)">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="cl-serif text-[30px] leading-none">{title}</h2>
      {action}
    </div>
  );
}

/** Says what the system is doing on its own, in place of a button. */
export function StatusNote({ title, sub }: { title: string; sub?: string }) {
  return (
    <div role="status" className="rounded-2xl bg-(--cl-cream) px-4 py-3">
      <div className="flex items-center gap-2 text-[15px] font-bold">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-(--cl-green)" />
        {title}
      </div>
      {sub && <div className="mt-0.5 pl-[18px] text-[13px] text-(--cl-muted)">{sub}</div>}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-(--cl-ink-2) hover:text-(--cl-ink)"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
      {children}
    </Link>
  );
}

/** Text tabs with counts, used for every filter row. */
export function Filters<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-6 overflow-x-auto border-b-2 border-(--cl-line)">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.id)}
            className={`-mb-0.5 h-12 shrink-0 cursor-pointer border-b-[3px] text-[15px] ${
              on
                ? "border-(--cl-brand) font-bold text-(--cl-ink)"
                : "border-transparent font-medium text-(--cl-muted) hover:text-(--cl-ink)"
            }`}
          >
            {o.label}
            {o.count !== undefined && <span className="cl-num ml-1.5 text-(--cl-muted)">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[15px] font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-sm text-(--cl-muted)">{hint}</span>}
    </label>
  );
}

export function CopyButton({
  text,
  label = "Copy",
  onCopied,
}: {
  text: string;
  label?: string;
  onCopied?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard can be blocked. The text stays selectable. */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-(--cl-ink-2) hover:bg-(--cl-sand)"
    >
      {copied ? <Check className="h-4 w-4 text-(--cl-green-text)" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function Modal({
  title,
  sub,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  sub?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(15%_0.02_25/0.55)] p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`cl-rise flex max-h-[88vh] w-full flex-col rounded-[22px] bg-(--cl-card) ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-3">
          <div>
            <h2 className="cl-serif text-[30px] leading-tight">{title}</h2>
            {sub && <p className="mt-1 text-[15px] text-(--cl-muted)">{sub}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-(--cl-muted) hover:bg-(--cl-cream) hover:text-(--cl-ink)"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
        <div className="overflow-y-auto p-6 pt-2">{children}</div>
      </div>
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toast = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2800);
  }, []);
  const node = msg ? (
    <div
      role="status"
      className="cl-rise fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-(--cl-ink) px-5 py-3.5 text-[15px] font-semibold text-white"
    >
      <Check className="h-5 w-5 shrink-0 text-(--cl-peach)" strokeWidth={3} />
      {msg}
    </div>
  ) : null;
  return { toast, toastNode: node };
}

/* ------------------------------------------------------------------ */
/* Guided flows                                                        */
/* ------------------------------------------------------------------ */
const journeySteps = ["Reply", "Research", "Ideas", "Pitch", "Project"];

/** Lesson-style bar for the creator journey: exit, progress, where you are. */
export function JourneyBar({ step, name }: { step: 1 | 2 | 3; name: string }) {
  const pct = ((step + 0.5) / (journeySteps.length - 1)) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <Link
          href="/review-queue"
          aria-label="Exit to replies"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-(--cl-muted) hover:bg-(--cl-cream) hover:text-(--cl-ink)"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </Link>
        <Progress value={pct} height={16} tone="green" label={`${name}: journey progress`} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 pl-14 text-sm">
        <span className="font-bold">{name}</span>
        <span className="text-(--cl-muted)">·</span>
        {journeySteps.map((s, i) => (
          <span
            key={s}
            className={i === step ? "font-bold text-(--cl-brand)" : i < step ? "text-(--cl-green-text)" : "text-(--cl-muted)"}
          >
            {s}
            {i < journeySteps.length - 1 && <span className="ml-2 text-(--cl-line-strong)">/</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Sticks to the bottom of a flow and holds the one thing to do next. */
export function ActionBar({ text, sub, children }: { text: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="sticky bottom-14 z-20 -mx-4 mt-10 md:bottom-0 border-t-2 border-(--cl-line) bg-(--cl-paper) px-4 py-4 md:-mx-10 md:px-10">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[16px] font-bold">{text}</div>
          {sub && <div className="text-sm text-(--cl-muted)">{sub}</div>}
        </div>
        <div className="flex flex-wrap items-center gap-3">{children}</div>
      </div>
    </div>
  );
}

export function Score({ value, size = 56 }: { value: number; size?: number }) {
  const tone =
    value >= 70
      ? "bg-(--cl-green-tint) text-(--cl-green-text)"
      : value >= 55
        ? "bg-(--cl-amber-tint) text-(--cl-amber-text)"
        : "bg-(--cl-sand) text-(--cl-muted)";
  return (
    <span
      style={{ width: size, height: size }}
      className={`flex shrink-0 flex-col items-center justify-center rounded-2xl ${tone}`}
    >
      <span className="cl-num text-[20px] font-bold leading-none">{value}</span>
      <span className="mt-0.5 text-[11px] font-semibold leading-none">score</span>
      <span className="sr-only">out of 100</span>
    </span>
  );
}

/**
 * Simple drawn product preview. Stands in for the generated mockup image
 * so the preview does not spend image credits or use stock photos.
 */
export function ProductSketch({ variant = 0, label }: { variant?: number; label: string }) {
  const accents = ["var(--cl-brand)", "var(--cl-green)", "var(--cl-amber)"];
  const a = accents[variant % accents.length];
  return (
    <svg role="img" aria-label={label} viewBox="0 0 320 200" className="block h-auto w-full rounded-xl bg-(--cl-cream)">
      <rect x="16" y="14" width="288" height="172" rx="12" fill="#fff" stroke="var(--cl-line-strong)" strokeWidth="2" />
      <rect x="32" y="30" width="86" height="12" rx="6" fill="var(--cl-ink)" />
      <rect x="242" y="28" width="46" height="16" rx="8" fill={a} />
      {variant % 3 === 0 && (
        <>
          <rect x="32" y="60" width="118" height="10" rx="5" fill="var(--cl-sand)" />
          <rect x="32" y="60" width="78" height="10" rx="5" fill={a} />
          <circle cx="110" cy="65" r="9" fill="#fff" stroke="var(--cl-ink)" strokeWidth="2.500" />
          <rect x="32" y="88" width="118" height="10" rx="5" fill="var(--cl-sand)" />
          <rect x="32" y="88" width="44" height="10" rx="5" fill={a} />
          <circle cx="76" cy="93" r="9" fill="#fff" stroke="var(--cl-ink)" strokeWidth="2.500" />
          <rect x="172" y="60" width="116" height="110" rx="10" fill="var(--cl-brand-tint)" />
          <rect x="190" y="82" width="80" height="20" rx="6" fill="var(--cl-ink)" />
          <rect x="190" y="114" width="60" height="9" rx="4.500" fill={a} />
          <rect x="190" y="132" width="44" height="9" rx="4.500" fill="var(--cl-line-strong)" />
          <rect x="32" y="122" width="118" height="48" rx="10" fill="var(--cl-cream)" />
        </>
      )}
      {variant % 3 === 1 && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${32 + i * 88} 60)`}>
              <rect width="80" height="110" rx="10" fill={i === 1 ? "var(--cl-green-tint)" : "var(--cl-cream)"} />
              <rect x="12" y="14" width="44" height="9" rx="4.500" fill="var(--cl-ink)" />
              <rect x="12" y="34" width="56" height="7" rx="3.500" fill="var(--cl-line-strong)" />
              <rect x="12" y="48" width="48" height="7" rx="3.500" fill="var(--cl-line-strong)" />
              <rect x="12" y="84" width="56" height="14" rx="7" fill={i === 1 ? a : "var(--cl-line-strong)"} />
            </g>
          ))}
        </>
      )}
      {variant % 3 === 2 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(32 ${60 + i * 28})`}>
              <circle cx="9" cy="9" r="9" fill={i < 2 ? a : "var(--cl-sand)"} />
              <rect x="30" y="4" width={130 - i * 16} height="10" rx="5" fill="var(--cl-line-strong)" />
              <rect x="212" y="1" width="44" height="16" rx="8" fill="var(--cl-cream)" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
