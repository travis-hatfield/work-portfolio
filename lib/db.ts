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

  // Clear old placeholder case studies to use lib/data.ts fallback
  await sql`DELETE FROM case_studies WHERE section = 'ai-assisted'`;
}
