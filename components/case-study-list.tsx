import Link from "next/link";
import ImageLightbox from "@/components/image-lightbox";

type Screenshot = { url: string; caption?: string };

type CaseStudyLike = {
  slug: string;
  title: string;
  listSummary?: string;
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
      {items.map((c) => {
        const shots = c.screenshots ?? [];
        const href = c.link_url || `${basePath}/${c.slug}`;
        return (
          <article
            key={c.slug}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 border-l-4 border-l-accent transition-shadow hover:shadow-sm lg:p-6"
          >
            <div>
              <h2 className="text-lg font-medium">
                <Link href={href} className="hover:text-accent transition-colors">
                  {c.title} <span aria-hidden="true">→</span>
                </Link>
              </h2>
              {c.stats && <p className="mt-1 text-xs text-muted">{c.stats}</p>}
              <p className="mt-3 leading-relaxed text-foreground/90">
                {c.listSummary || c.outcome}
              </p>
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
              <div className="grid grid-cols-2 gap-3">
                {shots.slice(0, 2).map((s) => {
                  const url = shotUrl(s);
                  return <ImageLightbox key={url} src={url} alt={`${c.title} screenshot`} />;
                })}
              </div>
            )}

            <Link
              href={href}
              className="mt-1 text-sm font-medium text-accent hover:underline"
            >
              See the full write-up and all screenshots →
            </Link>
          </article>
        );
      })}
    </div>
  );
}
