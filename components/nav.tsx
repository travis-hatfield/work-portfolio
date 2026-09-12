import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/resume", label: "Resume" },
  { href: "/ai-assisted-projects", label: "AI-Assisted Projects" },
  { href: "/personal-ai-projects", label: "Personal AI Projects" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          travishatfield.dev/work
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-foreground transition-colors"
          >
            Admin Access
          </Link>
        </nav>
      </div>
    </header>
  );
}
