import Link from "next/link";

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
    <div className="flex flex-col gap-6">
      {items.map((c) => (
        <article
          key={c.slug}
          className="rounded-xl border border-border bg-card p-6 border-l-4 border-l-accent transition-shadow hover:shadow-sm"
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

          <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Problem</dt>
              <dd className="mt-1.5 leading-relaxed text-foreground/90">{c.problem}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Approach</dt>
              <dd className="mt-1.5 leading-relaxed text-foreground/90">{c.approach}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-accent">Outcome</dt>
              <dd className="mt-1.5 leading-relaxed text-foreground/90">{c.outcome}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.tools.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
