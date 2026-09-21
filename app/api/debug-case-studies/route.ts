import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`SELECT id, title, section FROM case_studies ORDER BY section, id`;
    return new Response(
      JSON.stringify({ success: true, data: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
