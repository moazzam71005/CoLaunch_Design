"use client";

import { useState } from "react";
import Link from "next/link";
import { Pause, Play, Plus } from "lucide-react";
import { Filters, PageHead, Tag } from "../../_components/ui";
import { campaigns as initial } from "../../_data/preview";

type Filter = "all" | "active" | "paused";

export default function TestCampaignsPage() {
  const [campaigns, setCampaigns] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");

  const toggle = (id: string) =>
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c))
    );

  const shown = campaigns.filter((c) => filter === "all" || c.status === filter);
  const count = (s: "active" | "paused") => campaigns.filter((c) => c.status === s).length;

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      <PageHead
        title="Campaigns"
        sub="Who to find, how many to contact each week, and what to say."
        actions={
          <>
            <Link href="/discovery" className="cl-btn cl-btn-quiet">
              See creators
            </Link>
            <Link href="/campaigns/new" className="cl-btn cl-btn-primary">
              <Plus className="h-5 w-5" strokeWidth={3} /> New campaign
            </Link>
          </>
        }
      />

      <Filters<Filter>
        label="Filter campaigns"
        value={filter}
        onChange={setFilter}
        options={[
          { id: "all", label: "All", count: campaigns.length },
          { id: "active", label: "Running", count: count("active") },
          { id: "paused", label: "Paused", count: count("paused") },
        ]}
      />

      <ul className="mt-6 space-y-4">
        {shown.map((c) => {
          const running = c.status === "active";
          const weekPct = Math.min(100, Math.round((c.stats.sent / c.weeklyTarget) * 100));
          const funnel = [
            { label: "Found", value: c.stats.discovered },
            { label: "Qualified", value: c.stats.qualified },
            { label: "Contacted", value: c.stats.sent },
            { label: "Replied", value: c.stats.replies },
          ];
          return (
            <li key={c.id} className="cl-tile p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="cl-serif text-[28px] leading-tight">{c.name}</h2>
                    <Tag tone={running ? "green" : "amber"}>{running ? "Running" : "Paused"}</Tag>
                  </div>
                  <p className="mt-1.5 text-[15px] text-(--cl-ink-2)">
                    {c.platforms.join(" and ")} creators in {c.niches.join(", ")}.
                  </p>
                  <p className="mt-0.5 text-sm text-(--cl-muted)">
                    {c.followerRange} followers, at least {c.minEngagement} engagement. Last run {c.lastRun}.
                  </p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <Link href={`/discovery?campaign=${c.id}`} className="cl-btn cl-btn-quiet cl-btn-sm">
                    Creators
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggle(c.id)}
                    className={`cl-btn cl-btn-sm ${running ? "cl-btn-quiet" : "cl-btn-green"}`}
                  >
                    {running ? <Pause className="h-4 w-4" strokeWidth={2.5} /> : <Play className="h-4 w-4" strokeWidth={2.5} />}
                    {running ? "Pause" : "Resume"}
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 border-t-2 border-(--cl-line) pt-5 md:grid-cols-[1.4fr_1fr] md:items-center">
                <ol className="grid grid-cols-4">
                  {funnel.map((f) => (
                    <li key={f.label}>
                      <div className="cl-serif cl-num text-[34px] leading-none">{f.value}</div>
                      <div className="mt-1 text-sm text-(--cl-muted)">{f.label}</div>
                    </li>
                  ))}
                </ol>
                <div>
                  <div className="mb-2 flex items-baseline justify-between text-sm">
                    <span className="font-bold">This week</span>
                    <span className="cl-num text-(--cl-muted)">
                      {c.stats.sent} of {c.weeklyTarget} sent
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-(--cl-sand)">
                    <div
                      style={{ width: `${weekPct}%` }}
                      className={`h-full rounded-full ${running ? "bg-(--cl-green)" : "bg-(--cl-line-strong)"}`}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
