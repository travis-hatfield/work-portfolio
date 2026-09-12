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
    <div className="flex flex-col gap-5">
      {items.map((c) => (
        <article key={c.slug} className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-medium">
            {c.link_url ? (
              <Link href={c.link_url} className="hover:underline">
                {c.title} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              c.title
            )}
          </h2>

          {c.screenshots && c.screenshots.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {c.screenshots.map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={url}
                  src={url}
                  alt={`${c.title} screenshot`}
                  className="aspect-video w-full rounded-md border border-border object-cover"
                />
              ))}
            </div>
          )}

          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted">Problem</dt>
              <dd className="mt-1 text-foreground/90">{c.problem}</dd>
            </div>
            <div>
              <dt className="text-muted">Approach</dt>
              <dd className="mt-1 text-foreground/90">{c.approach}</dd>
            </div>
            <div>
              <dt className="text-muted">Outcome</dt>
              <dd className="mt-1 text-foreground/90">{c.outcome}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.tools.map((t) => (
              <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
