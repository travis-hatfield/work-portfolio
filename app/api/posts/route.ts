import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureSchema();
  const body = await request.json();
  const { title, slug, site, excerpt, content, cover_image_url, published } = body;

  if (!title || !slug || !content || !["personal", "professional"].includes(site)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    const rows = await sql`
      INSERT INTO posts (title, slug, site, excerpt, content, cover_image_url, published)
      VALUES (${title}, ${slug}, ${site}, ${excerpt ?? null}, ${content}, ${cover_image_url ?? null}, ${Boolean(published)})
      RETURNING id
    `;
    return NextResponse.json({ id: (rows as unknown as { id: number }[])[0].id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Insert failed";
    const status = message.includes("duplicate") || message.includes("unique") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
