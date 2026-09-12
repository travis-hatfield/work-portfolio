"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ResourceRow } from "@/lib/db";

type Props = { resource?: ResourceRow };

export default function ResourceEditor({ resource }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(resource?.title ?? "");
  const [description, setDescription] = useState(resource?.description ?? "");
  const [fileType, setFileType] = useState(resource?.file_type ?? "PDF");
  const [size, setSize] = useState(resource?.size ?? "");
  const [href, setHref] = useState(resource?.href ?? "");
  const [category, setCategory] = useState(resource?.category ?? "Templates");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(resource?.id);

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
      setHref(data.url);
      if (!size) setSize(`${Math.round(file.size / 1024)} KB`);
      const ext = file.name.split(".").pop();
      if (ext) setFileType(ext.toUpperCase());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { title, description, file_type: fileType, size, href, category };
      const res = await fetch(isEditing ? `/api/resources/${resource!.id}` : "/api/resources", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      router.push("/admin/resources");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!resource?.id) return;
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    await fetch(`/api/resources/${resource.id}`, { method: "DELETE" });
    router.push("/admin/resources");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-2xl">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">File</label>
        <input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        {uploading && <p className="text-sm text-muted mt-1">Uploading...</p>}
        {href && (
          <p className="mt-1 text-xs text-muted break-all">
            {fileType} · {size} · {href}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Or paste a link <span className="font-normal text-muted">(instead of uploading a file)</span>
        </label>
        <input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
        />
      </div>

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
