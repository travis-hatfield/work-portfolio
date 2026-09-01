import type { Block } from "@/lib/db";

function widthClass(width: 25 | 50 | 75 | 100) {
  return { 25: "w-1/4", 50: "w-1/2", 75: "w-3/4", 100: "w-full" }[width];
}

function alignClass(align: "left" | "center" | "right") {
  return { left: "mr-auto", center: "mx-auto", right: "ml-auto" }[align];
}

function galleryColsClass(count: number) {
  const n = Math.min(Math.max(count, 1), 4);
  return { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[n];
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={block.id}
                className={block.level === 2 ? "text-xl font-semibold tracking-tight" : "text-lg font-semibold"}
              >
                {block.text}
              </Tag>
            );
          }
          case "paragraph":
            return (
              <div
                key={block.id}
                className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "quote":
            return (
              <blockquote
                key={block.id}
                className="border-l-2 border-accent pl-4 italic text-muted prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "divider":
            return <hr key={block.id} className="border-border" />;
          case "button":
            return (
              <a
                key={block.id}
                href={block.url}
                className="inline-flex w-fit items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
              >
                {block.label}
              </a>
            );
          case "image":
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <figure key={block.id} className={`${widthClass(block.width)} ${alignClass(block.align)}`}>
                <img src={block.url} alt={block.caption ?? ""} className="w-full rounded-lg object-cover" />
                {block.caption && (
                  <figcaption className="mt-1.5 text-center text-xs text-muted">{block.caption}</figcaption>
                )}
              </figure>
            );
          case "image-text":
            return (
              <div
                key={block.id}
                className={`flex flex-col gap-4 sm:flex-row sm:items-center ${
                  block.imageSide === "right" ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.imageUrl} alt="" className="w-full rounded-lg object-cover sm:w-1/2" />
                <div
                  className="prose prose-neutral dark:prose-invert max-w-none flex-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              </div>
            );
          case "gallery":
            return (
              <div key={block.id} className={`grid gap-2 ${galleryColsClass(block.images.length)}`}>
                {block.images.map((img, i) => (
                  <figure key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.caption ?? ""} className="w-full rounded-lg object-cover aspect-square" />
                    {img.caption && (
                      <figcaption className="mt-1 text-center text-xs text-muted">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
