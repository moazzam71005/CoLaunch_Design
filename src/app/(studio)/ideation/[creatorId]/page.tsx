"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Check, Trophy } from "lucide-react";
import { ActionBar, JourneyBar, Modal, ProductSketch, Score, Tag, Tip } from "../../../_components/ui";
import { dossier, opportunities } from "../../../_data/preview";

const difficulty = {
  Low: { tone: "green" as const, label: "Easy build" },
  Medium: { tone: "amber" as const, label: "Medium build" },
  High: { tone: "brand" as const, label: "Hard build" },
};

export default function TestIdeationPage() {
  const params = useParams();
  const creatorId = params.creatorId as string;
  const [zoom, setZoom] = useState<(typeof opportunities)[number] | null>(null);

  return (
    <div className="mx-auto max-w-[1040px]">
      <JourneyBar step={2} name={dossier.creatorName} />

      <header className="mb-8">
        <h1 className="cl-serif text-[46px] leading-[1.05] md:text-[56px]">3 products worth building</h1>
        <div className="mt-5">
          <Tip>We scored 8 ideas using what the audience actually said. These came out on top.</Tip>
        </div>
      </header>

      <ol className="space-y-6">
        {opportunities.map((o, i) => {
          const top = o.opportunityRank === 1;
          return (
            <li key={o.id} className={`cl-tile overflow-hidden ${top ? "border-(--cl-brand)!" : ""}`}>
              {top && (
                <div className="flex items-center gap-2 bg-(--cl-brand) px-6 py-2.5 text-[15px] font-bold text-white">
                  <Trophy className="h-[18px] w-[18px]" strokeWidth={2.5} /> Our top pick
                </div>
              )}
              <div className="grid gap-7 p-6 md:grid-cols-[320px_1fr] md:p-7">
                <div>
                  <button
                    type="button"
                    onClick={() => setZoom(o)}
                    aria-label={`Enlarge the ${o.title} mockup`}
                    className="block w-full cursor-zoom-in"
                  >
                    <ProductSketch variant={i} label={`${o.title} mockup`} />
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag tone={difficulty[o.mvpComplexity].tone}>{difficulty[o.mvpComplexity].label}</Tag>
                    <Tag>{o.pricingModel}</Tag>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-(--cl-muted)">Idea {o.opportunityRank}</div>
                      <h2 className="cl-serif text-[36px] leading-none">{o.title}</h2>
                      <p className="mt-1.5 text-[16px] text-(--cl-ink-2)">{o.oneLiner}</p>
                    </div>
                    <Score value={o.opportunityScore} size={64} />
                  </div>

                  <dl className="mt-5 space-y-3 text-[15px] leading-snug">
                    <div>
                      <dt className="font-bold">Who it&apos;s for</dt>
                      <dd className="text-(--cl-ink-2)">{o.targetPersona}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">The problem</dt>
                      <dd className="text-(--cl-ink-2)">{o.coreProblem}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Competition</dt>
                      <dd className="text-(--cl-ink-2)">{o.competition}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Why it wins</dt>
                      <dd className="text-(--cl-ink-2)">{o.competitiveAdvantage}</dd>
                    </div>
                  </dl>

                  <ul className="mt-4 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {o.keyFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[15px] leading-snug">
                        <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-(--cl-green-text)" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <blockquote className="mt-4 rounded-2xl bg-(--cl-peach-tint) p-4 text-[15px] leading-relaxed">
                    <span className="font-bold">The evidence: </span>
                    {o.audienceEvidence}
                  </blockquote>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <ActionBar text="Happy with these three?" sub="Next, write the email that presents them.">
        <Link href={`/pitch/${creatorId}`} className="cl-btn cl-btn-green cl-btn-lg">
          Write the pitch <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </Link>
      </ActionBar>

      {zoom && (
        <Modal title={zoom.title} onClose={() => setZoom(null)} wide>
          <ProductSketch variant={opportunities.indexOf(zoom)} label={`${zoom.title} mockup`} />
        </Modal>
      )}
    </div>
  );
}
