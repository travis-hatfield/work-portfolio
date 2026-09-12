import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureSchema();
  const body = await request.json();
  const { title, description, file_type, size, href, category, sort_order } = body;

  if (!title) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    const rows = await sql`
      INSERT INTO resources (title, description, file_type, size, href, category, sort_order)
      VALUES (
        ${title}, ${description ?? ""}, ${file_type ?? ""}, ${size ?? ""},
        ${href ?? "#"}, ${category ?? "Templates"}, ${sort_order ?? 0}
      )
      RETURNING id
    `;
    return NextResponse.json({ id: (rows as unknown as { id: number }[])[0].id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Insert failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
