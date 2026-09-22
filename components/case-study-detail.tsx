import Link from "next/link";
import ImageLightbox from "@/components/image-lightbox";

type CaseStudyLike = {
  slug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  stats?: string | null;
  link_url?: string | null;
  screenshots?: string[];
};

export default function CaseStudyDetail({
  item,
  basePath,
  basePathLabel,
}: {
  item: CaseStudyLike;
  basePath: string;
  basePathLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={basePath} className="text-sm text-muted hover:text-accent transition-colors">
          ← Back to {basePathLabel}
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h1>
        {item.stats && <p className="mt-1.5 text-sm text-muted">{item.stats}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tools.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {item.screenshots && item.screenshots.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {item.screenshots.map((url) => (
            <ImageLightbox
              key={url}
              src={url}
              alt={`${item.title} screenshot`}
              className="aspect-video w-full rounded-lg border border-border object-cover"
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">Problem</h2>
          <p className="mt-1.5 leading-relaxed text-foreground/90">{item.problem}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">Approach</h2>
          <p className="mt-1.5 leading-relaxed text-foreground/90">{item.approach}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">Outcome</h2>
          <p className="mt-1.5 leading-relaxed text-foreground/90">{item.outcome}</p>
        </div>
      </div>

      {item.link_url && (
        <a
          href={item.link_url}
          className="text-sm text-accent hover:underline"
          target={item.link_url.startsWith("http") ? "_blank" : undefined}
          rel={item.link_url.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          Full write-up →
        </a>
      )}
    </div>
  );
}
