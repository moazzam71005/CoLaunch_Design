"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Avatar, Field, Mascot, Modal, ProductSketch, Progress } from "../../_components/ui";
import { landing } from "../../_data/preview";

export default function TestPublicLandingPage() {
  const params = useParams();
  const slug = (params.slug as string) || "ratecraft";
  const productName = slug === "taxdeduct" ? "TaxDeduct" : "RateCraft";
  const { hero, mockups, problemSolution, creatorEndorsement, pricing, faq } = landing;
  const pct = Math.min(100, Math.round((hero.currentPresales / hero.presaleGoal) * 100));

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [waitlist, setWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [friction, setFriction] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<"checkout" | "waitlist" | null>(null);

  const finish = (kind: "checkout" | "waitlist") => (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(kind);
    }, 700);
  };
  const close = () => {
    setCheckout(false);
    setWaitlist(false);
    setSuccess(null);
  };

  return (
    <div>
      <nav className="sticky top-0 z-30 border-b-2 border-(--cl-line) bg-(--cl-paper)">
        <div className="mx-auto flex h-16 max-w-[1040px] items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-baseline gap-2.5">
            <span className="cl-serif text-[28px] leading-none">{productName}</span>
            <span className="hidden truncate text-sm text-(--cl-muted) sm:inline">with {creatorEndorsement.creatorName}</span>
          </div>
          <button type="button" onClick={() => setCheckout(true)} className="cl-btn cl-btn-primary cl-btn-sm shrink-0">
            Reserve your pass
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-[820px] px-4 pb-20 pt-16 text-center md:pt-24">
        <span className="text-[15px] font-bold text-(--cl-brand)">{hero.badge}</span>
        <h1 className="cl-serif mt-4 text-[56px] leading-[1.02] md:text-[88px]">{hero.headline}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-(--cl-ink-2)">{hero.subheadline}</p>

        <div className="cl-card mx-auto mt-9 max-w-[480px] p-5 text-left">
          <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <span className="cl-num text-[17px] font-bold">
              {hero.currentPresales} of {hero.presaleGoal} founders
            </span>
            <span className="text-[15px] font-semibold text-(--cl-brand-press)">
              {hero.presaleGoal - hero.currentPresales} spots left
            </span>
          </div>
          <Progress value={pct} height={16} label="Founder spots claimed" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => setCheckout(true)} className="cl-btn cl-btn-primary cl-btn-lg">
            {hero.ctaText} <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </button>
          <button type="button" onClick={() => setWaitlist(true)} className="cl-btn cl-btn-quiet cl-btn-lg">
            Join the waitlist
          </button>
        </div>
        <p className="mt-5 text-[15px] text-(--cl-muted)">Full refund if we don&apos;t reach the goal.</p>
      </header>

      {/* Product */}
      <section className="bg-(--cl-cream) px-4 py-24">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="cl-serif text-center text-[48px] leading-[1.05] md:text-[64px]">{mockups.title}</h2>
          <p className="mt-3 text-center text-[18px] text-(--cl-ink-2)">{mockups.subtitle}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {mockups.images.map((m, i) => (
              <button key={m.tag} type="button" onClick={() => setZoom(i)} className="cl-tile cursor-zoom-in p-4 text-left">
                <ProductSketch variant={i} label={`${m.tag} screen`} />
                <div className="mt-3 text-[18px] font-bold">{m.tag}</div>
                <p className="mt-0.5 text-[15px] leading-snug text-(--cl-ink-2)">{m.caption}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Problems: dark ink band, as on co-launch.app */}
      <section className="bg-(--cl-ink) px-4 py-24 text-white">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="cl-serif text-[48px] leading-[1.05] md:text-[64px]">{problemSolution.title}</h2>
          <p className="mt-3 text-[18px] text-[oklch(85%_0.01_80)]">{problemSolution.subtitle}</p>
          <ol className="mt-12 divide-y divide-[oklch(100%_0_0/0.15)]">
            {problemSolution.pairs.map((p, i) => (
              <li key={p.stat} className="grid gap-4 py-8 md:grid-cols-[60px_1fr_1fr_190px] md:gap-8">
                <span className="cl-serif cl-num text-[44px] leading-none text-(--cl-peach)">{i + 1}</span>
                <p className="text-[18px] leading-snug text-[oklch(80%_0.01_80)]">{p.problem}</p>
                <p className="text-[18px] font-semibold leading-snug">{p.solution}</p>
                <p className="cl-serif text-[26px] leading-tight text-(--cl-peach)">{p.stat}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Creator */}
      <section className="px-4 py-24">
        <figure className="mx-auto max-w-[820px]">
          <blockquote className="cl-serif text-[36px] leading-[1.2] md:text-[46px]">{creatorEndorsement.quote}</blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Avatar name={creatorEndorsement.creatorName} size={60} />
            <div>
              <div className="text-[18px] font-bold">{creatorEndorsement.creatorName}</div>
              <div className="text-[15px] text-(--cl-muted)">{creatorEndorsement.roleTitle}</div>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* Pricing */}
      <section className="bg-(--cl-peach-tint) px-4 py-24">
        <div className="mx-auto max-w-[560px]">
          <h2 className="cl-serif text-center text-[48px] leading-[1.05] md:text-[60px]">One price. Yours for life.</h2>
          <div className="mt-10 rounded-[24px] border-2 border-b-[6px] border-(--cl-ink) bg-(--cl-card) p-7 md:p-9">
            <div className="text-[15px] font-bold text-(--cl-brand)">{pricing.tierName}</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="cl-serif cl-num text-[84px] leading-none">{pricing.priceFormatted}</span>
              <span className="text-[18px] text-(--cl-muted) line-through">{pricing.originalPriceFormatted}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {pricing.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--cl-green) text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={4} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setCheckout(true)} className="cl-btn cl-btn-primary cl-btn-lg mt-7 w-full">
              Claim your Founder Pass
            </button>
            <p className="mt-4 text-center text-sm leading-snug text-(--cl-muted)">{pricing.guaranteeText}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-[720px]">
          <h2 className="cl-serif text-center text-[48px] leading-none md:text-[60px]">FAQ</h2>
          <ul className="mt-10 divide-y-2 divide-(--cl-line) border-y-2 border-(--cl-line)">
            {faq.map((f, i) => {
              const open = openFaq === i;
              return (
                <li key={f.question}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[18px] font-bold"
                  >
                    {f.question}
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.5} />
                  </button>
                  {open && <p className="cl-rise pb-5 text-[16px] leading-relaxed text-(--cl-ink-2)">{f.answer}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <footer className="border-t-2 border-(--cl-line) px-4 py-8 text-[15px] text-(--cl-muted)">
        <div className="mx-auto flex max-w-[1040px] flex-col justify-between gap-3 sm:flex-row">
          <span>{creatorEndorsement.whyBuilt}</span>
          <span className="flex gap-5">
            <span>Terms</span>
            <span>Privacy</span>
          </span>
        </div>
      </footer>

      {zoom !== null && (
        <Modal title={mockups.images[zoom].tag} sub={mockups.images[zoom].caption} onClose={() => setZoom(null)} wide>
          <ProductSketch variant={zoom} label={`${mockups.images[zoom].tag} screen`} />
        </Modal>
      )}

      {checkout && (
        <Modal title={success ? "You're in!" : `Reserve your pass, ${pricing.priceFormatted}`} sub={success ? undefined : "Includes all founder perks and the private beta."} onClose={close}>
          {success ? (
            <div className="cl-pop flex flex-col items-center py-4 text-center">
              <Mascot size={84} mood="cheer" bob />
              <p className="mt-4 text-[16px] leading-relaxed text-(--cl-ink-2)">
                Your receipt and beta invite are on the way to <span className="font-bold text-(--cl-ink)">{email}</span>.
              </p>
              <button type="button" onClick={close} className="cl-btn cl-btn-primary mt-6">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={finish("checkout")} className="space-y-5">
              <dl className="rounded-2xl bg-(--cl-cream) p-4 text-[15px]">
                <div className="flex justify-between">
                  <dt className="text-(--cl-muted)">Founder Pass</dt>
                  <dd className="cl-num">$349</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-(--cl-muted)">Founder discount</dt>
                  <dd className="cl-num text-(--cl-green-text)">-$150</dd>
                </div>
                <div className="mt-2 flex justify-between border-t-2 border-(--cl-line) pt-2 font-bold">
                  <dt>Due today</dt>
                  <dd className="cl-num">{pricing.priceFormatted}</dd>
                </div>
              </dl>
              <Field label="Email" hint="We'll send your receipt and beta invite here.">
                <input type="email" required autoComplete="email" className="cl-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <button type="submit" disabled={busy} className="cl-btn cl-btn-primary cl-btn-lg w-full">
                {busy ? "Reserving..." : `Pay ${pricing.priceFormatted} with Stripe`}
              </button>
              <p className="text-center text-sm text-(--cl-muted)">Refunded automatically if the goal isn&apos;t reached.</p>
            </form>
          )}
        </Modal>
      )}

      {waitlist && (
        <Modal title={success ? "You're on the list!" : "Join the waitlist"} sub={success ? undefined : "We'll email you when it opens to everyone."} onClose={close}>
          {success ? (
            <div className="cl-pop flex flex-col items-center py-4 text-center">
              <Mascot size={84} mood="cheer" bob />
              <button type="button" onClick={close} className="cl-btn cl-btn-primary mt-6">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={finish("waitlist")} className="space-y-5">
              <Field label="Email">
                <input type="email" required autoComplete="email" className="cl-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field label="What's the hardest part of pricing client work?">
                <textarea rows={3} className="cl-input" value={friction} onChange={(e) => setFriction(e.target.value)} />
              </Field>
              <button type="submit" disabled={busy} className="cl-btn cl-btn-primary w-full">
                {busy ? "Joining..." : "Join the waitlist"}
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
