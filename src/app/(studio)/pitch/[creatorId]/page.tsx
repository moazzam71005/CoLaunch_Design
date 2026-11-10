"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, RotateCcw, Send } from "lucide-react";
import { Avatar, Field, JourneyBar, Mascot, ProductSketch, Score, Tip, useToast } from "../../../_components/ui";
import { opportunities, pitchDraft } from "../../../_data/preview";

const DETECTED_RANK = 1;

export default function TestPitchPage() {
  const router = useRouter();
  const [subject, setSubject] = useState(pitchDraft.subject);
  const [body, setBody] = useState(pitchDraft.bodyText);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [replied, setReplied] = useState(false);
  const [rank, setRank] = useState(DETECTED_RANK);
  const [changing, setChanging] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast, toastNode } = useToast();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const first = pitchDraft.creatorName.split(" ")[0];
  const chosen = opportunities.find((o) => o.opportunityRank === rank) ?? opportunities[0];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    timers.current.push(
      setTimeout(() => {
        setSending(false);
        setSent(true);
        toast(`Pitch sent to ${first}.`);
      }, 700),
      setTimeout(() => setReplied(true), 1900)
    );
  };

  const regenerate = () => {
    setSubject(pitchDraft.subject);
    setBody(pitchDraft.bodyText);
    toast("Fresh draft ready.");
  };

  const createProject = () => {
    setCreating(true);
    timers.current.push(setTimeout(() => router.push("/projects/ratecraft?stage=new"), 700));
  };

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      {toastNode}
      <JourneyBar step={3} name={pitchDraft.creatorName} />

      <header className="mb-8">
        <h1 className="cl-serif text-[46px] leading-[1.05] md:text-[56px]">
          {sent ? `${first} has the pitch` : `Pitch ${first} the ideas`}
        </h1>
        <div className="mt-5">
          <Tip mood={sent ? "cheer" : "happy"}>
            {replied
              ? `${first} replied, and we matched the reply to an idea. Check we got it right.`
              : sent
                ? "Sent. We'll read the reply and work out which idea they liked."
                : "We drafted this for you. Change anything you want."}
          </Tip>
        </div>
      </header>

      {!sent && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <form onSubmit={send} className="cl-card min-w-0 space-y-5 p-6">
            <Field label="Subject">
              <input className="cl-input" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Field>
            <Field label="Email">
              <textarea rows={15} className="cl-input" value={body} onChange={(e) => setBody(e.target.value)} />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={sending} className="cl-btn cl-btn-green flex-1">
                <Send className="h-5 w-5" strokeWidth={2.5} /> {sending ? "Sending..." : "Approve & send"}
              </button>
              <button type="button" onClick={regenerate} className="cl-btn cl-btn-quiet">
                <RotateCcw className="h-5 w-5" strokeWidth={2.5} /> Regenerate
              </button>
            </div>
          </form>

          <section aria-label="Email preview" className="min-w-0 rounded-[18px] bg-(--cl-cream) p-6">
            <h2 className="mb-4 text-[15px] font-bold text-(--cl-muted)">What {first} will see</h2>
            <div className="rounded-2xl bg-(--cl-card) p-5">
              <div className="flex items-center gap-3 border-b-2 border-(--cl-line) pb-3">
                <Avatar name="Hyejee Bae" size={38} />
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-bold">{subject}</div>
                  <div className="truncate text-[13px] text-(--cl-muted)">Hyejee Bae, hey@co-launch.app</div>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-(--cl-ink-2)">{body}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {opportunities.map((o, i) => (
                  <figure key={o.id}>
                    <ProductSketch variant={i} label={`${o.title} mockup`} />
                    <figcaption className="mt-1 truncate text-[13px] font-semibold">{o.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {sent && !replied && (
        <div className="cl-card cl-pop flex flex-col items-center py-14 text-center">
          <Mascot size={88} bob />
          <p className="mt-4 text-[17px] font-semibold text-(--cl-ink-2)">Waiting for {first} to reply...</p>
        </div>
      )}

      {replied && (
        <section className="cl-rise">
          <div className="mb-6 max-w-[80%] rounded-2xl bg-(--cl-peach-tint) p-5">
            <div className="mb-1 flex items-center gap-2">
              <Avatar name={pitchDraft.creatorName} size={30} />
              <span className="text-[15px] font-bold">{pitchDraft.creatorName}</span>
            </div>
            <p className="text-[16px] leading-relaxed">
              I love {opportunities[0].title}! Let&apos;s build that and test demand with my audience.
            </p>
          </div>

          <h2 className="cl-serif mb-4 text-[32px] leading-tight md:text-[38px]">
            {rank === DETECTED_RANK ? `We think ${first} picked ${chosen.title}` : `You changed the pick to ${chosen.title}`}
          </h2>

          {!changing ? (
            <div className="cl-card grid gap-5 p-5 sm:grid-cols-[200px_1fr] sm:items-center">
              <ProductSketch variant={opportunities.indexOf(chosen)} label={`${chosen.title} mockup`} />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[20px] font-bold leading-tight">{chosen.title}</div>
                    <p className="mt-0.5 text-[15px] text-(--cl-ink-2)">{chosen.oneLiner}</p>
                    <p className="mt-1 text-sm text-(--cl-muted)">{chosen.pricingModel}</p>
                  </div>
                  <Score value={chosen.opportunityScore} size={56} />
                </div>
                <button type="button" onClick={() => setChanging(true)} className="cl-btn cl-btn-text mt-2">
                  Change the pick
                </button>
              </div>
            </div>
          ) : (
            <>
              <div role="radiogroup" aria-label="Chosen idea" className="grid gap-3 md:grid-cols-3">
                {opportunities.map((o, i) => (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={rank === o.opportunityRank}
                    onClick={() => setRank(o.opportunityRank)}
                    className="cl-tile p-4 text-left"
                  >
                    <ProductSketch variant={i} label={`${o.title} mockup`} />
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-[17px] font-bold">{o.title}</div>
                        <div className="truncate text-sm text-(--cl-muted)">{o.pricingModel}</div>
                      </div>
                      <Score value={o.opportunityScore} size={50} />
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                <button type="button" onClick={() => setChanging(false)} className="cl-btn cl-btn-text">
                  Done
                </button>
                {rank !== DETECTED_RANK && <span className="text-sm text-(--cl-muted)">This preview always continues with RateCraft OS.</span>}
              </div>
            </>
          )}

          <div className="mt-6 flex flex-col gap-4 rounded-[18px] bg-(--cl-ink) p-6 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <div className="cl-serif text-[30px] leading-tight">Create {chosen.title}?</div>
              <p className="text-[15px] text-[oklch(85%_0.01_80)]">
                Confirming creates the project. You&apos;ll review the plan before anything goes live.
              </p>
            </div>
            <button type="button" disabled={creating} onClick={createProject} className="cl-btn cl-btn-green cl-btn-lg">
              <Check className="h-5 w-5" strokeWidth={3} /> {creating ? "Setting it up..." : "Confirm"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
