"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { ActionBar, ProductSketch, Progress, Ring, SectionHeading, StatusNote } from "../../../../_components/ui";
import { campaignAssets, validationPlan, type PreviewProject } from "../../../../_data/preview";
import { CheckRow, Facts, Gate, SubSteps } from "./parts";

export function ValidatePhase({
  project,
  launched,
  decided,
  onApprove,
  onBuild,
  onTestAgain,
  onKill,
  onSeeExperiments,
}: {
  project: PreviewProject;
  launched: boolean;
  decided: boolean;
  onApprove: () => void;
  onBuild: () => void;
  onTestAgain: () => void;
  onKill: () => void;
  onSeeExperiments: () => void;
}) {
  const [sub, setSub] = useState(launched ? 1 : 0);
  const [day14, setDay14] = useState(false);
  const first = project.creator.firstName;
  const g = project.validationGoal;
  const r = project.validationResult;
  const finished = day14 || decided;

  const revenue = finished ? r.actualRevenue : g.currentRevenue;
  const founders = finished ? r.presales : g.currentPresales;
  const day = finished ? project.totalSprintDays : project.sprintDay;
  const percent = Math.min(100, (revenue / g.targetRevenue) * 100);

  return (
    <div className="space-y-8">
      <SubSteps
        label="Validate steps"
        value={sub}
        onChange={setSub}
        steps={[{ name: "Plan and campaign" }, { name: "Presale", locked: !launched }]}
      />

      {sub === 0 && (
        <div className="space-y-8">
          <section>
            <SectionHeading title="The plan" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="cl-card p-5">
                <Facts
                  rows={[
                    { label: "Customer", value: validationPlan.icp_definition },
                    { label: "Problem", value: validationPlan.problem },
                    { label: "Offer", value: validationPlan.core_offer },
                  ]}
                />
              </div>
              <div className="cl-card p-5">
                <Facts
                  rows={[
                    { label: "Price", value: `$${validationPlan.target_price} one time` },
                    { label: "Test method", value: validationPlan.test_method },
                    { label: "Validation period", value: validationPlan.validation_period },
                  ]}
                />
                <div className="mt-4 rounded-xl bg-(--cl-peach-tint) p-4">
                  <div className="text-sm font-bold">Success threshold</div>
                  <p className="cl-serif mt-0.5 text-[24px] leading-tight">{validationPlan.success_threshold}</p>
                </div>
              </div>
            </div>
            <h3 className="mb-3 mt-6 text-[17px] font-bold">{first}&apos;s posting schedule</h3>
            <ol className="grid gap-3 md:grid-cols-4">
              {validationPlan.sprint_schedule.map((s) => (
                <li key={s.dayRange} className="rounded-2xl bg-(--cl-cream) p-4">
                  <div className="text-[13px] font-bold text-(--cl-brand-press)">{s.dayRange}</div>
                  <div className="mt-0.5 text-[16px] font-bold">{s.focus}</div>
                  <p className="mt-1 text-sm leading-snug text-(--cl-muted)">{s.channelAction}</p>
                </li>
              ))}
            </ol>
            <h3 className="mb-2 mt-5 text-[15px] font-bold">What we&apos;re testing</h3>
            <ul className="space-y-1.5 text-[15px] leading-snug text-(--cl-ink-2)">
              {validationPlan.hypotheses.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading
              title="The campaign"
              action={
                <Link href={`/projects/${project.slug}/builder`} className="cl-btn cl-btn-text">
                  Edit landing page
                </Link>
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="cl-card p-5">
                <Facts rows={campaignAssets.product} />
              </div>
              <div className="space-y-4">
                <div className="cl-card p-5">
                  <h3 className="mb-3 text-[15px] font-bold">Product mockups</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((v) => (
                      <ProductSketch key={v} variant={v} label={`Mockup ${v + 1}`} />
                    ))}
                  </div>
                </div>
                <div className="cl-card p-5">
                  <h3 className="mb-3 text-[15px] font-bold">Set up and ready</h3>
                  <ul className="space-y-2.5">
                    {campaignAssets.ready.map((item) => (
                      <CheckRow key={item} label={item} done />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {launched ? (
            <StatusNote title="Approved and launched" sub="The presale opened on Day 1." />
          ) : (
            <ActionBar text="Does this look right?" sub={`This opens the presale and sends ${first} the daily checklist.`}>
              <button type="button" onClick={onApprove} className="cl-btn cl-btn-green cl-btn-lg">
                <Rocket className="h-5 w-5" strokeWidth={2.5} /> Approve &amp; Launch
              </button>
            </ActionBar>
          )}
        </div>
      )}

      {sub === 1 && (
        <div className="space-y-8">
          <div className="grid gap-5 md:grid-cols-[1.5fr_1fr]">
            <section className="cl-card p-6 md:p-8">
              <div className="cl-label">Presale goal</div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                <span className="cl-serif cl-num text-[72px] leading-none">${revenue.toLocaleString()}</span>
                <span className="text-[18px] text-(--cl-muted)">of ${g.targetRevenue.toLocaleString()}</span>
              </div>
              <div className="mt-5">
                <Progress value={percent} height={18} tone={finished ? "green" : "brand"} label="Presale goal progress" />
              </div>
              <p className="mt-3 text-[16px] text-(--cl-ink-2)">
                {finished ? (
                  <span className="font-bold text-(--cl-green-text)">Goal reached.</span>
                ) : (
                  <span className="font-bold text-(--cl-brand-press)">${(g.targetRevenue - revenue).toLocaleString()} to go.</span>
                )}{" "}
                {founders} of {g.targetPresales} founders{finished ? "." : " so far."}
              </p>
            </section>
            <section className="cl-card flex items-center gap-5 p-6">
              <Ring value={day} max={project.totalSprintDays} size={108} label="Days into the presale">
                <span className="text-center leading-none">
                  <span className="cl-serif cl-num block text-[36px]">{day}</span>
                  <span className="text-[13px] text-(--cl-muted)">of {project.totalSprintDays}</span>
                </span>
              </Ring>
              <div>
                <div className="text-[18px] font-bold">{finished ? "Presale closed" : `${project.totalSprintDays - day} days left`}</div>
                <div className="mt-0.5 text-[15px] leading-snug text-(--cl-muted)">
                  {finished ? "The results are in." : "Then you decide whether to build it."}
                </div>
              </div>
            </section>
          </div>

          {!finished && (
            <section>
              <SectionHeading title="While it runs" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href={`/portal/${project.slug}`} className="cl-tile block p-4">
                  <span className="block text-[16px] font-bold">{first}&apos;s daily checklist</span>
                  <span className="block text-sm text-(--cl-muted)">Today&apos;s post is written and ready to copy</span>
                </Link>
                <button type="button" onClick={onSeeExperiments} className="cl-tile p-4 text-left">
                  <span className="block text-[16px] font-bold">Experiments</span>
                  <span className="block text-sm text-(--cl-muted)">AI ideas to lift sales, in Performance</span>
                </button>
              </div>
            </section>
          )}

          <Gate
            title="Validation gate"
            sub={finished ? "The results are in. What do you want to do?" : "You'll choose what happens next when the presale ends."}
            summary={[
              { label: "Goal", value: `$${g.targetRevenue.toLocaleString()} presales` },
              { label: finished ? "Actual" : "So far", value: `$${revenue.toLocaleString()}` },
              { label: "Conversion", value: finished ? r.conversion : project.metrics.conversionRate },
              { label: "Result", value: finished ? r.result : "In progress", pass: finished },
            ]}
            locked={
              decided
                ? "Decided. This project moved on to Build."
                : !day14
                  ? `Decision opens on Day ${project.totalSprintDays}`
                  : undefined
            }
            action={!decided && !day14 ? { label: `Preview Day ${project.totalSprintDays}`, onClick: () => setDay14(true) } : undefined}
            footer={
              !decided && day14 ? (
                <>
                  You&apos;re previewing Day {project.totalSprintDays}.{" "}
                  <button type="button" onClick={() => setDay14(false)} className="h-11 cursor-pointer font-semibold text-white underline underline-offset-4">
                    Back to Day {project.sprintDay}
                  </button>
                </>
              ) : undefined
            }
            options={[
              { label: "Build MVP", note: "Demand is proven. Start building.", kind: "go", onPick: onBuild },
              { label: "Test again", note: "Extend the presale by 7 days.", kind: "wait", onPick: onTestAgain },
              { label: "Kill", note: "Stop here and refund every backer.", kind: "stop", onPick: onKill },
            ]}
          />
        </div>
      )}
    </div>
  );
}
