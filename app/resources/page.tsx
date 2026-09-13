import { resources as staticResources } from "@/lib/data";
import { sql, ensureSchema, type ResourceRow } from "@/lib/db";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Resources — Travis Hatfield" };

type ResourceLike = {
  title: string;
  description: string;
  fileType: string;
  size: string;
  href: string;
  category: string;
};

export default async function ResourcesPage() {
  await ensureSchema();
  const dbResources = (await sql`
    SELECT * FROM resources ORDER BY category ASC, sort_order ASC, id ASC
  `) as unknown as ResourceRow[];

  const resources: ResourceLike[] =
    dbResources.length > 0
      ? dbResources.map((r) => ({
          title: r.title,
          description: r.description,
          fileType: r.file_type,
          size: r.size,
          href: r.href,
          category: r.category,
        }))
      : staticResources;

  const byCategory = resources.reduce<Record<string, ResourceLike[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <PageHero eyebrow="Grab and go" title="Resources" description="Templates and files, grouped by category." />

      {Object.entries(byCategory).map(([category, items], gi) => (
        <Reveal key={category} delay={gi * 90}>
          <h2 className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {category}
          </h2>
          <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
            {items.map((r) => (
              <a
                key={r.title}
                href={r.href}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-accent-soft"
              >
                <div>
                  <p className="font-medium transition-colors group-hover:text-accent">{r.title}</p>
                  <p className="text-sm text-muted">{r.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs font-medium text-accent">
                  {r.fileType} · {r.size}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
