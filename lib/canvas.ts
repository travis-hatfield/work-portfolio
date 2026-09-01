export const DEFAULT_CANVAS_WIDTH = 900;
export const DEFAULT_CANVAS_HEIGHT = 700;

export type CanvasElementType = "text" | "image" | "button" | "shape";
export type TextAlignment = "left" | "center" | "right";
export type ObjectFit = "cover" | "contain";
export type ShapeKind = "rect" | "line";

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  rotation?: number;
  html?: string;
  fontSize?: number;
  color?: string;
  align?: TextAlignment;
  src?: string;
  alt?: string;
  objectFit?: ObjectFit;
  label?: string;
  url?: string;
  bgColor?: string;
  textColor?: string;
  shapeKind?: ShapeKind;
};

export type CanvasDoc = {
  designWidth: number;
  height: number;
  elements: CanvasElement[];
};

export function createEmptyCanvas(): CanvasDoc {
  return {
    designWidth: DEFAULT_CANVAS_WIDTH,
    height: DEFAULT_CANVAS_HEIGHT,
    elements: [],
  };
}

export function createCanvasId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `canvas-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function normalizeCanvas(value: unknown): CanvasDoc | null {
  if (!value) return null;
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return null;
    }
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as CanvasDoc).elements)
  ) {
    return null;
  }
  const doc = parsed as Partial<CanvasDoc>;
  return {
    designWidth:
      typeof doc.designWidth === "number" && doc.designWidth > 0
        ? doc.designWidth
        : DEFAULT_CANVAS_WIDTH,
    height:
      typeof doc.height === "number" && doc.height > 0
        ? doc.height
        : DEFAULT_CANVAS_HEIGHT,
    elements: (doc.elements ?? []).filter(isCanvasElement),
  };
}

function isCanvasElement(value: unknown): value is CanvasElement {
  if (!value || typeof value !== "object") return false;
  const element = value as CanvasElement;
  return (
    typeof element.id === "string" &&
    ["text", "image", "button", "shape"].includes(element.type) &&
    typeof element.x === "number" &&
    typeof element.y === "number" &&
    typeof element.width === "number" &&
    typeof element.height === "number" &&
    typeof element.zIndex === "number"
  );
}
