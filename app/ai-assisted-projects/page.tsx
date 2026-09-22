import { aiAssistedProjects } from "@/lib/data";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";
import CaseStudyList from "@/components/case-study-list";
import PageHero from "@/components/page-hero";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI-Assisted Projects — Travis Hatfield" };

export default async function AiAssistedProjectsPage() {
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM case_studies WHERE section = 'ai-assisted' ORDER BY sort_order ASC, id ASC
  `) as unknown as CaseStudyRow[];
  const items = rows.length > 0 ? rows : aiAssistedProjects;

  return (
    <div className="wide flex flex-col gap-6">
      <PageHero
        eyebrow="At work"
        title="AI-Assisted Projects"
        description="Internal tools built with AI to run a People function faster and more consistently — problem, approach, outcome."
      />
      <CaseStudyList items={items} basePath="/ai-assisted-projects" />
    </div>
  );
}
