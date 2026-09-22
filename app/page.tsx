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
  },
  {
    href: "/ai-assisted-projects",
    label: "AI-Assisted Projects",
    desc: "Internal tools I've built with Claude to run a People function.",
  },
  {
    href: "/personal-ai-projects",
    label: "Personal AI Projects",
    desc: "Independent builds and experiments, run outside of work.",
  },
  {
    href: "/resources",
    label: "Resources",
    desc: "Templates and files worth sharing.",
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
    <div className="flex flex-col gap-20">
      <section className="bg-noise-fade -mx-6 -mt-8 px-6 pb-16 pt-16 sm:-mx-8 sm:px-8 md:pt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              People Operations &amp; AI
            </p>
            <h1 className="mt-5 font-display text-[13vw] font-normal leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
              {profile.name.split(" ")[0]}
              <br />
              <span className="text-muted">{profile.name.split(" ").slice(1).join(" ")}</span>
            </h1>
          </Reveal>
          <div className="max-w-sm md:pb-2 md:text-right">
            <p className="text-base text-foreground/70">{profile.title}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-[2fr_1fr]">
          <p className="max-w-xl text-base leading-relaxed text-foreground/80">{profile.blurb}</p>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href={profile.resumePdf}
              className="text-sm font-medium text-foreground underline decoration-accent-2 decoration-2 underline-offset-4 transition-colors hover:text-accent-2"
            >
              Download résumé
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {professionalLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-normal tracking-tight transition-colors group-hover:text-accent-2 sm:text-3xl">
                  {l.label}
                </span>
              </div>
              <span className="pl-8 text-sm text-muted sm:pl-0 sm:text-right">{l.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
