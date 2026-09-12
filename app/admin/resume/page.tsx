import Link from "next/link";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminResumePage() {
  await ensureSchema();
  const roles = (await sql`SELECT * FROM roles ORDER BY sort_order ASC, id ASC`) as unknown as RoleRow[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Resume</h1>
        <Link
          href="/admin/resume/new"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-foreground/[0.03]"
        >
          + Add Role
        </Link>
      </div>

      {roles.length === 0 ? (
        <p className="text-muted">No roles yet. Add your first one.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={`/admin/resume/${role.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
            >
              <div>
                <p className="font-medium">
                  {role.title} <span className="text-muted">· {role.company}</span>
                </p>
                <p className="text-sm text-muted">{role.dates}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
