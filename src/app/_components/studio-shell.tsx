"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, House, Inbox, Rocket, Search, Send } from "lucide-react";
import { Avatar } from "./ui";

const nav = [
  { name: "Today", href: "/overview", icon: House },
  { name: "Campaigns", href: "/campaigns", icon: Rocket },
  { name: "Creators", href: "/discovery", icon: Search },
  { name: "Outreach", href: "/outreach", icon: Send },
  { name: "Replies", href: "/review-queue", icon: Inbox, count: 3, also: ["/research", "/ideation", "/pitch"] },
  { name: "Projects", href: "/projects", icon: FolderKanban },
];

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (item: (typeof nav)[number]) =>
    pathname.startsWith(item.href) || (item.also ?? []).some((p) => pathname.startsWith(p));

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r-2 border-(--cl-line) px-3 py-6 md:flex">
        <Link href="/" className="mb-8 px-3">
          <span className="cl-serif text-[30px] leading-none">CoLaunch</span>
        </Link>

        <nav aria-label="Studio" className="flex flex-col gap-1.5">
          {nav.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-12 items-center gap-3 rounded-[14px] border-2 px-3 text-[16px] font-bold ${
                  active
                    ? "border-(--cl-brand-line) bg-(--cl-brand-tint) text-(--cl-brand-press)"
                    : "border-transparent text-(--cl-ink-2) hover:bg-(--cl-cream)"
                }`}
              >
                <Icon className="h-[22px] w-[22px] shrink-0" strokeWidth={2.25} />
                <span className="flex-1">{item.name}</span>
                {item.count ? (
                  <span className="cl-num flex h-6 min-w-6 items-center justify-center rounded-full bg-(--cl-brand) px-1.5 text-[13px] font-bold text-white">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 px-3 py-2">
          <Avatar name="Hyejee Bae" size={38} />
          <div className="leading-tight">
            <div className="text-[15px] font-bold">Hyejee Bae</div>
            <div className="text-[13px] text-(--cl-muted)">Admin</div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Phone: logo on top, tabs along the bottom */}
        <header className="flex items-center border-b-2 border-(--cl-line) px-4 py-3 md:hidden">
          <Link href="/" className="cl-serif text-[26px] leading-none">
            CoLaunch
          </Link>
        </header>
        <main className="w-full flex-1 px-4 pb-24 pt-7 md:px-10 md:pb-0 md:pt-10">{children}</main>
        <nav
          aria-label="Studio"
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t-2 border-(--cl-line) bg-(--cl-paper) md:hidden"
        >
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-14 items-center justify-center ${
                  active ? "text-(--cl-brand)" : "text-(--cl-muted)"
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={2.25} />
                {item.count ? (
                  <span className="cl-num absolute right-2 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-(--cl-brand) px-1 text-[11px] font-bold text-white">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
