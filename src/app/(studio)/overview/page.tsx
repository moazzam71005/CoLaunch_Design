"use client";

import Link from "next/link";
import { ArrowRight, Check, Flame, Trophy } from "lucide-react";
import { Avatar, Celebrate, Progress, Ring, SectionHeading, StepPath, Tag, Tip } from "../../_components/ui";
import { projectList } from "../../_data/preview";
import { clearDecisions, useDecisions } from "../../_data/decisions";

const initialDecisions = [
  { id: "rq-1", who: "Priya Nair", tone: 0, what: "wants to hear product ideas.", meta: "YouTube, 155K followers, score 96", quote: "My viewers keep asking for my agency templates as an actual app, not a Notion page.", tag: { label: "Interested", tone: "green" as const }, action: "Review", href: "/review-queue" },
  { id: "rq-2", who: "Tom Okafor", tone: 1, what: "has a question about the revenue share.", meta: "Instagram, 290K followers, score 90", quote: "How does the revenue share work, and do I have to fund any of the engineering upfront?", tag: { label: "Question", tone: "amber" as const }, action: "Review", href: "/review-queue" },
  { id: "rq-3", who: "David Vance", tone: 2, what: "asked to see the 3 product ideas.", meta: "YouTube, 420K followers, score 93", quote: "You caught my attention with the comment analysis. Send over the 3 concepts.", tag: { label: "Interested", tone: "green" as const }, action: "Review", href: "/review-queue" },
  { id: "act-1", who: "RateCraft OS", tone: 3, what: "could add Apple Pay to the mobile checkout.", meta: "AI recommendation, needs your approval in AI activity", quote: null, tag: null, action: "Decide", href: "/projects/ratecraft" },
];

const funnel = [
  { label: "Found", value: 142 },
  { label: "Qualified", value: 91 },
  { label: "Contacted", value: 68 },
  { label: "Replied", value: 8 },
  { label: "To review", value: 3 },
  { label: "Projects", value: 2 },
];

const phases = ["Validate", "Build", "Launch"];

export default function TestOverviewPage() {
  const made = useDecisions();
  const outcomeLabel = { approved: "Approved", archived: "Passed", dismissed: "Not now" };

  const total = initialDecisions.length;
  const doneCount = initialDecisions.filter((d) => made[d.id]).length;
  const left = total - doneCount;
  const streak = left === 0 ? 6 : 5;

  return (
    <div className="mx-auto max-w-[1040px] pb-12">
      <header className="mb-8">
        <h1 className="cl-serif text-[48px] leading-[1.05] md:text-[60px]">Good morning, Hyejee.</h1>
        <div className="mt-4">
          <Tip mood={left === 0 ? "cheer" : "happy"}>
            {left === 0
              ? "That's everything for today. Outreach and both projects keep running on their own."
              : `${left} ${left === 1 ? "thing needs" : "things need"} you today. Everything else is running on its own.`}
          </Tip>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-12">
          <section>
            <SectionHeading title="Needs you" />
            {left === 0 ? (
              <Celebrate title="All clear!" body="You've cleared today's decisions and kept your streak going.">
                <button type="button" onClick={clearDecisions} className="cl-btn cl-btn-quiet cl-btn-sm">
                  Show them again
                </button>
              </Celebrate>
            ) : (
              <ul className="space-y-3">
                {initialDecisions.map((d) => {
                  const outcome = made[d.id];
                  return (
                    <li key={d.id} className="cl-tile flex flex-col items-start gap-x-4 gap-y-3 p-5 sm:flex-row">
                      <div className={`min-w-0 w-full flex-1 ${outcome ? "opacity-50" : ""}`}>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <Avatar name={d.who} tone={d.tone} size={30} />
                          <p className="text-[16px]">
                            <span className="font-bold">{d.who}</span>{" "}
                            <span className="text-(--cl-ink-2)">{d.what}</span>
                          </p>
                          {d.tag && <Tag tone={d.tag.tone}>{d.tag.label}</Tag>}
                        </div>
                        <p className="mt-1 text-sm text-(--cl-muted)">{d.meta}</p>
                        {d.quote && (
                          <blockquote className="mt-3 rounded-xl bg-(--cl-cream) px-4 py-3 text-[15px] leading-relaxed text-(--cl-ink-2)">
                            {d.quote}
                          </blockquote>
                        )}
                      </div>
                      {outcome ? (
                        <span className="cl-pop inline-flex min-h-[38px] items-center gap-1.5 text-[15px] font-bold text-(--cl-green-text)">
                          <Check className="h-5 w-5" strokeWidth={3} /> {outcomeLabel[outcome]}
                        </span>
                      ) : (
                        <Link href={d.href} className="cl-btn cl-btn-quiet cl-btn-sm">
                          {d.action}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section>
            <SectionHeading title="This week" action={<Link href="/campaigns" className="cl-btn cl-btn-text">Campaigns</Link>} />
            <div className="cl-card p-5 md:p-6">
              <ol className="grid grid-cols-3 gap-y-6 md:grid-cols-6">
                {funnel.map((f) => (
                  <li key={f.label}>
                    <div className="cl-serif cl-num text-[42px] leading-none">{f.value}</div>
                    <div className="mt-1.5 text-sm font-medium text-(--cl-muted)">{f.label}</div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section>
            <SectionHeading title="Projects" action={<Link href="/projects" className="cl-btn cl-btn-text">All projects</Link>} />
            <div className="grid gap-4 md:grid-cols-2">
              {projectList.map((p, idx) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="cl-tile block p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Avatar name={p.creatorName} tone={idx} size={42} />
                    <div className="min-w-0 flex-1">
                      <h3 className="cl-serif truncate text-[26px] leading-none">{p.title}</h3>
                      <p className="mt-1 text-sm text-(--cl-muted)">with {p.creatorName}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-(--cl-muted)" strokeWidth={2.5} />
                  </div>
                  <div className="mb-5">
                    <StepPath
                      compact
                      steps={phases.map((n, i) => ({ name: n, state: i === 0 ? "current" : "todo" }))}
                    />
                  </div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="cl-num text-[15px] font-bold">
                      ${p.revenue.toLocaleString()} <span className="font-normal text-(--cl-muted)">of ${p.goal.toLocaleString()}</span>
                    </span>
                    <span className="text-sm text-(--cl-muted)">{p.dayLabel}</span>
                  </div>
                  <Progress value={p.percent} label={`${p.title} presale progress`} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-10 lg:self-start">
          <div className="cl-card flex items-center gap-4 p-5">
            <Ring value={doneCount} max={total} size={84} label="Today's goal">
              <span className="cl-num text-[20px] font-bold">
                {doneCount}/{total}
              </span>
            </Ring>
            <div>
              <div className="text-[16px] font-bold">Today&apos;s goal</div>
              <div className="mt-0.5 text-sm leading-snug text-(--cl-muted)">Make the decisions waiting on you</div>
            </div>
          </div>

          <div className="cl-card flex items-center gap-4 bg-(--cl-peach-tint)! p-5">
            <span key={streak} className="cl-pop flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-(--cl-brand) text-white">
              <Flame className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <div>
              <div className="cl-num text-[20px] font-bold leading-tight">{streak} day streak</div>
              <div className="text-sm leading-snug text-(--cl-ink-2)">Queue cleared every day</div>
            </div>
          </div>

          <div className="cl-card p-5">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-(--cl-amber-text)" strokeWidth={2.5} />
              <span className="text-[16px] font-bold">Next milestone</span>
            </div>
            <p className="mt-2 text-[15px] leading-snug text-(--cl-ink-2)">
              <span className="font-bold text-(--cl-ink)">$880 to go</span> and RateCraft OS passes its presale goal.
            </p>
            <div className="mt-3">
              <Progress value={82.4} tone="green" label="RateCraft presale goal" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
