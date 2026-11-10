"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { Celebrate, Field, Progress, Tip } from "../../../_components/ui";
import { niches, platforms, templates } from "../../../_data/preview";

const geos = ["US", "UK", "CA", "AU", "DE"];
const tags = ["creator_name", "platform", "niche", "follower_count", "engagement_rate", "creator_score"];

const prompts = [
  { q: "Where should we look?", tip: "Pick where your kind of creator spends their time." },
  { q: "What do they talk about?", tip: "Choose every topic that fits." },
  { q: "Who counts as a good fit?", tip: "Only creators who score 70 or higher get contacted." },
  { q: "How many each week?", tip: "Start small. You can change this any time." },
  { q: "What should the email say?", tip: "Tap a tag to personalize it for each creator." },
  { q: "Ready to go?", tip: "Give it a name and check everything looks right." },
];

export default function TestNewCampaignPage() {
  const [step, setStep] = useState(0);
  const [launched, setLaunched] = useState<null | "live" | "draft">(null);

  const [name, setName] = useState("Productivity & finance creators");
  const [selPlatforms, setSelPlatforms] = useState(["youtube", "instagram"]);
  const [selNiches, setSelNiches] = useState(["Productivity & Systems", "Fintech & Personal Finance"]);
  const [followerMin, setFollowerMin] = useState(100000);
  const [followerMax, setFollowerMax] = useState(1000000);
  const [minEngagement, setMinEngagement] = useState(2.5);
  const [selGeos, setSelGeos] = useState(["US", "UK", "CA"]);
  const [weekly, setWeekly] = useState(50);
  const [followup, setFollowup] = useState(7);
  const [subject, setSubject] = useState(templates[0].subject);
  const [body, setBody] = useState(templates[0].body);

  const flip = (list: string[], v: string, set: (l: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const canContinue =
    (step !== 0 || selPlatforms.length > 0) &&
    (step !== 1 || selNiches.length > 0) &&
    (step !== 2 || (selGeos.length > 0 && followerMin < followerMax)) &&
    (step !== 4 || (subject.trim() !== "" && body.trim() !== "")) &&
    (step !== 5 || name.trim() !== "");

  if (launched) {
    return (
      <div className="mx-auto max-w-[640px] pt-10">
        <Celebrate
          title={launched === "live" ? "Campaign started!" : "Draft saved"}
          body={
            launched === "live"
              ? `We'll start finding creators now and contact up to ${weekly} a week.`
              : "Pick it up from Campaigns whenever you're ready."
          }
        >
          <Link href="/campaigns" className="cl-btn cl-btn-primary">
            Back to campaigns
          </Link>
          {launched === "live" && (
            <Link href="/discovery" className="cl-btn cl-btn-quiet">
              See creators
            </Link>
          )}
        </Celebrate>
      </div>
    );
  }

  const summary = [
    ["Where", selPlatforms.map((id) => platforms.find((p) => p.id === id)?.label).join(", ")],
    ["Topics", selNiches.join(", ")],
    ["Followers", `${followerMin.toLocaleString()} to ${followerMax.toLocaleString()}`],
    ["Engagement", `At least ${minEngagement}%`],
    ["Countries", selGeos.join(", ")],
    ["Volume", `${weekly} creators a week`],
    ["Follow-up", `After ${followup} days with no reply`],
    ["Subject", subject],
  ];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-[720px] flex-col">
      <div className="flex items-center gap-4">
        <Link
          href="/campaigns"
          aria-label="Exit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-(--cl-muted) hover:bg-(--cl-cream) hover:text-(--cl-ink)"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </Link>
        <Progress value={((step + 1) / prompts.length) * 100} height={16} tone="green" label="Campaign setup progress" />
      </div>

      <div key={step} className="cl-rise flex-1 py-8">
        <h1 className="cl-serif text-[44px] leading-[1.05]">{prompts[step].q}</h1>
        <div className="mb-7 mt-4">
          <Tip size={48}>{prompts[step].tip}</Tip>
        </div>

        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((p) => {
              const on = selPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => flip(selPlatforms, p.id, setSelPlatforms)}
                  className="cl-tile p-5 text-left"
                >
                  <div className="text-[18px] font-bold">{p.label}</div>
                  <div className="mt-0.5 text-sm text-(--cl-muted)">{p.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-wrap gap-2.5">
            {niches.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={selNiches.includes(n)}
                onClick={() => flip(selNiches, n, setSelNiches)}
                className="cl-tile px-4 py-3 text-[15px] font-semibold"
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Followers, at least">
                <input type="number" className="cl-input cl-num" value={followerMin} onChange={(e) => setFollowerMin(Number(e.target.value))} />
              </Field>
              <Field label="Followers, at most">
                <input type="number" className="cl-input cl-num" value={followerMax} onChange={(e) => setFollowerMax(Number(e.target.value))} />
              </Field>
            </div>
            {followerMin >= followerMax && (
              <p role="alert" className="text-sm font-semibold text-(--cl-brand-press)">
                The minimum needs to be lower than the maximum.
              </p>
            )}
            <Field label="Lowest engagement rate (%)">
              <input type="number" step="0.1" className="cl-input cl-num" value={minEngagement} onChange={(e) => setMinEngagement(Number(e.target.value))} />
            </Field>
            <div>
              <span className="mb-2 block text-[15px] font-semibold">Countries</span>
              <div className="flex flex-wrap gap-2.5">
                {geos.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={selGeos.includes(g)}
                    onClick={() => flip(selGeos, g, setSelGeos)}
                    className="cl-tile min-w-16 px-4 py-3 text-[15px] font-bold"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-7">
            <div className="grid grid-cols-3 gap-3">
              {[25, 50, 100].map((v) => (
                <button key={v} type="button" aria-pressed={weekly === v} onClick={() => setWeekly(v)} className="cl-tile py-6 text-center">
                  <div className="cl-serif cl-num text-[46px] leading-none">{v}</div>
                  <div className="mt-1 text-sm text-(--cl-muted)">a week</div>
                </button>
              ))}
            </div>
            <div>
              <span className="mb-2 block text-[15px] font-semibold">If they don&apos;t reply, follow up after</span>
              <div className="grid grid-cols-3 gap-3">
                {[5, 7, 10].map((d) => (
                  <button key={d} type="button" aria-pressed={followup === d} onClick={() => setFollowup(d)} className="cl-tile py-3.5 text-[16px] font-bold">
                    {d} days
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-(--cl-muted)">As soon as a creator replies, the follow-ups stop.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2.5">
              {templates.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  aria-pressed={subject === t.subject}
                  onClick={() => {
                    setSubject(t.subject);
                    setBody(t.body);
                  }}
                  className="cl-tile px-4 py-2.5 text-[15px] font-semibold"
                >
                  {t.name}
                </button>
              ))}
            </div>
            <Field label="Subject">
              <input className="cl-input" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Field>
            <div>
              <span className="mb-2 block text-[15px] font-semibold">Personalize</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setBody((b) => `${b} {{${t}}}`)}
                    className="cursor-pointer rounded-lg bg-(--cl-brand-tint) px-2.5 py-1.5 text-[13px] font-semibold text-(--cl-brand-press) hover:bg-(--cl-peach-tint)"
                  >
                    + {t.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Email">
              <textarea rows={10} className="cl-input" value={body} onChange={(e) => setBody(e.target.value)} />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <Field label="Campaign name">
              <input className="cl-input" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <dl className="cl-card divide-y-2 divide-(--cl-line)">
              {summary.map(([k, v]) => (
                <div key={k} className="flex gap-4 px-5 py-3.5">
                  <dt className="w-28 shrink-0 text-[15px] text-(--cl-muted)">{k}</dt>
                  <dd className="min-w-0 text-[15px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="sticky bottom-14 z-20 flex items-center justify-between gap-3 border-t-2 border-(--cl-line) bg-(--cl-paper) py-4 md:bottom-0">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="cl-btn cl-btn-quiet">
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} /> Back
          </button>
        ) : (
          <span />
        )}
        {step < prompts.length - 1 ? (
          <button type="button" disabled={!canContinue} onClick={() => setStep((s) => s + 1)} className="cl-btn cl-btn-green cl-btn-lg">
            Continue
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setLaunched("draft")} className="cl-btn cl-btn-text">
              Save as draft
            </button>
            <button type="button" disabled={!canContinue} onClick={() => setLaunched("live")} className="cl-btn cl-btn-primary cl-btn-lg">
              <Check className="h-5 w-5" strokeWidth={3} /> Start campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
