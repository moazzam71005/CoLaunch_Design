"use client";

import { useState } from "react";
import { Check, Flag, Lock, MessageSquare, Star } from "lucide-react";
import { Field, Modal } from "../../../../_components/ui";

export function Stat({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="cl-card p-5">
      <div className="text-sm font-medium text-(--cl-muted)">{label}</div>
      <div className="cl-serif cl-num mt-1 text-[36px] leading-none">{value}</div>
      {note && <div className="mt-1.5 text-[13px] leading-snug text-(--cl-muted)">{note}</div>}
    </div>
  );
}

/** The small steps inside a phase, so each phase shows one state at a time. */
export function SubSteps({
  label,
  steps,
  value,
  onChange,
}: {
  label: string;
  steps: { name: string; locked?: boolean }[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {steps.map((s, i) => {
          const on = i === value;
          return (
            <li key={s.name} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden className="h-0.5 w-3 rounded-full bg-(--cl-line-strong) sm:w-5" />}
              <button
                type="button"
                disabled={s.locked}
                aria-current={on ? "step" : undefined}
                onClick={() => onChange(i)}
                className={`flex h-11 cursor-pointer items-center gap-2 rounded-xl px-2.5 text-[15px] disabled:cursor-not-allowed ${
                  on
                    ? "bg-(--cl-ink) font-bold text-white"
                    : s.locked
                      ? "font-medium text-(--cl-muted)"
                      : "font-semibold text-(--cl-ink-2) hover:bg-(--cl-cream)"
                }`}
              >
                <span
                  className={`cl-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                    on ? "bg-white text-(--cl-ink)" : "bg-(--cl-sand)"
                  }`}
                >
                  {s.locked ? <Lock className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                {s.name}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Label and value rows, used for plans and strategy. */
export function Facts({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="space-y-3 text-[15px] leading-snug">
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="font-bold">{r.label}</dt>
          <dd className="text-(--cl-ink-2)">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CheckRow({ label, done }: { label: string; done: boolean }) {
  return (
    <li className="flex items-center gap-3 text-[15px] font-medium">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-(--cl-green) text-white" : "border-[3px] border-(--cl-line-strong)"
        }`}
      >
        {done && <Check className="h-3.5 w-3.5" strokeWidth={4} />}
      </span>
      <span className={done ? "" : "text-(--cl-ink-2)"}>
        {label}
        <span className="sr-only">{done ? ", done" : ", not done yet"}</span>
      </span>
    </li>
  );
}

export type GateOption = { label: string; note: string; kind: "go" | "wait" | "stop"; onPick: () => void };

/** Big either/or choice at the end of a phase. */
export function Gate({
  title,
  sub,
  summary,
  options,
  locked,
  action,
  footer,
}: {
  title: string;
  sub: string;
  summary?: { label: string; value: string; pass?: boolean }[];
  locked?: string;
  action?: { label: string; onClick: () => void };
  footer?: React.ReactNode;
  options: GateOption[];
}) {
  return (
    <section className="rounded-[20px] bg-(--cl-ink) p-6 text-white md:p-7">
      <div className="flex items-center gap-2.5">
        <Flag className="h-5 w-5 text-(--cl-peach)" strokeWidth={2.5} />
        <h3 className="cl-serif text-[32px] leading-none">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] text-[oklch(85%_0.01_80)]">{sub}</p>

      {summary && (
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[oklch(35%_0.02_25)] py-4 md:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-[oklch(78%_0.01_80)]">{s.label}</dt>
              <dd className="cl-serif cl-num mt-0.5 text-[28px] leading-none">
                {s.pass ? (
                  <span className="inline-block rounded-lg bg-(--cl-green) px-2 py-1 text-white">{s.value}</span>
                ) : (
                  s.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {locked ? (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-(--cl-peach)">
            <Lock className="h-4 w-4" strokeWidth={2.5} /> {locked}
          </p>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="h-11 cursor-pointer text-[15px] font-semibold text-white underline underline-offset-4"
            >
              {action.label}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={o.onPick}
              className={`cl-btn h-auto! flex-col items-start! gap-1! whitespace-normal! p-4! text-left ${
                o.kind === "go" ? "cl-btn-green" : "cl-btn-quiet"
              }`}
            >
              <span className="text-[17px]">{o.label}</span>
              <span className={`text-sm font-normal leading-snug ${o.kind === "go" ? "text-white" : "text-(--cl-muted)"}`}>{o.note}</span>
            </button>
          ))}
        </div>
      )}
      {footer && <div className="mt-4 text-sm text-[oklch(85%_0.01_80)]">{footer}</div>}
    </section>
  );
}

export function FeedbackWidget({ onSent }: { onSent: () => void }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("bug");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const close = () => setOpen(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cl-btn cl-btn-quiet cl-btn-sm">
        <MessageSquare className="h-4 w-4" strokeWidth={2.5} /> Beta feedback
      </button>
      {open && (
        <Modal title="Share your feedback" sub="Help us polish this before launch." onClose={close}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setComment("");
              close();
              onSent();
            }}
            className="space-y-5"
          >
            <div className="grid grid-cols-4 gap-2">
              {[
                ["bug", "Bug"],
                ["feature_request", "Idea"],
                ["praise", "Praise"],
                ["blocker", "Blocker"],
              ].map(([id, label]) => (
                <button key={id} type="button" aria-pressed={type === id} onClick={() => setType(id)} className="cl-tile py-3 text-[15px] font-bold">
                  {label}
                </button>
              ))}
            </div>
            <div>
              <span className="mb-1 block text-[15px] font-semibold">How is it so far?</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" aria-label={`${s} out of 5`} onClick={() => setRating(s)} className="flex h-11 w-11 cursor-pointer items-center justify-center">
                    <Star className={`h-7 w-7 ${s <= rating ? "fill-(--cl-amber) text-(--cl-amber)" : "text-(--cl-line-strong)"}`} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
            <Field label="What did you notice?">
              <textarea required rows={3} className="cl-input" value={comment} onChange={(e) => setComment(e.target.value)} />
            </Field>
            <Field label="Your email (optional)">
              <input type="email" className="cl-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <button type="submit" className="cl-btn cl-btn-primary w-full">
              Send feedback
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
