import { roles as staticRoles } from "@/lib/data";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";
import { buildResumePdf } from "@/lib/resume-pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSchema();
  const dbRoles = (await sql`SELECT * FROM roles ORDER BY sort_order ASC, id ASC`) as unknown as RoleRow[];
  const roles = dbRoles.length > 0 ? dbRoles : staticRoles;
  const bytes = await buildResumePdf(roles);
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Travis-Hatfield-Resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
