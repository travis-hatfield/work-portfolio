import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { company, title, dates, summary, details, sort_order } = body;

  if (!company || !title || !dates) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    await sql`
      UPDATE roles
      SET company = ${company},
          title = ${title},
          dates = ${dates},
          summary = ${summary ?? ""},
          details = ${JSON.stringify(details ?? [])},
          sort_order = ${sort_order ?? 0},
          updated_at = now()
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await sql`DELETE FROM roles WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
