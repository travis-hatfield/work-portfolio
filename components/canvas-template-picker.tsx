"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  CANVAS_TEMPLATES,
  TEMPLATE_CATEGORIES,
  instantiateCanvasTemplate,
  type CanvasTemplate,
  type CanvasTemplateCategory,
} from "@/lib/canvas-templates";
import type { CanvasDoc, CanvasElement } from "@/lib/canvas";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (document: CanvasDoc, template: CanvasTemplate) => void;
};

export default function CanvasTemplatePicker({ open, onClose, onSelect }: Props) {
  const [category, setCategory] = useState<"All" | CanvasTemplateCategory>("All");
  const visible = useMemo(
    () =>
      category === "All" ? CANVAS_TEMPLATES : CANVAS_TEMPLATES.filter((template) => template.category === category),
    [category]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-picker-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b px-6 py-5">
          <div>
            <h2 id="template-picker-title" className="text-2xl font-bold text-gray-950">
              Choose a blog template
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Every template becomes fully editable canvas elements after you select it.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-100">
            Close
          </button>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b px-6 py-3" aria-label="Template categories">
          {TEMPLATE_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                category === item ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="grid flex-1 gap-5 overflow-y-auto p-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((template) => (
            <article
              key={template.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <TemplatePreview template={template} />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-gray-950">{template.name}</h3>
                  <span
                    className="rounded-full px-2 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: template.accent }}
                  >
                    {template.category}
                  </span>
                </div>
                <p className="mt-2 min-h-10 text-sm leading-5 text-gray-600">{template.description}</p>
                <button
                  type="button"
                  onClick={() => onSelect(instantiateCanvasTemplate(template.id), template)}
                  className="mt-4 w-full rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {template.id === "blank" ? "Start blank" : "Use this template"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ template }: { template: CanvasTemplate }) {
  const doc = template.document;
  const previewWidth = 340;
  const previewHeight = 220;
  const scale = Math.min(previewWidth / doc.designWidth, previewHeight / doc.height);

  if (!doc.elements.length) {
    return (
      <div className="flex h-[220px] items-center justify-center bg-[linear-gradient(135deg,#f8fafc_25%,#f1f5f9_25%,#f1f5f9_50%,#f8fafc_50%,#f8fafc_75%,#f1f5f9_75%)] bg-[length:24px_24px]">
        <div className="rounded-xl border border-dashed border-gray-400 bg-white/90 px-6 py-4 text-center">
          <p className="font-semibold text-gray-900">Blank canvas</p>
          <p className="mt-1 text-xs text-gray-500">Design anywhere</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[220px] overflow-hidden bg-gray-200">
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{
          width: doc.designWidth,
          height: doc.height,
          background: doc.background ?? "#ffffff",
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {doc.elements
          .slice()
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => (
            <PreviewElement key={element.id} element={element} />
          ))}
      </div>
    </div>
  );
}

function PreviewElement({ element }: { element: CanvasElement }) {
  const style: CSSProperties = {
    position: "absolute",
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    zIndex: element.zIndex,
    transform: `rotate(${element.rotation ?? 0}deg)`,
    opacity: element.opacity ?? 1,
    borderRadius: element.borderRadius,
    border: element.borderWidth
      ? `${element.borderWidth}px solid ${element.borderColor ?? "transparent"}`
      : undefined,
    overflow: "hidden",
  };

  if (element.type === "text") {
    return (
      <div
        style={{
          ...style,
          fontSize: element.fontSize,
          fontFamily: element.fontFamily,
          fontWeight: element.fontWeight,
          fontStyle: element.fontStyle,
          letterSpacing: element.letterSpacing,
          lineHeight: element.lineHeight,
          color: element.color,
          textAlign: element.align,
        }}
        dangerouslySetInnerHTML={{ __html: element.html ?? "" }}
      />
    );
  }

  if (element.type === "image") {
    return element.src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={element.src} alt="" style={{ ...style, objectFit: element.objectFit ?? "cover" }} />
    ) : (
      <div
        style={style}
        className="flex items-center justify-center bg-[linear-gradient(135deg,#d1d5db,#f3f4f6,#cbd5e1)] text-center text-2xl font-semibold text-gray-500"
      >
        {element.alt ?? "Add image"}
      </div>
    );
  }

  if (element.type === "button") {
    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: element.bgColor,
          color: element.textColor,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {element.label}
      </div>
    );
  }

  return (
    <div
      style={{
        ...style,
        backgroundColor: element.bgColor,
        borderTop: element.shapeKind === "line" ? `${element.borderWidth ?? 2}px solid ${element.bgColor}` : style.border,
      }}
    />
  );
}
