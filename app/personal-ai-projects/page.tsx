import { personalAiProjects } from "@/lib/data";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";
import CaseStudyList from "@/components/case-study-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "Personal AI Projects — Travis Hatfield" };

export default async function PersonalAiProjectsPage() {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM case_studies WHERE section = 'personal-ai' ORDER BY sort_order ASC, id ASC
  `) as unknown as CaseStudyRow[];
  const items = rows.length > 0 ? rows : personalAiProjects;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Personal AI Projects</h1>
        <p className="mt-2 text-muted">Independent builds and experiments, run outside of work.</p>
      </div>
      <CaseStudyList items={items} />
    </div>
  );
}
