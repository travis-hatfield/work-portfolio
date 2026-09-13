"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Command = {
  label: string;
  hint?: string;
  href?: string;
  external?: string;
  group: string;
};

const NAV_COMMANDS: Command[] = [
  { label: "Overview", href: "/", group: "Navigate" },
  { label: "Resume", href: "/resume", group: "Navigate" },
  { label: "AI-Assisted Projects", href: "/ai-assisted-projects", group: "Navigate" },
  { label: "Personal AI Projects", href: "/personal-ai-projects", group: "Navigate" },
  { label: "Resources", href: "/resources", group: "Navigate" },
];

const ACTION_COMMANDS: Command[] = [
  { label: "Download resume PDF", external: "/resume-travis-hatfield.pdf", group: "Actions" },
  { label: "Email Travis", external: "mailto:hello@travishatfield.dev", group: "Actions" },
];

const ALL_COMMANDS = [...NAV_COMMANDS, ...ACTION_COMMANDS];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const filtered = ALL_COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const runCommand = useCallback(
    (cmd: Command) => {
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
      if (cmd.href) {
        router.push(cmd.href);
      } else if (cmd.external && linkRef.current) {
        linkRef.current.href = cmd.external;
        linkRef.current.click();
      }
    },
    [router]
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) runCommand(cmd);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, activeIndex, close, runCommand]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(t);
  }, [open]);

  let runningIndex = -1;

  return (
    <>
      {/* Hidden anchor used to trigger external/mailto navigation without a full reload of internal routes */}
      <a ref={linkRef} className="hidden" aria-hidden="true" tabIndex={-1} />

      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-foreground sm:flex"
        aria-label="Open command palette"
      >
        Search
        <span className="kbd">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="text-muted" aria-hidden="true">
                ⌘
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Jump to a page or run a command…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <span className="kbd">Esc</span>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">No matches.</p>
              )}
              {["Navigate", "Actions"].map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {group}
                    </p>
                    {items.map((cmd) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={cmd.label}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => runCommand(cmd)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            isActive ? "bg-accent-soft text-accent" : "text-foreground/90"
                          }`}
                        >
                          {cmd.label}
                          <span aria-hidden="true">↵</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
