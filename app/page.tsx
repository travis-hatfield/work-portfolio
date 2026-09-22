import Link from "next/link";
import { headers } from "next/headers";
import { profile } from "@/lib/data";
import { siteFromHost } from "@/lib/sites";
import Reveal from "@/components/reveal";

const professionalLinks = [
  {
    href: "/resume",
    label: "Resume",
    desc: "Roles, dates, and a downloadable PDF.",
    number: "01",
  },
  {
    href: "/ai-assisted-projects",
    label: "AI-Assisted Projects",
    desc: "Internal tools I've built with Claude to run a People function.",
    number: "02",
  },
  {
    href: "/personal-ai-projects",
    label: "Personal AI Projects",
    desc: "Independent builds and experiments, run outside of work.",
    number: "03",
  },
  {
    href: "/resources",
    label: "Resources",
    desc: "Templates and files worth sharing.",
    number: "04",
  },
];

export default async function Home() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));

  if (site === "personal") {
    return (
      <div className="flex flex-col gap-8">
        <section>
          <h1 className="font-display text-4xl font-medium tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-muted">Personal blog and projects.</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">{profile.blurb}</p>
        </section>
        <section>
          <Link
            href="/blog"
            className="inline-block rounded-lg border border-border bg-card px-5 py-2.5 font-medium transition-colors hover:border-accent"
          >
            Read the blog →
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <section className="bg-noise-fade -mx-6 -mt-8 rounded-b-3xl px-6 pb-14 pt-14 sm:-mx-8 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            People Operations &amp; AI
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-4 max-w-xl text-lg text-muted">{profile.title}</p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {profile.blurb}
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.resumePdf}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-[0_0_24px_-4px_var(--color-accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_-2px_var(--color-accent)]"
            >
              Download resume ↓
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore</h2>
        </Reveal>
        <div className="mt-4 flex flex-col gap-3">
          {professionalLinks.map((l, i) => (
            <Reveal key={l.href} delay={i * 90}>
              <Link
                href={l.href}
                className="glow-ring group grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded-xl border border-border bg-card/60 px-5 py-6 backdrop-blur-sm transition-colors hover:bg-card sm:grid-cols-[3.5rem_1fr_auto]"
              >
                <span className="font-mono text-sm text-muted">{l.number}</span>
                <span>
                  <span className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {l.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{l.desc}</span>
                </span>
                <span
                  className="text-xl text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
