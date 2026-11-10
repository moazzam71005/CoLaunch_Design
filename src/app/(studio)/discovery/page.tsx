"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Search } from "lucide-react";
import { Avatar, Filters, Modal, PageHead, Progress, Score, StatusNote, Tag } from "../../_components/ui";
import { creators, nicheFit, outreachLogs } from "../../_data/preview";
import { calculateCreatorScore } from "@/lib/scoring/creator-scoring";

type Status = "all" | "qualified" | "review_needed" | "disqualified";
const platformNames = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok" };
type Platform = "all" | "youtube" | "instagram" | "tiktok";

export default function TestDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<Platform>("all");
  const [status, setStatus] = useState<Status>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const scored = useMemo(
    () => creators.map((c) => ({ ...c, scoring: calculateCreatorScore({ ...c.metrics, platform: c.platform }) })),
    []
  );

  const shown = scored.filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.displayName.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.bio.toLowerCase().includes(q)) &&
      (platform === "all" || c.platform === platform) &&
      (status === "all" || c.scoring.qualificationStatus === status)
    );
  });

  const selected = scored.find((c) => c.id === selectedId);
  const count = (s: string) => scored.filter((c) => c.scoring.qualificationStatus === s).length;

  const parts = selected
    ? [
        { label: "Follower count", got: selected.scoring.breakdown.followersScore, max: 20 },
        { label: "Engagement", got: selected.scoring.breakdown.engagementScore, max: 25 },
        { label: "Posting consistency", got: selected.scoring.breakdown.consistencyScore, max: 15 },
        { label: "Real, active audience", got: selected.scoring.breakdown.authenticityScore, max: 20 },
        { label: "Commercial potential", got: selected.scoring.breakdown.commercialScore, max: 20 },
      ]
    : [];

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      <PageHead
        title="Creators"
        sub="Found and scored automatically. Only creators at 70 or above move on to outreach."
        actions={<StatusNote title="Last search 2 hours ago" sub="New creators are found automatically" />}
      />

      <Filters<Status>
        label="Filter by status"
        value={status}
        onChange={setStatus}
        options={[
          { id: "all", label: "All", count: scored.length },
          { id: "qualified", label: "Good fit", count: count("qualified") },
          { id: "review_needed", label: "Just under 70", count: count("review_needed") },
          { id: "disqualified", label: "Not a fit", count: count("disqualified") },
        ]}
      />

      <div className="mt-5 flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-(--cl-muted)" strokeWidth={2.5} />
          <input
            aria-label="Search creators"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or topic"
            className="cl-input pl-11!"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["youtube", "YouTube"],
              ["instagram", "Instagram"],
              ["tiktok", "TikTok"],
            ] as [Platform, string][]
          ).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={platform === id} onClick={() => setPlatform(id)} className="cl-tile px-3.5 py-2 text-sm font-bold">
              {label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-center text-[16px] text-(--cl-muted)">No creators match that search.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {shown.map((c, i) => {
            const good = c.scoring.qualificationStatus === "qualified";
            const log = outreachLogs.find((l) => l.creatorName === c.displayName);
            return (
              <li key={c.id} className="cl-tile flex min-w-0 flex-col p-5">
                <div className="flex items-start gap-3.5">
                  <Avatar name={c.displayName} tone={i} size={50} />
                  <div className="min-w-0 flex-1">
                    <h2 className="flex items-center gap-1.5 text-[18px] font-bold leading-tight">
                      <span className="truncate">{c.displayName}</span>
                      {c.verified && <BadgeCheck className="h-[18px] w-[18px] shrink-0 text-(--cl-brand)" strokeWidth={2.5} aria-label="Verified" />}
                    </h2>
                    <p className="truncate text-sm text-(--cl-muted)">
                      {platformNames[c.platform]}, @{c.handle}
                    </p>
                  </div>
                  <Score value={c.scoring.totalScore} />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-(--cl-ink-2)">{c.bio}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-(--cl-cream) p-3 text-center">
                  {[
                    ["Followers", `${(c.followers / 1000).toFixed(0)}K`],
                    ["Engagement", `${c.engagement}%`],
                    ["Posts", c.postingFreq],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[13px] text-(--cl-muted)">{k}</dt>
                      <dd className="cl-num text-[15px] font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 truncate text-sm text-(--cl-muted)">{c.email}. {log ? "Already contacted, never emailed twice." : "New contact, never emailed."}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <button type="button" onClick={() => setSelectedId(c.id)} className="cl-btn cl-btn-text">
                    Why this score?
                  </button>
                  {good ? (
                    <Tag tone="green">{log?.status === "replied" ? "Replied" : log ? "In outreach" : "Queued automatically"}</Tag>
                  ) : (
                    <Tag>Below 70</Tag>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {selected && (
        <Modal title={selected.displayName} sub="How this score adds up" onClose={() => setSelectedId(null)}>
          <div className="mb-5 flex items-baseline gap-2">
            <span className="cl-serif cl-num text-[60px] leading-none">{selected.scoring.totalScore}</span>
            <span className="text-[17px] text-(--cl-muted)">out of 100</span>
          </div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-(--cl-line) p-3.5 text-[15px]">
            <span>
              <span className="font-semibold">Niche fit</span>
              <span className="block text-sm text-(--cl-muted)">{nicheFit[selected.id].niche}</span>
            </span>
            <Tag tone={nicheFit[selected.id].level === "Strong match" ? "green" : nicheFit[selected.id].level === "Partial match" ? "amber" : "neutral"}>
              {nicheFit[selected.id].level}
            </Tag>
          </div>
          <ul className="space-y-4">
            {parts.map((p) => (
              <li key={p.label}>
                <div className="mb-1.5 flex justify-between text-[15px]">
                  <span className="font-semibold">{p.label}</span>
                  <span className="cl-num text-(--cl-muted)">
                    {p.got} of {p.max}
                  </span>
                </div>
                <Progress value={(p.got / p.max) * 100} tone="green" height={10} label={p.label} />
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-(--cl-cream) p-4 text-[15px] leading-relaxed text-(--cl-ink-2)">
            {selected.scoring.qualificationStatus === "review_needed"
              ? `Just under the cut-off (${selected.scoring.totalScore}/100), so not contacted. Rescored automatically as their numbers change.`
              : selected.scoring.summaryReason}
          </p>
          <button type="button" onClick={() => setSelectedId(null)} className="cl-btn cl-btn-primary mt-5 w-full">
            Got it
          </button>
        </Modal>
      )}
    </div>
  );
}
