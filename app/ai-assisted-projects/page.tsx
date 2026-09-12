import { aiAssistedProjects } from "@/lib/data";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";
import CaseStudyList from "@/components/case-study-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI-Assisted Projects — Travis Hatfield" };

export default async function AiAssistedProjectsPage() {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM case_studies WHERE section = 'ai-assisted' ORDER BY sort_order ASC, id ASC
  `) as unknown as CaseStudyRow[];
  const items = rows.length > 0 ? rows : aiAssistedProjects;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI-Assisted Projects</h1>
        <p className="mt-2 text-muted">Work done using AI tooling to ship faster or better — problem, approach, outcome.</p>
      </div>
      <CaseStudyList items={items} />
    </div>
  );
}
