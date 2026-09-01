import type { CSSProperties } from "react";
import type { CanvasDoc, CanvasElement } from "@/lib/canvas";

type Props = { document: CanvasDoc; className?: string };

export function CanvasRenderer({ document, className = "" }: Props) {
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden ${className}`}
      style={{
        maxWidth: document.designWidth,
        aspectRatio: `${document.designWidth} / ${document.height}`,
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
  };

  if (element.type === "text") {
    return (
      <div
        style={{
          ...style,
          fontSize: `clamp(10px, ${((element.fontSize ?? 24) / designWidth) * 100}vw, ${element.fontSize ?? 24}px)`,
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
    return (
      <div style={style}>
        {element.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={element.src}
            alt={element.alt ?? ""}
            className="size-full"
            style={{ objectFit: element.objectFit ?? "cover" }}
          />
        ) : null}
      </div>
    );
  }

  if (element.type === "button") {
    const child = (
      <span
        className="flex size-full items-center justify-center rounded-md px-3 text-center font-medium"
        style={{
          backgroundColor: element.bgColor ?? "#111827",
          color: element.textColor ?? "#ffffff",
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
        {child}
      </a>
    ) : (
      <div style={style}>{child}</div>
    );
  }

  const isLine = element.shapeKind === "line";
  return (
    <div
      style={{
        ...style,
        backgroundColor: isLine ? "transparent" : element.bgColor ?? "#d1d5db",
        borderTop: isLine ? `2px solid ${element.bgColor ?? "#111827"}` : undefined,
      }}
    />
  );
}
