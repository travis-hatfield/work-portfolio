import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Delete old placeholder case study
    await sql`DELETE FROM case_studies WHERE section = 'ai-assisted'`;
    return new Response(
      JSON.stringify({ success: true, message: "Cleared ai-assisted case studies" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
