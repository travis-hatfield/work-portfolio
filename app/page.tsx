import Link from "next/link";
import { profile } from "@/lib/data";
import Reveal from "@/components/reveal";
import GlowCard from "@/components/glow-card";
import HeroStatus from "@/components/hero-status";

const links = [
  {
    href: "/resume",
    label: "Resume",
    desc: "Roles, dates, and a downloadable PDF.",
    icon: "▤",
  },
  {
    href: "/ai-assisted-projects",
    label: "AI-Assisted Projects",
    desc: "Internal tools I've built with Claude to run a People function.",
    icon: "◆",
  },
  {
    href: "/personal-ai-projects",
    label: "Personal AI Projects",
    desc: "Independent builds and experiments, run outside of work.",
    icon: "◇",
  },
  {
    href: "/resources",
    label: "Resources",
    desc: "Templates and files worth sharing.",
    icon: "▥",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="-mx-6 -mt-8 flex flex-col gap-5 rounded-b-2xl px-6 pb-10 pt-14 sm:-mx-8 sm:px-8 sm:pt-20">
        <Reveal>
          <HeroStatus />
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="max-w-xl text-base text-muted sm:text-lg">{profile.title}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-2xl leading-relaxed text-foreground/85">{profile.blurb}</p>
        </Reveal>
        <Reveal delay={260} className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={profile.resumePdf}
            className="group relative overflow-hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Download resume ↓</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
          >
            {profile.email}
          </a>
        </Reveal>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {links.map((l, i) => (
          <Reveal key={l.href} delay={i * 70}>
            <GlowCard as="article" className="h-full rounded-xl border border-border bg-card">
              <Link
                href={l.href}
                className="group relative z-10 flex h-full flex-col gap-2 rounded-xl p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="font-mono text-lg text-accent">{l.icon}</span>
                <h2 className="font-medium">
                  {l.label}{" "}
                  <span
                    className="inline-block text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </h2>
                <p className="text-sm text-muted">{l.desc}</p>
              </Link>
            </GlowCard>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
