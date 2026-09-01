"use client";

import { useRef, useState } from "react";
import type { Block } from "@/lib/db";
import InlineRichText from "@/components/inline-rich-text";

type Props = {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
};

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadFile(file: File): Promise<string> {
  const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
    method: "POST",
    body: file,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}

const BLOCK_TYPES: { type: Block["type"]; label: string; icon: string }[] = [
  { type: "heading", label: "Heading", icon: "H" },
  { type: "paragraph", label: "Text", icon: "¶" },
  { type: "image", label: "Image", icon: "🖼" },
  { type: "image-text", label: "Image + Text", icon: "⬛" },
  { type: "gallery", label: "Gallery", icon: "▦" },
  { type: "quote", label: "Quote", icon: '"' },
  { type: "button", label: "Button", icon: "🔗" },
  { type: "divider", label: "Divider", icon: "—" },
];

function blankBlock(type: Block["type"]): Block {
  switch (type) {
    case "heading":
      return { id: newId(), type: "heading", level: 2, text: "" };
    case "paragraph":
      return { id: newId(), type: "paragraph", html: "" };
    case "quote":
      return { id: newId(), type: "quote", html: "" };
    case "divider":
      return { id: newId(), type: "divider" };
    case "button":
      return { id: newId(), type: "button", label: "Learn more", url: "" };
    case "image":
      return { id: newId(), type: "image", url: "", width: 100, align: "center" };
    case "image-text":
      return { id: newId(), type: "image-text", imageUrl: "", html: "", imageSide: "left" };
    case "gallery":
      return { id: newId(), type: "gallery", images: [] };
  }
}

export default function BlockEditor({ blocks, onChange }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState<number | null>(null); // insert-after index, -1 = start

  function update(index: number, next: Block) {
    const copy = blocks.slice();
    copy[index] = next;
    onChange(copy);
  }

  function remove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function insertAt(index: number, type: Block["type"]) {
    const copy = blocks.slice();
    copy.splice(index, 0, blankBlock(type));
    onChange(copy);
    setShowPicker(null);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= blocks.length || from === to) return;
    const copy = blocks.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    onChange(copy);
  }

  return (
    <div className="flex flex-col gap-2">
      <InsertRow onPick={(type) => insertAt(0, type)} show={showPicker === -1} setShow={(v) => setShowPicker(v ? -1 : null)} />

      {blocks.map((block, index) => (
        <div key={block.id}>
          <div
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) move(dragIndex, index);
              setDragIndex(null);
            }}
            className="group relative rounded-lg border border-border bg-card p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="cursor-grab select-none text-xs text-muted" title="Drag to reorder">
                ⠿ {block.type}
              </span>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={() => move(index, index - 1)} className="rounded px-1.5 py-0.5 text-xs hover:bg-foreground/[0.06]" title="Move up">
                  ↑
                </button>
                <button type="button" onClick={() => move(index, index + 1)} className="rounded px-1.5 py-0.5 text-xs hover:bg-foreground/[0.06]" title="Move down">
                  ↓
                </button>
                <button type="button" onClick={() => remove(index)} className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-500/10" title="Delete block">
                  ✕
                </button>
              </div>
            </div>
            <BlockFields block={block} onChange={(next) => update(index, next)} />
          </div>
          <InsertRow onPick={(type) => insertAt(index + 1, type)} show={showPicker === index} setShow={(v) => setShowPicker(v ? index : null)} />
        </div>
      ))}

      {blocks.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
          No content yet — click below to add your first block.
        </p>
      )}
    </div>
  );
}

function InsertRow({
  onPick,
  show,
  setShow,
}: {
  onPick: (type: Block["type"]) => void;
  show: boolean;
  setShow: (v: boolean) => void;
}) {
  return (
    <div className="relative flex items-center py-1">
      <div className="h-px flex-1 bg-transparent" />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="mx-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-sm leading-none text-muted hover:border-accent hover:text-accent"
        title="Add block"
      >
        +
      </button>
      <div className="h-px flex-1 bg-transparent" />
      {show && (
        <div className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2 flex-wrap gap-1 rounded-lg border border-border bg-card p-2 shadow-lg">
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.type}
              type="button"
              onClick={() => onPick(bt.type)}
              className="flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs hover:bg-foreground/[0.06]"
            >
              <span className="text-base">{bt.icon}</span>
              {bt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BlockFields({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="flex items-center gap-2">
          <select
            value={block.level}
            onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}
            className="rounded border border-border bg-background px-2 py-1 text-xs"
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading text"
            className="flex-1 rounded border border-border bg-background px-2 py-1.5 font-semibold"
          />
        </div>
      );

    case "paragraph":
      return <InlineRichText html={block.html} onChange={(html) => onChange({ ...block, html })} placeholder="Write..." />;

    case "quote":
      return <InlineRichText html={block.html} onChange={(html) => onChange({ ...block, html })} placeholder="Quote text..." minimal />;

    case "divider":
      return <hr className="border-border" />;

    case "button":
      return (
        <div className="flex gap-2">
          <input
            value={block.label}
            onChange={(e) => onChange({ ...block, label: e.target.value })}
            placeholder="Button label"
            className="flex-1 rounded border border-border bg-background px-2 py-1.5 text-sm"
          />
          <input
            value={block.url}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            placeholder="https://..."
            className="flex-1 rounded border border-border bg-background px-2 py-1.5 text-sm font-mono"
          />
        </div>
      );

    case "image":
      return <ImageBlockFields block={block} onChange={onChange} />;

    case "image-text":
      return <ImageTextBlockFields block={block} onChange={onChange} />;

    case "gallery":
      return <GalleryBlockFields block={block} onChange={onChange} />;
  }
}

function UploadButton({ onUploaded, label = "Upload image" }: { onUploaded: (url: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        className="rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-foreground/[0.06] disabled:opacity-50"
      >
        {busy ? "Uploading…" : label}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          try {
            onUploaded(await uploadFile(file));
          } catch {
            alert("Upload failed");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

function ImageBlockFields({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "image" }>;
  onChange: (b: Block) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {block.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={block.url} alt="" className="max-h-48 rounded-lg object-cover" />
      ) : (
        <UploadButton onUploaded={(url) => onChange({ ...block, url })} />
      )}
      {block.url && (
        <div className="flex flex-wrap items-center gap-3">
          <UploadButton label="Replace" onUploaded={(url) => onChange({ ...block, url })} />
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Width
            <select
              value={block.width}
              onChange={(e) => onChange({ ...block, width: Number(e.target.value) as 25 | 50 | 75 | 100 })}
              className="rounded border border-border bg-background px-1.5 py-1 text-xs"
            >
              <option value={25}>25%</option>
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
            </select>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted">
            Align
            <select
              value={block.align}
              onChange={(e) => onChange({ ...block, align: e.target.value as "left" | "center" | "right" })}
              className="rounded border border-border bg-background px-1.5 py-1 text-xs"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
          <input
            value={block.caption ?? ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption (optional)"
            className="flex-1 min-w-[120px] rounded border border-border bg-background px-2 py-1 text-xs"
          />
        </div>
      )}
    </div>
  );
}

function ImageTextBlockFields({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "image-text" }>;
  onChange: (b: Block) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="sm:w-1/2">
        {block.imageUrl ? (
          <div className="flex flex-col gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.imageUrl} alt="" className="max-h-40 rounded-lg object-cover" />
            <UploadButton label="Replace image" onUploaded={(imageUrl) => onChange({ ...block, imageUrl })} />
          </div>
        ) : (
          <UploadButton onUploaded={(imageUrl) => onChange({ ...block, imageUrl })} />
        )}
        <label className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          Image side
          <select
            value={block.imageSide}
            onChange={(e) => onChange({ ...block, imageSide: e.target.value as "left" | "right" })}
            className="rounded border border-border bg-background px-1.5 py-1 text-xs"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>
      <div className="flex-1">
        <InlineRichText html={block.html} onChange={(html) => onChange({ ...block, html })} placeholder="Write..." />
      </div>
    </div>
  );
}

function GalleryBlockFields({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "gallery" }>;
  onChange: (b: Block) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {block.images.map((img, i) => (
          <div key={i} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt="" className="h-20 w-20 rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => onChange({ ...block, images: block.images.filter((_, j) => j !== i) })}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}
        {block.images.length < 4 && (
          <UploadButton
            label="Add image"
            onUploaded={(url) => onChange({ ...block, images: [...block.images, { url }] })}
          />
        )}
      </div>
      <p className="text-xs text-muted">Up to 4 images, shown side by side.</p>
    </div>
  );
}
