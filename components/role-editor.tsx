"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RoleRow } from "@/lib/db";
import StringListEditor from "@/components/string-list-editor";

type Props = { role?: RoleRow };

export default function RoleEditor({ role }: Props) {
  const router = useRouter();
  const [company, setCompany] = useState(role?.company ?? "");
  const [title, setTitle] = useState(role?.title ?? "");
  const [dates, setDates] = useState(role?.dates ?? "");
  const [summary, setSummary] = useState(role?.summary ?? "");
  const [details, setDetails] = useState<string[]>(role?.details ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(role?.id);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { company, title, dates, summary, details: details.filter((d) => d.trim()) };
      const res = await fetch(isEditing ? `/api/roles/${role!.id}` : "/api/roles", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      router.push("/admin/resume");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!role?.id) return;
    if (!confirm("Delete this role? This cannot be undone.")) return;
    await fetch(`/api/roles/${role.id}`, { method: "DELETE" });
    router.push("/admin/resume");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-2xl">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-card px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Dates <span className="font-normal text-muted">(e.g. 2023 — Present)</span>
        </label>
        <input
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-card px-3 py-2"
        />
      </div>

      <StringListEditor
        label="Details / bullet points"
        items={details}
        onChange={setDetails}
        placeholder="Key responsibility or project"
      />

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
