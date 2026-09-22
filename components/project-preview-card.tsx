"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Screenshot = { url: string; caption?: string };

function shotUrl(s: string | Screenshot): string {
  return typeof s === "string" ? s : s.url;
}

export default function ProjectPreviewCard({
  href,
  category,
  title,
  summary,
  stats,
  tools,
  screenshots,
}: {
  href: string;
  category: string;
  title: string;
  summary: string;
  stats?: string | null;
  tools: string[];
  screenshots: (string | Screenshot)[];
}) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shots = screenshots.slice(0, 4);

  useEffect(() => {
    if (!hovering || shots.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % shots.length);
    }, 1200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovering, shots.length]);

  function handleLeave() {
    setHovering(false);
    setActive(0);
  }

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors duration-200 hover:border-accent-2/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {shots.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            {title}
          </div>
        ) : (
          shots.map((s, i) => (
            <img
              key={shotUrl(s)}
              src={shotUrl(s)}
              alt={`${title} screenshot ${i + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))
        )}

        <span className="absolute left-3 top-3 text-[11px] font-medium uppercase tracking-wide text-background bg-foreground/90 px-2 py-1 rounded-sm">
          {category}
        </span>

        {shots.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {shots.map((s, i) => (
              <span
                key={shotUrl(s)}
                className="h-0.5 w-4 transition-colors duration-300"
                style={{
                  backgroundColor: i === active ? "var(--color-accent-2)" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-normal tracking-tight">{title}</h3>
        {stats && <p className="font-mono text-xs text-muted">{stats}</p>}
        <p className="text-sm leading-relaxed text-foreground/75">{summary}</p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-xs text-muted">
          {tools.slice(0, 4).map((t, i) => (
            <span key={t}>
              {t}
              {i < Math.min(tools.length, 4) - 1 && <span className="ml-3 text-border">/</span>}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
