import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { section, slug, title, problem, approach, outcome, tools, link_url, sort_order } = body;

  if (!title || !slug || !["ai-assisted", "personal-ai"].includes(section)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    await sql`
      UPDATE case_studies
      SET section = ${section},
          slug = ${slug},
          title = ${title},
          problem = ${problem ?? ""},
          approach = ${approach ?? ""},
          outcome = ${outcome ?? ""},
          tools = ${JSON.stringify(tools ?? [])},
          link_url = ${link_url ?? null},
          sort_order = ${sort_order ?? 0},
          updated_at = now()
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed";
    const status = message.includes("duplicate") || message.includes("unique") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await sql`DELETE FROM case_studies WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
