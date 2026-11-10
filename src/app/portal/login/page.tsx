"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Mascot } from "../../_components/ui";

export default function TestPortalLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {sent ? (
          <div className="cl-pop flex flex-col items-center text-center">
            <Mascot size={92} mood="cheer" bob />
            <h1 className="cl-serif mt-4 text-[48px] leading-none">Check your inbox</h1>
            <p className="mt-3 text-[17px] leading-snug text-(--cl-ink-2)">
              We sent a sign-in link to <span className="font-bold text-(--cl-ink)">{email}</span>. Click it and you&apos;re in.
            </p>
            <Link href="/portal/ratecraft" className="cl-btn cl-btn-quiet mt-7">
              Preview the creator view
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-7 flex flex-col items-center text-center">
              <Mascot size={84} />
              <h1 className="cl-serif mt-4 text-[48px] leading-none">Hi there!</h1>
              <p className="mt-2 text-[17px] text-(--cl-ink-2)">No password needed. We&apos;ll email you a link.</p>
            </div>
            <form onSubmit={submit} className="space-y-5">
              <Field label="Your email">
                <input type="email" required autoComplete="email" placeholder="you@example.com" className="cl-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <button type="submit" disabled={loading} className="cl-btn cl-btn-primary cl-btn-lg w-full">
                {loading ? "Sending..." : "Email me a link"}
              </button>
            </form>
            <p className="mt-7 text-center text-[15px] text-(--cl-muted)">
              <Link href="/login" className="font-bold underline underline-offset-4">
                CoLaunch team sign-in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
