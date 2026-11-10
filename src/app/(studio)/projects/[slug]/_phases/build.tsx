"use client";

import { useState } from "react";
import { Bot, Check, Loader, UserRound } from "lucide-react";
import { CopyButton, Modal, Progress, Ring, SectionHeading, Tag, Tip } from "../../../../_components/ui";
import { betaFeedback, buildProgress, prd, readiness } from "../../../../_data/preview";
import { FeedbackWidget, Facts, Gate, Stat, SubSteps } from "./parts";

const lanes = [
  { owner: "ai", name: "AI agents", Icon: Bot },
  { owner: "human", name: "Human engineering", Icon: UserRound },
];

const docs = {
  spec: { title: "Product spec", text: prd.markdown_content, copy: "Copy spec" },
  tech: { title: "Technical plan", text: prd.technical_markdown, copy: "Copy plan" },
};

export function BuildPhase({
  phase,
  onLaunch,
  onContinueBeta,
  onKill,
  onToast,
}: {
  phase: number;
  onLaunch: () => void;
  onContinueBeta: () => void;
  onKill: () => void;
  onToast: (m: string) => void;
}) {
  const [sub, setSub] = useState(0);
  const [doc, setDoc] = useState<keyof typeof docs | null>(null);
  const [invited, setInvited] = useState(false);

  const work = buildProgress.work;
  const done = work.filter((w) => w.status === "done").length;

  return (
    <div className="space-y-8">
      <SubSteps
        label="Build steps"
        value={sub}
        onChange={setSub}
        steps={[{ name: "Plan" }, { name: "Build" }, { name: "Beta and gate" }]}
      />

      {sub === 0 && (
        <div className="space-y-8">
          <p className="max-w-2xl text-[17px] leading-snug text-(--cl-ink-2)">{prd.executive_summary}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="cl-card flex flex-col p-6">
              <h2 className="cl-serif mb-4 text-[30px] leading-none">Product spec</h2>
              <Facts rows={prd.spec_summary} />
              <div className="mt-auto pt-5">
                <button type="button" onClick={() => setDoc("spec")} className="cl-btn cl-btn-quiet cl-btn-sm">
                  Read full spec
                </button>
              </div>
            </section>
            <section className="cl-card flex flex-col p-6">
              <h2 className="cl-serif mb-4 text-[30px] leading-none">Technical plan</h2>
              <Facts rows={prd.technical_summary} />
              <div className="mt-auto pt-5">
                <button type="button" onClick={() => setDoc("tech")} className="cl-btn cl-btn-quiet cl-btn-sm">
                  Read technical plan
                </button>
              </div>
            </section>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl bg-(--cl-green-tint) p-5">
              <h3 className="text-[16px] font-bold text-(--cl-green-text)">In the MVP</h3>
              <ul className="mt-2 space-y-1 text-[15px]">
                {prd.mvp_in.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl bg-(--cl-cream) p-5">
              <h3 className="text-[16px] font-bold text-(--cl-ink-2)">Not in the MVP</h3>
              <ul className="mt-2 space-y-1 text-[15px] text-(--cl-ink-2)">
                {prd.mvp_out.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <SectionHeading title="Milestones" />
            <ol className="grid gap-3 md:grid-cols-4">
              {prd.sprint_milestones.map((s) => (
                <li key={s.sprint} className="rounded-2xl bg-(--cl-cream) p-4">
                  <div className="text-[13px] font-bold text-(--cl-brand-press)">Week {s.sprint}</div>
                  <div className="text-[16px] font-bold">{s.name}</div>
                  <ul className="mt-1.5 space-y-0.5 text-sm text-(--cl-muted)">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {sub === 1 && (
        <div className="space-y-8">
          <section className="cl-card p-6">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="cl-serif text-[32px] leading-none">{buildProgress.weekLabel}</h2>
              <span className="cl-num text-[15px] font-bold">
                {done} of {work.length} done
              </span>
            </div>
            <Progress value={(done / work.length) * 100} height={16} tone="green" label="Build progress" />
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            {lanes.map(({ owner, name, Icon }) => (
              <section key={owner}>
                <h3 className="mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-(--cl-muted)" strokeWidth={2.5} />
                  <span className="cl-serif text-[28px] leading-none">{name}</span>
                </h3>
                <ul className="cl-card divide-y-2 divide-(--cl-line)">
                  {work
                    .filter((w) => w.owner === owner)
                    .map((w) => (
                      <li key={w.title} className="flex items-center gap-3 p-4">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            w.status === "done"
                              ? "bg-(--cl-green) text-white"
                              : w.status === "in_progress"
                                ? "bg-(--cl-amber-tint) text-(--cl-amber-text)"
                                : "border-[3px] border-(--cl-line-strong)"
                          }`}
                        >
                          {w.status === "done" && <Check className="h-4 w-4" strokeWidth={3.5} />}
                          {w.status === "in_progress" && <Loader className="h-4 w-4" strokeWidth={2.5} />}
                        </span>
                        <span className={`min-w-0 flex-1 text-[15px] font-semibold ${w.status === "todo" ? "text-(--cl-muted)" : ""}`}>{w.title}</span>
                        {w.status === "in_progress" && <Tag tone="amber">In progress</Tag>}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>

          <section>
            <SectionHeading title="QA and staging" />
            <div className="grid gap-3 sm:grid-cols-3">
              {buildProgress.checks.map((c) => (
                <Stat key={c.label} label={c.label} value={c.value} note={c.note} />
              ))}
            </div>
          </section>
        </div>
      )}

      {sub === 2 && (
        <div className="space-y-8">
          <section>
            <SectionHeading
              title="Beta test"
              action={
                <div className="flex flex-wrap justify-end gap-2.5">
                  <FeedbackWidget onSent={() => onToast("Thanks! Your feedback was logged.")} />
                  <button
                    type="button"
                    disabled={invited}
                    onClick={() => {
                      setInvited(true);
                      onToast(`Invites sent to ${betaFeedback.stats.invited} backers.`);
                    }}
                    className="cl-btn cl-btn-primary cl-btn-sm"
                  >
                    {invited ? "Invites sent" : `Invite ${betaFeedback.stats.invited} backers`}
                  </button>
                </div>
              }
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label="Invited" value={betaFeedback.stats.invited} />
              <Stat label="Active" value={betaFeedback.stats.active} note="89% took part" />
              <Stat label="Feedback" value={betaFeedback.stats.items} />
              <Stat label="Rating" value={betaFeedback.stats.averageRating} note="out of 5" />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-[17px] font-bold">What testers keep saying</h3>
            <div className="mb-4">
              <Tip size={46}>{betaFeedback.retestSummary}</Tip>
            </div>
            <ul className="space-y-3">
              {betaFeedback.clusters.map((c) => (
                <li key={c.clusterTitle} className="cl-card flex flex-col gap-3 p-5 md:flex-row md:items-center">
                  <div className="cl-serif cl-num w-16 shrink-0 text-[44px] leading-none">{c.ticketCount}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-[16px] font-bold">{c.clusterTitle}</h4>
                      <Tag tone={c.severity === "high" ? "brand" : "amber"}>{c.category}</Tag>
                    </div>
                    <p className="mt-0.5 text-[15px] text-(--cl-muted)">{c.sampleQuote}</p>
                  </div>
                  <div className="rounded-xl bg-(--cl-cream) p-3 text-sm md:w-64">
                    <span className="font-bold">Fix: </span>
                    {c.suggestedTask}
                    <div className="mt-2">
                      <Tag tone={c.fixTone}>{c.fixStatus}</Tag>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="cl-card flex flex-col gap-6 p-6 md:flex-row md:items-center">
            <Ring value={readiness.readiness_score} max={100} size={124} label="Readiness score">
              <span className="cl-serif cl-num text-[44px] leading-none">{readiness.readiness_score}</span>
            </Ring>
            <div className="min-w-0 flex-1">
              <h2 className="cl-serif text-[32px] leading-none">Ready to launch?</h2>
              <p className="mt-2 text-[16px] text-(--cl-ink-2)">{readiness.audit_summary}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["Bugs fixed", readiness.bug_resolution_rate],
                  ["Tester rating", readiness.beta_satisfaction_rating],
                  ["Finished main flow", readiness.core_journey_completion_rate],
                  ["Uptime", readiness.infrastructure_uptime],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[13px] text-(--cl-muted)">{k}</dt>
                    <dd className="cl-num text-[18px] font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <Gate
            title="Launch gate"
            sub="The product report is in. What do you want to do?"
            locked={phase < 1 ? "Unlocks after the validation gate." : phase > 1 ? "Decided. This project moved on to Launch." : undefined}
            options={[
              { label: "Launch", note: "Open it to the public.", kind: "go", onPick: onLaunch },
              { label: "Continue beta", note: "Keep testing for 7 more days.", kind: "wait", onPick: onContinueBeta },
              { label: "Kill", note: "Stop here and refund every backer.", kind: "stop", onPick: onKill },
            ]}
          />
        </div>
      )}

      {doc && (
        <Modal title={docs[doc].title} sub={prd.version} onClose={() => setDoc(null)} wide>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-(--cl-ink-2)">{docs[doc].text}</p>
          <div className="mt-4">
            <CopyButton text={docs[doc].text} label={docs[doc].copy} />
          </div>
        </Modal>
      )}
    </div>
  );
}
