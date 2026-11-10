import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tip } from "./_components/ui";

const groups = [
  {
    title: "Find creators",
    pages: [
      ["Today", "/overview", "What needs you, your goal and your streak"],
      ["Campaigns", "/campaigns", "Who to find and how many each week"],
      ["New campaign", "/campaigns/new", "One question at a time"],
      ["Creators", "/discovery", "Found, scored and queued automatically"],
      ["Outreach", "/outreach", "What's queued, what was sent and who replied"],
    ],
  },
  {
    title: "Win a creator",
    pages: [
      ["Replies", "/review-queue", "Review one creator at a time"],
      ["Audience research", "/research/c-1", "What their audience wants"],
      ["Product ideas", "/ideation/c-1", "The top 3 to build"],
      ["Pitch", "/pitch/c-1", "Edit, send and create the project"],
    ],
  },
  {
    title: "Run the project",
    pages: [
      ["Projects", "/projects", "Everything you're launching"],
      ["New project", "/projects/ratecraft?stage=new", "Review the plan, then Approve & Launch"],
      ["Project home", "/projects/ratecraft", "Validate, Build, Launch"],
      ["Edit landing page", "/projects/ratecraft/builder", "Change copy with a live preview"],
    ],
  },
  {
    title: "What others see",
    pages: [
      ["Creator's plan", "/portal/ratecraft", "The 14-day path, with posts ready to copy"],
      ["Public landing page", "/p/ratecraft", "Presale, waitlist and FAQ"],
      ["Creator sign-in", "/portal/login", "Email link, no password"],
      ["Team sign-in", "/login", "For the CoLaunch team"],
    ],
  },
];

export default function TestIndexPage() {
  return (
    <main className="mx-auto max-w-[880px] px-4 py-14 md:py-20">
      <h1 className="cl-serif text-[56px] leading-none md:text-[76px]">CoLaunch</h1>
      <div className="mb-12 mt-6">
        <Tip float>Sample data only. Click anything: nothing here sends emails or charges cards.</Tip>
      </div>

      <div className="space-y-11">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="cl-serif mb-4 text-[32px] leading-none">{g.title}</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {g.pages.map(([name, href, note]) => (
                <li key={href}>
                  <Link href={href} className="cl-tile flex h-full items-center justify-between gap-4 p-4">
                    <span className="min-w-0">
                      <span className="block text-[17px] font-bold">{name}</span>
                      <span className="block text-sm leading-snug text-(--cl-muted)">{note}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-(--cl-muted)" strokeWidth={2.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
