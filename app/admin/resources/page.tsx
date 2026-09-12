import Link from "next/link";
import { sql, ensureSchema, type ResourceRow } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  await ensureSchema();
  const resources = (await sql`
    SELECT * FROM resources ORDER BY category ASC, sort_order ASC, id ASC
  `) as unknown as ResourceRow[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-foreground/[0.03]"
        >
          + Add Resource
        </Link>
      </div>

      {resources.length === 0 ? (
        <p className="text-muted">No resources yet. Add your first one.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={`/admin/resources/${r.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
            >
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-muted">
                  {r.category} · {r.file_type} {r.size && `· ${r.size}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
