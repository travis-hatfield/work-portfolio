import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { sql, type Post } from "@/lib/db";
import { siteFromHost } from "@/lib/sites";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));

  const rows = (await sql`
    SELECT * FROM posts WHERE slug = ${slug} AND site = ${site} AND published = true
  `) as unknown as Post[];
  const post = rows[0];
  if (!post) notFound();

  return (
    <article className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt="" className="rounded-lg w-full object-cover" />
      )}
      <div className="prose prose-neutral dark:prose-invert whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>
    </article>
  );
}
