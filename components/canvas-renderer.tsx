import type { CSSProperties } from "react";
import type { CanvasDoc, CanvasElement } from "@/lib/canvas";

export function CanvasRenderer({
  document,
  className = "",
}: {
  document: CanvasDoc;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden ${className}`}
      style={{
        maxWidth: document.designWidth,
        aspectRatio: `${document.designWidth} / ${document.height}`,
        background: document.background ?? "#ffffff",
      }}
    >
      {document.elements
        .slice()
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((element) => (
          <RenderedElement
            key={element.id}
            element={element}
            designWidth={document.designWidth}
            canvasHeight={document.height}
          />
        ))}
    </div>
  );
}

function RenderedElement({
  element,
  designWidth,
  canvasHeight,
}: {
  element: CanvasElement;
  designWidth: number;
  canvasHeight: number;
}) {
  const style: CSSProperties = {
    position: "absolute",
    left: `${(element.x / designWidth) * 100}%`,
    top: `${(element.y / canvasHeight) * 100}%`,
    width: `${(element.width / designWidth) * 100}%`,
    height: `${(element.height / canvasHeight) * 100}%`,
    zIndex: element.zIndex,
    transform: `rotate(${element.rotation ?? 0}deg)`,
    transformOrigin: "center",
    opacity: element.opacity ?? 1,
    borderRadius: element.borderRadius,
    border: element.borderWidth
      ? `${element.borderWidth}px solid ${element.borderColor ?? "transparent"}`
      : undefined,
  };

  if (element.type === "text") {
    return (
      <div
        style={{
          ...style,
          fontSize: `clamp(10px, ${((element.fontSize ?? 24) / designWidth) * 100}vw, ${element.fontSize ?? 24}px)`,
          fontFamily: element.fontFamily ?? "inherit",
          fontWeight: element.fontWeight ?? 400,
          fontStyle: element.fontStyle ?? "normal",
          letterSpacing: element.letterSpacing,
          lineHeight: element.lineHeight ?? 1.2,
          color: element.color ?? "#111827",
          textAlign: element.align ?? "left",
          overflow: "hidden",
          overflowWrap: "anywhere",
        }}
        dangerouslySetInnerHTML={{ __html: element.html ?? "<p>Text</p>" }}
      />
    );
  }

  if (element.type === "image") {
    if (!element.src) return null;
    return (
      <div style={{ ...style, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={element.src}
          alt={element.alt ?? ""}
          className="size-full"
          style={{ objectFit: element.objectFit ?? "cover" }}
        />
      </div>
    );
  }

  if (element.type === "button") {
    const content = (
      <span
        className="flex size-full items-center justify-center px-3 text-center font-medium"
        style={{
          backgroundColor: element.bgColor ?? "#111827",
          color: element.textColor ?? "#ffffff",
          borderRadius: element.borderRadius ?? 6,
          fontFamily: element.fontFamily,
          letterSpacing: element.letterSpacing,
        }}
      >
        {element.label ?? "Button"}
      </span>
    );
    return element.url ? (
      <a
        href={element.url}
        style={style}
        target={element.url.startsWith("http") ? "_blank" : undefined}
        rel={element.url.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    ) : (
      <div style={style}>{content}</div>
    );
  }

  const line = element.shapeKind === "line";
  return (
    <div
      style={{
        ...style,
        backgroundColor: line ? "transparent" : element.bgColor ?? "#d1d5db",
        borderTop: line
          ? `${Math.max(1, element.borderWidth ?? 2)}px solid ${element.bgColor ?? "#111827"}`
          : style.border,
      }}
    />
  );
}
