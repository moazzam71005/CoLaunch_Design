"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { AlertTriangle, Check, ExternalLink, FileText, Lock, Upload } from "lucide-react";
import {
  Avatar,
  BackLink,
  Celebrate,
  Filters,
  Modal,
  ProductSketch,
  Progress,
  SectionHeading,
  Tag,
  Tip,
  useToast,
} from "../../../_components/ui";
import { diagnostic, getProject, reviewQueue } from "../../../_data/preview";
import { getDecisions, recordDecision } from "../../../_data/decisions";
import { Stat } from "./_phases/parts";
import { ValidatePhase } from "./_phases/validate";
import { BuildPhase } from "./_phases/build";
import { LaunchPhase } from "./_phases/launch";

type Tab = "project" | "progress" | "performance" | "work" | "ai";
const stages = [
  { name: "Validate", note: "Prove people will pay" },
  { name: "Build", note: "Make the first version" },
  { name: "Launch", note: "Open to everyone" },
];

const DECISION_ID = "act-1";

function ProjectView() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || "ratecraft";
  const project = getProject(slug);
  const first = project.creator.firstName;
  const g = project.validationGoal;
  const conversation = reviewQueue.find((r) => r.displayName === project.creator.displayName);

  const [tab, setTab] = useState<Tab>("progress");
  const [launched, setLaunched] = useState(searchParams.get("stage") !== "new");
  const [phase, setPhase] = useState(0);
  const [view, setView] = useState(0);
  const [win, setWin] = useState<{ title: string; body: string } | null>(null);
  const [tasks, setTasks] = useState(project.tasks);
  const [logs, setLogs] = useState(() => {
    const made = slug === "ratecraft" ? getDecisions()[DECISION_ID] : undefined;
    return project.aiActivity.map((l) =>
      l.id !== DECISION_ID || !made ? l : made === "approved" ? { ...l, isApproved: true } : { ...l, requiresApproval: false }
    );
  });
  const [prepared, setPrepared] = useState<string[]>(() => diagnostic.recommendations.filter((r) => r.prepared).map((r) => r.summary));
  const [launchLive, setLaunchLive] = useState(false);
  const [decision, setDecision] = useState<string | null>(null);
  const [confirmStop, setConfirmStop] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const { toast, toastNode } = useToast();

  const advance = (to: number, title: string) => {
    setPhase(to);
    setView(to);
    setWin({ title, body: "The next phase is unlocked and its tasks are ready." });
  };

  const decideApplePay = (l: (typeof logs)[number], outcome: "approved" | "dismissed") => {
    if (slug === "ratecraft" && l.id === DECISION_ID) recordDecision(DECISION_ID, outcome);
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t)));

  const prepare = (r: (typeof diagnostic.recommendations)[number]) => {
    setPrepared((p) => [...p, r.summary]);
    setLogs((p) => [
      { id: `exp-${r.summary}`, summary: `Experiment ready: ${r.summary}`, details: r.action, requiresApproval: true, isApproved: false, timestamp: "Just now" },
      ...p,
    ]);
    toast("Prepared. It's waiting for approval in AI activity.");
  };

  const stageState = (i: number) => (i < phase ? "done" : i === phase ? "current" : "todo");
  const doneCount = tasks.filter((t) => t.status === "completed").length;
  const waiting = logs.filter((l) => l.requiresApproval && !l.isApproved).length;
  const applePayCleared = !logs.some((l) => l.id === DECISION_ID && l.requiresApproval && !l.isApproved);
  const blockers = project.blockers.filter((b) => b.id !== "b-1" || !applePayCleared);

  const lanes = [
    { role: "ai", name: "AI" },
    { role: "colaunch", name: "CoLaunch team" },
    { role: "creator", name: first },
  ];

  const notStarted = !launched && (tab === "performance" || tab === "work" || tab === "ai");

  return (
    <div className="mx-auto max-w-[1040px] pb-16">
      {toastNode}
      <BackLink href="/projects">All projects</BackLink>

      <header className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <Avatar name={project.creator.displayName} size={64} />
          <div>
            <h1 className="cl-serif text-[46px] leading-none md:text-[58px]">{project.title}</h1>
            <p className="mt-2 text-[16px] leading-snug text-(--cl-ink-2)">
              {project.subtitle}, with {project.creator.displayName} ({project.creator.followers} on {project.creator.platform}).
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.5">
          <Link href={`/projects/${slug}/builder`} className="cl-btn cl-btn-quiet cl-btn-sm">
            Edit page
          </Link>
          <Link href={`/p/${slug}`} target="_blank" className="cl-btn cl-btn-quiet cl-btn-sm">
            Landing page <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <Link href={`/portal/${slug}`} target="_blank" className="cl-btn cl-btn-quiet cl-btn-sm">
            {first}&apos;s view <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      <div className="mb-8">
        <Filters<Tab>
          label="Project sections"
          value={tab}
          onChange={setTab}
          options={[
            { id: "project", label: "Project" },
            { id: "progress", label: "Progress" },
            { id: "performance", label: "Performance" },
            { id: "work", label: "Work", count: launched ? tasks.length - doneCount : undefined },
            { id: "ai", label: "AI activity", count: launched && waiting ? waiting : undefined },
          ]}
        />
      </div>

      {notStarted && (
        <div className="cl-card px-6 py-12 text-center">
          <p className="text-[17px] font-semibold text-(--cl-ink-2)">This fills in once the presale starts.</p>
          <button type="button" onClick={() => setTab("progress")} className="cl-btn cl-btn-primary mt-5">
            Review the plan
          </button>
        </div>
      )}

      {/* ---------------- PROJECT ---------------- */}
      {tab === "project" && (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0 space-y-6">
            <section className="cl-card p-6">
              <h2 className="cl-serif text-[30px] leading-tight">{project.concept.oneLiner}</h2>
              <dl className="mt-5 space-y-3 text-[15px] leading-snug">
                <div>
                  <dt className="font-bold">Who it&apos;s for</dt>
                  <dd className="text-(--cl-ink-2)">{project.concept.targetPersona}</dd>
                </div>
                <div>
                  <dt className="font-bold">Price</dt>
                  <dd className="text-(--cl-ink-2)">{project.concept.pricing}</dd>
                </div>
              </dl>
              <blockquote className="mt-5 rounded-2xl bg-(--cl-peach-tint) p-4">
                <div className="text-sm font-bold">What we&apos;re testing</div>
                <p className="cl-serif mt-1 text-[24px] leading-snug">{project.concept.coreHypothesis}</p>
              </blockquote>
            </section>

            <section>
              <SectionHeading title={`Background on ${first}`} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/research/c-1" className="cl-tile block p-4">
                  <span className="block text-[16px] font-bold">Audience research</span>
                  <span className="block text-sm text-(--cl-muted)">What the audience wants and will pay for</span>
                </Link>
                <button type="button" onClick={() => setShowThread(true)} className="cl-tile p-4 text-left">
                  <span className="block text-[16px] font-bold">Conversations</span>
                  <span className="block text-sm text-(--cl-muted)">
                    {conversation?.thread.length ?? 0} messages with {first}
                  </span>
                </button>
              </div>
            </section>

            <section>
              <SectionHeading
                title="Files"
                action={
                  <button type="button" onClick={() => toast("Uploading isn't part of this preview.")} className="cl-btn cl-btn-quiet cl-btn-sm">
                    <Upload className="h-4 w-4" strokeWidth={2.5} /> Upload
                  </button>
                }
              />
              <ul className="cl-card divide-y-2 divide-(--cl-line)">
                {project.assets.map((a) => (
                  <li key={a.name} className="flex items-center gap-3 p-4">
                    <FileText className="h-5 w-5 shrink-0 text-(--cl-muted)" strokeWidth={2} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-semibold">{a.name}</div>
                      <div className="text-[13px] text-(--cl-muted)">
                        {a.type}, {a.size}
                      </div>
                    </div>
                    <button type="button" onClick={() => toast("Downloading isn't part of this preview.")} className="cl-btn cl-btn-text">
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside>
            <div className="cl-card p-4">
              <ProductSketch variant={0} label={`${project.title} mockup`} />
              <p className="mt-3 px-1 text-sm text-(--cl-muted)">The design currently on the landing page.</p>
            </div>
          </aside>
        </div>
      )}

      {/* ---------------- PROGRESS ---------------- */}
      {tab === "progress" && (
        <div className="space-y-8">
          <ol className="grid grid-cols-3 gap-2 sm:gap-3">
            {stages.map((s, i) => {
              const st = stageState(i);
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    aria-pressed={view === i}
                    onClick={() => {
                      setView(i);
                      setWin(null);
                    }}
                    className="cl-tile flex h-full w-full flex-col items-center gap-2 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        st === "done"
                          ? "bg-(--cl-green) text-white"
                          : st === "current"
                            ? "bg-(--cl-brand) text-white"
                            : "bg-(--cl-sand) text-(--cl-muted)"
                      }`}
                    >
                      {st === "done" ? (
                        <Check className="h-5 w-5" strokeWidth={3.5} />
                      ) : st === "todo" ? (
                        <Lock className="h-[18px] w-[18px]" strokeWidth={2.5} />
                      ) : (
                        <span className="cl-num text-[17px] font-bold">{i + 1}</span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[17px] font-bold leading-tight">{s.name}</span>
                      <span className="hidden truncate text-[13px] text-(--cl-muted) sm:block">{st === "current" ? "You are here" : s.note}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {win && (
            <Celebrate title={win.title} body={win.body}>
              <button type="button" onClick={() => setWin(null)} className="cl-btn cl-btn-green">
                Let&apos;s go
              </button>
            </Celebrate>
          )}

          {!win && view > phase && (
            <div className="rounded-2xl bg-(--cl-cream) px-5 py-3.5 text-[15px] font-semibold text-(--cl-ink-2)">
              This phase isn&apos;t unlocked yet. Here&apos;s what it will look like.
            </div>
          )}

          {!win && view === 0 && (
            <ValidatePhase
              project={project}
              launched={launched}
              decided={phase > 0}
              onApprove={() => {
                setLaunched(true);
                setWin({
                  title: "The presale is live!",
                  body: `The landing page and checkout are open, and ${first} has the daily checklist. This preview skips ahead to Day ${project.sprintDay}.`,
                });
              }}
              onBuild={() => advance(1, "On to Build!")}
              onTestAgain={() => toast("Presale extended by 7 days.")}
              onKill={() => setConfirmStop(true)}
              onSeeExperiments={() => setTab("performance")}
            />
          )}

          {!win && view === 1 && (
            <BuildPhase
              phase={phase}
              onLaunch={() => advance(2, "It's launch time!")}
              onContinueBeta={() => toast("Beta extended by 7 days.")}
              onKill={() => setConfirmStop(true)}
              onToast={toast}
            />
          )}

          {!win && view === 2 && (
            <LaunchPhase
              phase={phase}
              first={first}
              slug={slug}
              live={launchLive}
              decision={decision}
              onGoLive={() => {
                setLaunchLive(true);
                setWin({ title: "You're live!", body: `${project.title} is open to everyone. The launch manager is watching the numbers.` });
              }}
              onDecide={(id, label) => {
                setDecision(id);
                toast(`Decision saved: ${label}.`);
              }}
            />
          )}
        </div>
      )}

      {/* ---------------- PERFORMANCE ---------------- */}
      {tab === "performance" && launched && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Presale revenue" value={project.metrics.presaleRevenue} note={`${first}'s share: ${project.metrics.creatorSplitShare}`} />
            <Stat label="Customers" value={project.metrics.totalCustomers} note="$108 average order" />
            <Stat label="Waitlist" value={project.metrics.waitlistSignups} note="42 added today" />
            <Stat label="Conversion" value={project.metrics.conversionRate} note={`${project.metrics.pageviews.toLocaleString()} visits`} />
          </div>

          <section>
            <SectionHeading title="Where sales come from" />
            <ul className="cl-card space-y-5 p-6">
              {project.metrics.trafficAttribution.map((t) => (
                <li key={t.source}>
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[16px] font-bold">{t.source}</span>
                    <span className="cl-num text-sm text-(--cl-muted)">
                      <span className="font-bold text-(--cl-ink)">{t.revenue}</span> from {t.visits.toLocaleString()} visits, {t.conversion} buy
                    </span>
                  </div>
                  <Progress value={t.share} tone="green" label={`${t.source} share of revenue`} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading title="How to sell more" action={<span className="cl-label">Health {diagnostic.overall_health_score} of 100</span>} />
            <Tip>{diagnostic.primary_blocker}</Tip>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {diagnostic.recommendations.map((r) => {
                const ready = prepared.includes(r.summary);
                return (
                  <li key={r.summary} className="cl-tile flex flex-col p-5">
                    <div className="text-[13px] font-bold text-(--cl-brand-press)">{r.type}</div>
                    <h3 className="mt-0.5 text-[17px] font-bold">{r.summary}</h3>
                    <p className="mt-1 text-[15px] leading-snug text-(--cl-ink-2)">{r.action}</p>
                    <div className="mt-auto pt-3">
                      <Tag tone="green">{r.projectedImpact}</Tag>
                      <div className="mt-3">
                        {ready ? (
                          <button type="button" onClick={() => setTab("ai")} className="cl-btn cl-btn-text">
                            Ready in AI activity
                          </button>
                        ) : (
                          <button type="button" onClick={() => prepare(r)} className="cl-btn cl-btn-quiet cl-btn-sm">
                            Prepare this
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}

      {/* ---------------- WORK ---------------- */}
      {tab === "work" && launched && (
        <div className="space-y-8">
          {blockers.length > 0 && (
            <section>
              <SectionHeading title="Blockers" />
              <ul className="space-y-2.5">
                {blockers.map((b) => (
                  <li key={b.id} className="flex items-start gap-3 rounded-2xl bg-(--cl-amber-tint) p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-(--cl-amber-text)" strokeWidth={2.5} />
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold leading-snug">{b.title}</div>
                      <div className="text-[13px] text-(--cl-amber-text)">
                        Waiting on {b.waitingOn === "You" ? "you" : b.waitingOn}, {b.since}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div>
            <div className="mb-6 flex items-center gap-4">
              <Progress value={(doneCount / tasks.length) * 100} height={14} tone="green" label="Tasks done" />
              <span className="cl-num shrink-0 text-[15px] font-bold">
                {doneCount} of {tasks.length} done
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {lanes.map((lane) => (
                <section key={lane.role}>
                  <h2 className="cl-serif mb-3 text-[28px] leading-none">{lane.name}</h2>
                  <ul className="space-y-3">
                    {tasks
                      .filter((t) => t.assigneeRole === lane.role)
                      .map((t) => {
                        const done = t.status === "completed";
                        return (
                          <li key={t.id} className="cl-tile flex items-start gap-3 p-4">
                            <button
                              type="button"
                              aria-pressed={done}
                              aria-label={`Mark ${t.title} as ${done ? "not done" : "done"}`}
                              onClick={() => toggleTask(t.id)}
                              className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-[3px] ${
                                done ? "cl-pop border-(--cl-green) bg-(--cl-green) text-white" : "border-(--cl-line-strong) hover:border-(--cl-green)"
                              }`}
                            >
                              {done && <Check className="h-4 w-4" strokeWidth={3.5} />}
                            </button>
                            <div className="min-w-0">
                              <div className={`text-[15px] font-semibold leading-snug ${done ? "text-(--cl-muted) line-through" : ""}`}>{t.title}</div>
                              <div className="mt-1 text-[13px] text-(--cl-muted)">
                                {t.dueDate}
                                {t.status === "in_progress" ? ", in progress" : ""}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- AI ACTIVITY ---------------- */}
      {tab === "ai" && launched && (
        <ol className="max-w-[760px] space-y-4">
          {logs.map((l) => (
            <li key={l.id} className={l.requiresApproval && !l.isApproved ? "cl-tile p-5" : "cl-card p-5"}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[18px] font-bold leading-snug">{l.summary}</h2>
                <span className="shrink-0 text-[13px] text-(--cl-muted)">{l.timestamp}</span>
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-(--cl-ink-2)">{l.details}</p>
              {l.requiresApproval && (
                <div className="mt-4">
                  {l.isApproved ? (
                    <span className="cl-pop inline-flex items-center gap-1.5 text-[15px] font-bold text-(--cl-green-text)">
                      <Check className="h-5 w-5" strokeWidth={3} /> Approved and live
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setLogs((p) => p.map((x) => (x.id === l.id ? { ...x, isApproved: true } : x)));
                          decideApplePay(l, "approved");
                          toast("Approved and live.");
                        }}
                        className="cl-btn cl-btn-green cl-btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLogs((p) => p.map((x) => (x.id === l.id ? { ...x, requiresApproval: false } : x)));
                          decideApplePay(l, "dismissed");
                        }}
                        className="cl-btn cl-btn-text"
                      >
                        Not now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      )}

      {showThread && conversation && (
        <Modal title={`Conversation with ${first}`} onClose={() => setShowThread(false)} wide>
          <div className="space-y-3">
            {conversation.thread.map((m) => (
              <div key={m.timestamp} className={`max-w-[88%] rounded-2xl p-4 ${m.isCreator ? "bg-(--cl-peach-tint)" : "ml-auto bg-(--cl-cream)"}`}>
                <div className="mb-1 flex justify-between gap-4 text-[13px]">
                  <span className="font-bold">{m.sender}</span>
                  <span className="text-(--cl-muted)">{m.timestamp}</span>
                </div>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-(--cl-ink-2)">{m.body}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {confirmStop && (
        <Modal title={`Stop ${project.title}?`} sub={`All ${g.currentPresales} backers would be refunded. This can't be undone.`} onClose={() => setConfirmStop(false)}>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setConfirmStop(false)} className="cl-btn cl-btn-quiet">
              Keep going
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmStop(false);
                toast("Preview only: nothing was stopped or refunded.");
              }}
              className="cl-btn cl-btn-primary"
            >
              Stop and refund
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function TestProjectPage() {
  return (
    <Suspense>
      <ProjectView />
    </Suspense>
  );
}
