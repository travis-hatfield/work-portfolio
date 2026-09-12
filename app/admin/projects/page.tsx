import Link from "next/link";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";

export const dynamic = "force-dynamic";

const sectionLabel: Record<CaseStudyRow["section"], string> = {
  "ai-assisted": "AI-Assisted",
  "personal-ai": "Personal AI",
};

export default async function AdminProjectsPage() {
  await ensureSchema();
  const projects = (await sql`
    SELECT * FROM case_studies ORDER BY section ASC, sort_order ASC, id ASC
  `) as unknown as CaseStudyRow[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-foreground/[0.03]"
        >
          + Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet. Add your first one.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
            >
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-muted">{sectionLabel[p.section]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
