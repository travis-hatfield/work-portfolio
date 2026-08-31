import { CaseStudy } from "@/lib/data";

export default function CaseStudyList({ items }: { items: CaseStudy[] }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((c) => (
        <article key={c.slug} className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-medium">{c.title}</h2>
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
