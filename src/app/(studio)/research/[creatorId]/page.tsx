"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Check, Download } from "lucide-react";
import { ActionBar, JourneyBar, Ring, SectionHeading, Tag, Tip, useToast } from "../../../_components/ui";
import { dossier } from "../../../_data/preview";

export default function TestResearchPage() {
  const params = useParams();
  const creatorId = params.creatorId as string;
  const { toast, toastNode } = useToast();
  const firstName = dossier.creatorName.split(" ")[0];
  const d = dossier.demographics;

  return (
    <div className="mx-auto max-w-[1040px]">
      {toastNode}
      <JourneyBar step={1} name={dossier.creatorName} />

      <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="cl-serif text-[46px] leading-[1.05] md:text-[56px]">What {firstName}&apos;s audience wants</h1>
          <div className="mt-5">
            <Tip>{dossier.rawDossierSummary}</Tip>
          </div>
        </div>
        <div className="cl-card flex shrink-0 flex-col items-center p-6">
          <Ring value={dossier.purchaseIntentScore} max={100} size={118} label="Likely to buy score">
            <span className="cl-serif cl-num text-[40px] leading-none">{dossier.purchaseIntentScore}</span>
          </Ring>
          <div className="mt-3 text-[15px] font-bold">Likely to buy</div>
        </div>
      </header>

      <section className="mb-12">
        <SectionHeading title="Who they are" />
        <dl className="cl-card grid grid-cols-2 md:grid-cols-4">
          {[
            ["Age", d.primaryAgeGroup, d.genderRatio],
            ["Where", d.topGeographies.split(",")[0], d.topGeographies.split(",").slice(1).join(",").trim()],
            ["Work", d.coreProfessions[0], d.coreProfessions.slice(1).join(", ")],
            ["Income", d.estimatedIncomeLevel, "Can afford paid tools"],
          ].map(([k, v, note], i) => (
            <div
              key={k}
              className={`p-5 ${i % 2 ? "border-l-2 border-(--cl-line)" : ""} ${i > 1 ? "border-t-2 border-(--cl-line) md:border-t-0" : ""} ${i === 2 ? "md:border-l-2" : ""}`}
            >
              <dt className="text-sm text-(--cl-muted)">{k}</dt>
              <dd className="cl-serif mt-1 text-[26px] leading-tight">{v}</dd>
              <dd className="mt-1 text-[13px] leading-snug text-(--cl-muted)">{note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-12">
        <SectionHeading title="What they keep complaining about" />
        <ol className="space-y-4">
          {dossier.recurringPainPoints.map((p, i) => (
            <li key={p.painPoint} className="cl-tile p-6">
              <div className="flex items-start gap-4">
                <span className="cl-num flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--cl-ink) text-[18px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[19px] font-bold leading-snug">{p.painPoint}</h3>
                    <Tag tone={p.severity === "critical" ? "brand" : "amber"}>{p.severity === "critical" ? "Big problem" : "Common"}</Tag>
                  </div>
                  <p className="mt-0.5 text-sm text-(--cl-muted)">
                    {p.frequency}. Could become: <span className="font-semibold text-(--cl-ink-2)">{p.commercialOpportunity}</span>
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {p.directQuotes.map((q) => (
                      <blockquote key={q} className="rounded-2xl bg-(--cl-peach-tint) p-4 text-[15px] leading-relaxed">
                        {q}
                      </blockquote>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <SectionHeading title={`What ${firstName} already has`} />
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="cl-card divide-y-2 divide-(--cl-line)">
            {dossier.presence.map((p) => (
              <li key={p.label} className="p-5">
                <div className="text-sm text-(--cl-muted)">{p.label}</div>
                <div className="text-[17px] font-bold">{p.value}</div>
                <p className="mt-0.5 text-[15px] leading-snug text-(--cl-ink-2)">{p.note}</p>
              </li>
            ))}
          </ul>
          <ul className="cl-card divide-y-2 divide-(--cl-line)">
            {dossier.existingProducts.map((p) => (
              <li key={p.name} className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[17px] font-bold">{p.name}</div>
                  <span className="cl-num shrink-0 text-[15px] font-bold">{p.price}</span>
                </div>
                <p className="mt-0.5 text-[15px] leading-snug text-(--cl-ink-2)">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <SectionHeading title="What they use now" />
          <ul className="cl-card divide-y-2 divide-(--cl-line)">
            {dossier.competitorsAnalyzed.map((c) => (
              <li key={c.name} className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[16px] font-bold">{c.name}</span>
                  <span className="text-[13px] text-(--cl-muted)">{c.category}</span>
                </div>
                <p className="mt-1 text-[15px] leading-snug text-(--cl-ink-2)">{c.frictionReportedByAudience}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 mt-5 text-[15px] font-bold">How {firstName} earns today</h3>
          <ul className="space-y-1.5 text-[15px] leading-snug text-(--cl-ink-2)">
            {dossier.monetizationGaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading title="Signs they'll pay" />
          <ul className="space-y-3">
            {dossier.purchaseIntentSignals.map((s) => (
              <li key={s} className="cl-card flex items-start gap-3 p-4 text-[15px] leading-snug">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--cl-green) text-white">
                  <Check className="h-4 w-4" strokeWidth={3.5} />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ActionBar text="Research is done" sub="Next, turn this into 3 product ideas.">
        <button type="button" onClick={() => toast("PDF export isn't part of this preview.")} className="cl-btn cl-btn-quiet">
          <Download className="h-5 w-5" strokeWidth={2.5} /> Export PDF
        </button>
        <Link href={`/ideation/${creatorId}`} className="cl-btn cl-btn-green cl-btn-lg">
          See product ideas <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </Link>
      </ActionBar>
    </div>
  );
}
