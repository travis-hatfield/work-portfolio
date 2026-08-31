import Link from "next/link";
import { headers } from "next/headers";
import { sql, ensureSchema, type Post } from "@/lib/db";
import { siteFromHost } from "@/lib/sites";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));

  await ensureSchema();
  const posts = (await sql`
    SELECT * FROM posts WHERE site = ${site} AND published = true ORDER BY created_at DESC
  `) as unknown as Post[];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet — check back soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-lg border border-border bg-card p-5 transition-colors group-hover:border-accent">
                <h2 className="font-medium">{post.title}</h2>
                {post.excerpt && <p className="mt-1 text-sm text-muted">{post.excerpt}</p>}
                <p className="mt-3 text-xs text-muted">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
