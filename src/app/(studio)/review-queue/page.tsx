"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, X } from "lucide-react";
import { Avatar, Celebrate, Field, Filters, Modal, PageHead, Progress, Score, Tag, Tip, useToast } from "../../_components/ui";
import { approvedStage, otherReplies, reviewQueue } from "../../_data/preview";
import { clearDecision, clearDecisions, getDecisions, recordDecision } from "../../_data/decisions";

type Tab = "pending" | "approved" | "archived" | "sorted";
const sortedGroups = ["Not Interested", "Unsubscribe", "Other"];
type Item = (typeof reviewQueue)[number];

export default function TestReviewQueuePage() {
  const [items, setItems] = useState(() =>
    reviewQueue.map((i) => {
      const made = getDecisions()[i.id];
      return made === "approved" || made === "archived" ? { ...i, status: made } : i;
    })
  );
  const [tab, setTab] = useState<Tab>("pending");
  const [threadOpen, setThreadOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<Item | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const { toast, toastNode } = useToast();

  const pending = items.filter((i) => i.status === "pending");
  const current = pending[0];
  const queueSize = reviewQueue.filter((i) => i.status === "pending").length;
  const reviewed = queueSize - pending.length;
  const count = (s: Item["status"]) => items.filter((i) => i.status === s).length;

  const decide = (id: string, status: "approved" | "archived", name: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    recordDecision(id, status);
    setThreadOpen(false);
    toast(status === "approved" ? `${name} approved. Audience research is starting.` : `${name} passed on.`);
  };

  const openReply = (item: Item) => {
    setReplyTo(item);
    setReplyText(
      `Hey ${item.displayName.split(" ")[0]},\n\nGreat to hear back! To answer your question:\n- We do a 50/50 revenue share.\n- There's no upfront cost. CoLaunch funds and handles all of the engineering.\n\nLet's connect next week to go through the concepts.`
    );
  };

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setReplyTo(null);
      toast("Reply sent from hey@co-launch.app");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-[800px] pb-12">
      {toastNode}
      <PageHead title="Replies" sub="AI sorts the inbox. You decide who moves forward." />

      <Filters<Tab>
        label="Reply status"
        value={tab}
        onChange={(t) => {
          setTab(t);
          setThreadOpen(false);
        }}
        options={[
          { id: "pending", label: "To review", count: count("pending") },
          { id: "approved", label: "Approved", count: count("approved") },
          { id: "archived", label: "Passed", count: count("archived") },
          { id: "sorted", label: "Sorted by AI", count: otherReplies.length },
        ]}
      />

      {tab === "pending" && (
        <div className="mt-6">
          {!current ? (
            <Celebrate title="Inbox clear!" body="Every reply has been reviewed. Nice work.">
              <button type="button" onClick={() => setTab("approved")} className="cl-btn cl-btn-primary">
                See who you approved
              </button>
              <button
                type="button"
                onClick={() => {
                  setItems(reviewQueue);
                  clearDecisions();
                }}
                className="cl-btn cl-btn-quiet"
              >
                Start over
              </button>
            </Celebrate>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-4">
                <Progress value={(reviewed / queueSize) * 100} tone="green" height={14} label="Replies reviewed" />
                <span className="cl-num shrink-0 text-[15px] font-bold">
                  {reviewed + 1} of {queueSize}
                </span>
              </div>

              <article key={current.id} className="cl-tile cl-rise p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <Avatar name={current.displayName} tone={reviewed} size={60} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="cl-serif text-[34px] leading-none">{current.displayName}</h2>
                      <Tag tone={current.intent === "interested" ? "green" : "amber"}>
                        {current.intent === "interested" ? "Interested" : "Question"}
                      </Tag>
                    </div>
                    <p className="mt-1.5 text-[15px] text-(--cl-muted)">
                      {current.platform}, {(current.followers / 1000).toFixed(0)}K followers, {current.engagement}% engagement. {current.receivedAt}.
                    </p>
                  </div>
                  <Score value={current.creatorScore} size={62} />
                </div>

                <div className="mt-6">
                  <Tip size={46}>{current.aiSummary}</Tip>
                </div>

                {current.keyQuestions.length > 0 && (
                  <div className="mt-5 rounded-xl bg-(--cl-amber-tint) p-4">
                    <div className="text-[15px] font-bold text-(--cl-amber-text)">They asked</div>
                    <ul className="mt-1.5 space-y-1.5 text-[15px] leading-snug text-(--cl-ink-2)">
                      {current.keyQuestions.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="mb-2 text-[15px] font-bold">Their best content</h3>
                  <ul className="divide-y-2 divide-(--cl-line) rounded-xl border-2 border-(--cl-line)">
                    {current.topPosts.map((p) => (
                      <li key={p.title} className="flex items-center justify-between gap-4 px-4 py-3">
                        <span className="min-w-0 truncate text-[15px] font-medium">{p.title}</span>
                        <span className="shrink-0 text-[13px] text-(--cl-muted)">{p.views}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  aria-expanded={threadOpen}
                  onClick={() => setThreadOpen((o) => !o)}
                  className="mt-5 inline-flex h-10 cursor-pointer items-center gap-1.5 text-[15px] font-bold text-(--cl-ink-2) hover:text-(--cl-ink)"
                >
                  {threadOpen ? "Hide the conversation" : `Read the conversation (${current.thread.length})`}
                  <ChevronDown className={`h-5 w-5 transition-transform ${threadOpen ? "rotate-180" : ""}`} strokeWidth={2.5} />
                </button>

                {threadOpen && (
                  <div className="cl-rise mt-3 space-y-3">
                    {current.thread.map((m) => (
                      <div
                        key={m.timestamp}
                        className={`max-w-[88%] rounded-2xl p-4 ${
                          m.isCreator ? "bg-(--cl-peach-tint)" : "ml-auto bg-(--cl-cream)"
                        }`}
                      >
                        <div className="mb-1 flex justify-between gap-4 text-[13px]">
                          <span className="font-bold">{m.sender}</span>
                          <span className="text-(--cl-muted)">{m.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-line text-[15px] leading-relaxed text-(--cl-ink-2)">{m.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-7 grid grid-cols-2 gap-3 border-t-2 border-(--cl-line) pt-6 sm:grid-cols-[1fr_1fr_1.4fr]">
                  <button type="button" onClick={() => decide(current.id, "archived", current.displayName)} className="cl-btn cl-btn-quiet">
                    <X className="h-5 w-5" strokeWidth={3} /> Pass
                  </button>
                  <button type="button" onClick={() => openReply(current)} className="cl-btn cl-btn-quiet">
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(current.id, "approved", current.displayName)}
                    className="cl-btn cl-btn-green col-span-2 sm:col-span-1"
                  >
                    <Check className="h-5 w-5" strokeWidth={3} /> Approve
                  </button>
                </div>
              </article>
            </>
          )}
        </div>
      )}

      {tab === "sorted" && (
        <div className="mt-6 space-y-8">
          <Tip size={46}>These didn&apos;t need you. We handled each one and stopped or adjusted the follow-ups.</Tip>
          {sortedGroups.map((group) => (
            <section key={group}>
              <h2 className="cl-serif mb-3 text-[28px] leading-none">{group}</h2>
              <ul className="cl-card divide-y-2 divide-(--cl-line)">
                {otherReplies
                  .filter((r) => r.group === group)
                  .map((r, idx) => (
                    <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 p-4">
                      <Avatar name={r.name} tone={idx} size={40} />
                      <div className="min-w-0 flex-1 basis-48">
                        <div className="text-[16px] font-bold">{r.name}</div>
                        <div className="text-[15px] leading-snug text-(--cl-ink-2)">{r.snippet}</div>
                      </div>
                      <Tag>{r.outcome}</Tag>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {(tab === "approved" || tab === "archived") && (
        <ul className="mt-6 space-y-3">
          {items.filter((i) => i.status === tab).length === 0 && (
            <li className="py-12 text-center text-[16px] text-(--cl-muted)">
              {tab === "approved" ? "Nobody approved yet." : "Nobody passed on yet."}
            </li>
          )}
          {items
            .filter((i) => i.status === tab)
            .map((i, idx) => (
              <li key={i.id} className="cl-tile flex flex-wrap items-center gap-4 p-5">
                <Avatar name={i.displayName} tone={idx} size={46} />
                <div className="min-w-0 flex-1">
                  <div className="text-[17px] font-bold">{i.displayName}</div>
                  <div className="text-sm text-(--cl-muted)">
                    {tab === "approved" ? approvedStage[i.creatorId].label : "You passed on this creator."}
                  </div>
                </div>
                {tab === "approved" ? (
                  <Link href={approvedStage[i.creatorId].href} className="cl-btn cl-btn-primary cl-btn-sm">
                    {approvedStage[i.creatorId].cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setItems((p) => p.map((x) => (x.id === i.id ? { ...x, status: "pending" } : x)));
                      clearDecision(i.id);
                    }}
                    className="cl-btn cl-btn-quiet cl-btn-sm"
                  >
                    Undo
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}

      {replyTo && (
        <Modal title={`Reply to ${replyTo.displayName}`} sub={`From hey@co-launch.app to ${replyTo.email}`} onClose={() => setReplyTo(null)}>
          <form onSubmit={sendReply} className="space-y-5">
            <Field label="Your message">
              <textarea required rows={9} className="cl-input" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
            </Field>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setReplyTo(null)} className="cl-btn cl-btn-text">
                Cancel
              </button>
              <button type="submit" disabled={sending} className="cl-btn cl-btn-primary">
                {sending ? "Sending..." : "Send reply"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
