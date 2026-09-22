import Link from "next/link";
import ImageLightbox from "@/components/image-lightbox";

type Screenshot = { url: string; caption?: string };

type CaseStudyLike = {
  slug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  stats?: string | null;
  link_url?: string | null;
  screenshots?: (string | Screenshot)[];
};

function shotUrl(s: string | Screenshot): string {
  return typeof s === "string" ? s : s.url;
}

export default function CaseStudyList({
  items,
  basePath,
}: {
  items: CaseStudyLike[];
  basePath: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((c) => {
        const shots = c.screenshots ?? [];
        return (
          <article
            key={c.slug}
            className="grid grid-cols-1 gap-5 rounded-xl border border-border bg-card p-5 border-l-4 border-l-accent transition-shadow hover:shadow-sm lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 lg:p-6"
          >
            <div className="flex flex-col">
              <h2 className="text-lg font-medium">
                <Link href={c.link_url || `${basePath}/${c.slug}`} className="hover:text-accent transition-colors">
                  {c.title} <span aria-hidden="true">→</span>
                </Link>
              </h2>
              {c.stats && <p className="mt-1 text-xs text-muted">{c.stats}</p>}

              <dl className="mt-4 grid flex-1 grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {shots.length > 0 && (
              <div className="grid grid-cols-2 gap-2 content-start">
                {shots.slice(0, 4).map((s) => {
                  const url = shotUrl(s);
                  return (
                    <ImageLightbox
                      key={url}
                      src={url}
                      alt={`${c.title} screenshot`}
                      className="aspect-[16/10] w-full rounded-lg border border-border object-cover"
                    />
                  );
                })}
                {shots.length > 4 && (
                  <Link
                    href={c.link_url || `${basePath}/${c.slug}`}
                    className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-border text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    +{shots.length - 4} more
                  </Link>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
