import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureSchema();
  const body = await request.json();
  const { section, slug, title, problem, approach, outcome, tools, sort_order } = body;

  if (!title || !slug || !["ai-assisted", "personal-ai"].includes(section)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    const rows = await sql`
      INSERT INTO case_studies (section, slug, title, problem, approach, outcome, tools, sort_order)
      VALUES (
        ${section}, ${slug}, ${title}, ${problem ?? ""}, ${approach ?? ""}, ${outcome ?? ""},
        ${JSON.stringify(tools ?? [])}, ${sort_order ?? 0}
      )
      RETURNING id
    `;
    return NextResponse.json({ id: (rows as unknown as { id: number }[])[0].id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Insert failed";
    const status = message.includes("duplicate") || message.includes("unique") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
