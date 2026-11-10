"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import {
  ActionBar,
  Avatar,
  CopyButton,
  Modal,
  Progress,
  SectionHeading,
  StatusNote,
  StepPath,
  Tag,
  Tip,
} from "../../../../_components/ui";
import { launchSuite, postLaunch } from "../../../../_data/preview";
import { CheckRow, Facts, Stat, SubSteps } from "./parts";

const decisions = [
  { id: "scale", label: "Scale", note: "Spend on ads, add a team plan and bring in affiliates." },
  { id: "iterate", label: "Iterate", note: "Pause spend and build the top 3 requested features." },
  { id: "maintain", label: "Maintain", note: "Keep it running with a steady 50/50 split." },
  { id: "sunset", label: "Kill", note: "Close it down, export customers and stop payouts." },
];

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="cl-card p-5">
      <h3 className="text-[16px] font-bold">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-snug text-(--cl-ink-2)">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}

export function LaunchPhase({
  phase,
  first,
  slug,
  live,
  decision,
  onGoLive,
  onDecide,
}: {
  phase: number;
  first: string;
  slug: string;
  live: boolean;
  decision: string | null;
  onGoLive: () => void;
  onDecide: (id: string, label: string) => void;
}) {
  const [sub, setSub] = useState(live ? 1 : 0);
  const [openDoc, setOpenDoc] = useState<string | null>(launchSuite.collateral[0].id);
  const [draft, setDraft] = useState<string | null>(null);

  const notLive = phase === 2 && !live;
  const recommended = decisions.find((d) => d.id === postLaunch.recommended_action.id);

  return (
    <div className="space-y-8">
      <SubSteps
        label="Launch steps"
        value={sub}
        onChange={setSub}
        steps={[{ name: "Prepare" }, { name: "Live", locked: notLive }, { name: "Report and decide", locked: notLive }]}
      />

      {sub === 0 && (
        <div className="space-y-8">
          <section>
            <SectionHeading title="Launch strategy" />
            <div className="cl-card p-6">
              <Facts rows={launchSuite.strategy} />
            </div>
          </section>

          <section>
            <SectionHeading
              title={`Content for ${first}`}
              action={
                <Link href={`/portal/${slug}`} className="cl-btn cl-btn-text">
                  Open {first}&apos;s view
                </Link>
              }
            />
            <ul className="space-y-2.5">
              {launchSuite.collateral.map((c) => {
                const open = openDoc === c.id;
                return (
                  <li key={c.id} className="cl-card overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenDoc(open ? null : c.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left"
                    >
                      <span className="text-[16px] font-bold">{c.title}</span>
                      <Tag>{c.channel}</Tag>
                    </button>
                    {open && (
                      <div className="cl-rise border-t-2 border-(--cl-line) p-4">
                        <p className="whitespace-pre-line wrap-anywhere text-[15px] leading-relaxed text-(--cl-ink-2)">{c.body}</p>
                        <div className="mt-2 flex justify-end">
                          <CopyButton text={c.body} />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section>
              <SectionHeading title={`${first}'s checklist`} />
              <ul className="cl-card space-y-3 p-5">
                {launchSuite.creatorChecklist.map((c) => (
                  <CheckRow key={c.id} label={c.label} done={c.done} />
                ))}
              </ul>
            </section>
            <section>
              <SectionHeading title="CoLaunch checklist" />
              <ul className="cl-card space-y-3 p-5">
                {launchSuite.colaunchChecklist.map((c) => (
                  <CheckRow key={c.id} label={c.label} done={c.done} />
                ))}
              </ul>
            </section>
          </div>

          {notLive && (
            <ActionBar text="Ready to open the doors?" sub="This makes the product public and starts the live dashboard.">
              <button type="button" onClick={onGoLive} className="cl-btn cl-btn-green cl-btn-lg">
                <Rocket className="h-5 w-5" strokeWidth={2.5} /> Launch product
              </button>
            </ActionBar>
          )}
          {live && <StatusNote title="Launched" sub="This project is live." />}
        </div>
      )}

      {sub === 1 && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {launchSuite.stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} note={s.note} />
            ))}
          </div>

          <section>
            <SectionHeading title="AI Launch Manager" />
            <ul className="grid gap-4 md:grid-cols-2">
              {launchSuite.manager.map((m) => (
                <li key={m.id} className="cl-tile flex flex-col p-5">
                  <Tag tone={m.kind === "Technical" ? "brand" : "green"}>{m.kind}</Tag>
                  <ul className="mt-3 space-y-0.5 text-[15px] text-(--cl-ink-2)">
                    {m.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <h3 className="mt-2 text-[18px] font-bold leading-snug">{m.action}</h3>
                  <div className="mt-5">
                    <StepPath steps={m.steps} />
                  </div>
                  {m.draft && (
                    <div className="mt-auto pt-3">
                      <button type="button" onClick={() => setDraft(m.draft)} className="cl-btn cl-btn-quiet cl-btn-sm">
                        View draft
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section>
              <SectionHeading title="By channel and content" />
              <ul className="cl-card space-y-5 p-5">
                {launchSuite.channels.map((c) => (
                  <li key={c.channel}>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[16px] font-bold">{c.channel}</span>
                      <span className="cl-num text-sm text-(--cl-muted)">
                        <span className="font-bold text-(--cl-ink)">{c.revenue}</span>, {c.conversion} buy
                      </span>
                    </div>
                    <Progress value={c.share} tone="green" label={`${c.channel} share of launch revenue`} />
                    <div className="mt-1.5 text-[13px] text-(--cl-muted)">Top content: {c.content}</div>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHeading title="Latest orders" />
              <ul className="cl-card divide-y-2 divide-(--cl-line)">
                {launchSuite.liveOrders.map((o, i) => (
                  <li key={o.id} className="flex items-center gap-3 p-4">
                    <Avatar name={o.buyerName} tone={i} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-bold">{o.buyerName}</div>
                      <div className="text-[13px] text-(--cl-muted)">{o.planName}</div>
                    </div>
                    <div className="text-right">
                      <div className="cl-num text-[15px] font-bold">{o.amountFormatted}</div>
                      <div className="text-[13px] text-(--cl-muted)">{o.timestampAgo}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <button type="button" onClick={() => setSub(2)} className="cl-btn cl-btn-green cl-btn-lg w-full">
            See the 30-day report
          </button>
        </div>
      )}

      {sub === 2 && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Revenue" value={postLaunch.gmv_formatted} note={postLaunch.reporting_period} />
            <Stat label="Customers" value={postLaunch.paying_customers_count} />
            <Stat label="Conversion" value={postLaunch.conversion_formatted} />
            <Stat label={`${first}'s share`} value={postLaunch.creator_payout_formatted} note="50% of revenue" />
          </div>
          <Tip>{postLaunch.executive_summary}</Tip>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="cl-card">
              <h3 className="p-5 pb-2 text-[16px] font-bold">Channel performance</h3>
              <ul className="divide-y-2 divide-(--cl-line)">
                {postLaunch.channel_performance.map((c) => (
                  <li key={c.channel} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div>
                      <div className="text-[15px] font-bold">{c.channel}</div>
                      <div className="text-[13px] text-(--cl-muted)">{c.customers} customers</div>
                    </div>
                    <div className="text-right">
                      <div className="cl-num text-[15px] font-bold">{c.revenue}</div>
                      <div className="text-[13px] text-(--cl-muted)">{c.roi} return</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="cl-card">
              <h3 className="p-5 pb-2 text-[16px] font-bold">Feedback: most requested</h3>
              <ul className="divide-y-2 divide-(--cl-line)">
                {postLaunch.top_feature_requests.map((r) => (
                  <li key={r.feature} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div>
                      <div className="text-[15px] font-bold">{r.feature}</div>
                      <div className="text-[13px] text-(--cl-muted)">{r.impact} impact</div>
                    </div>
                    <span className="cl-num text-[15px] font-bold">{r.request_count} votes</span>
                  </li>
                ))}
              </ul>
            </section>
            <ReportList title="Creator performance" items={postLaunch.creator_performance} />
            <ReportList title="Product usage" items={postLaunch.product_usage} />
            <ReportList title="Technical issues" items={postLaunch.technical_issues} />
            <ReportList title="Learnings" items={postLaunch.learnings} />
          </div>

          <section>
            <SectionHeading title="What's next?" />
            <div className="mb-4 rounded-2xl bg-(--cl-peach-tint) p-5">
              <div className="text-sm font-bold">AI recommends: {recommended?.label}</div>
              <p className="mt-1 text-[16px] leading-snug text-(--cl-ink-2)">{postLaunch.recommended_action.reason}</p>
            </div>
            <div role="radiogroup" aria-label="Decision" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {decisions.map((d) => {
                const isRecommended = d.id === postLaunch.recommended_action.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={decision === d.id}
                    onClick={() => onDecide(d.id, d.label)}
                    className={`cl-tile p-5 text-left ${isRecommended && decision !== d.id ? "border-(--cl-ink)!" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="cl-serif text-[30px] leading-none">{d.label}</span>
                      {isRecommended && <Tag tone="brand">Recommended</Tag>}
                    </div>
                    <p className="mt-2 text-sm leading-snug text-(--cl-muted)">{d.note}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {draft && (
        <Modal title="Tonight's Instagram Story" sub={`Already on ${first}'s checklist.`} onClose={() => setDraft(null)}>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-(--cl-ink-2)">{draft}</p>
          <div className="mt-3">
            <CopyButton text={draft} />
          </div>
        </Modal>
      )}
    </div>
  );
}
