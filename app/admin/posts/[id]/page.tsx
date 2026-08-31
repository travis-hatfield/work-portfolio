import { notFound } from "next/navigation";
import { sql, type Post } from "@/lib/db";
import PostEditor from "@/components/post-editor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = (await sql`SELECT * FROM posts WHERE id = ${id}`) as unknown as Post[];
  const post = rows[0];
  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Edit Post</h1>
      <PostEditor post={post} />
    </div>
  );
}
