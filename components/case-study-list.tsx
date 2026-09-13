import Link from "next/link";
import Reveal from "@/components/reveal";
import GlowCard from "@/components/glow-card";

type CaseStudyLike = {
  slug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  link_url?: string | null;
  screenshots?: string[];
};

export default function CaseStudyList({ items }: { items: CaseStudyLike[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((c, i) => (
        <Reveal key={c.slug} delay={i * 90}>
          <GlowCard
            as="article"
            className="rounded-xl border border-border bg-card p-5 border-l-2 border-l-accent"
          >
            <h2 className="text-lg font-medium">
              {c.link_url ? (
                <Link href={c.link_url} className="hover:text-accent transition-colors">
                  {c.title} <span aria-hidden="true">→</span>
                </Link>
              ) : (
                c.title
              )}
            </h2>

            {c.screenshots && c.screenshots.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {c.screenshots.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={url}
                    src={url}
                    alt={`${c.title} screenshot`}
                    className="aspect-video w-full rounded-lg border border-border object-cover"
                  />
                ))}
              </div>
            )}

            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">Problem</dt>
                <dd className="mt-1.5 leading-relaxed text-foreground/85">{c.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">Approach</dt>
                <dd className="mt-1.5 leading-relaxed text-foreground/85">{c.approach}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">Outcome</dt>
                <dd className="mt-1.5 leading-relaxed text-foreground/85">{c.outcome}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlowCard>
        </Reveal>
      ))}
    </div>
  );
}
