import Link from "next/link";
import CommandPalette from "@/components/command-palette";

const links = [
  { href: "/resume", label: "Resume" },
  { href: "/ai-assisted-projects", label: "AI-Assisted" },
  { href: "/personal-ai-projects", label: "Personal AI" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          travishatfield.dev/work
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
          <CommandPalette />
          <Link
            href="/admin"
            className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
