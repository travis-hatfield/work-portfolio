import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { normalizeCanvas } from "@/lib/canvas";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, slug, site, excerpt, content, content_blocks, content_canvas, cover_image_url, published } = body;

  const canvasDocument = normalizeCanvas(content_canvas);
  const hasBlocks = Array.isArray(content_blocks) && content_blocks.length > 0;
  const hasCanvas = Boolean(canvasDocument?.elements.length);
  if (!title || !slug || (!content && !hasBlocks && !hasCanvas) || !["personal", "professional"].includes(site)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    await sql`
      UPDATE posts
      SET title = ${title},
          slug = ${slug},
          site = ${site},
          excerpt = ${excerpt ?? null},
          content = ${content ?? ""},
          content_blocks = ${hasBlocks ? JSON.stringify(content_blocks) : null},
          content_canvas = ${hasCanvas ? JSON.stringify(canvasDocument) : null},
          cover_image_url = ${cover_image_url ?? null},
          published = ${Boolean(published)},
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
  await sql`DELETE FROM posts WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
