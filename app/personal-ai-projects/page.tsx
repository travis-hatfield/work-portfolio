import { personalAiProjects } from "@/lib/data";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";
import CaseStudyList from "@/components/case-study-list";
import PageHero from "@/components/page-hero";

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
      <PageHero
        eyebrow="Outside of work"
        title="Personal AI Projects"
        description="Independent builds and experiments, run outside of work."
      />
      <CaseStudyList items={items} />
    </div>
  );
}
