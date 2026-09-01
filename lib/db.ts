import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { CanvasDoc } from "@/lib/canvas";

let cached: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) {
    throw new Error("No database connection string found in environment variables.");
  }
  cached = neon(connectionString);
  return cached;
}

// Proxy so `sql\`...\`` tagged-template calls still work, but the real
// client (and its env var check) is only created at request time.
export const sql = new Proxy(function () {} as unknown as NeonQueryFunction<false, false>, {
  apply(_target, _thisArg, args: Parameters<NeonQueryFunction<false, false>>) {
    return getSql()(...args);
  },
});

export type Post = {
  id: number;
  title: string;
  slug: string;
  site: "personal" | "professional";
  excerpt: string | null;
  content: string;
  content_blocks: Block[] | null;
  content_canvas: CanvasDoc | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Block =
  | { id: string; type: "heading"; level: 2 | 3; text: string }
  | { id: string; type: "paragraph"; html: string }
  | { id: string; type: "quote"; html: string }
  | { id: string; type: "divider" }
  | { id: string; type: "button"; label: string; url: string }
  | {
      id: string;
      type: "image";
      url: string;
      caption?: string;
      width: 25 | 50 | 75 | 100;
      align: "left" | "center" | "right";
    }
  | {
      id: string;
      type: "image-text";
      imageUrl: string;
      html: string;
      imageSide: "left" | "right";
    }
  | { id: string; type: "gallery"; images: { url: string; caption?: string }[] };

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      site TEXT NOT NULL CHECK (site IN ('personal', 'professional')),
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image_url TEXT,
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_blocks JSONB;
  `;
  await sql`
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_canvas JSONB;
  `;
}
