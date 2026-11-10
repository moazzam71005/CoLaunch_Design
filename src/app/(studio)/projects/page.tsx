"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Avatar, Filters, PageHead, Progress, StepPath, Tip } from "../../_components/ui";
import { projectList } from "../../_data/preview";

type Filter = "all" | "validate" | "build" | "launch";
const phaseOrder = ["validate", "build", "launch"] as const;
const phaseNames = ["Validate", "Build", "Launch"];

export default function TestProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projectList.filter((p) => filter === "all" || p.phase === filter);
  const count = (f: Filter) => projectList.filter((p) => p.phase === f).length;

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      <PageHead
        title="Projects"
        sub="Every product you're launching with a creator."
        actions={
          <Link href="/campaigns" className="cl-btn cl-btn-quiet">
            Find more creators
          </Link>
        }
      />

      <Filters<Filter>
        label="Filter by phase"
        value={filter}
        onChange={setFilter}
        options={[
          { id: "all", label: "All", count: projectList.length },
          { id: "validate", label: "Validate", count: count("validate") },
          { id: "build", label: "Build", count: count("build") },
          { id: "launch", label: "Launch", count: count("launch") },
        ]}
      />

      {shown.length === 0 ? (
        <div className="flex justify-center py-14">
          <Tip>Nothing in this phase yet. Projects land here once they pass their last gate.</Tip>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {shown.map((p, i) => {
            const at = phaseOrder.indexOf(p.phase);
            const share = p.revenue / 2;
            return (
              <li key={p.slug} className="cl-tile flex flex-col p-6">
                <div className="flex items-center gap-3.5">
                  <Avatar name={p.creatorName} tone={i} size={50} />
                  <div className="min-w-0">
                    <h2 className="cl-serif truncate text-[32px] leading-none">{p.title}</h2>
                    <p className="mt-1 text-sm text-(--cl-muted)">
                      with {p.creatorName}, {p.platform}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] text-(--cl-ink-2)">{p.tagline}</p>

                <div className="mt-5">
                  <StepPath
                    compact
                    steps={phaseNames.map((name, idx) => ({
                      name,
                      state: idx < at ? "done" : idx === at ? "current" : "todo",
                    }))}
                  />
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="cl-serif cl-num text-[42px] leading-none">${p.revenue.toLocaleString()}</span>
                  <span className="text-[15px] text-(--cl-muted)">of ${p.goal.toLocaleString()} presold</span>
                </div>
                <div className="mt-3">
                  <Progress value={p.percent} height={14} label={`${p.title} presale progress`} />
                </div>
                <p className="mt-2 text-sm text-(--cl-muted)">
                  {p.dayLabel}, {p.daysLeft} days left. {p.customers} customers. {p.creatorName.split(" ")[0]}&apos;s share so far is ${share.toLocaleString()}.
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-(--cl-line) pt-4">
                  <Link href={`/p/${p.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-(--cl-ink-2) hover:text-(--cl-ink)">
                    Landing page <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                  <Link href={`/projects/${p.slug}`} className="cl-btn cl-btn-primary cl-btn-sm">
                    Open <ArrowRight className="h-4 w-4" strokeWidth={3} />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
