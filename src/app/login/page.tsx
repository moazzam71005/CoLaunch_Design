"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field, Mascot } from "../_components/ui";

export default function TestLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("hyejee@co-launch.app");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/overview"), 600);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <Mascot size={84} />
          <h1 className="cl-serif mt-4 text-[48px] leading-none">Welcome back</h1>
          <p className="mt-2 text-[17px] text-(--cl-ink-2)">Sign in to CoLaunch.</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Field label="Email">
            <input type="email" required autoComplete="email" className="cl-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Password">
            <input type="password" required autoComplete="current-password" className="cl-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <button type="submit" disabled={loading} className="cl-btn cl-btn-primary cl-btn-lg w-full">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-7 text-center text-[15px] text-(--cl-muted)">
          Working with us as a creator?{" "}
          <Link href="/portal/login" className="font-bold text-(--cl-brand) underline underline-offset-4">
            Get a sign-in link
          </Link>
        </p>
      </div>
    </main>
  );
}
