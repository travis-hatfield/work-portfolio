import { sql, type RoleRow } from "@/lib/db";
import RoleEditor from "@/components/role-editor";
import { notFound } from "next/navigation";

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = (await sql`SELECT * FROM roles WHERE id = ${id}`) as unknown as RoleRow[];
  const role = rows[0];
  if (!role) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Edit Role</h1>
      <RoleEditor role={role} />
    </div>
  );
}
