"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CaseStudyRow } from "@/lib/db";
import StringListEditor from "@/components/string-list-editor";

type Props = { caseStudy?: CaseStudyRow };

export default function CaseStudyEditor({ caseStudy }: Props) {
  const router = useRouter();
  const [section, setSection] = useState<"ai-assisted" | "personal-ai">(caseStudy?.section ?? "ai-assisted");
  const [title, setTitle] = useState(caseStudy?.title ?? "");
  const [slug, setSlug] = useState(caseStudy?.slug ?? "");
  const [problem, setProblem] = useState(caseStudy?.problem ?? "");
  const [approach, setApproach] = useState(caseStudy?.approach ?? "");
  const [outcome, setOutcome] = useState(caseStudy?.outcome ?? "");
  const [tools, setTools] = useState<string[]>(caseStudy?.tools ?? []);
  const [linkUrl, setLinkUrl] = useState(caseStudy?.link_url ?? "");
  const [screenshots, setScreenshots] = useState<string[]>(caseStudy?.screenshots ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(caseStudy?.id);
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

  async function handleScreenshotUpload(files: FileList) {
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files).slice(0, 4 - screenshots.length)) {
        const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: "POST",
          body: file,
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        uploaded.push(data.url);
      }
      setScreenshots((prev) => [...prev, ...uploaded].slice(0, 4));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeScreenshot(index: number) {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        section,
        slug,
        title,
        problem,
        approach,
        outcome,
        tools: tools.filter((t) => t.trim()),
        link_url: linkUrl.trim() || null,
        screenshots,
      };
      const res = await fetch(isEditing ? `/api/case-studies/${caseStudy!.id}` : "/api/case-studies", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!caseStudy?.id) return;
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await fetch(`/api/case-studies/${caseStudy.id}`, { method: "DELETE" });
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-2xl">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Section</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value as "ai-assisted" | "personal-ai")}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        >
          <option value="ai-assisted">AI-Assisted Projects</option>
          <option value="personal-ai">Personal AI Projects</option>
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
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
          className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Problem</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Approach</label>
        <textarea
          value={approach}
          onChange={(e) => setApproach(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Outcome</label>
        <textarea
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <StringListEditor label="Tools" items={tools} onChange={setTools} placeholder="e.g. Claude" />

      <div>
        <label className="block text-sm font-medium mb-1">
          Screenshots <span className="font-normal text-muted">(optional — up to 4, shown right on the project card)</span>
        </label>
        {screenshots.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {screenshots.map((url, i) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-20 w-32 rounded-md border border-border object-cover" />
                <button
                  type="button"
                  onClick={() => removeScreenshot(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                  aria-label="Remove screenshot"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        {screenshots.length < 4 && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && e.target.files.length > 0 && handleScreenshotUpload(e.target.files)}
          />
        )}
        {uploading && <p className="mt-1 text-sm text-muted">Uploading...</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Read more link <span className="font-normal text-muted">(optional — links the title to a full write-up)</span>
        </label>
        <input
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="/blog/my-project-writeup or https://..."
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
