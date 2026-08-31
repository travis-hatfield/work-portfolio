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
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          travishatfield.dev/work
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
