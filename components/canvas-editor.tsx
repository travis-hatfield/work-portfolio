"use client";
import Moveable from "react-moveable";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  createCanvasId,
  createEmptyCanvas,
  type CanvasDoc,
  type CanvasElement,
  type CanvasElementType,
} from "@/lib/canvas";

type Props = {
  value: CanvasDoc | null;
  onChange: (doc: CanvasDoc) => void;
  onOpenTemplates?: () => void;
};
type History = { past: CanvasDoc[]; present: CanvasDoc; future: CanvasDoc[] };

const GRID = 8;
const HISTORY_LIMIT = 50;
const BOTTOM_PADDING = 120;

const copy = (doc: CanvasDoc) => structuredClone(doc);
const snap = (value: number) => Math.round(value / GRID) * GRID;

export default function CanvasEditor({ value, onChange, onOpenTemplates }: Props) {
  const [history, setHistory] = useState<History>(() => ({
    past: [],
    present: copy(value ?? createEmptyCanvas()),
    future: [],
  }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const interactionStart = useRef<CanvasDoc | null>(null);
  const replaceImageIdRef = useRef<string | null>(null);

  const canvasDoc = history.present;
  const selected = canvasDoc.elements.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId || !canvasRef.current) {
      setTarget(null);
      return;
    }
    setTarget(
      canvasRef.current.querySelector<HTMLElement>(`[data-canvas-id="${selectedId}"]`)
    );
  }, [selectedId, canvasDoc.elements.length]);

  const publish = useCallback((next: CanvasDoc) => onChange(copy(next)), [onChange]);

  const commit = useCallback(
    (next: CanvasDoc) => {
      setHistory((current) => ({
        past: [...current.past, copy(current.present)].slice(-HISTORY_LIMIT),
        present: next,
        future: [],
      }));
      publish(next);
    },
    [publish]
  );

  const transient = useCallback(
    (next: CanvasDoc) => {
      setHistory((current) => ({ ...current, present: next }));
      publish(next);
    },
    [publish]
  );

  const updateElement = useCallback(
    (id: string, changes: Partial<CanvasElement>, saveHistory = true) => {
      const elements = canvasDoc.elements.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      );
      const changed = elements.find((item) => item.id === id);
      const next = {
        ...canvasDoc,
        height: Math.max(
          canvasDoc.height,
          changed ? changed.y + changed.height + BOTTOM_PADDING : canvasDoc.height
        ),
        elements,
      };
      saveHistory ? commit(next) : transient(next);
    },
    [canvasDoc, commit, transient]
  );

  const beginInteraction = () => {
    interactionStart.current = copy(canvasDoc);
  };

  const finishInteraction = () => {
    const start = interactionStart.current;
    if (!start) return;
    setHistory((current) => ({
      past: [...current.past, start].slice(-HISTORY_LIMIT),
      present: current.present,
      future: [],
    }));
    interactionStart.current = null;
  };

  const addElement = useCallback(
    (type: CanvasElementType, imageUrl?: string) => {
      const common = {
        id: createCanvasId(),
        type,
        x: 80,
        y: 80,
        zIndex: Math.max(0, ...canvasDoc.elements.map((item) => item.zIndex)) + 1,
        rotation: 0,
      };
      let element: CanvasElement;
      if (type === "text") {
        element = {
          ...common,
          type,
          width: 360,
          height: 100,
          html: "<p>Double-click to edit this text</p>",
          fontSize: 28,
          color: "#111827",
          align: "left",
        };
      } else if (type === "image") {
        element = {
          ...common,
          type,
          width: 360,
          height: 240,
          src: imageUrl ?? "",
          alt: "",
          objectFit: "cover",
        };
      } else if (type === "button") {
        element = {
          ...common,
          type,
          width: 180,
          height: 52,
          label: "Button",
          url: "",
          bgColor: "#111827",
          textColor: "#ffffff",
        };
      } else {
        element = { ...common, type, width: 260, height: 100, shapeKind: "rect", bgColor: "#d1d5db" };
      }
      commit({ ...canvasDoc, elements: [...canvasDoc.elements, element] });
      setSelectedId(element.id);
    },
    [canvasDoc, commit]
  );

  const removeSelected = useCallback(() => {
    if (!selectedId) return;
    commit({
      ...canvasDoc,
      elements: canvasDoc.elements.filter((item) => item.id !== selectedId),
    });
    setSelectedId(null);
    setEditingText(false);
  }, [canvasDoc, selectedId, commit]);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past.at(-1);
      if (!previous) return current;
      const next = {
        past: current.past.slice(0, -1),
        present: copy(previous),
        future: [copy(current.present), ...current.future].slice(0, HISTORY_LIMIT),
      };
      publish(next.present);
      return next;
    });
  }, [publish]);

  const redo = useCallback(() => {
    setHistory((current) => {
      const following = current.future[0];
      if (!following) return current;
      const next = {
        past: [...current.past, copy(current.present)].slice(-HISTORY_LIMIT),
        present: copy(following),
        future: current.future.slice(1),
      };
      publish(next.present);
      return next;
    });
  }, [publish]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const active = window.document.activeElement;
      const typing =
        active?.tagName === "INPUT" ||
        active?.tagName === "TEXTAREA" ||
        active?.getAttribute("contenteditable") === "true";
      const command = event.metaKey || event.ctrlKey;
      if (command && event.key.toLowerCase() === "z") {
        event.preventDefault();
        event.shiftKey ? redo() : undo();
      } else if (!typing && selectedId && ["Delete", "Backspace"].includes(event.key)) {
        event.preventDefault();
        removeSelected();
      } else if (event.key === "Escape") {
        setEditingText(false);
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId, undo, redo, removeSelected]);

  function openImageUpload(replaceElementId?: string) {
    replaceImageIdRef.current = replaceElementId ?? null;
    uploadRef.current?.click();
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!response.ok) {
      alert("The image could not be uploaded.");
      replaceImageIdRef.current = null;
      return;
    }
    const data = await response.json();
    const url = data.url ?? data.secure_url;
    if (!url) {
      alert("The upload response did not include an image URL.");
      replaceImageIdRef.current = null;
      return;
    }
    const replacementId = replaceImageIdRef.current;
    replaceImageIdRef.current = null;
    if (replacementId) {
      updateElement(replacementId, { src: url, alt: file.name });
    } else {
      addElement("image", url);
    }
  }

  const layer = (action: "front" | "forward" | "backward" | "back") => {
    if (!selected) return;
    const values = canvasDoc.elements.map((item) => item.zIndex);
    const highest = Math.max(0, ...values);
    const lowest = Math.min(0, ...values);
    const zIndex =
      action === "front"
        ? highest + 1
        : action === "back"
          ? lowest - 1
          : selected.zIndex + (action === "forward" ? 1 : -1);
    updateElement(selected.id, { zIndex });
  };

  const guidelines = useMemo(() => {
    if (!canvasRef.current) return [];
    return Array.from(canvasRef.current.querySelectorAll<HTMLElement>("[data-canvas-id]")).filter(
      (element) => element.dataset.canvasId !== selectedId
    );
  }, [canvasDoc.elements, selectedId]);

  return (
    <div className="flex min-h-[700px] overflow-hidden rounded-xl border border-border bg-card">
      <aside className="w-48 shrink-0 border-r border-border bg-background p-3">
        {onOpenTemplates && (
          <>
            <button
              type="button"
              onClick={onOpenTemplates}
              className="mb-4 w-full rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Browse templates
            </button>
            <div className="mb-4 border-t border-border" />
          </>
        )}
        <p className="mb-3 text-sm font-semibold">Add element</p>
        <div className="grid gap-2">
          <Tool onClick={() => addElement("text")}>Text</Tool>
          <Tool onClick={() => openImageUpload()}>Image</Tool>
          <Tool onClick={() => addElement("button")}>Button</Tool>
          <Tool onClick={() => addElement("shape")}>Shape</Tool>
        </div>
        <input ref={uploadRef} hidden type="file" accept="image/*" onChange={uploadImage} />
        <div className="my-4 border-t border-border" />
        <div className="grid grid-cols-2 gap-2">
          <Tool onClick={undo} disabled={!history.past.length}>
            Undo
          </Tool>
          <Tool onClick={redo} disabled={!history.future.length}>
            Redo
          </Tool>
        </div>
        <label className="mt-4 block text-sm font-semibold">
          Zoom
          <select
            className="mt-2 w-full rounded border border-border bg-card p-2 text-sm"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          >
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
            <option value={1.25}>125%</option>
          </select>
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Canvas background
          <input
            type="color"
            className="mt-2 block h-10 w-full rounded border border-border p-1"
            value={canvasDoc.background ?? "#ffffff"}
            onChange={(event) => commit({ ...canvasDoc, background: event.target.value })}
          />
        </label>
      </aside>
      <section className="min-w-0 flex-1">
        <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-border px-3">
          {selected ? (
            <>
              <span className="mr-2 text-sm font-medium capitalize">{selected.type}</span>
              <Tool onClick={() => layer("front")}>Front</Tool>
              <Tool onClick={() => layer("forward")}>Forward</Tool>
              <Tool onClick={() => layer("backward")}>Backward</Tool>
              <Tool onClick={() => layer("back")}>Back</Tool>
              <Tool className="text-red-600" onClick={removeSelected}>
                Delete
              </Tool>
            </>
          ) : (
            <span className="text-sm text-muted">Select an element to edit it.</span>
          )}
        </div>
        {selected?.type === "text" && (
          <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-border bg-background px-3">
            <Tool onMouseDown={(event) => event.preventDefault()} onClick={() => window.document.execCommand("bold")}>
              Bold
            </Tool>
            <Tool onMouseDown={(event) => event.preventDefault()} onClick={() => window.document.execCommand("italic")}>
              Italic
            </Tool>
            <input
              className="w-20 rounded border border-border bg-card p-2 text-sm"
              type="number"
              min={8}
              max={160}
              value={selected.fontSize ?? 28}
              onChange={(event) => updateElement(selected.id, { fontSize: Number(event.target.value) })}
            />
            <select
              className="rounded border border-border bg-card p-2 text-sm"
              value={selected.align ?? "left"}
              onChange={(event) =>
                updateElement(selected.id, { align: event.target.value as "left" | "center" | "right" })
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <input
              type="color"
              value={selected.color ?? "#111827"}
              onChange={(event) => updateElement(selected.id, { color: event.target.value })}
            />
          </div>
        )}
        {selected?.type === "image" && (
          <div className="flex min-h-14 flex-wrap items-center gap-3 border-b border-border bg-background px-3">
            <Tool onClick={() => openImageUpload(selected.id)}>Replace image</Tool>
            <label className="text-sm">
              Fit
              <select
                className="ml-2 rounded border border-border bg-card p-2 text-sm"
                value={selected.objectFit ?? "cover"}
                onChange={(event) =>
                  updateElement(selected.id, { objectFit: event.target.value as "cover" | "contain" })
                }
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </label>
            <label className="text-sm">
              Rounded corners
              <input
                type="number"
                min={0}
                max={300}
                className="ml-2 w-20 rounded border border-border bg-card p-2 text-sm"
                value={selected.borderRadius ?? 0}
                onChange={(event) => updateElement(selected.id, { borderRadius: Number(event.target.value) })}
              />
            </label>
          </div>
        )}
        {selected?.type === "button" && (
          <div className="flex min-h-14 flex-wrap gap-2 border-b border-border bg-background p-3">
            <input
              className="rounded border border-border bg-card p-2 text-sm"
              value={selected.label ?? ""}
              onChange={(event) => updateElement(selected.id, { label: event.target.value })}
            />
            <input
              className="min-w-64 rounded border border-border bg-card p-2 text-sm"
              placeholder="https://example.com"
              value={selected.url ?? ""}
              onChange={(event) => updateElement(selected.id, { url: event.target.value })}
            />
            <input
              type="color"
              value={selected.bgColor ?? "#111827"}
              onChange={(event) => updateElement(selected.id, { bgColor: event.target.value })}
            />
            <input
              type="color"
              value={selected.textColor ?? "#ffffff"}
              onChange={(event) => updateElement(selected.id, { textColor: event.target.value })}
            />
          </div>
        )}
        <div className="overflow-auto bg-foreground/[0.05] p-8" style={{ height: "calc(100vh - 220px)", minHeight: 620 }}>
          <div style={{ width: canvasDoc.designWidth * zoom, minHeight: canvasDoc.height * zoom }}>
            <div
              ref={canvasRef}
              className="relative origin-top-left shadow-xl"
              style={{
                width: canvasDoc.designWidth,
                height: canvasDoc.height,
                transform: `scale(${zoom})`,
                background: canvasDoc.background ?? "#ffffff",
                backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
                backgroundSize: `${GRID}px ${GRID}px`,
              }}
            >
              {canvasDoc.elements.map((element) => (
                <EditorElement
                  key={element.id}
                  element={element}
                  editing={editingText && selectedId === element.id}
                  onSelect={() => {
                    setSelectedId(element.id);
                    setEditingText(false);
                  }}
                  onEdit={() => {
                    if (element.type === "text") {
                      setSelectedId(element.id);
                      setEditingText(true);
                    }
                  }}
                  onHtml={(html) => updateElement(element.id, { html })}
                />
              ))}
              {target && selected && (
                <Moveable
                  target={target}
                  draggable={!editingText}
                  resizable={!editingText}
                  rotatable={!editingText}
                  snappable
                  snapGridWidth={GRID}
                  snapGridHeight={GRID}
                  snapThreshold={6}
                  elementGuidelines={guidelines}
                  verticalGuidelines={[0, canvasDoc.designWidth / 2, canvasDoc.designWidth]}
                  horizontalGuidelines={[0, canvasDoc.height / 2, canvasDoc.height]}
                  bounds={{ left: 0, top: 0, right: canvasDoc.designWidth, bottom: canvasDoc.height }}
                  renderDirections={["n", "ne", "e", "se", "s", "sw", "w", "nw"]}
                  onDragStart={beginInteraction}
                  onDrag={(event) => updateElement(selected.id, { x: snap(event.left), y: snap(event.top) }, false)}
                  onDragEnd={finishInteraction}
                  onResizeStart={beginInteraction}
                  onResize={(event) =>
                    updateElement(
                      selected.id,
                      {
                        width: Math.max(32, snap(event.width)),
                        height: Math.max(16, snap(event.height)),
                        x: snap(event.drag.left),
                        y: snap(event.drag.top),
                      },
                      false
                    )
                  }
                  onResizeEnd={finishInteraction}
                  onRotateStart={beginInteraction}
                  onRotate={(event) => updateElement(selected.id, { rotation: event.beforeRotate }, false)}
                  onRotateEnd={finishInteraction}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EditorElement({
  element,
  editing,
  onSelect,
  onEdit,
  onHtml,
}: {
  element: CanvasElement;
  editing: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onHtml: (html: string) => void;
}) {
  const style = {
    position: "absolute" as const,
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    zIndex: element.zIndex,
    transform: `rotate(${element.rotation ?? 0}deg)`,
    transformOrigin: "center",
    opacity: element.opacity ?? 1,
    borderRadius: element.borderRadius,
  };
  const choose = (event: ReactMouseEvent) => {
    event.stopPropagation();
    onSelect();
  };

  if (element.type === "text")
    return (
      <div
        data-canvas-id={element.id}
        style={{
          ...style,
          fontSize: element.fontSize ?? 28,
          fontFamily: element.fontFamily ?? "inherit",
          fontWeight: element.fontWeight ?? 400,
          fontStyle: element.fontStyle ?? "normal",
          letterSpacing: element.letterSpacing,
          lineHeight: element.lineHeight ?? 1.2,
          color: element.color ?? "#111827",
          textAlign: element.align ?? "left",
          overflow: "hidden",
          cursor: editing ? "text" : "move",
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={choose}
        onDoubleClick={(event) => {
          event.stopPropagation();
          onEdit();
        }}
        onBlur={(event) => onHtml(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: element.html ?? "<p>Text</p>" }}
      />
    );

  if (element.type === "image")
    return (
      <div
        data-canvas-id={element.id}
        style={{
          ...style,
          overflow: "hidden",
          border: element.borderWidth
            ? `${element.borderWidth}px solid ${element.borderColor ?? "transparent"}`
            : undefined,
        }}
        className="cursor-move"
        onClick={choose}
      >
        {element.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={element.src}
            alt={element.alt ?? ""}
            draggable={false}
            className="pointer-events-none size-full select-none"
            style={{ objectFit: element.objectFit ?? "cover" }}
          />
        ) : (
          <div className="pointer-events-none flex size-full items-center justify-center bg-[linear-gradient(135deg,#d1d5db,#f3f4f6,#cbd5e1)] px-6 text-center font-semibold text-gray-600">
            {element.alt ?? "Select and choose Replace image"}
          </div>
        )}
      </div>
    );

  if (element.type === "button")
    return (
      <div data-canvas-id={element.id} style={style} className="cursor-move" onClick={choose}>
        <div
          className="flex size-full items-center justify-center"
          style={{
            backgroundColor: element.bgColor ?? "#111827",
            color: element.textColor ?? "#fff",
            borderRadius: element.borderRadius ?? 6,
            fontFamily: element.fontFamily,
            letterSpacing: element.letterSpacing,
          }}
        >
          {element.label ?? "Button"}
        </div>
      </div>
    );

  const line = element.shapeKind === "line";
  return (
    <div
      data-canvas-id={element.id}
      className="cursor-move"
      onClick={choose}
      style={{
        ...style,
        backgroundColor: line ? "transparent" : element.bgColor ?? "#d1d5db",
        borderTop: line
          ? `${Math.max(1, element.borderWidth ?? 2)}px solid ${element.bgColor ?? "#111827"}`
          : element.borderWidth
            ? `${element.borderWidth}px solid ${element.borderColor ?? "transparent"}`
            : undefined,
      }}
    />
  );
}

function Tool({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded border border-border bg-card px-3 py-2 text-sm hover:bg-foreground/[0.06] disabled:opacity-40 ${className}`}
      {...props}
    />
  );
}
