import { notFound } from "next/navigation";
import { aiAssistedProjects } from "@/lib/data";
import { sql, ensureSchema, type CaseStudyRow } from "@/lib/db";
import CaseStudyDetail from "@/components/case-study-detail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = aiAssistedProjects.find((c) => c.slug === slug);
  return { title: item ? `${item.title} — Travis Hatfield` : "Project — Travis Hatfield" };
}

export default async function AiAssistedProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await ensureSchema();
  const rows = (await sql`
    SELECT * FROM case_studies WHERE section = 'ai-assisted' ORDER BY sort_order ASC, id ASC
  `) as unknown as CaseStudyRow[];
  const items = rows.length > 0 ? rows : aiAssistedProjects;
  const item = items.find((c) => c.slug === slug);

  if (!item) notFound();

  return (
    <CaseStudyDetail item={item} basePath="/ai-assisted-projects" basePathLabel="AI-Assisted Projects" />
  );
}
