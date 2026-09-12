import Link from "next/link";
import { headers } from "next/headers";
import { profile } from "@/lib/data";
import { siteFromHost } from "@/lib/sites";

const professionalLinks = [
  {
    href: "/resume",
    label: "Resume",
    desc: "Roles, dates, and a downloadable PDF.",
    icon: "📄",
  },
  {
    href: "/ai-assisted-projects",
    label: "AI-Assisted Projects",
    desc: "Internal tools I've built with Claude to run a People function.",
    icon: "🤖",
  },
  {
    href: "/personal-ai-projects",
    label: "Personal AI Projects",
    desc: "Independent builds and experiments, run outside of work.",
    icon: "🛠️",
  },
  {
    href: "/resources",
    label: "Resources",
    desc: "Templates and files worth sharing.",
    icon: "🗂️",
  },
];

export default async function Home() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));

  if (site === "personal") {
    return (
      <div className="flex flex-col gap-8">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-muted">Personal blog and projects.</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">{profile.blurb}</p>
        </section>
        <section>
          <Link
            href="/blog"
            className="inline-block rounded-lg border border-border bg-card px-5 py-2.5 font-medium hover:border-accent transition-colors"
          >
            Read the blog →
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-noise-fade -mx-6 -mt-8 rounded-b-2xl px-6 pb-8 pt-10 sm:-mx-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">People Operations &amp; AI</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
        <p className="mt-2 max-w-xl text-base text-muted">{profile.title}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">{profile.blurb}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumePdf}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Download resume ↓
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
          >
            {profile.email}
          </a>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {professionalLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <span className="text-xl">{l.icon}</span>
            <h2 className="mt-2 font-medium">
              {l.label}{" "}
              <span className="text-muted transition-transform inline-block group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted">{l.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
