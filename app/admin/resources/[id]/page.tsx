import { sql, type ResourceRow } from "@/lib/db";
import ResourceEditor from "@/components/resource-editor";
import { notFound } from "next/navigation";

export default async function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = (await sql`SELECT * FROM resources WHERE id = ${id}`) as unknown as ResourceRow[];
  const resource = rows[0];
  if (!resource) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Edit Resource</h1>
      <ResourceEditor resource={resource} />
    </div>
  );
}
