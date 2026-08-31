import { resources } from "@/lib/data";

export const metadata = { title: "Resources — Travis Hatfield" };

export default function ResourcesPage() {
  const byCategory = resources.reduce<Record<string, typeof resources>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
        <p className="mt-2 text-muted">Templates and files, grouped by category.</p>
      </div>

      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">{category}</h2>
          <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
            {items.map((r) => (
              <a
                key={r.title}
                href={r.href}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
              >
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-muted">{r.description}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {r.fileType} · {r.size}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
