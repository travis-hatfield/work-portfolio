import Link from "next/link";
import { sql, ensureSchema, type Post } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await ensureSchema();
  const posts = (await sql`SELECT * FROM posts ORDER BY updated_at DESC`) as unknown as Post[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-foreground/[0.03]"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Create your first one.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted">
                  /{post.site} · {post.published ? "Published" : "Draft"}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted">
                {new Date(post.updated_at).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
