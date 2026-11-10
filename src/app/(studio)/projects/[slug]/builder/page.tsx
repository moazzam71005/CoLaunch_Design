"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, ExternalLink } from "lucide-react";
import { BackLink, Field, Filters, PageHead, useToast } from "../../../../_components/ui";
import { landing } from "../../../../_data/preview";

type Tab = "hero" | "pricing" | "problems" | "creator" | "faq";

export default function TestBuilderPage() {
  const params = useParams();
  const slug = (params.slug as string) || "ratecraft";
  const [tab, setTab] = useState<Tab>("hero");
  const [content, setContent] = useState(landing);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const { toast, toastNode } = useToast();

  const update = (next: typeof landing) => {
    setContent(next);
    setDirty(true);
  };
  const setHero = (patch: Partial<typeof landing.hero>) => update({ ...content, hero: { ...content.hero, ...patch } });
  const setPricing = (patch: Partial<typeof landing.pricing>) => update({ ...content, pricing: { ...content.pricing, ...patch } });
  const setCreator = (patch: Partial<typeof landing.creatorEndorsement>) =>
    update({ ...content, creatorEndorsement: { ...content.creatorEndorsement, ...patch } });

  const setPair = (i: number, patch: Partial<(typeof landing.problemSolution.pairs)[number]>) =>
    update({
      ...content,
      problemSolution: {
        ...content.problemSolution,
        pairs: content.problemSolution.pairs.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
      },
    });

  const setFaq = (i: number, patch: Partial<(typeof landing.faq)[number]>) =>
    update({ ...content, faq: content.faq.map((f, idx) => (idx === i ? { ...f, ...patch } : f)) });

  const publish = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      toast("Your changes are live.");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1160px] pb-12">
      {toastNode}
      <BackLink href={`/projects/${slug}`}>Back to project</BackLink>
      <PageHead
        title="Edit landing page"
        sub={`co-launch.app/p/${slug}`}
        actions={
          <>
            <Link href={`/p/${slug}`} target="_blank" className="cl-btn cl-btn-quiet">
              View page <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <button type="button" disabled={saving || !dirty} onClick={publish} className="cl-btn cl-btn-green">
              {!dirty && !saving && <Check className="h-5 w-5" strokeWidth={3} />}
              {saving ? "Publishing..." : dirty ? "Publish changes" : "Published"}
            </button>
          </>
        }
      />

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Filters<Tab>
            label="Page section"
            value={tab}
            onChange={setTab}
            options={[
              { id: "hero", label: "Top" },
              { id: "pricing", label: "Pricing" },
              { id: "problems", label: "Problems" },
              { id: "creator", label: "Creator" },
              { id: "faq", label: "FAQ" },
            ]}
          />

          <div className="mt-5 space-y-5">
            {tab === "hero" && (
              <>
                <Field label="Small label">
                  <input className="cl-input" value={content.hero.badge} onChange={(e) => setHero({ badge: e.target.value })} />
                </Field>
                <Field label="Headline">
                  <textarea rows={2} className="cl-input" value={content.hero.headline} onChange={(e) => setHero({ headline: e.target.value })} />
                </Field>
                <Field label="Subheadline">
                  <textarea rows={3} className="cl-input" value={content.hero.subheadline} onChange={(e) => setHero({ subheadline: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Button text">
                    <input className="cl-input" value={content.hero.ctaText} onChange={(e) => setHero({ ctaText: e.target.value })} />
                  </Field>
                  <Field label="Founder spots">
                    <input type="number" className="cl-input cl-num" value={content.hero.presaleGoal} onChange={(e) => setHero({ presaleGoal: Number(e.target.value) })} />
                  </Field>
                </div>
              </>
            )}

            {tab === "pricing" && (
              <>
                <Field label="Plan name">
                  <input className="cl-input" value={content.pricing.tierName} onChange={(e) => setPricing({ tierName: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price">
                    <input className="cl-input cl-num" value={content.pricing.priceFormatted} onChange={(e) => setPricing({ priceFormatted: e.target.value })} />
                  </Field>
                  <Field label="Regular price">
                    <input className="cl-input cl-num" value={content.pricing.originalPriceFormatted} onChange={(e) => setPricing({ originalPriceFormatted: e.target.value })} />
                  </Field>
                </div>
                <Field label="Guarantee">
                  <textarea rows={3} className="cl-input" value={content.pricing.guaranteeText} onChange={(e) => setPricing({ guaranteeText: e.target.value })} />
                </Field>
              </>
            )}

            {tab === "problems" &&
              content.problemSolution.pairs.map((p, i) => (
                <div key={i} className="cl-card space-y-4 p-5">
                  <Field label={`Problem ${i + 1}`}>
                    <textarea rows={2} className="cl-input" value={p.problem} onChange={(e) => setPair(i, { problem: e.target.value })} />
                  </Field>
                  <Field label="How we solve it">
                    <textarea rows={2} className="cl-input" value={p.solution} onChange={(e) => setPair(i, { solution: e.target.value })} />
                  </Field>
                </div>
              ))}

            {tab === "creator" && (
              <>
                <Field label={`What ${content.creatorEndorsement.creatorName.split(" ")[0]} says`}>
                  <textarea rows={5} className="cl-input" value={content.creatorEndorsement.quote} onChange={(e) => setCreator({ quote: e.target.value })} />
                </Field>
                <Field label="Title and audience">
                  <input className="cl-input" value={content.creatorEndorsement.roleTitle} onChange={(e) => setCreator({ roleTitle: e.target.value })} />
                </Field>
              </>
            )}

            {tab === "faq" &&
              content.faq.map((f, i) => (
                <div key={i} className="cl-card space-y-4 p-5">
                  <Field label={`Question ${i + 1}`}>
                    <input className="cl-input" value={f.question} onChange={(e) => setFaq(i, { question: e.target.value })} />
                  </Field>
                  <Field label="Answer">
                    <textarea rows={3} className="cl-input" value={f.answer} onChange={(e) => setFaq(i, { answer: e.target.value })} />
                  </Field>
                </div>
              ))}
          </div>
        </div>

        <section aria-label="Live preview" className="lg:sticky lg:top-8">
          <div className="overflow-hidden rounded-[18px] border-2 border-(--cl-line-strong)">
            <div className="border-b-2 border-(--cl-line) bg-(--cl-cream) px-4 py-2.5 text-center text-[13px] font-semibold text-(--cl-muted)">
              co-launch.app/p/{slug}
            </div>
            <div className="max-h-[72vh] space-y-8 overflow-y-auto bg-(--cl-paper) p-7">
              <div className="text-center">
                <span className="text-sm font-bold text-(--cl-brand)">{content.hero.badge}</span>
                <h2 className="cl-serif mt-2 text-[40px] leading-[1.05]">{content.hero.headline}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-(--cl-ink-2)">{content.hero.subheadline}</p>
                <span className="cl-btn cl-btn-primary mt-5 pointer-events-none">{content.hero.ctaText}</span>
              </div>

              <div className="space-y-2.5">
                {content.problemSolution.pairs.map((p, i) => (
                  <div key={i} className="rounded-2xl bg-(--cl-cream) p-4 text-[15px] leading-snug">
                    <p className="text-(--cl-muted)">{p.problem}</p>
                    <p className="mt-1 font-bold">{p.solution}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-(--cl-peach-tint) p-5">
                <p className="cl-serif text-[22px] leading-snug">{content.creatorEndorsement.quote}</p>
                <p className="mt-2 text-sm font-semibold">
                  {content.creatorEndorsement.creatorName}, {content.creatorEndorsement.roleTitle}
                </p>
              </div>

              <div className="cl-card p-5">
                <div className="text-sm font-bold text-(--cl-brand)">{content.pricing.tierName}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="cl-serif cl-num text-[48px] leading-none">{content.pricing.priceFormatted}</span>
                  <span className="text-[15px] text-(--cl-muted) line-through">{content.pricing.originalPriceFormatted}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-[15px]">
                  {content.pricing.perks.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-(--cl-green-text)" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-(--cl-muted)">{content.pricing.guaranteeText}</p>
              </div>

              <div className="space-y-2">
                {content.faq.slice(0, 3).map((f, i) => (
                  <div key={i}>
                    <p className="text-[15px] font-bold">{f.question}</p>
                    <p className="text-sm text-(--cl-muted)">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
