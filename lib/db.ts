import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

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

export type RoleRow = {
  id: number;
  company: string;
  title: string;
  dates: string;
  summary: string;
  details: string[];
  sort_order: number;
};

export type CaseStudyRow = {
  id: number;
  section: "ai-assisted" | "personal-ai";
  slug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  link_url: string | null;
  screenshots: string[];
  sort_order: number;
};

export type ResourceRow = {
  id: number;
  title: string;
  description: string;
  file_type: string;
  size: string;
  href: string;
  category: string;
  sort_order: number;
};

export async function ensureSchema() {
  // The site collapsed to a single professional domain; the blog/posts
  // feature (and its personal/professional split) no longer exists.
  await sql`DROP TABLE IF EXISTS posts;`;

  await sql`
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      company TEXT NOT NULL,
      title TEXT NOT NULL,
      dates TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      details JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS case_studies (
      id SERIAL PRIMARY KEY,
      section TEXT NOT NULL CHECK (section IN ('ai-assisted', 'personal-ai')),
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      problem TEXT NOT NULL DEFAULT '',
      approach TEXT NOT NULL DEFAULT '',
      outcome TEXT NOT NULL DEFAULT '',
      tools JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`
    ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS link_url TEXT;
  `;
  await sql`
    ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS screenshots JSONB NOT NULL DEFAULT '[]';
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS resources (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      file_type TEXT NOT NULL DEFAULT '',
      size TEXT NOT NULL DEFAULT '',
      href TEXT NOT NULL DEFAULT '#',
      category TEXT NOT NULL DEFAULT 'Templates',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
}
