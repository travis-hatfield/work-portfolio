"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post, Block } from "@/lib/db";
import RichTextEditor from "@/components/rich-text-editor";
import BlockEditor from "@/components/block-editor";
import CanvasEditor from "@/components/canvas-editor";
import { createEmptyCanvas, normalizeCanvas, type CanvasDoc } from "@/lib/canvas";

type Props = {
  post?: Pick<
    Post,
    | "id"
    | "title"
    | "slug"
    | "site"
    | "excerpt"
    | "content"
    | "content_blocks"
    | "content_canvas"
    | "cover_image_url"
    | "published"
  >;
};

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [site, setSite] = useState<"personal" | "professional">(post?.site ?? "professional");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [blocks, setBlocks] = useState<Block[]>(post?.content_blocks ?? []);
  const existingCanvas = normalizeCanvas(post?.content_canvas);
  const [canvasDoc, setCanvasDoc] = useState<CanvasDoc>(existingCanvas ?? createEmptyCanvas());
  type ContentMode = "classic" | "blocks" | "canvas";
  const [contentMode, setContentMode] = useState<ContentMode>(() => {
    if (existingCanvas?.elements.length) return "canvas";
    if (post?.content_blocks?.length) return "blocks";
    if (!post) return "blocks";
    return "classic";
  });
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(post?.id);
  const [slugTouched, setSlugTouched] = useState(isEditing);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setCoverImageUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (contentMode === "blocks" && blocks.length === 0) {
      setError("Add at least one block.");
      return;
    }
    if (contentMode === "classic" && (!content || content === "<p></p>")) {
      setError("Content can't be empty.");
      return;
    }
    if (contentMode === "canvas" && canvasDoc.elements.length === 0) {
      setError("Add at least one element to the canvas.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title,
        slug,
        site,
        excerpt,
        content: contentMode === "classic" ? content : "",
        content_blocks: contentMode === "blocks" ? blocks : null,
        content_canvas: contentMode === "canvas" ? canvasDoc : null,
        cover_image_url: coverImageUrl,
        published,
      };
      const res = await fetch(isEditing ? `/api/posts/${post!.id}` : "/api/posts", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!post?.id) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-4xl">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Site</label>
        <select
          value={site}
          onChange={(e) => setSite(e.target.value as "personal" | "professional")}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        >
          <option value="professional">Professional (work.travishatfield.dev)</option>
          <option value="personal">Personal (travishatfield.dev)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Slug <span className="font-normal text-muted">(the web address for this post)</span>
        </label>
        <input
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
          placeholder="my-post-title"
          className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm"
        />
        <p className="mt-1 text-xs text-muted">
          Your post will live at .../blog/{slug || "your-slug-here"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        />
        {uploading && <p className="text-sm text-muted mt-1">Uploading...</p>}
        {coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImageUrl} alt="Cover" className="mt-2 h-32 rounded-lg object-cover" />
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-medium">Content</label>
          <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
            {(["classic", "blocks", "canvas"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setContentMode(mode)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  contentMode === mode ? "bg-accent text-white" : "text-foreground/70 hover:bg-foreground/[0.06]"
                }`}
              >
                {mode === "canvas" ? "Free-form canvas" : mode === "blocks" ? "Blocks" : "Simple text"}
              </button>
            ))}
          </div>
        </div>
        {contentMode === "blocks" && <BlockEditor blocks={blocks} onChange={setBlocks} />}
        {contentMode === "classic" && (
          <>
            <RichTextEditor content={content} onChange={setContent} />
            {!content && <p className="mt-1 text-xs text-red-500">Content can&apos;t be empty.</p>}
          </>
        )}
        {contentMode === "canvas" && <CanvasEditor value={canvasDoc} onChange={setCanvasDoc} />}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-red-500 hover:bg-foreground/[0.03]"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
