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
    }, 1100);
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]"
    >
      {/* Preview surface */}
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

        {/* Category chip */}
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-2 backdrop-blur-sm">
          {category}
        </span>

        {/* Progress dots */}
        {shots.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {shots.map((s, i) => (
              <span
                key={shotUrl(s)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "1rem" : "0.375rem",
                  backgroundColor: i === active ? "var(--color-accent)" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
          {title}
        </h3>
        {stats && <p className="text-xs text-muted">{stats}</p>}
        <p className="text-sm leading-relaxed text-foreground/85">{summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {tools.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
