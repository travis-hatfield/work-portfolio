import Link from "next/link";
import ImageLightbox from "@/components/image-lightbox";

type Screenshot = { url: string; caption?: string };

type CaseStudyLike = {
  slug: string;
  title: string;
  problem: string;
  capabilities: string;
  methodology: string;
  outcome: string;
  tools: string[];
  stats?: string | null;
  link_url?: string | null;
  screenshots?: (string | Screenshot)[];
};

function normalizeShots(screenshots?: (string | Screenshot)[]): Screenshot[] {
  if (!screenshots) return [];
  return screenshots.map((s) => (typeof s === "string" ? { url: s } : s));
}

export default function CaseStudyDetail({
  item,
  basePath,
  basePathLabel,
}: {
  item: CaseStudyLike;
  basePath: string;
  basePathLabel: string;
}) {
  const shots = normalizeShots(item.screenshots);
  const hero = shots[0];
  const rest = shots.slice(1);

  const sections = [
    { id: "problem", label: "The problem", body: item.problem },
    { id: "capabilities", label: "What it does", body: item.capabilities },
    { id: "methodology", label: "Design & technical approach", body: item.methodology },
    { id: "outcome", label: "Outcome & impact", body: item.outcome },
  ];

  return (
    <div className="wide flex flex-col gap-10">
      <div>
        <Link href={basePath} className="text-sm text-muted hover:text-accent transition-colors">
          ← Back to {basePathLabel}
        </Link>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="max-w-2xl font-display text-2xl font-medium tracking-tight lg:text-3xl">{item.title}</h1>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm shrink-0">
            {item.stats && (
              <>
                <dt className="text-muted">Status</dt>
                <dd className="text-foreground/90">{item.stats}</dd>
              </>
            )}
            <dt className="text-muted self-start">Stack</dt>
            <dd className="flex flex-wrap gap-1.5">
              {item.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {t}
                </span>
              ))}
            </dd>
          </dl>
        </div>
      </div>

      {hero && (
        <figure>
          <ImageLightbox
            src={hero.url}
            alt={hero.caption || `${item.title} screenshot`}
            caption={hero.caption}
            className="w-full"
          />
        </figure>
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
        <nav className="hidden md:block sticky top-24 self-start space-y-1 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded-md px-2 py-1 text-muted hover:bg-accent-soft hover:text-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
          {rest.length > 0 && (
            <a
              href="#more-screens"
              className="block rounded-md px-2 py-1 text-muted hover:bg-accent-soft hover:text-accent transition-colors"
            >
              Every screen
            </a>
          )}
        </nav>

        <div className="flex flex-col gap-10">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="grid grid-cols-1 gap-3 border-b border-border pb-10 last:border-b-0 last:pb-0 md:grid-cols-[120px_1fr] md:gap-8"
            >
              <h2 className="text-xs font-semibold uppercase tracking-wide text-accent md:pt-0.5">
                {String(i + 1).padStart(2, "0")} — {s.label}
              </h2>
              <p className="max-w-[68ch] leading-relaxed text-foreground/90">{s.body}</p>
            </div>
          ))}

          {rest.length > 0 && (
            <div id="more-screens" className="flex flex-col gap-4 pt-2">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">Every screen, explained</h2>
              <p className="max-w-[68ch] text-sm text-muted">
                A closer look at each part of the app, in the order you'd actually move through it.
              </p>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {rest.map((shot) => (
                  <ImageLightbox
                    key={shot.url}
                    src={shot.url}
                    alt={shot.caption || `${item.title} screenshot`}
                    caption={shot.caption}
                  />
                ))}
              </div>
            </div>
          )}

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
      </div>
    </div>
  );
}
