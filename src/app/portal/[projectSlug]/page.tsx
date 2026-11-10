"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarClock, Camera, Check, Download, ExternalLink, Flame, Link2, Mail, MessageSquare, Video } from "lucide-react";
import { Avatar, CopyButton, Mascot, ProductSketch, Progress, Tag, useToast } from "../../_components/ui";
import { launchPortal, portalTasks, type PortalTask } from "../../_data/preview";

const channelIcons = { YouTube: Video, Instagram: Camera, Newsletter: Mail, Community: MessageSquare };
const channelRefs = { YouTube: "yt", Instagram: "ig", Newsletter: "newsletter", Community: "community" };
const wiggle = [0, 44, 66, 44, 0, -44, -66];

type Mode = "presale" | "launch";

const plans = {
  presale: {
    tasks: portalTasks,
    currentDay: 9,
    pathTitle: "Your 14 days",
    pathLabel: "Your 14-day plan",
    total: "$4,120",
    totalNote: "of $5,000 raised",
    percent: 82.4,
    barLabel: "Presale goal",
    line: "38 of 50 founders.",
    day: "Day 9 of 14.",
    shareLabel: "Your share if the goal is reached",
    share: "$2,060",
    shareNote: "Backers are refunded if it isn't.",
  },
  launch: {
    tasks: launchPortal.tasks,
    currentDay: launchPortal.currentDay,
    pathTitle: "Your launch week",
    pathLabel: "Your launch week plan",
    total: "$14,680",
    totalNote: "in launch revenue",
    percent: (launchPortal.currentDay / launchPortal.totalDays) * 100,
    barLabel: "Launch week",
    line: "74 customers.",
    day: `Day ${launchPortal.currentDay} of ${launchPortal.totalDays}.`,
    shareLabel: "Your 50% so far",
    share: "$7,340",
    shareNote: "Paid to your bank through Stripe",
  },
};

function copyText(t: PortalTask) {
  if (!t.poll) return t.script;
  return `${t.script}\n\n${t.poll.question}\n${t.poll.options.map((o) => `- ${o}`).join("\n")}`;
}

function PortalView({ slug, mode, onMode }: { slug: string; mode: Mode; onMode: (m: Mode) => void }) {
  const plan = plans[mode];
  const today = plan.tasks.find((t) => t.day === plan.currentDay) ?? plan.tasks[0];
  const [tasks, setTasks] = useState(plan.tasks);
  const [selectedId, setSelectedId] = useState(today.id);
  const [justDone, setJustDone] = useState<string | null>(null);
  const { toast, toastNode } = useToast();

  const doneCount = tasks.filter((t) => t.isCompleted).length;
  const selected = tasks.find((t) => t.id === selectedId) ?? tasks[0];
  const SelectedIcon = channelIcons[selected.channel];
  const allDone = doneCount === tasks.length;
  const todayTask = tasks.find((t) => t.id === today.id) ?? today;
  const nextUpcoming = tasks.find((t) => t.day > plan.currentDay && !t.isCompleted);
  const isUpcoming = !selected.isCompleted && selected.day > plan.currentDay;
  const isToday = selected.day === plan.currentDay;

  const toggle = (id: string) => {
    const wasDone = tasks.find((t) => t.id === id)?.isCompleted;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    if (wasDone) {
      setJustDone(null);
      return;
    }
    setJustDone(id);
    toast("Nice work!");
  };

  const trackingLink = `https://co-launch.app/p/${slug}?ref=${channelRefs[selected.channel]}`;

  return (
    <div className="min-h-screen">
      {toastNode}
      <header className="border-b-2 border-(--cl-line)">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="cl-serif text-[26px] leading-none">CoLaunch</span>
            <span className="truncate text-sm text-(--cl-muted)">with RateCraft OS</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1 rounded-xl bg-(--cl-peach-tint) px-3 py-1.5">
              <Flame className="h-5 w-5 text-(--cl-brand)" strokeWidth={2.5} />
              <span key={doneCount} className="cl-pop cl-num text-[17px] font-bold">
                {doneCount}
              </span>
              <span className="sr-only">posts completed</span>
            </span>
            <Avatar name="Marcus Chen" size={36} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-4 pb-16 pt-8">
        <div className="mb-8">
          <h1 className="cl-serif text-[48px] leading-[1.05] md:text-[58px]">Hi Marcus.</h1>
          <p className="mt-2 text-[18px] text-(--cl-ink-2)">
            {allDone ? (
              "You finished every post. Thank you!"
            ) : todayTask.isCompleted ? (
              <>
                Today&apos;s post is done.{nextUpcoming ? ` The next one is Day ${nextUpcoming.day}.` : ""}
              </>
            ) : (
              <>
                <span className="font-bold text-(--cl-ink)">Today:</span> {todayTask.title}. It&apos;s already written for you.
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
          {/* The post: first on phones, on the right on desktop */}
          <div className="min-w-0 space-y-5 md:col-start-2 md:row-start-1">
            <section
              key={selected.id}
              className={`cl-rise rounded-[22px] border-2 border-b-[6px] bg-(--cl-card) p-6 ${
                selected.isCompleted ? "border-(--cl-green)" : isUpcoming ? "border-(--cl-line)" : "border-(--cl-ink)"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold">
                <span className="text-(--cl-brand)">{isToday ? "Today" : `Day ${selected.day}`}</span>
                <span className="text-(--cl-muted)">·</span>
                <span className="inline-flex items-center gap-1 text-(--cl-ink-2)">
                  <SelectedIcon className="h-4 w-4" strokeWidth={2.5} />
                  {selected.channel}
                </span>
                <span className="text-(--cl-muted)">·</span>
                <span className="font-medium text-(--cl-muted)">About {selected.time}</span>
                {isUpcoming && <Tag>Upcoming</Tag>}
                {selected.addedBy && <Tag tone="brand">{selected.addedBy}</Tag>}
              </div>
              <h2 className="mt-1.5 text-[24px] font-bold leading-snug">{selected.title}</h2>
              <p className="mt-1 text-[16px] text-(--cl-ink-2)">{selected.objective}</p>

              <div className="mt-5 rounded-2xl bg-(--cl-cream) p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-(--cl-ink-2)">Ready to post</span>
                  <CopyButton text={copyText(selected)} />
                </div>
                <p className="whitespace-pre-line wrap-anywhere text-[16px] leading-relaxed">{selected.script}</p>

                {selected.poll && (
                  <div className="mt-4 rounded-xl bg-(--cl-card) p-4">
                    <div className="text-sm font-bold text-(--cl-muted)">Poll</div>
                    <p className="mt-0.5 text-[16px] font-bold leading-snug">{selected.poll.question}</p>
                    <ul className="mt-3 space-y-2">
                      {selected.poll.options.map((o) => (
                        <li key={o} className="rounded-lg border-2 border-(--cl-line) px-3 py-2 text-[15px] font-medium">
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selected.image && (
                  <figure className="mt-4">
                    <div className="max-w-[320px]">
                      <ProductSketch variant={selected.image.variant} label={selected.image.caption} />
                    </div>
                    <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-(--cl-muted)">
                      {selected.image.caption}
                      <button
                        type="button"
                        onClick={() => toast("Downloads the image in the live version.")}
                        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-(--cl-ink-2) hover:bg-(--cl-sand)"
                      >
                        <Download className="h-4 w-4" /> Save image
                      </button>
                    </figcaption>
                  </figure>
                )}
              </div>

              <div className="mt-6">
                {selected.isCompleted ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[17px] font-bold text-(--cl-green-text)">
                      <Check className="h-6 w-6" strokeWidth={3} /> Posted. Nice work.
                    </span>
                    <div className="flex items-center gap-4">
                      {isToday && nextUpcoming && (
                        <button type="button" onClick={() => setSelectedId(nextUpcoming.id)} className="cl-btn cl-btn-text">
                          See Day {nextUpcoming.day}
                        </button>
                      )}
                      <button type="button" onClick={() => toggle(selected.id)} className="cl-btn cl-btn-text">
                        Undo
                      </button>
                    </div>
                  </div>
                ) : isUpcoming ? (
                  <p className="flex items-center gap-2 text-[16px] font-semibold text-(--cl-muted)">
                    <CalendarClock className="h-5 w-5 shrink-0" strokeWidth={2.5} /> Upcoming on Day {selected.day}. You can copy it early.
                  </p>
                ) : (
                  <button type="button" onClick={() => toggle(selected.id)} className="cl-btn cl-btn-green cl-btn-lg w-full">
                    <Check className="h-6 w-6" strokeWidth={3} /> I posted it
                  </button>
                )}
              </div>
            </section>

            {/* Money and goal */}
            <section className="cl-card space-y-5 p-6">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="cl-serif cl-num text-[52px] leading-none">{plan.total}</span>
                  <span className="text-[16px] text-(--cl-muted)">{plan.totalNote}</span>
                </div>
                <div className="mt-3">
                  <Progress value={plan.percent} height={16} tone="green" label={plan.barLabel} />
                </div>
                <p className="cl-num mt-2.5 text-[15px] text-(--cl-ink-2)">
                  <span className="font-bold">{plan.line}</span> {plan.day}
                </p>
              </div>
              <div className="rounded-2xl bg-(--cl-green-tint) p-5">
                <div className="text-sm font-semibold text-(--cl-green-text)">{plan.shareLabel}</div>
                <div className="cl-serif cl-num text-[42px] leading-none">{plan.share}</div>
                <div className="mt-1.5 text-[13px] leading-snug text-(--cl-green-text)">{plan.shareNote}</div>
              </div>
            </section>

            <section className="cl-card divide-y-2 divide-(--cl-line)">
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Link2 className="h-5 w-5 shrink-0 text-(--cl-muted)" strokeWidth={2.5} />
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold">Your {selected.channel} link</div>
                    <div className="truncate text-[13px] text-(--cl-muted)">{trackingLink}</div>
                  </div>
                </div>
                <CopyButton text={trackingLink} />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="text-[15px] font-bold">Payouts</div>
                  <div className="truncate text-[13px] text-(--cl-muted)">Connected to Chase Checking ending 4242</div>
                </div>
                <button type="button" onClick={() => toast("Opens Stripe in the live version.")} className="cl-btn cl-btn-text">
                  Manage
                </button>
              </div>
              <Link href={`/p/${slug}`} target="_blank" className="flex items-center justify-between gap-3 p-4 hover:bg-(--cl-cream)">
                <span className="text-[15px] font-bold">See your landing page</span>
                <ExternalLink className="h-5 w-5 text-(--cl-muted)" strokeWidth={2.5} />
              </Link>
            </section>
          </div>

          {/* The path */}
          <nav aria-label={plan.pathLabel} className="relative md:col-start-1 md:row-start-1">
            <h2 className="cl-serif mb-5 text-center text-[30px] leading-none md:text-left">{plan.pathTitle}</h2>
            <ol className="flex flex-col items-center gap-4 py-2">
              {tasks.map((t, i) => {
                const dayIsToday = t.day === plan.currentDay;
                const upcoming = !t.isCompleted && t.day > plan.currentDay;
                const isSel = t.id === selected.id;
                return (
                  <li key={t.id} style={{ transform: `translateX(${wiggle[i % wiggle.length]}px)` }} className="relative">
                    {dayIsToday && (
                      <span className="absolute left-full top-1/2 z-10 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-(--cl-ink) px-2.5 py-1 text-[13px] font-bold text-white">
                        Today
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      aria-current={isSel ? "step" : undefined}
                      aria-label={`Day ${t.day}: ${t.title}${t.isCompleted ? ", done" : upcoming ? ", upcoming" : ""}`}
                      className={`flex h-[68px] w-[68px] cursor-pointer flex-col items-center justify-center rounded-full border-b-[6px] transition-transform active:translate-y-1 ${
                        t.isCompleted
                          ? "border-(--cl-green-press) bg-(--cl-green) text-white"
                          : upcoming
                            ? "border-(--cl-line-strong) bg-(--cl-sand) text-(--cl-ink-2)"
                            : "border-(--cl-brand-press) bg-(--cl-brand) text-white"
                      } ${isSel ? "ring-4 ring-(--cl-peach) ring-offset-2 ring-offset-(--cl-paper)" : ""} ${justDone === t.id ? "cl-pop" : ""}`}
                    >
                      {t.isCompleted ? (
                        <Check className="h-7 w-7" strokeWidth={3.5} />
                      ) : (
                        <span className="cl-serif cl-num text-[28px] leading-none">{t.day}</span>
                      )}
                    </button>
                  </li>
                );
              })}
              <li className="mt-2">
                <Mascot size={70} mood={allDone ? "cheer" : "happy"} bob={allDone} />
              </li>
            </ol>
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-(--cl-line) pt-5 text-sm text-(--cl-muted)">
          <span>Preview this page during:</span>
          {(
            [
              ["presale", "Presale"],
              ["launch", "Launch"],
            ] as [Mode, string][]
          ).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => onMode(id)} className="cl-tile px-3.5 py-2 text-sm font-bold text-(--cl-ink)">
              {label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function TestPortalPage() {
  const params = useParams();
  const slug = (params.projectSlug as string) || "ratecraft";
  const [mode, setMode] = useState<Mode>("presale");
  return <PortalView key={mode} slug={slug} mode={mode} onMode={setMode} />;
}
