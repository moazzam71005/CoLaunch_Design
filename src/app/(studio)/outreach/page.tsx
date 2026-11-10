"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Pause } from "lucide-react";
import { Avatar, Filters, PageHead, StatusNote, StepPath, useToast, type Step } from "../../_components/ui";
import { outreachLogs, type OutreachStatus } from "../../_data/preview";

type Filter = "all" | "replied" | "opened" | "step2";

const stats = [
  { label: "Sent", value: "68", note: "54 first emails, 14 follow-ups" },
  { label: "Opened", value: "42.6%", note: "29 creators" },
  { label: "Replied", value: "8", note: "11.8% of emails sent" },
  { label: "Follow-ups stopped", value: "8 of 8", note: "Nobody gets emailed after replying" },
];

function journey(status: OutreachStatus): Step[] {
  const order: OutreachStatus[] = ["sent", "opened", "replied"];
  const at = order.indexOf(status);
  return ["Sent", "Opened", "Replied"].map((name, i) => ({
    name,
    state: i < at || status === "replied" ? "done" : i === at ? "done" : i === at + 1 ? "current" : "todo",
  }));
}

export default function TestOutreachPage() {
  const [logs, setLogs] = useState(outreachLogs);
  const [filter, setFilter] = useState<Filter>("all");
  const { toast, toastNode } = useToast();

  const pause = (id: string, name: string) => {
    setLogs((prev) => prev.map((l) => (l.id === id ? { ...l, followup: "Paused by you" } : l)));
    toast(`Follow-ups paused for ${name}.`);
  };

  const shown = logs.filter(
    (l) =>
      filter === "all" ||
      (filter === "replied" && l.status === "replied") ||
      (filter === "opened" && l.status === "opened") ||
      (filter === "step2" && l.step === 2)
  );

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      {toastNode}
      <PageHead
        title="Outreach"
        sub="Emails go out on their own each week, with one follow-up after 7 days if there's no reply."
        actions={<StatusNote title="12 queued, next batch goes out Monday" sub="Up to 75 a week across active campaigns" />}
      />

      <dl className="cl-card mb-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-5 ${i % 2 ? "border-l-2 border-(--cl-line)" : ""} ${i > 1 ? "border-t-2 border-(--cl-line) md:border-t-0" : ""} ${
              i === 2 ? "md:border-l-2" : ""
            }`}
          >
            <dt className="text-sm font-medium text-(--cl-muted)">{s.label}</dt>
            <dd className="cl-serif cl-num mt-1 text-[38px] leading-none">{s.value}</dd>
            <dd className="mt-1.5 text-[13px] leading-snug text-(--cl-muted)">{s.note}</dd>
          </div>
        ))}
      </dl>

      <Filters<Filter>
        label="Filter outreach"
        value={filter}
        onChange={setFilter}
        options={[
          { id: "all", label: "All" },
          { id: "replied", label: "Replied" },
          { id: "opened", label: "Opened" },
          { id: "step2", label: "Follow-ups" },
        ]}
      />

      <ul className="mt-6 space-y-3">
        {shown.map((l, i) => {
          const replied = l.status === "replied";
          return (
            <li key={l.id} className="cl-tile grid items-center gap-4 p-5 md:grid-cols-[1.2fr_1fr_auto] md:gap-8">
              <div className="flex min-w-0 items-center gap-3.5">
                <Avatar name={l.creatorName} tone={i} size={44} />
                <div className="min-w-0">
                  <div className="truncate text-[16px] font-bold">{l.creatorName}</div>
                  <div className="truncate text-sm text-(--cl-muted)">
                    {l.platform}, score {l.score}, {l.campaignName}
                  </div>
                </div>
              </div>
              <div>
                <StepPath compact steps={journey(l.status)} />
                <div className="mt-2 text-[13px] text-(--cl-muted)">
                  <span className="font-semibold text-(--cl-ink-2)">
                    {replied ? "Replied" : l.status === "opened" ? `Opened ${l.openCount}x` : "Delivered"}
                  </span>
                  {". "}
                  {l.followup}
                </div>
              </div>
              <div className="md:justify-self-end">
                {replied ? (
                  <Link href="/review-queue" className="cl-btn cl-btn-green cl-btn-sm">
                    <Check className="h-4 w-4" strokeWidth={3} /> See reply
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={l.followup === "Paused by you"}
                    onClick={() => pause(l.id, l.creatorName)}
                    className="cl-btn cl-btn-quiet cl-btn-sm"
                  >
                    <Pause className="h-4 w-4" strokeWidth={2.5} />
                    {l.followup === "Paused by you" ? "Paused" : "Pause"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
