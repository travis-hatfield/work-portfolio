import { sql, type CaseStudyRow } from "@/lib/db";
import CaseStudyEditor from "@/components/case-study-editor";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = (await sql`SELECT * FROM case_studies WHERE id = ${id}`) as unknown as CaseStudyRow[];
  const caseStudy = rows[0];
  if (!caseStudy) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>
      <CaseStudyEditor caseStudy={caseStudy} />
    </div>
  );
}
